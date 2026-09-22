#include <WiFi.h>
#include <WebServer.h>

// make sure the USB CDC on boot is enabled
// install esp32 board for the c3 dev module

//use the same wifi the laptop will be using
const char* ssid = "hetInternet_2G";
const char* password = "CaptainMorgan27";

WebServer server(80);

#define motorPin 4

void vibrate() {
  Serial.println("Vibrate!");

  digitalWrite(motorPin, HIGH);
  Serial.println("HIGH");

  delay(500);

  digitalWrite(motorPin, LOW);
  Serial.println("LOW");

  server.send(200, "text/plain", "OK");
}

bool patternEnabled = false;
int patternDuration = 250;
int patternInterval = 400;

void vibratePattern(boolean on, int duration, int interval) {
  patternEnabled = on;
  patternDuration = duration;
  patternInterval = interval;

  Serial.print("Pattern enabled: ");
  Serial.println(patternEnabled ? "true" : "false");
  Serial.print("Pattern duration: ");
  Serial.println(patternDuration);
  Serial.print("Pattern interval: ");
  Serial.println(patternInterval);

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
  server.on("/pattern", []() {
    boolean on = server.arg("on").equalsIgnoreCase("true");
    int duration = server.arg("duration").toInt();
    int interval = server.arg("interval").toInt();

    vibratePattern(on, duration, interval);
  });

  server.begin();
  Serial.println("Webserver gestart");
}

void loop() {
  server.handleClient();

  if (patternEnabled) {
    digitalWrite(motorPin, HIGH);
    Serial.println("HIGH");
    delay(patternDuration);

    digitalWrite(motorPin, LOW);
    Serial.println("LOW");
    delay(patternInterval);
  }
}