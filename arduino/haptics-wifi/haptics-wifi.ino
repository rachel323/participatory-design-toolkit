#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char* ssid = "hetInternet_2G";
const char* password = "CaptainMorgan27";

ESP8266WebServer server(80);

#define motorPin 14

void vibrate() {
  Serial.println("Vibrate!");

  digitalWrite(motorPin, HIGH);
  Serial.println("HIGH");
  delay(1000);

  digitalWrite(motorPin, LOW);
  Serial.println("LOW");

  server.send(200, "text/plain", "OK");
}

void setup() {
  pinMode(motorPin, OUTPUT);
  digitalWrite(motorPin, LOW);

  Serial.begin(115200);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  Serial.println(WiFi.localIP()); //print localIP om in dashboard aan te roepen

  server.on("/vibrate", vibrate);

  server.begin();
}

void loop() {
  server.handleClient();
}