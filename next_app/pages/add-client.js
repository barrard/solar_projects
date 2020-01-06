import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { withRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";

import API from "../components/API.js";

import { ensure_loggedin } from "../components/utils/auth.js";

import Alt_Layout from "../layouts/Alt_Layout.js";
import Add_Client_Form from "../components/forms/Add_Client_Form.js";
class Account_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new_client: {}
    };
    this.handle_input = this.handle_input.bind(this);
    this.handle_add_client = this.handle_add_client.bind(this);
  }
  static async getInitialProps(ctx) {
    ensure_loggedin(ctx);
    return {};
  }

  /* Get form input */
  handle_input(input, type) {
    this.setState({ [type]: input });
  }
  async handle_add_client(data) {
    let new_client = await API.add_client(data, this.props);
    console.log({ new_client });
    this.setState({ new_client });
  }
  render() {
    return (
      <Alt_Layout title="Add Client">
        <Add_Client_Form
          handle_input={this.handle_input}
          handle_add_client={this.handle_add_client}
        />
        {this.state.new_client.firstname && (
          <Go_To_New_Client_Link client={this.state.new_client} />
        )}
      </Alt_Layout>
    );
  }
}

function mapStateToProps(state) {
  const { user, meta } = state;
  return { user, meta };
}

export default connect(mapStateToProps)(withRouter(Account_Profile));

const Go_To_New_Client_Link = ({ client }) => {
  console.log({ client });
  return (
    <div onClick={()=>Router.push(`/account-clients/${client._id}`)} className="Go_To_New_Client_Link">
      {client.firstname} {client.lastname}

      <Forward_Symbol />
    </div>
  );
};

const Forward_Symbol = () => {
  return (
    <svg viewBox="0 0 10 10">
      <line
        stroke-linecap="round"
        x1="9"
        y1="5"
        x2="0"
        y2="-5"
        stroke="black"
      />
      <line
        stroke-linecap="round"
        x1="9"
        y1="5"
        x2="0"
        y2="15"
        stroke="black"
      />
    </svg>
  );
};
