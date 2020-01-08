// import * as meta_actions from "../actions/meta_actions.js";

const initial_state = {
  clients:[],
  selected_client:{}
}

export default (state = initial_state, action) => {
  switch (action.type) {
    case "SET_CLIENTS":{
      return{
        ...state, clients:action.clients
      }
    }
    case "SET_SELECTED_CLIENT": {
      return { ...state, selected_client: action.client };
    }

    // case 'GET_CSRF': {
    //   const { csrf } = state;
    //   return { csrf };
    // }

    default:
      return state;
  }
};
