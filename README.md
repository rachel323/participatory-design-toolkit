# Participatory Design Toolkit

## 🎯 **Overview**
This project concerns the **participatory design toolkit** meant to support the Co-design of Interaction Technologies Embracing Neuro-Inclusive Dynamics (Co-intend) project. It consist of the following software related components:
- **Sensory Dashboard** (Node.js/VS Code): The wizard dashboard to control the haptics and sounds during a session, as well as the researchers admin page to adjust the configuration and start and log sessions.
- **TouchDesigner Project**: Controls the visuals for the projector. The iPad sends touch data to TouchDesigner (over WiFi) and TouchDesigner processes them to create visuals with the touch data.
- **Mini_Keyboard**: Software for the external USB keypad to trigger sound output by the wizard.
- **Arduino/ESP Firmware**: Software for the connection of the vibration motors. Allows the dashboard to trigger the ESP's.

## 📁 Structure
- `sensory-dashboard/`: Node.js dashboard (VSCode project).
- `touchdesigner/`: TouchDesigner project for iPad visualizations.
- `arduino/`: Arduino and ESP firmware.

## 🚀 Setup
See [docs/installation.md](docs/installation.md) for detailed instructions.
