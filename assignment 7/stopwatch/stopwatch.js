let startTime = 0;
let elapsedTime = 0;
let intervalId = null;
let running = false;

// Get the current date
const today = new Date();

// Format the date to "yyyy-MM-dd" format
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

// Set the date picker value to the formatted date
document.getElementById('datePicker').value = formattedDate;

const timerElement = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

async function startTimer() {
  if (!running) {
    if (elapsedTime === 0) {
        startTime = new Date().getTime();
    }
    running = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    await updateTimerWithAsync();
  }
}

function stopTimer() {
  if (running) {
    clearInterval(intervalId);
    elapsedTime = new Date().getTime() - startTime;
    running = false;
    startButton.disabled = false;
    stopButton.disabled = true;
  }
}

function resetTimer() {
  clearInterval(intervalId);
  running = false;
  elapsedTime = 0;
  timerElement.innerText = "00:00:00";
  startButton.disabled = false;
  stopButton.disabled = true;
}

async function updateTimerWithAsync() {
  while (running) {
    const currentTime = new Date().getTime();
    const elapsed =  currentTime - startTime;
    const hours = String(Math.floor(elapsed / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((elapsed % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, '0');
    timerElement.innerText = `${hours}:${minutes}:${seconds}`;
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
  }
}

// // Global variables
// let startTime = 0;
// let interval = null;

// // Get the current date
// const today = new Date();

// // Set the date picker value to the current date
// document.getElementById('date-picker').value = today.toLocaleDateString();

// // Start the stopwatch
// async function startStopwatch() {
//   // Start the timer
//   startTime = new Date().getTime();
//   interval = setInterval(updateStopwatch, 1000);
// }

// // Stop the stopwatch
// async function stopStopwatch() {
//   // Clear the interval
//   clearInterval(interval);
// }

// // Reset the stopwatch
// async function resetStopwatch() {
//   // Reset the start time
//   startTime = 0;

//   // Update the stopwatch display
//   updateStopwatch();
// }

// // Update the stopwatch display
// async function updateStopwatch() {
//   // Calculate the elapsed time
//   const elapsedTime = new Date().getTime() - startTime;

//   // Convert the elapsed time to seconds
//   const seconds = elapsedTime / 1000;

//   // Format the seconds to HH:MM:SS format
//   const formattedTime = `${seconds.toFixed(0).padStart(2, '0')}:${(seconds % 60).toFixed(0).padStart(2, '0')}:${(seconds % 1).toFixed(2).padStart(2, '0')}`;

//   // Update the stopwatch display
//   document.getElementById('stopwatch').textContent = formattedTime;
// }

// document.getElementById('stopwatch').textContent = '00:00:00';

// // Add event listeners to the buttons
// document.getElementById('start-button').addEventListener('click', startStopwatch);
// document.getElementById('stop-button').addEventListener('click', stopStopwatch);
// document.getElementById('reset-button').addEventListener('click', resetStopwatch);

// // Update the stopwatch display initially
// updateStopwatch();
