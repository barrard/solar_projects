import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { withRouter } from "next/router";
import Router from "next/router";
import fetch from "isomorphic-fetch";


import { ensure_loggedin } from "../components/utils/auth.js";

import Main_Layout from "../layouts/Main_Layout.js";
class Account_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getInitialProps(ctx) {
    ensure_loggedin(ctx);
    // console.log({ctx})
    const { query, store } = ctx;
    const state = store.getState();
    // console.log(state)
    const API_SERVER = 'http://localhost:3000';
    // console.log({ API_SERVER });
    // console.log(query);
    // // log(`${API_SERVER}/crowdsale/get_campaign/${crowdsale_id}`)
    let client = await fetch(`
    ${API_SERVER}/client/${query.client_id}
    `);
    // console.log({client})
    // let campaign_view_data = await campaign.json();
    // const campaign_owner_data = await fetch(`
    // ${API_SERVER}/user/get_campaign_owner/${campaign_view_data.user_id}
    // `);
    // console.log("campaign_owner_data");
    // const campaign_owner = await campaign_owner_data.json();

    // console.log({ campaign_view_data, campaign_owner });

    return {  client_id:query.client_id  };
  }

  render() {
    // console.log(this.props)
    return (
      <Main_Layout>
  <h1>{this.props.client_id}</h1>
      </Main_Layout>
    );
  }
}

function mapStateToProps(state) {
  const {  } = state;
  return {  };
}

export default connect(mapStateToProps)(withRouter(Account_Profile));
