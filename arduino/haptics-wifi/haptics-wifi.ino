#include <WiFi.h>
#include <WebServer.h>

// make sure the USB CDC on boot is enabled
// install esp32 board for the c3 dev module

//use the same wifi the laptop will be using
const char* ssid = "Hotspot12";
const char* password = "Co-Intend2026";

WebServer server(80);

#define motorPin 4

void vibrate() {
  Serial.println("Vibrate!");

  digitalWrite(motorPin, HIGH);
  digitalWrite(3, HIGH);
  digitalWrite(6, HIGH);
  Serial.println("HIGH");

  delay(1000);

  digitalWrite(motorPin, LOW);
  Serial.println("LOW");

  server.send(200, "text/plain", "OK");
}

void setup() {
  Serial.begin(115200);

  pinMode(motorPin, OUTPUT);
  digitalWrite(motorPin, LOW);

  WiFi.begin(ssid, password);

  Serial.print("Verbinden met WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Verbonden! IP-adres: ");
  Serial.println(WiFi.localIP());

  server.on("/vibrate", vibrate);

  server.begin();
  Serial.println("Webserver gestart");
}

void loop() {
  server.handleClient();
}