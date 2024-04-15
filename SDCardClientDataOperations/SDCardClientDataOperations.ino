
#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
// #include <ESPAsyncWebServer.h>
#include "FS.h"
#include "SD.h"
#include "SPI.h"
#include <WebSocketClient.h>
 

// Replace with your network credentials
const char* ssid = "We_are_home_now!";
const char* password =  "Forfun96_!";
 

char path[] = "/";
// this is IP address of local machine (server sicket),
//  got it for IPv4 with CMD ipconfig or use logs on server
char host[] = "192.168.0.129:5000";
// new instance of client socket
WebSocketClient webSocketClient;

// Use WiFiClient class to create TCP connections
WiFiClient client;


 

void initSDCard(){
  if(!SD.begin()){
    Serial.println("Card Mount Failed");
    return;
  }
  uint8_t cardType = SD.cardType();

  if(cardType == CARD_NONE){
    Serial.println("No SD card attached");
    return;
  }

  Serial.print("SD Card Type: ");
  if(cardType == CARD_MMC){
    Serial.println("MMC");
  } else if(cardType == CARD_SD){
    Serial.println("SDSC");
  } else if(cardType == CARD_SDHC){
    Serial.println("SDHC");
  } else {
    Serial.println("UNKNOWN");
  }
  uint64_t cardSize = SD.cardSize() / (1024 * 1024);
  Serial.printf("SD Card Size: %lluMB\n", cardSize);
}

void initWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
}



void listDir(fs::FS &fs, const char * dirname, uint8_t levels){
  Serial.printf("Listing directory: %s\n", dirname);

  File root = fs.open(dirname);
  if(!root){
    Serial.println("Failed to open directory");
    return;
  }
  if(!root.isDirectory()){
    Serial.println("Not a directory");
    return;
  }
}

 void readFile(fs::FS &fs, const char * path) {
  int arrayOfData[150]; // Array to hold data from the file
  Serial.printf("Reading file: %s\n", path);

  File file = fs.open(path);
  if(!file) {
    Serial.println("Failed to open file for reading");
    return;
  }

  Serial.print("Read from file: ");
  int index = 0;
  while(file.available()) {
    if (index < 151) { // Ensure we don't exceed the array bounds
      int data = file.read();
      arrayOfData[index] = data; // Store data in array
      Serial.write(data); // Print data to Serial
      index++;
    } else {
      // Handle the case where the file is larger than the array
      Serial.println("\nFile size exceeds buffer capacity.");
      break; // Exit the loop
    }
  }
  file.close();
}


void initWebSocketClientConnection(){
   // Connect to the websocket server
  if (client.connect("192.168.0.213", 5000)) {
    Serial.println("Connected");
  } else {
    Serial.println("Connection failed.");
    while (1) {
      // Hang on failure
    }
  }

  // Handshake with the server
  webSocketClient.path = path;
  webSocketClient.host = host;
  if (webSocketClient.handshake(client)) {
    Serial.println("Handshake successful");
  } else {
    Serial.println("Handshake failed.");
    while (1) {
      // Hang on failure
    }
  }
}

void webSocketDataSend(){
  String data; 
   if (client.connected())
  {
    // this is message we can send to server,
    // as we now saving to many data
    data = "arduino esp32 message";

    Serial.println("################:DATA SEND:#################");
    Serial.println(data);
    Serial.println("##########################################");

    webSocketClient.sendData(data);
  }
  else
  {
    Serial.println("Client disconnected.");
    while (1)
    {
      // Hang on disconnect.
    }
  }
  // wait to fully let the client disconnect
  delay(1000);

}

void setup() {
  Serial.begin(115200);
  initWiFi();
  initSDCard();
  listDir(SD, "/", 0);
  readFile(SD, "/data.csv");
  // initWebSocketClientConnection();
 
}

void loop() {
  
}