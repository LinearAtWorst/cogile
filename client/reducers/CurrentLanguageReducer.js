const INITIAL_STATE = {language: "js"};

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'CHANGE_LANGUAGE':
      return action.payload;
  }

  return state;
}