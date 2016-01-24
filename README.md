# flash-arduino-node-serial-playback aka FANS
Standalone system for Flash playback control with an Arduino Uno connected to USB communicating via Serial over a NodeJS Socket Server


# Installation
1. Install NodeJS if you don't have it. You can get it [here](https://nodejs.org/en/).
2. Install Arduino IDE. You can get it [here](https://www.arduino.cc/en/Main/Software)
3. From the repo directory run `npm install` in terminal.
4. Follow this wiring diagram. (Sorry, don't have this made yet)
5. Open `fans-2-button-sketch/fans-2-button-sketch.ino` and [upload](https://www.arduino.cc/en/main/howto) it to your Arduino
6. Open `public/fans-main.fla` in Flash and make a timeline based animation.
7. From the repo directory run `node host`. Your terminal will look something like

	FANS Socket server online. (10.0.0.6:8080)
	FANS Communication Server online. (10.0.0.6:8124)
	Launching browser.
	    COMM Port Scan - Quit server and run again $ node host /dev/modemxxx
	        /dev/cu.Bluetooth-Incoming-Port
	        /dev/cu.usbmodem1411
	Identified roles[presentation]

8. Quit the app.
9. From the repo directory run `nade host /dev/cu.usbmodem1411` where `cu.usbmodem1411` is your arduino's ID. Mine shows up as `cu.usbmodem1411` so my guess is yours will be similar.

The browser will automatically open and your flash file will be served. Pressing button 1 will play your timeline. Pressing button 2 will play the timeline backwards.

Sure it's a lot of work, but when you're done you've got an Arduino communicating with Flash via a NodeJS Socket server and a serial monitor. #winning


