import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { withRouter } from "next/router";
import Router from "next/router";
import fetch from "isomorphic-fetch";
import Filter_Select from "../components/small_components/Filter_Select.js";
import Client_List from "../components/small_components/Client_List.js";
import Client_Details_View from "../components/small_components/Client_Details_View.js";
import { ensure_loggedin } from "../components/utils/auth.js";

import Main_Layout from "../layouts/Main_Layout.js";
import {
  set_clients,
  set_selected_client, set_updated_client
} from "../redux/actions/clients_actions.js";
import API from "../components/API.js";

/* import clients detalis context */
const User_Context = React.createContext("light");

class Account_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients_filter: ["Name", "Project"]
    };
    this.onFilterClients = this.onFilterClients.bind(this);
    this.onClientSelect = this.onClientSelect.bind(this);
    this.onUpdatedClient = this.onUpdatedClient.bind(this)
  }

  static async getInitialProps(ctx) {
    ensure_loggedin(ctx);
    const { query, store } = ctx;
    // const state = store.getState();

    return {};
  }

  onFilterClients(e) {
    console.log(e);
    console.log("onFilterClients");
  }

  onClientSelect(client) {
    console.log("onClientSelect");
    console.log(client);
    this.props.dispatch(set_selected_client(client));
  }
  onUpdatedClient(client){
    console.log({client})
    this.props.dispatch(set_updated_client(client));
    this.props.dispatch(set_selected_client(client));

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
              clients={this.props.clients.clients}
            />
          </div>
          <div className="col-sm-8">
            <User_Context.Provider value>
              <Client_Details_View
                updatedClient={this.onUpdatedClient}
                csrf={this.props.meta.csrf}
                client={this.props.clients.selected_client}
              />
            </User_Context.Provider>
          </div>
        </div>
      </Main_Layout>
    );
  }
}

function mapStateToProps(state) {
  const {} = state;
  return state;
}

export default connect(mapStateToProps)(withRouter(Account_Profile));
