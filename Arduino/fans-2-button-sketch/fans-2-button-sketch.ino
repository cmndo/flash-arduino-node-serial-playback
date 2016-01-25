/*
  Push a button and send a string over serial.

  Buttons are on pins 2 and 4.
  LEDS are on pin 9 and pin 10.
*/


// set variables for button 1
const int buttonPin = 2;
const int ledPin =  9;
int buttonState = 0;
int buttonDown = 0;

//set variables for button 2
const int buttonPin2 = 4;
const int ledPin2 = 10;
int buttonState2 = 0;
int buttonDown2 = 0;


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

}
/*

    // turn LED off:
    digitalWrite(ledPin, LOW);

  // turn LED on:
    digitalWrite(ledPin, HIGH);


*/
void loop() {
  // Read the state of button 1 and if it hasn't been detected as pushed, trigger one Serial.print for Button^1
  buttonState = digitalRead(buttonPin);
  
  if (buttonState == HIGH) {
    if(buttonDown == 0){
      buttonDown = 1;
      Serial.print("Button^1\n");
      digitalWrite(ledPin, HIGH);
    }
  } else {
    if(buttonDown == 1){
      buttonDown = 0;
      digitalWrite(ledPin, LOW);
    }
  }


  // Read the state of button 2 and if it hasn't been detected as pushed, trigger one Serial.print for Button^2
  buttonState2 = digitalRead(buttonPin2);
  
  if (buttonState2 == HIGH) {
    if(buttonDown2 == 0){
      buttonDown2 = 1;
      Serial.print("Button^2\n");
      digitalWrite(ledPin2, HIGH); 
    }
  } else {
    if(buttonDown2 == 1){
      buttonDown2 = 0;
      digitalWrite(ledPin2, LOW);
    }
  }
}

