# 📖 Installation manual: Participatory Design Toolkit

This manual details the step by step instruction to install and configure all the software needed for the participatory design toolkit to work.
---
---

## 🛠 **Requirements: The necessary software**
Firstly, make sure you have the following programms installed on your laptop:
   Software | Version | Download Link | Notes |
 |----------|--------|---------------|-------------|
 | **Git** | Latest | [https://git-scm.com/install/](https://git-scm.com/install/) | For installing and managing the project |
 | **VS Code** | Latest | [https://code.visualstudio.com/](https://code.visualstudio.com/) | For the dashboard project. |
 | **Node.js** | v18+ | [https://nodejs.org/](https://nodejs.org/) | Pick the latest  **LTS version**. |
 | **TouchDesigner** | 2023+ | [https://derivative.ca/](https://derivative.ca/) | **Account needed** (free trial available). |
 | **Arduino IDE** | 2.x | [https://www.arduino.cc/en/software](https://www.arduino.cc/en/software) | For the haptic feedback |
 | **WIN_TOOL (Mini Keyboard)** | - | [https://drive.google.com/file/d/1VTd7M0xR8LRjZ-CGcSx5y-NbOO4VAcL0/view?usp=sharing](https://drive.google.com/file/d/1VTd7M0xR8LRjZ-CGcSx5y-NbOO4VAcL0/view?usp=sharing) | For the audio input device mapping. |

---
---

## 🚀 **Step-by-step Instructions: Installation & Set Up**

### **1️⃣ Install Software**
1. **Install all necessary software** (See table above).
2. If you don't have **a TouchDesigner account** yet, register to create one:
   - Go to [https://derivative.ca/user/register](https://derivative.ca/user/register).
   - Activate your account using the confirmation mail.

---

### **2️⃣ Download the project from GitHub**
1. **Make sure you are invited to the GitHub Project**
    - Ask the owner to invite you to the GitHub Project with the Email of your GitHub account
2. **Clone the repository**:
   On your laptop, open a terminal (Git Bash/Command Prompt) and send the following commands:
   ```bash
   git clone https://github.com/rachel323/participatory-design-toolkit.git
   cd participatory-design-toolkit
   ```
   - If asked, make sure you log in with the GitHub account that received the invitation to the project.
3. **Check the contents of the folder**:
   Open a terminal in the cloned map and type the following to open the files in the File Explorer
   ```bash
   explorer .  # Windows
   # OR
   open .      # Mac
   ```
   - you should see a folder called participatory-design-toolkit with sub-folders 'arduino', 'docs', 'sensor-dashboard', 'touchdesigner', and more.

### **3️⃣ Install and start the Dashboard**
1. **Navigate to the Dashboard folder**:
    In the same terminal, send:
    ```bash
    cd sensory-dashboard
2. **Install the required dependencies**:
    ```bash
    npm install
3. **Start the server**:
    ```bash
    npm start
4. **Check whether the Dashboard runs**:
    Open a browser and go to your localhost by typing in the search bar:
    http://localhost:3000
    - If everything is installed correctly, you should see the welcome page of the dashboard.
  
### **4️⃣ Set up the Audio Input Device**
1. **Plug the device into the laptop using the USB-cable**
2. **Open the MINI-KEYBOARD.exe from the WIN TOOL EN folder**
   - See table on top of page for the folder download link
3. **Check whether the correct keys are mapped on the keypad**
   - The correct keys should be mapped on the visual keypad, make sure you to check this with the image of the correct mapping below.
   - For the first time, you should probably map the correct keys to the corresponding keypad buttons. Click on a button from the keypad in the program (top part of the screen) and then click the correct key on the keyboard on the lower half of the screen. Once done for all keys and knobs, press download.
   <img width="977" height="480" alt="Screenshot 2026-07-08 113421" src="https://github.com/user-attachments/assets/55fab625-6177-41b3-a902-f0e1454cbad8" />
   - If you have downloaded the mapping as shown above, you can close the program
4. **Check whether the keypad works on your laptop**
   - On a place where you can type (e.g. open a notepad file), test whether pressing the keys leads to the expected keypad symbols being inserted (e.g. bottom left key prints a 4).
5. **Check whether the keypad plays audio on the dashboard**
   - On the dashboard in your browser, start a session and press the keys one by one. Make sure the audio of your laptop is on and check if you hear the sound.

### **5️⃣ Set up the Router**
Now we will be connection the haptics and visual components. These require WiFi to connect to the laptop, so we need to make sure they are all connected to the same WiFi network and can find each other's IP addresses.
1. **Turn on the Router**
   - Plug the router in a power socket and press the on button
   - Wait a couple of seconds for the router to start up
2. **Connect the laptop to the router's WiFi**
  - Check the IP address of the laptop on the WiFi, this should be...
3. **Connect the iPad to the router's WiFi**

### **6️⃣ Set up the Haptic Devices**
In order for the haptic devices to work, the Arduino haptics-wifi.ino script should be uploaded to every ESP and the accus should be charged.

**Uploading the script**
1. **Open the haptics-wifi file**
   - Navigate to the the participatory-desing-toolkit/arduino folder
   - Double-click to open or right click 'open with'> Arduino IDE
2. **Install the ESP32 board**
   - In the left tool bar, press the second icon from the top to go to the boards manager
   - Search for esp32 using the search bar
   - Install the esp32 package by Espressif Systems
3. **Plug in the ESP**
   - Connect the ESP to the laptop using a USB to USB-C cable with data properties
   - The Arduino IDE should find the board and show in the bottom right that it is connected to a COM
      - If not, go to the Tools in the top bar, under Board look for the ESP32C3 Dev module and look for the Port you plugged it in
      - Try another cable or USB port on your laptop if the ESP is still not found on a COM
   - Under Tools, make sure USB CDC on Boot is enabled
   - If the ESP is connected correctly pressing the Upload arrow in the top left of the screen should confirm the upload of the sketch.
4. **Check the IP addresses and the WiFi**
   - Once uploaded, go to the serial monitor (find the icon on the top right) and check the IP of the ESP on the WiFI
   - Make sure this IP is the same as the IP address given in the src/routes/motor.js file in the dashboard
   - Also check the ssid and password defined in the arduino IDE sketch you just uploaded. This should match the WiFi network the laptop will be connected to during testing.
  
**Charging the batteries**
1. Make sure the switch is turned off. Only turn the switch on when you start testing with them.
2. Plug an USB-C cable into the blue charging device. A red light will show if charging has started.
3. When a blue light turns on, the battery is fully charged and the device can be plugged out and used for testing.

Once you uploaded the script and charged the batteries the devices should automatically connect to the dashboard once turned on. 

### **7️⃣ Set up the Visual**
1. **Make sure the Laptop and iPad are on the same WiFi**
2. **Check the IP address of the laptop on the WiFi**
  - In the laptop's setting search for WiFi
  - Select the WiFi connection to see its properties
  - Scroll down until you see the IPv4 address
  - (If you can't find it, you can go to https://www.whatismyip.com/ and find the number there)
3. **Open the OSC controller app on the iPad**
4. **Go to settings and check the port and IP address**
  - Port should match the number at Network Port from the oscin1 operator in TouchDesigner (usually 7000)
  - IP address should match the IP address of the laptop
  - Start the connection and close the settings
5. **Open TouchDesigner on the laptop and check for signal**
  - Press the 'Play' button in the bottom bar in TouchDesigner
  - The OSC controller app, start sending signals by moving your fingers across the screen
  - You should see the data of the movements in the TouchDesigner operators and view output

