# flash-arduino-node-serial-playback
Standalone system for Flash playback control with an Arduino Uno connected to USB communicating via Serial over a NodeJS Socket Server


# Installation
1. Install NodeJS if you don't have it. You can get it [here](https://nodejs.org/en/).
2. Install Arduino IDE. You can get it [here](https://www.arduino.cc/en/Main/Software)
3. From the repo directory run `npm install` in terminal.
4. Follow this wiring diagram. (Sorry, don't have this made yet)
5. Open `fans-2-button-sketch/fans-2-button-sketch.ino` and [upload](https://www.arduino.cc/en/main/howto) it to your Arduino
6. From the repo director run `node fans --scan` to list your Serial devices. You should see something like `/dev/cu.Bluetooth-Incoming-Port`. Keep note of that. You'll need it later.
7. Open `fans-presentation.fla` in Flash.

I have a demo file that isn't very easy to explain so let me simplify that process before I get further down this list of instructions.