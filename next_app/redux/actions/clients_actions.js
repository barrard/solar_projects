




export function set_clients (clients){
  console.log('set_clients')
  return dispatch =>{
    dispatch({
      type:"SET_CLIENTS",
      clients
    })
  }
}


export function set_selected_client (client){
  return dispatch =>{
    dispatch({
      type:'SET_SELECTED_CLIENT',
      client

    })
  }
}


// export function register_success (payload) {
//   return {
//     type: REGISTER_ATTEMPT_SUCCESS,
//     payload
//   }
// }


// export function login_attempt (user){
//   const {email, password} = user;
//   return dispatch =>{
//     dispatch({
//       type:LOGIN_ATTEMPT,
//       username:email,
//       password

//     })
//   }
// }


// export function login_success (payload) {
//   return {
//     type: 'SET_USER',
//     user:payload
//   }
// }
