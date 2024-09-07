/**
 * A timer for measuring elapsed time.
 */
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

  /**
   * Handles document click event to focus the start button.
   * @private
   */
  handleDocumentClick() {
    this.startButton.focus()
  }

  /**
   * Sets up the event listeners for the timer.
   * @private
   */
  setupEventListeners() {
    this.startButton.addEventListener('click', this.startStopTimer.bind(this))
    this.resetButton.addEventListener('click', this.resetTimes.bind(this))
  }

  /**
   * Starts or stops the timer based on its current state.
   */
  startStopTimer() {
    if (this.isRunning) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  /**
   * Starts the timer and updates the UI.
   * @private
   */
  startTimer() {
    if (this.isRunning) return // Prevent multiple intervals
    this.startTime = Date.now()
    this.timerInterval = setInterval(this.updateTimer.bind(this), 1)
    this.isRunning = true
    this.updateButtonLabel('Stop')
  }

  /**
   * Stops the timer, records the elapsed time, and updates the UI.
   * @param {boolean} [keyUpDelay=false] - Whether to record the time or not.
   */
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

  /**
   * Updates the timer display with the current elapsed time.
   * @private
   */
  updateTimer() {
    this.timerDisplay.textContent = this.formatTime(Date.now() - this.startTime)
  }

  /**
   * Calculates and updates the average time.
   * @private
   */
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

  /**
   * Formats the elapsed time into a string with minutes, seconds, and milliseconds.
   * @param {number} elapsedTime - The elapsed time in milliseconds.
   * @returns {string} - The formatted time string.
   * @private
   */
  formatTime(elapsedTime) {
    const minutes = Math.floor(elapsedTime / 60000).toString().padStart(2, '0')
    const seconds = Math.floor((elapsedTime % 60000) / 1000).toString().padStart(2, '0')
    const milliseconds = (elapsedTime % 1000).toString().padStart(3, '0')
    return `${minutes}:${seconds}:${milliseconds}`
  }

  /**
   * Records the elapsed time by appending it to the recorded times list.
   * @param {number} elapsedTime - The elapsed time in milliseconds.
   * @private
   */
  recordElapsedTime(elapsedTime) {
    const listItem = document.createElement('li')
    listItem.textContent = this.formatTime(elapsedTime)
    this.recordedTimesList.prepend(listItem)
  }

  /**
   * Updates the label of the start button.
   * @param {string} label - The new label for the button.
   * @private
   */
  updateButtonLabel(label) {
    this.startButton.textContent = label
    this.startButton.focus()
  }

  /**
   * Resets the recorded times and clears the display and localStorage.
   */
  resetTimes() {
    this.stopTimer()
    this.recordedTimesList.innerHTML = ''
    this.updateAverageTime()
    this.timerDisplay.textContent = '00:00:000'
    localStorage.removeItem('recordedTimes') // Clear saved times
  }

  /**
   * Saves the recorded times to localStorage.
   */
  saveTimesToStorage() {
    const times = Array.from(this.recordedTimesList.children).map((li) => li.textContent)
    localStorage.setItem('recordedTimes', JSON.stringify(times))
  }

  /**
   * Loads the recorded times from localStorage.
   */
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