const initialState = {
  queue: [],
  watched: [],
  error: null,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_NOTE_SUCCESS":
      return { ...state, error: null };
    case "CREATE_NOTE_FAIL":
    case "READ_NOTE_FAIL":
      return { ...state, error: action.payload };
    case "READ_NOTE_SUCCESS":
      return {
        ...state,
        queue: action.payload.queue,
        watched: action.payload.watched,
        error: null,
      };
    default:
      return state;
  }
};

export default noteReducer;
