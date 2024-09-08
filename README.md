# Rubik's Cube Timer

A timer designed to measure and record the time it takes to solve a Rubik's Cube. This application allows users to track individual solve times, calculate an average solve time, and reset the timer for future solves.

## Features

- **Start/Stop Timer**: Start and stop the timer with a button click. The elapsed time is displayed in minutes, seconds, and milliseconds.
- **Recorded Times**: After stopping the timer, the elapsed time is recorded and displayed in a list of past solve times.
- **Average Time Calculation**: The app automatically calculates the average time from all recorded solves and updates the displayed average.
- **Solve Count**: Tracks and displays the total number of recorded solves.
- **Reset Button**: Clears all recorded times and resets the timer display.
- **LocalStorage Integration**: All recorded times are saved in the browser’s localStorage and reloaded when the app is reopened.

## How It Works

- The user clicks the "Start" button to begin timing the solve.
- Clicking "Stop" records the time, adds it to the list of recorded times, and updates the average time and solve count.
- The "Reset" button clears all recorded times, resets the timer, and clears localStorage.
- Times are saved in localStorage so they persist between sessions.

## Project Structure

- **index.html**: Contains the structure of the app.
- **css/style.css**: Styles the timer and recorded times list.
- **js/script.js**: Contains the logic for starting, stopping, resetting the timer, calculating the average, and saving/loading times from localStorage.

## Key Classes and Methods

### Timer Class

This class handles the entire functionality of the app.

- `startStopTimer()`: Starts or stops the timer depending on its current state.
- `startTimer()`: Begins the timer and updates the UI.
- `stopTimer()`: Stops the timer, records the time, and updates the average time.
- `updateTimer()`: Continuously updates the time display while the timer is running.
- `resetTimes()`: Resets the recorded times and clears localStorage.
- `saveTimesToStorage()`: Saves the recorded times to localStorage.
- `loadTimesFromStorage()`: Loads recorded times from localStorage on page load.

## Future Enhancements

- Add functionality to display the best solve time.
- Provide options for customizing the timer, such as split time tracking.
- Enhance the UI for better mobile responsiveness.

## How to Use

1. Clone or download the repository.
2. Open `index.html` in your browser.
3. Press the "Start" button to begin timing.
4. Press the "Stop" button to stop the timer and record the solve.
5. The average time and number of solves will update automatically.
6. Use the "Reset" button to clear all data and start over.


# Development process

## Introduction

The Rubik's Cube Timer project was developed with the goal of creating a simple, intuitive tool to help track and record solving times for Rubik's Cube enthusiasts. The process involved designing a clean user interface, implementing core timing functionalities using JavaScript, and ensuring that the timer accurately records and displays solve times. This section outlines the key steps and decisions made throughout the development of the project, from initial planning to final implementation.

### Prompt

I want to buil an app that record a timer for solving a rubiks cube, i need the basic structure that shows an element in html showing the time in the following format: 00:00:000.

### AI Response

```html
// index.html
<!DOCTYPE html>
<html>
<head>
    <title>Rubik's Cube Timer</title>
</head>
<body>
    <div id="timer">00:00.000</div>
</body>
</html>
```
```js
<script>
    let timerInterval;
    let startTime;

    function startTimer() {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function updateTimer() {
        const elapsedTime = new Date() - startTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const milliseconds = elapsedTime % 1000;

        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;

        document.getElementById('timer').textContent = formattedTime;
    }
</script>
```

### Prompt

Implement a start button.

### AI Response

```html
<!DOCTYPE html>
<html>
<head>
    <title>Rubik's Cube Timer</title>
</head>
<body>
    <div id="timer">00:00.000</div>
    <button id="startButton">Start</button>
</body>
</html>
```
```js
<script>
    let timerInterval;
    let startTime;

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startTimer);

    function startTimer() {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1);
        startButton.disabled = true; // Disable the button after starting
    }

    // ... rest of your code ...
</script>
```

### Prompt

Ok, now i need to stop the counter, i want to change the content of button from "start" to "stop" when counter starts and make it stop when pressed, chang back againd the button to start.

### AI Response

```js
<script>
    let timerInterval;
    let startTime;

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startTimer);

    function startTimer() {
        if (timerInterval) {
            stopTimer();
        } else {
            startTime = new Date();
            timerInterval = setInterval(updateTimer, 1);
            startButton.textContent = "Stop";
        }
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        startButton.textContent = "Start";
    }

    function updateTimer() {
        // ... rest of your updateTimer function ...
    }
</script>
```

