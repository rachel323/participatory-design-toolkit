# 📖 Installation manual: Participatory Design Toolkit

This manual details the step by step instruction to install and configure all the software needed for the participatory design toolkit to work.
---
---

## 🛠 **Requirements: The Necessary Software**
Firstly, make sure you have the following programms installed on your laptop:
   Software | Version | Download Link | Notes |
 |----------|--------|---------------|-------------|
 | **Git** | Latest | [https://git-scm.com/install/](https://git-scm.com/install/) | For installing and managing the project |
 | **VS Code** | Latest | [https://code.visualstudio.com/](https://code.visualstudio.com/) | For the dashboard project. |
 | **Node.js** | v18+ | [https://nodejs.org/](https://nodejs.org/) | Pick the  **LTS versie**. |
 | **TouchDesigner** | 2023+ | [https://derivative.ca/](https://derivative.ca/) | **Account needed** (free trial available). |
 | **Arduino IDE** | 2.x | [https://www.arduino.cc/en/software](https://www.arduino.cc/en/software) | For the haptic feedback |
 | **WIN_TOOL (Mini Keyboard)** | - | [https://drive.google.com/file/d/1VTd7M0xR8LRjZ-CGcSx5y-NbOO4VAcL0/view?usp=sharing](https://drive.google.com/file/d/1VTd7M0xR8LRjZ-CGcSx5y-NbOO4VAcL0/view?usp=sharing) | Voor USB-minikeyboard mapping. |

---
---

## 🚀 **Step-by-step Instructions: Installation & Set Up**

### **1️⃣ Install Software**
1. **Install all necessary software** (See table above).
2. If you don't have **a Touchdesigner account** yet, register to create one:
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
   # OF
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
2. **Open the MINI-KEYBOARD.exe from the WIN TOOL EN folder** (See table on top of page for the folder download link)
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
3. **Connect the laptop to the router's WiFi**
  - Check the IP address of the laptop on the WiFi, this should be...
5. **Connect the iPad to the router's WiFi**

### **6️⃣ Set up the Haptic Devices**

### **7️⃣ Set up the Visual **
