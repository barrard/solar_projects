import { toastr } from 'react-redux-toastr';
import fetch from "isomorphic-fetch";

import {is_loading} from '../redux/actions/meta_actions.js'

import {
  new_client,
  client_model
} from "../components/models/add_client_model.js";

const API_SERVER = "http://localhost:3000";

export default {
  add_client, get_clients, save_client
};

async function save_client(client, csrf){
  let _csrf = csrf
  const post_data = {...client, _csrf }
    try {
      console.log({post_data})
      let resp = await fetch(`/client/${client._id}`, PUT(post_data))
      let json = await resp.json()
      return json
    } catch (err) {
      return handle_error(err)
    }
}

async function get_clients(ctx){
  let http =  await fetch(
    `${API_SERVER}/client/clients`,
    ctx.req
      ? {
          withCredentials: true,
          headers: {
            cookie: ctx.req.headers.cookie
          }
        }
      : {}
  );
  http = await http.json();

  return http

}

async function add_client(data, props) {
  let {meta, dispatch} = props
  let resp;

  try {

    const _csrf = meta.csrf;
    const client = new_client(data);
    event.preventDefault();
    dispatch(is_loading(true))
    resp = await fetch("/client/add_client", POST({ ...client, _csrf }));
    resp = await resp.json()

    if(resp.err)throw resp.msg
    dispatch(is_loading(false))

    toastr.success(`New Client Added`, `${resp.firstname} ${resp.lastname} `)
    return resp;
  } catch (err) {
    dispatch(is_loading(false))

    return handle_error(err, resp)
  }
}



/* Helper methods */

const handle_error = (err, resp) =>{
  console.log("err");
  console.log(err);
  if(resp)
    toastr.error('Error Message', `${resp.msg}`)

  return resp;
}
const POST = (data) =>{
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify( data)
  }
}

const PUT = (data) =>{
  return {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify( data)
  }
}