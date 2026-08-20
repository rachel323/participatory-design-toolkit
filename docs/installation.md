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
 | **Arduino IDE** | 2.x | [https://www.arduino.cc/en/software](https://www.arduino.cc/en/software) |  |
 | **WIN_TOOL (Mini Keyboard)** | - | [https://drive.google.com/file/d/1VTd7M0xR8LRjZ-CGcSx5y-NbOO4VAcL0/view?usp=sharing](https://drive.google.com/file/d/1VTd7M0xR8LRjZ-CGcSx5y-NbOO4VAcL0/view?usp=sharing) | Voor USB-minikeyboard mapping. |

---
---

## 🚀 **Step-by-step Instructions: Installation & Set Up**

### **1️⃣ Software Installeren**
1. **Instal all necessary software** (See table above).
2. If you don't have **a Touchdesigner account** yet, register to create one:
   - Go to [https://derivative.ca/user/register](https://derivative.ca/user/register).
   - Activate your account using the confirmation mail.

---

### **2️⃣ Download the project of GitHub**
1. **Make sure you are invited to the GitHub Project**
    - Ask the owner to invite you to the GitHub Project with the Email of your GitHub account
2. **Clone the repository**:
   On your laptop, open a terminal (Git Bash/Command Prompt) and send the following commands:
   ```bash
   git clone https://github.com/rachel323/participatory-design-toolkit.git
   cd participatory-design-toolkit
   
   - If asked, make sure you log in with the GitHub account that received the invitation to the project.
3. **Check the contents of the folder**:
   Open a terminal in the cloned map and type the following to open the files in the File Explorer
   ```bash
   explorer .  # Windows
   # OF
   open .      # Mac

### **2️⃣ Install and start the Dashboard**
1. **Navigate to the Dashboard folder**:
    In the same terminal, send:
    ```cd sensory-dashboard
2. **Install the recquired dependencies**:
    In the terminal, send:
    ```npm install
3. **Start the server**:
    ```npm start
4. **Check whether the Dashboard runs**:
    Open a browser and go to your localhost by typing in the search bar:
    http://localhost:3000
    - If everything is installed correctly, you should see the welcome page of the dashboard.