# flash-arduino-node-serial-playback aka FANS
Standalone system for Flash playback control with an Arduino Uno connected to USB communicating via Serial over a NodeJS Socket Server

Work in progress. If you want to get up and running shoot me a message on Twitter. My username is [@motionharvest](https://twitter.com/motionharvest). I don't have a diagram drawn yet, and my Arduino code is little messy because I adapted it from another project of mine and didn't remove the stuff that doesn't need to be there for this project. There are buttons on PIN 2 and 4. I work on a 13" Macbook Pro on OSX 10.11.2 (El Capitan). I have it all working here. Let me know if you get stuck and I'll try to help out.


# Installation
1. Install NodeJS if you don't have it. You can get it [here](https://nodejs.org/en/).
2. Install Arduino IDE. You can get it [here](https://www.arduino.cc/en/Main/Software)
3. From the repo directory run `npm install` in terminal.
4. Follow this wiring diagram. (Sorry, don't have this made yet)
5. Open `Arduino/fans-2-button-sketch/fans-2-button-sketch.ino` and [upload](https://www.arduino.cc/en/main/howto) it to your Arduino
6. Open `public/fans-main.fla` in Flash and make a timeline based animation.
7. From the repo directory run `node host`. Your terminal will look something like

		FANS Socket server online. (10.0.0.6:8080).
		FANS Communication Server online. (10.0.0.6:8124).
		Launching browser.
		COMM Port Scan - Quit server and run again $ node host /dev/modemxxx
		/dev/cu.Bluetooth-Incoming-Port
		/dev/cu.usbmodem1411
		Identified roles[presentation]

8. Quit the app.
9. From the repo directory run `node host /dev/cu.usbmodem1411` where `cu.usbmodem1411` is your arduino's ID. Mine shows up as `cu.usbmodem1411` so my guess is yours will be similar.

The browser will automatically open and your flash file will be served. Pressing button 1 will play your timeline. Pressing button 2 doesn't do anything inside Flash yet, but the command is sent through.

Sure it's a lot of work, but when you're done you've got an Arduino communicating with Flash via a NodeJS Socket server and a serial monitor. #winning




