
#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
// #include <ESPAsyncWebServer.h>
#include "FS.h"
#include "SD.h"
#include "SPI.h"
#include <WebSocketClient.h>
// Define the maximum number of strings to read from the file
#define MAX_STRINGS 150

//your WIFI ID
const char* ssid = "We_are_home_now!";
//your WIFI password
const char* password = "Forfun96_!";

// this block is to simulate multithreading
unsigned long previousReadInterval = 0;
unsigned long readInterval = 500;

unsigned long previousWriteInterval = 0;
unsigned long writeInterval = 500;
//##########################

char path[] = "/";
// this is IP address of local machine (server sicket),
//  got it for IPv4 with CMD ipconfig or use logs on server
char host[] = "192.168.0.129:5000";
// new instance of client socket
WebSocketClient webSocketClient;

// Use WiFiClient class to create TCP connections
WiFiClient client;

// flags to control task logic
bool wifiConnected = false;
bool sdCardCheckConnected = false;
bool socketClientConnected = false;


// check if SD card is connected
bool initSDCardCheck() {
  if (!SD.begin()) {
    Serial.println("Card Mount Failed");
    return false;
  }
  uint8_t cardType = SD.cardType();

  if (cardType == CARD_NONE) {
    Serial.println("No SD card attached");
    return false;
  }

  Serial.print("SD Card Type: ");
  if (cardType == CARD_MMC) {
    Serial.println("MMC");
  } else if (cardType == CARD_SD) {
    Serial.println("SDSC");
  } else if (cardType == CARD_SDHC) {
    Serial.println("SDHC");
  } else {
    Serial.println("UNKNOWN");
  }
  uint64_t cardSize = SD.cardSize() / (1024 * 1024);
  Serial.printf("SD Card Size: %lluMB\n", cardSize);
  return true;
}

//init WiFi connection
bool initWiFiConnection() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");

  unsigned long startTime = millis();  // Get the current time
  while (WiFi.status() != WL_CONNECTED) {
    // Print a dot every second to indicate connection attempt
    Serial.print('.');
    delay(1000);

    // Check if connection attempt has timed out (e.g., after 30 seconds)
    if (millis() - startTime > 30000) {  // 30 seconds
      Serial.println("\nFailed to connect to WiFi (timeout)");
      return false;  // Return false to indicate failure
    }
  }

  Serial.println("\nConnected to WiFi");
  Serial.println("IP Address: " + WiFi.localIP().toString());
  return true;  // Return true to indicate success
}

// will list all directories from conneted SD Card if exist
void listActiveDirectories(fs::FS& fs, const char* dirname, uint8_t levels) {
  Serial.printf("Listing directory: %s\n", dirname);

  File root = fs.open(dirname);
  if (!root) {
    Serial.println("Failed to open directory");
    return;
  }
  if (!root.isDirectory()) {
    Serial.println("Not a directory");
    return;
  }
}

// Function to read data from a file and return an array of strings
String* readFile(fs::FS& fs, const char* path) {
  static String arrayOfData[MAX_STRINGS];  // Array to hold data from the file

  Serial.printf("Reading file: %s\n", path);

  File file = fs.open(path);
  if (!file) {
    Serial.println("Failed to open file for reading");
    return nullptr;  // Return nullptr to indicate failure
  }

  Serial.print("Read from file: ");
  int index = 0;
  while (file.available()) {
    if (index < MAX_STRINGS) {  // Ensure we don't exceed the array bounds
      // Read a string from the file until a newline character is encountered
      String data = file.readStringUntil('\n');
      arrayOfData[index] = data;  // Store string in array
      // Serial.println(data);       // Print string to Serial
      index++;
    } else {
      // Handle the case where the file contains more strings than the array can hold
      Serial.println("\nFile contains more strings than the array can hold.");
      break;  // Exit the loop
    }
  }
  file.close();

  // Return the array of strings to the caller
  return arrayOfData;
}

// init connection to webSockect
bool initWebSocketClientConnection() {
  // Connect to the websocket server
  if (client.connect("192.168.0.213", 5000)) {
    Serial.println("WebSocket connected");
  } else {
    Serial.println("WebSocket connection failed.");
    return false;
  }

  // Handshake with the server
  webSocketClient.path = path;
  webSocketClient.host = host;
  if (webSocketClient.handshake(client)) {
    Serial.println("Handshake successful");
    return true;
  } else {
    Serial.println("Handshake failed.");
    return false;
  }
}

void webSocketDataSend(String data) {
   
  if (client.connected()) {
    // this is message we can send to server,
    // as we now saving to many data
    // data = "arduino esp32 message";

    Serial.println("################:DATA SEND:#################");
    Serial.println(data);
    Serial.println("##########################################");

    webSocketClient.sendData(data);
  } else {
    Serial.println("Client disconnected.");
    while (1) {
      // Hang on disconnect.
    }
  }
  // wait to fully let the client disconnect
  delay(1000);
}
int generateRandomNumber(){
  return random(1024);
}


//this will handle data read from senseor and write it in file
void readDataFromSensorAndWriteOnSdCard(){
  // Generate a random number between 0 and 1023
  // this should be changed to read data from senor
  // instead of giving a random numbers
  // but is ok to simulate a sensor data
  int randomNumber = generateRandomNumber();
   // Write the data to SD card (assuming you have an SD card connected)
  File dataFile = SD.open("data.csv", FILE_APPEND); // Open the file for appending (create if not exists)
  if (dataFile) {
    dataFile.println(randomNumber); // Write the random number to the file
    dataFile.close(); // Close the file
  } else {
    Serial.println("Error opening data.txt"); // Print an error message if unable to open the file
  }
}

void setup() {
  Serial.begin(115200);
  Serial.println("Setup");

  do {
    wifiConnected = initWiFiConnection();
    sdCardCheckConnected = initSDCardCheck();
  } while (!wifiConnected && !sdCardCheckConnected);

  if (wifiConnected && sdCardCheckConnected) {
    socketClientConnected = initWebSocketClientConnection();
  }
    // move this to loop
    // if (socketClientConnected) {
    //   listActiveDirectories(SD, "/", 0);

    //   String* dataFromFile = readFile(SD, "/data.csv");
    //   Serial.println("Here to handle data");
    // }
  
}


void loop() {
 int tempData;
  // Task 1
  if (millis() - previousReadInterval >= readInterval) {
    // Update the timing
    previousReadInterval = millis();
    // Perform task 1
   tempData = generateRandomNumber();

    Serial.println("Task 1 is running...");
  }

  // Task 2
  if (millis() - previousWriteInterval >= writeInterval) {
    // Update the timing
    previousWriteInterval = millis();
     
    // Perform task 2
    webSocketDataSend(String(tempData));
    Serial.println("Task 2 is running...");
  }

  // Other tasks can go here
  
  // Main loop continues to run


Serial.print("In loop");
// if(wifiConnected && sdCardCheckConnected){
//     Serial.print("Will read here");
//  String* dataFromFile = readFile(SD, "/data.csv");
//  Serial.println("Here to handle data");

}

 