### Prompt

Very good! Now create a event listener that capture the spacebar on keyboard and use it to activate the start/stop button.

### AI Response

```js

class Timer {
  constructor() {
    // ... rest of your constructor code ...

    // Add event listeners for spacebar keydown and keyup
    document.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        this.startTimer();
      }
    });
    document.addEventListener('keyup', (event) => {
      if (event.key === ' ') {
        this.stopTimer();
      }
    });
  }

  /**
   * Starts the timer.
   */
  startTimer() {
    if (!this.timerInterval) {
      this.startTime = new Date();
      this.timerInterval = setInterval(this.updateTimer.bind(this), 1);
      this.startButton.textContent = "Stop";
    }
  }

  // ... rest of your methods ...
}

// Create a new Timer instance
const timer = new Timer();
```

**Note:** After some test trying to ake spacebar as a trigger to start/stop the timer, i found that the timer was not working as expected. After some research, the best solution was make the focus on the start button all the time and then the spacebar key trigger the start/stop button. So the event listener for spacebar keydown and keyup was removed and the focus was added to the start button.

```js
this.startButton.focus()
```

### Prompt

Ok. Now we have the timer implemented, lets improve the html with some more elements.

### AI Response

```html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rubiks cube timer</title>
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <div class="timer-container">
    <div class="recorded-times">
      <h2 class="recorded-times-title">Recorded Times</h2>
      <ul id="recordedTimes"></ul>
    </div>
    <div class="timer-info">
      <h1 class="timer-title">Rubik's Cube Timer</h1>
      <div id="timer">00:00:000</div>
      <button type="button" id="startButton">Start</button>
      
    </div>
    <div class="solve-info">
      <h2 class="solve-info-title">Solve info</h2>
      <div id="averageTime">
        <div class="avarage">Average Time: 00:00:000</div>
        <div class="solve-count">Solve number: 0</div>
      </div>
    </div>
  </div>
  <script src="js/script.js"></script>
</body>

</html>
```

### Prompt

Implemento a basic css for the html.

### AI Response

```css
html,
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  width: 100%;
  height: 100%;
}

.timer-container {
  display: flex;
  margin: 20px auto 0;
  border: 1px solid gray;
  border-radius: 4px;
  justify-content: space-between;
  width: 900px;
  height: 500px;
}

/* Display times section */
.recorded-times {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: rgb(245, 245, 245);
}

.recorded-times .recorded-times-title {
  text-align: center;
  margin: 0;
  padding: 10px;
  font-size: 1.6rem;
}

.recorded-times #recordedTimes {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  border-radius: 2px;
  overflow-y: auto;
  padding: 10px;
  margin: 15px;
  background-color: white;
}


/* Timer info section */
.timer-info {
  flex: 1;
  background-color: rgb(230, 230, 230);
}

.timer-info .timer-title {
  text-align: center;
  margin: 0;
  padding: 10px;
  font-size: 1.6rem;
}

.timer-info #timer {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 10px;
}

/* Solve info section */
.solve-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.solve-info .solve-info-title {
  text-align: center;
  margin: 0;
  padding: 10px;
  font-size: 1.6rem;
}

#recordedTimes {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

#recordedTimes li {
  margin-bottom: 5px;
}

#averageTime {
  font-size: 16px;
  flex-grow: 1;
  padding: 10px 20px;
}

#startButton, #resetButton {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4CAF50; /* Green */
  color: white;
  border: none;
  border-radius: 5px;
  width: 150px;
  cursor: pointer;
  display: block;
  margin: 10px auto;
  transition: background-color 0.2s ease-in-out;
}

#resetButton {
  background-color: #9e9e9e; /* Red */
}

#startButton:hover {
  background-color: #3e8e41; /* Darker green on hover */
}
```

### Prompt

Now i need the code reflect the changes that we made on front end.

### AI Response

