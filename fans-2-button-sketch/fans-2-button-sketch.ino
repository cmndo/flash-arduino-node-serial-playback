/*
  Button

 Turns on and off a light emitting diode(LED) connected to digital
 pin 13, when pressing a pushbutton attached to pin 2.


 The circuit:
 * LED attached from pin 13 to ground
 * pushbutton attached to pin 2 from +5V
 * 10K resistor attached to pin 2 from ground

 * Note: on most Arduinos there is already an LED on the board
 attached to pin 13.


 created 2005
 by DojoDave <http://www.0j0.org>
 modified 30 Aug 2011
 by Tom Igoe

 This example code is in the public domain.

 http://www.arduino.cc/en/Tutorial/Button
 */

// constants won't change. They're used here to
// set pin numbers:
const int buttonPin = 2;     // the number of the pushbutton pin
const int ledPin =  9;      // the number of the LED pin

const int buttonPin2 = 4;
const int ledPin2 = 10;

// variables will change:
int buttonState = 0;         // variable for reading the pushbutton status
int buttonState2 = 0;

int buttonDown = 0;
int buttonDown2 = 0;

String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete

void setup() {
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);

  // initialize the LED pin as an output:
  pinMode(ledPin2, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin2, INPUT);

  Serial.begin(9600);

  // reserve 200 bytes for the inputString:
  inputString.reserve(200);
}
/*

    // turn LED off:
    digitalWrite(ledPin, LOW);

  // turn LED on:
    digitalWrite(ledPin, HIGH);


*/
void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);
  buttonState2 = digitalRead(buttonPin2);

  if (buttonState == HIGH) {
    if(buttonDown == 0){
      buttonDown = 1;
      Serial.print("Button^1\n");
      //delay(3);
    }
  } else {
    if(buttonDown == 1){
      buttonDown = 0;
    }
  }


  //button 2 pushed
  if (buttonState2 == HIGH) {
    if(buttonDown2 == 0){
      buttonDown2 = 1;
      Serial.print("Button^2\n");      
      //delay(3);
    }
  } else {
    if(buttonDown2 == 1){
      buttonDown2 = 0;
    }
  }

  serialEvent(); //call the function
  // print the string when a newline arrives:
  if (stringComplete) {
    if(inputString == "green") {
      digitalWrite(ledPin, HIGH);
      delay(50);
      digitalWrite(ledPin, LOW);
      delay(50);
      digitalWrite(ledPin, HIGH);
      delay(50);
      digitalWrite(ledPin, LOW);
      delay(50);
      digitalWrite(ledPin, HIGH);
      delay(50);
      digitalWrite(ledPin, LOW);
    }
    // clear the string:
    inputString = "";
    stringComplete = false;
  }
}


/*
  SerialEvent occurs whenever a new data comes in the
 hardware serial RX.  This routine is run between each
 time loop() runs, so using delay inside loop can delay
 response.  Multiple bytes of data may be available.
 */
void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read();
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    if (inChar == '\r') {
      stringComplete = true;
    }
  }
}
