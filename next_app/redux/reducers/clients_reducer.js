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

    case 'SET_UPDATED_CLIENT': {
      let clients = [...state.clients]
      console.log({clients})
      const client_index = clients.findIndex((client)=> {
        console.log({client})
        return client._id == action.updated_client._id
      })
      console.log({client_index})
      console.log(action.updated_client)
      clients[client_index] = action.updated_client
      return {...state, clients}

    }

    default:
      return state;
  }
};
