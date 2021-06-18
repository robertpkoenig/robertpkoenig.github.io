// these constants won't change:
const int drumOne = A0;
const int drumTwo = A1;
const int drumThree = A2;
const int drumFour = A3;
const int drumFive = A4;
const int drumSix = A5;

const int threshold = 50;  // threshold value to decide when the detected sound is a knock or not

// these variables will change:
int drumOneReading = 0;    // variable to store the value read from the sensor pin
int drumOneTimeOut = 0;
int drumOneTrigger = 0; // this is set to one only when threshold is met, then reverts to zero

int drumTwoReading = 0;
int drumTwoTimeOut = 0;
int drumTwoTrigger = 0;

int drumThreeReading = 0;
int drumThreeTimeOut = 0;
int drumThreeTrigger = 0;

int drumFourReading = 0;
int drumFourTimeOut = 0;
int drumFourTrigger = 0;

int drumFiveReading = 0;
int drumFiveTimeOut = 0;
int drumFiveTrigger = 0;

int drumSixReading = 0;
int drumSixTimeOut = 0;
int drumSixTrigger = 0;

const int metronomeControlPin = 4;
const int metronomeLightPin =  8;

int metronomeControlReading = LOW;
int metronomeControlPrevReading = LOW;
boolean metronomeState = 0;

const int modeControlPin = 13;
int modePinReading = LOW;
int modePinPrevReading = LOW;
int modeNumber = 0;
const int numModes = 3;
const int modeOneLight = 9;
const int modeTwoLight = 10;
const int modeThreeLight = 11;
const int modeFourLight = 12;

const int undoPin = 2;
int undoReading = LOW;
int undoPrevReading = LOW;

const int resetPin = 3;
int resetReading = LOW;
int resetPrevReading = LOW;

boolean newInfo = false;

void setup() {
  Serial.begin(9600);
  
  pinMode(undoPin, INPUT);
  pinMode(resetPin, INPUT);
  
  pinMode(metronomeControlPin, INPUT);
  pinMode(metronomeLightPin, OUTPUT);

  pinMode(modeControlPin, INPUT);
  pinMode(modeOneLight, OUTPUT);
  pinMode(modeTwoLight, OUTPUT);
  pinMode(modeThreeLight, OUTPUT);
  pinMode(modeFourLight, OUTPUT);

  digitalWrite(modeOneLight, HIGH);// use the serial port
}

void loop() {
  // read the sensor and store it in the variable sensorReading:
  drumOneReading = analogRead(drumOne);
  drumTwoReading = analogRead(drumTwo);
  drumThreeReading = analogRead(drumThree);
  drumFourReading = analogRead(drumFour);
  drumFiveReading = analogRead(drumFive);
  drumSixReading = analogRead(drumSix);

  if (drumOneTimeOut > 0) drumOneTimeOut--;
  if (drumTwoTimeOut > 0) drumTwoTimeOut--;
  if (drumThreeTimeOut > 0) drumThreeTimeOut--;
  if (drumFourTimeOut > 0) drumFourTimeOut--;
  if (drumFiveTimeOut > 0) drumFiveTimeOut--;
  if (drumSixTimeOut > 0) drumSixTimeOut--;

  // if the sensor reading is greater than the threshold:
  if (drumOneReading >= threshold && drumOneTimeOut == 0) {
    drumOneTrigger = 1;
    drumOneTimeOut = 10;
    newInfo = true;
  }

  if (drumTwoReading >= threshold && drumTwoTimeOut == 0) {
    drumTwoTrigger = 1;
    drumTwoTimeOut = 10;
    newInfo = true;
  }

  if (drumThreeReading >= threshold && drumThreeTimeOut == 0) {
    drumThreeTrigger = 1;
    drumThreeTimeOut = 10;
    newInfo = true;
  }

  if (drumFourReading >= threshold && drumFourTimeOut == 0) {
    drumFourTrigger = 1;
    drumFourTimeOut = 10;
    newInfo = true;
  }

  if (drumFiveReading >= threshold && drumFiveTimeOut == 0) {
    drumFiveTrigger = 1;
    drumFiveTimeOut = 10;
    newInfo = true;
  }

  if (drumSixReading >= threshold && drumSixTimeOut == 0) {
    drumSixTrigger = 1;
    drumSixTimeOut = 10;
    newInfo = true;
  }

  metronomeControlReading = digitalRead(metronomeControlPin);

  if (metronomeControlReading == HIGH && metronomeControlPrevReading == LOW) {
    newInfo = true;
    if (metronomeState == 1) {
      metronomeState = 0;
      digitalWrite(metronomeLightPin, LOW);
    }
    else {
      metronomeState = 1;
      digitalWrite(metronomeLightPin, HIGH);
    }
  }

  modePinReading = digitalRead(modeControlPin);

  if (modePinReading == HIGH && modePinPrevReading == LOW) {
      newInfo = true;
      digitalWrite(modeOneLight, LOW);
      digitalWrite(modeTwoLight, LOW);
      digitalWrite(modeThreeLight, LOW);
      digitalWrite(modeFourLight, LOW);
    
      modeNumber += 1;
      modeNumber %= numModes + 1;
      if (modeNumber == 0) digitalWrite(modeOneLight, HIGH);
      if (modeNumber == 1) digitalWrite(modeTwoLight, HIGH);
      if (modeNumber == 2) digitalWrite(modeThreeLight, HIGH);
      if (modeNumber == 3) digitalWrite(modeFourLight, HIGH);
  }

  undoReading = digitalRead(undoPin);

  if (undoReading == HIGH && undoPrevReading == LOW) {
    newInfo = true;
  }

  resetReading = digitalRead(resetPin);

  if (resetReading == HIGH && resetPrevReading == LOW) {
    newInfo = true;
  }

  metronomeControlPrevReading = metronomeControlReading;
  modePinPrevReading = modePinReading;
  undoPrevReading = undoReading;
  resetPrevReading = resetReading;

  
  if (newInfo) {
    
    String output = "";
    output = output + drumOneTrigger + ":" + drumTwoTrigger + ":" + drumThreeTrigger
              + ":" + drumFourTrigger + ":" + drumFiveTrigger + ":" + drumSixTrigger
              + ":" + metronomeControlReading + ":" + undoReading + ":" + resetReading
              + ":" + modePinReading;
    Serial.println(output);
    
    drumOneTrigger = 0;
    drumTwoTrigger = 0;
    drumThreeTrigger = 0;
    drumFourTrigger = 0;
    drumFiveTrigger = 0;
    drumSixTrigger = 0;
    
    newInfo = false;
    
  }
  
  delay(10);  // delay to avoid overloading the serial port buffer
}
