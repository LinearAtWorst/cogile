export function startGame() {
  return {
    type: 'STARTED_GAME',
    payload: 'STARTED_GAME'
  }
}

export function endGame() {
  return {
    type: 'ENDED_GAME',
    payload: 'ENDED_GAME'
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

export function updateProgresses(allCode) {
  return {
    type: 'UPDATE_PROGRESSES',
    payload: allCode
  }
}