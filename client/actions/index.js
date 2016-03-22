export function startGame() {
  return {
    type: 'START_GAME',
    payload: 'START_GAME'
  }
}

export function endGame() {
  return {
    type: 'END_GAME',
    payload: 'END_GAME'
  }
}

export function startCountdown() {
  return {
    type: 'START_COUNTDOWN',
    payload: 'START_COUNTDOWN'
  }
}

export function leavePage() {
  return {
    type: 'LEAVE_PAGE'
  }
}

export function stopTimer() {
  return {
    type: 'STOP_TIMER',
    payload: 'STOP_TIMER'
  }
}

export function updateElapsedTime(time) {
  return {
    type: 'UPDATE_ELAPSED_TIME',
    payload: time
  }
}