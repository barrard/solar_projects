import { toastr } from 'react-redux-toastr';
import {is_loading} from '../redux/actions/meta_actions.js'

import {
  new_client,
  client_model
} from "../components/models/add_client_model.js";

export default {
  add_client
};

async function add_client(data, props) {
  let {meta, dispatch} = props
  let resp;

  try {

    const _csrf = meta.csrf;
    const client = new_client(data);
    event.preventDefault();
    dispatch(is_loading(true))
    resp = await fetch("/client/add_client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ ...client, _csrf })
    });
    resp = await resp.json()

    if(resp.err)throw resp.msg
    dispatch(is_loading(false))

    toastr.success(`New Client Added`, `${resp.firstname} ${resp.lastname} `)
    return resp;
  } catch (err) {
    dispatch(is_loading(false))
    console.log("err");
    console.log(err);
    toastr.error('Error Message', `${resp.msg}`)

    return resp;
  }
}
