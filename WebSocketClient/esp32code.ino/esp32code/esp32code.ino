#include <WiFi.h>
#include <WebSocketClient.h>

//your WIFI ID
const char* ssid = "We_are_home_now!";
//your WIFI password
const char* password = "Forfun96_!";

char path[] = "/";
//this is IP address of local machine (server sicket), 
// got it for IPv4 with CMD ipconfig or use logs on server
char host[] = "192.168.0.213:5000";
//new instance of client socket  
WebSocketClient webSocketClient;

// Use WiFiClient class to create TCP connections
WiFiClient client;

//this will init all processes and services
void setup() {
  Serial.begin(115200);
  delay(10);

  // We start by connecting to a WiFi network

  Serial.println();
  Serial.println();
  Serial.print("Connecting to: ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  delay(5000);
  

  // Connect to the websocket server 
  if (client.connect("192.168.0.213", 5000)) {
    Serial.println("Connected");
  } else {
    Serial.println("Connection failed.");
    while(1) {
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
    while(1) {
      // Hang on failure
    }  
  }

}

//this will loop all services and will continuously send data to server
void loop() {
  String data;

  if (client.connected()) {
    //here we get back data from server, we can disable this
    webSocketClient.getData(data);
    if (data.length() > 0) {
    Serial.println("################:DATA RECEIVED:##############");
    Serial.println(data);
    Serial.println("##########################################");
    }
   
   //this is message we can send to server
   // !!!!!note, we may need to check data and save it debounce, 
    //as we now saving to many data
    data = "arduino esp32 message";
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
  delay(3000);
  
}