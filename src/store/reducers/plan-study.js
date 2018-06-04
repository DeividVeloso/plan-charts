import { 
  REQUESTED_PLAN_STUDY,
  REJECTED_PLAN_STUDY 
} 
from '../actions/actionTypes';

const initialState = {
  data: [],
  error: false,
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case REQUESTED_PLAN_STUDY: { 
      return {
        ...state,
        loading: true
      }
    }
    case REJECTED_PLAN_STUDY: {
      return {
        ...state,
        loading: false,
        error: true
      }
    }
    default:
      return state;
  } 
}

