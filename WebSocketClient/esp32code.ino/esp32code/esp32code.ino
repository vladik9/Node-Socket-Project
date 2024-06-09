#include <WiFi.h>
#include <WebSocketClient.h>

// Your WiFi credentials
const char* ssid = "We_are_home_now!";
const char* password = "Forfun96_!";

char path[] = "/";
char host[] = "192.168.0.213:5000"; // Local machine IP and port

WebSocketClient webSocketClient;
WiFiClient client;
int vo = analogRead(26);
int voo = analogRead(27);

void initWiFi() {
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
}

bool connectWebSocket() {
  // Connect to the WebSocket server
  if (client.connect("192.168.0.213", 5000)) {
    Serial.println("WebSocket connected");

    // Handshake with the server
    webSocketClient.path = path;
    webSocketClient.host = host;

    if (webSocketClient.handshake(client)) {
      Serial.println("Handshake successful");
      return true;
    } else {
      Serial.println("Handshake failed.");
    }
  } else {
    Serial.println("WebSocket connection failed.");
  }
  
  return false;
}

int* initReadSensorData() {
  // Print the read values
  Serial.println(vo);
  Serial.println(voo);

  // Create a static array to hold the values
  static int result[2];
  result[0] = vo;
  result[1] = voo;

  return result;
}

void sendSocketData(String data) {
  if (client.connected()) {
    // String data = "arduino esp32 message";
    Serial.println("################:DATA SEND:#################");
    Serial.println(data);
    Serial.println("##########################################");

    webSocketClient.sendData(data);
  } else {
    Serial.println("Client disconnected.");
    while (1) {
      // Hang on disconnect to prevent further operations
      delay(1000); // Adding a delay to prevent watchdog reset
    }
  }
  
  // Wait to fully let the client process the data
  delay(1000);
}

void setup() {
  Serial.begin(115200);
  initWiFi();

  if (!connectWebSocket()) {
    // If the initial connection fails, retry
    while (!connectWebSocket()) {
      Serial.println("Retrying WebSocket connection...");
      delay(5000); // Wait before retrying
    }
  }
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Lost WiFi connection. Reconnecting...");
    initWiFi();
  }

  if (!client.connected()) {
    Serial.println("Lost WebSocket connection. Reconnecting...");
    if (!connectWebSocket()) {
      // Retry WebSocket connection
      while (!connectWebSocket()) {
        Serial.println("Retrying WebSocket connection...");
        delay(5000); // Wait before retrying
      }
    }
  } else {
    int* sensorData = initReadSensorData();
    String data = String(sensorData[0]) + "," + String(sensorData[1]);
    sendSocketData(data);
     
  // delay(75); // Delay to control data sending frequency
}
}
