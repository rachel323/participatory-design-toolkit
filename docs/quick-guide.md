# 📖 Quick Guide: Use of the Participatory Design Toolkit

This manual details the steps to set-up and run the system after everything has been installed according to the installation manual. After finishing the installation manual during the first use, everything should be up and running. This guide offers a step-by-step plan for quickly starting up the system the subsequent times it will be used. 
---
---

## ⚠️ **Requirements**
Firstly, make sure you have followed the installation manual to install all required software and dependencies.
Before starting a test make sure
- The haptic devices are fully charged
- The iPad is fully charged or connected to a charger
- The Bluetooth speaker is fully charged
- The Laptop has HDMI and USB connections or adapters

---


## 🚀 **Set-up in Short**
1. **Power the laptop**
   - Make sure the laptop is connected to a charger
2. **Power the router**
   - Plug the router in and press the on button
   - After some startup time, the Wi-Fi should become available
   - Check whether the laptop has connected to the Wi-Fi
3. **Start the dashboard**
   - Open a terminal in the cloned sensory-dashboard folder and send the following command
     ```bash
     node src\server.js
     ```
   - You should see a 'Backend is running on http://localhost:3000' reply
   - Open a browser and navigate to the localhost by typing the URL in the search bar
4. **Turn on ESP devices**
   - Wait for the ESPs to join the Wi-Fi
   - The dashboard should show a connection to the ESP's
   - Check if the devices vibrate when you press a button
5. **Connect audio input device and speakers**
    - Plug in the audio input device to the laptop using USB
    - Turn on the speaker and connect to the laptop over Bluetooth
    - Check whether pressing a button on the audio input devices plays music over the speakers
6. **Connect the projector**
    - Use the HDMI cable to plug in the projector to the laptop
    - Set the display settings to Extend on the laptop
       - on Windows: Windows key + P
       - on Mac: Command + F1
7. **Open the TouchDesigner project**
    - open the TouchDesigner application; it should open the 'multitouch-visualisations' project automatically
    - if not, navigate to the 'touchdesigner' GitHub folder and open the 'multitouch-visualisations' file from there
8. **Connect the iPad**
   - On the iPad, open the TC data app
   - Check whether the iPad is connected to the router's Wi-Fi

---

## 👷 **Personalization and Adaptation**

### **🔉 Change Audio Files**
1. Go to the Admin menu
2. Press the Audio you want to replace
3. Select a file on your laptop you want to replace it with
4. Provide a new name for the audio file

---

### **👁️ Change Visualisation Parameters**
**TouchDesigner as a Tool**
The visualizations are realized through the visual programming environment TouchDesigner. This program takes input from the iPad on different touchpoint and processes this data to create visuals with it. In order to personalize these parameters for your project, it is useful if you have some experience in TouchDesigner. Before changing parameters or processors in the TouchDesigner project, we therefore recommend to follow some basic tutorials to understand how the program works.

**The Project File**
The TouchDesigner project has been created as a timeline from left to right, where the first nodes handle the receiving of the iPad data, and moving to the right different operators handle the processing of this data. In order to clarify what is going on where, annotations that should give some explanation on what is happening have been added throughout this timeline. 

---
### **📳 Change Haptics Patterns**

---
---
## 👷 **Quick fixes**

### **🔉 Audio Input Not Working**

---
### **👁️ Visuals Not Working**

Does TouchDesigner not show any input? None of the things move? Then the connection between the iPad and TouchDesigner is broken.

1. Check if the router is on
2. Check the Wi-Fi on the iPad;
3. Check the Wi-Fi on the laptop

---
### **👁️ Haptics Not Working**
1. Check if the router is on
2. Check whether the laptop is connected to the WiFI
3. In the browser, go to http://[IP-address-ESP]/vibrate. If the ESP is connected the browser should return OK.

1. Connect the ESP to the laptop using a USB- USB-C cable with data. You can use the cable from the audio input device. A light should turn on on the ESP in different colors.
2. Open the arduino haptics file in Arduino IDE program.
3. Upload the program to the arduino again. check in the serial monitor whether the IP address is the same as in the motor.js file from the dashboard (file in VSC).