```js

class Timer {
  constructor() {
    this.timerInterval = null
    this.startTime = null
    this.isRunning = false // Track if the timer is running
    this.spacebarPressed = false // Track spacebar press state

    this.startButton = document.getElementById('startButton')
    this.timerDisplay = document.getElementById('timer')
    this.recordedTimesList = document.getElementById('recordedTimes')
    this.resetButton = document.createElement('button')
    this.resetButton.textContent = 'Reset'
    this.resetButton.id = 'resetButton'
    this.resetButton.type = 'button'
    this.startButton.insertAdjacentElement('afterend', this.resetButton)

    document.addEventListener('click', this.handleDocumentClick.bind(this))
    this.startButton.focus()

    this.setupEventListeners()
    this.loadTimesFromStorage() // Load saved times from localStorage
  }

 
  handleDocumentClick() {
    this.startButton.focus()
  }

 
  setupEventListeners() {
    this.startButton.addEventListener('click', this.startStopTimer.bind(this))
    this.resetButton.addEventListener('click', this.resetTimes.bind(this))
  }
  startStopTimer() {
    if (this.isRunning) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }
  startTimer() {
    if (this.isRunning) return // Prevent multiple intervals
    this.startTime = Date.now()
    this.timerInterval = setInterval(this.updateTimer.bind(this), 1)
    this.isRunning = true
    this.updateButtonLabel('Stop')
  }

  stopTimer() {
    clearInterval(this.timerInterval)
    this.timerInterval = null
    this.isRunning = false
    this.updateButtonLabel('Start')

    const elapsedTime = Date.now() - this.startTime
    this.timerDisplay.textContent = this.formatTime(elapsedTime)
    this.recordElapsedTime(elapsedTime)
    this.updateAverageTime()
    this.saveTimesToStorage() // Save times to localStorage

    this.startButton.focus()
  }
  updateTimer() {
    this.timerDisplay.textContent = this.formatTime(Date.now() - this.startTime)
  }

  updateAverageTime() {
    let recordedTimes = Array.from(this.recordedTimesList.children).map((li) => {
      const [minutes, seconds, milliseconds] = li.textContent.split(':').map(Number)
      return minutes * 60000 + seconds * 1000 + milliseconds
    })

    
    const averageTime = recordedTimes.length
    ? recordedTimes.reduce((sum, time) => sum + time, 0) / recordedTimes.length
    : null
    
    const avarageTimeSection = document.getElementById('averageTime')
    const avarageTimeElement = avarageTimeSection.querySelector(".avarage")
    const solveCount = avarageTimeSection.querySelector(".solve-count")
    const lastFiveTimes = avarageTimeSection.querySelector(".last-five")
    
    avarageTimeElement.textContent = averageTime
    ? `Average Time: ${this.formatTime(Math.round(averageTime))}`
    : 'Average Time: N/A'
    
    solveCount.textContent = `Solve Count: ${this.recordedTimesList.children.length}`
  }

  formatTime(elapsedTime) {
    const minutes = Math.floor(elapsedTime / 60000).toString().padStart(2, '0')
    const seconds = Math.floor((elapsedTime % 60000) / 1000).toString().padStart(2, '0')
    const milliseconds = (elapsedTime % 1000).toString().padStart(3, '0')
    return `${minutes}:${seconds}:${milliseconds}`
  }

  recordElapsedTime(elapsedTime) {
    const listItem = document.createElement('li')
    listItem.textContent = this.formatTime(elapsedTime)
    this.recordedTimesList.prepend(listItem)
  }

  updateButtonLabel(label) {
    this.startButton.textContent = label
    this.startButton.focus()
  }

  resetTimes() {
    this.stopTimer()
    this.recordedTimesList.innerHTML = ''
    this.updateAverageTime()
    this.timerDisplay.textContent = '00:00:000'
    localStorage.removeItem('recordedTimes') // Clear saved times
  }

  saveTimesToStorage() {
    const times = Array.from(this.recordedTimesList.children).map((li) => li.textContent)
    localStorage.setItem('recordedTimes', JSON.stringify(times))
  }

  loadTimesFromStorage() {
    const savedTimes = JSON.parse(localStorage.getItem('recordedTimes')) || []
    savedTimes.forEach((time) => {
      const listItem = document.createElement('li')
      listItem.textContent = time
      this.recordedTimesList.appendChild(listItem)
    })
    this.updateAverageTime() // Recalculate the average after loading
  }
}

// Create a new Timer instance
const timer = new Timer()
```

### Prompt

Now document this code and make any change to fit the code into best practices.

**Note:** The documentation provide by the AI is on the each respective file.

