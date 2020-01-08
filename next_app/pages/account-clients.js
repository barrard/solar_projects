import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { withRouter } from "next/router";
import Router from "next/router";
import fetch from "isomorphic-fetch";
import Filter_Select from "../components/small_components/Filter_Select.js";
import Client_List from "../components/small_components/Client_List.js";
import Client_Details_View from '../components/small_components/Client_Details_View.js'
import { ensure_loggedin } from "../components/utils/auth.js";

import Main_Layout from "../layouts/Main_Layout.js";
import { set_clients, set_selected_client } from "../redux/actions/clients_actions.js";
import API from '../components/API.js'
class Account_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients_filter: ["Name", "Project"]
    };
    this.onFilterClients = this.onFilterClients.bind(this);
    this.onClientSelect = this.onClientSelect.bind(this);
  }

  static async getInitialProps(ctx) {
    ensure_loggedin(ctx);
    const { query, store } = ctx;
    // const state = store.getState();
    let clients = await API.get_clients(ctx);
    store.dispatch(set_clients(clients))
    return {};
  }

  onFilterClients(e) {
    console.log(e);
    console.log("onFilterClients");
  }

  onClientSelect(client) {
    console.log("onClientSelect");
    console.log(client)
    this.props.dispatch(set_selected_client(client))
  }
  render() {
    // console.log("```````````````");
    // console.log(this.props.state.clients.clients);
    // console.log("```````````````");
    return (
      <Main_Layout>
        {/* sort by row, with selector */}
        <div className="row ">
          <div className="col-sm-4 flex_center">
            <Filter_Select
              onSelect={this.onFilterClients}
              data={this.state.clients_filter}
              id={"clientFilterSelect"}
              label={"Filter By"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 ">
            <Client_List
              onClientSelect={this.onClientSelect}
              clients={this.props.state.clients.clients}
            />
          </div>
          <div className='col-sm-8'>
            <Client_Details_View client={this.props.state.clients.selected_client}/>
          </div>
        </div>
      </Main_Layout>
    );
  }
}

function mapStateToProps(state) {
  const {} = state;
  return { state };
}

export default connect(mapStateToProps)(withRouter(Account_Profile));
