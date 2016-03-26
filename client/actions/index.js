import jwtDecode from 'jwt-decode';

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

export function syncPlayersStatuses(status) {
  return {
    type: 'UPDATE_PROGRESSES',
    payload: status
  }
}

export function storeUsername(username) {
  return {
    type: 'STORE_USERNAME',
    payload: username
  }
}

export function storeGameId(gameId) {
  return {
    type: 'STORE_GAMEID',
    payload: gameId
  }
}

export function getUsername() {
  var foundUsername = null;
  var decoded;
  if(!global.window.localStorage.getItem('com.nimblecode')){
    foundUsername = 'guest';
  } else {
    decoded = jwtDecode(global.window.localStorage.getItem('com.nimblecode'));
    foundUsername = decoded.username;
  }

  return {
    type: 'GET_USERNAME',
    payload: foundUsername
  }
}

export function smashUser() {
  global.window.localStorage.removeItem('com.nimblecode');

  return {
    type: 'SMASH_USER'
  }
}

export function changeLevel(level) {
  return {
    type: 'CHANGE_LEVEL',
    payload: level
  }
}
