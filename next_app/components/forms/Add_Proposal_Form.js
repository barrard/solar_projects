import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  update_new_proposal,
  set_address_same_as_client
} from "../../redux/actions/proposals_actions.js";
import { set_selected_client } from "../../redux/actions/clients_actions.js";
import { new_proposal, proposal_model } from "../models/add_proposal_model.js";
import Loading_Button from "../small_components/Loading_button.js";
import Filter_Select from "../small_components/Filter_Select.js";

class Add_Proposal_Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handle_input = this.handle_input.bind(this);
    this.onClientSelect = this.onClientSelect.bind(this);
    this.get_client = this.get_client.bind(this);
    this.handle_add_proposal = this.handle_add_proposal.bind(this);
  }

  handle_input(prop, value) {
    // this.setState({ [type]: input });
    // this.props.handle_input(input, type);
    this.props.dispatch(update_new_proposal(prop, value));
  }

  handle_add_proposal(e) {
    console.log("handle_add_proposal!!");
    e.preventDefault();
    console.log(this.props.proposals.new_proposal);
    console.log(this.props.proposals);
    this.props.handle_add_proposal(this.props.proposals.new_proposal);
  }
  onClientSelect(e) {
    let client = e.target.value;
    console.log(client);
  }
  get_client_data(prop) {
    let client_index = this.props.clients.clients.findIndex(
      client => client._id == this.props.proposals.new_proposal.client
    );
    let client = this.props.clients.clients[client_index];
    return client[prop];
  }
  get_client() {
    let client_index = this.props.clients.clients.findIndex(
      client => client._id == this.props.proposals.new_proposal.client
    );
    let client = this.props.clients.clients[client_index];
    console.log({ client_index, client });
    return client;
  }

  render() {
    console.log(this.props.proposals);
    const { is_loading } = this.props.meta;
    const { address_same_as_client } = this.props.proposals.new_proposal;
    return (
      <div className="container">
        <form onSubmit={e => this.handle_add_proposal(e)}>
          <div className="form-group row">
            <Label>Client</Label>
            <div className="col-6">
              <select
                onChange={e => {
                  this.handle_input("client", e.target.value);
                  this.props.dispatch(set_selected_client(this.get_client()));
                }}
                className="form-control"
                name=""
                id=""
                value={this.props.proposals.new_proposal.client}
              >
                <option disabled value="Select Client">
                  Select Client
                </option>
                {this.props.clients.clients.map(client => {
                  return (
                    <option key={client._id} value={client._id}>
                      {client.firstname} {client.lastname}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {this.props.proposals.new_proposal.client !== "Select Client" && (
            <div className="form-group row">
              <Label>Address Same As Client</Label>
              <div className="col-6">
                <input
                  onChange={e => {
                    this.handle_input(
                      "address_same_as_client",
                      !address_same_as_client
                    );
                    this.props.dispatch(
                      set_address_same_as_client(
                        !address_same_as_client,
                        this.get_client()
                      )
                    );
                  }}
                  type="checkbox"
                  name="address_same_as_client"
                  checked={address_same_as_client}
                />
              </div>
            </div>
          )}

          {/* ADDRESS OR CLIENT ADDRESS */}

          <div className="form-group row">
            <Label>Street Address</Label>
            <div className="col-6">
              <Input
                disabled={
                  this.props.proposals.new_proposal.address_same_as_client
                }
                handle_input={this.handle_input}
                type="text"
                name="street_address"
                value={this.props.proposals.new_proposal.street_address}
              />
            </div>
          </div>

          <div className="form-group row">
            <Label>City</Label>
            <div className="col-6">
              <Input
                disabled={
                  this.props.proposals.new_proposal.address_same_as_client
                }
                handle_input={this.handle_input}
                type="text"
                name="city"
                value={this.props.proposals.new_proposal.city}
              />
            </div>
          </div>
          <div className="form-group row">
            <Label>State</Label>
            <div className="col-6">
              <Input
                disabled={
                  this.props.proposals.new_proposal.address_same_as_client
                }
                handle_input={this.handle_input}
                type="text"
                name="state"
                value={this.props.proposals.new_proposal.state}
              />
            </div>
          </div>

          <div className="form-group row">
            <Label>Zip</Label>
            <div className="col-6">
              <Input
                disabled={
                  this.props.proposals.new_proposal.address_same_as_client
                }
                handle_input={this.handle_input}
                type="text"
                name="zip"
                value={this.props.proposals.new_proposal.zip}
              />
            </div>
          </div>

          <div className="form-group row">
            <Label>Email address</Label>
            <div className="col-6">
              <Input
                disabled={
                  this.props.proposals.new_proposal.address_same_as_client
                }
                handle_input={this.handle_input}
                type="email"
                name="email"
                value={this.props.proposals.new_proposal.email}
              />
            </div>
          </div>

          <div className="form-group row">
            <Label>Phone Number</Label>
            <div className="col-6">
              <Input
                disabled={
                  this.props.proposals.new_proposal.address_same_as_client
                }
                handle_input={this.handle_input}
                type="phone"
                name="phone"
                value={this.props.proposals.new_proposal.phone}
              />
            </div>
          </div>

          <div className="form-group row">
            <Label>Type</Label>
            <div className="col-6">
              <select
                onChange={e => {
                  this.handle_input("type", e.target.value);
                }}
                className="form-control"
                name=""
                id=""
                defaultValue={"Solar"}
                value={this.props.proposals.new_proposal.type}
              >
                <option value="Solar">Solar</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <Label>Panel Model</Label>
            <div className="col-6">
              <select
                onChange={e => {
                  this.handle_input("panel_model", e.target.value);
                }}
                className="form-control"
                name=""
                id=""
                defaultValue={"Select Client"}
                value={this.props.proposals.new_proposal.panel_model}
              >
                <option disabled value="Select Client">
                  Select Panel Model
                </option>
                {this.props.materials.solar_panels.map(solar_panel => {
                  return (
                    <option key={solar_panel._id} value={solar_panel._id}>
                      {solar_panel.manufacturer} {solar_panel.model} -{" "}
                      {solar_panel.watt}
                      {"w"}
                    </option>
                  );
                })}{" "}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <Label>Number of Panels</Label>
            <div className="col-6">
              <Input
                handle_input={this.handle_input}
                type="number"
                name="panel_count"
                value={this.props.proposals.new_proposal.panel_count}
              />
            </div>
          </div>

          <div className="form-group row">
            <Label>Battery Storage</Label>
            <div className="col-6">
              <select
                onChange={e => {
                  this.handle_input("battery", e.target.value);
                }}
                className="form-control"
                name=""
                id=""
                defaultValue={"0"}
                value={this.props.proposals.new_proposal.battery}
              >
                <option disabled value="0">
                  No Battery Storage
                </option>
                {this.props.materials.batterys.map(battery => {
                  return (
                    <option key={battery._id} value={battery._id}>
                      {battery.manufacturer} {battery.model} - {battery.kwh}
                      {"Kwh"}
                    </option>
                  );
                })}{" "}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <Label>Inverter</Label>
            <div className="col-6">
              <select
                onChange={e => {
                  this.handle_input("inverter_model", e.target.value);
                }}
                className="form-control"
                name=""
                id=""
                defaultValue={"Select Inverter"}
                value={this.props.proposals.new_proposal.inverter_model}
              >
                <option disabled value="Select Inverter">
                  Select Inverter Model
                </option>
                {this.props.materials.inverters.map(inverter => {
                  return (
                    <option key={inverter._id} value={inverter._id}>
                      {inverter.manufacturer} {inverter.model} - {inverter.volt}
                      {"w"}
                    </option>
                  );
                })}{" "}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <Label>Number of Inverters</Label>
            <div className="col-6">
              <Input
                handle_input={this.handle_input}
                type="number"
                name="inverter_count"
                value={this.props.proposals.new_proposal.inverter_count}
              />
            </div>
          </div>

          <div className="form-group row">
            <Label>Price</Label>
            <div className="col-6">
              <Input
                handle_input={this.handle_input}
                type="number"
                name="price"
                value={this.props.proposals.new_proposal.price}
              />
            </div>
          </div>

          <br />
          <br />
          <div className="form-group">
            <div className="offset-sm-2 col-sm-4">
              <Loading_Button
                is_loading={is_loading}
                className="btn btn-lg btn-primary btn-block load_btn"
                name="submit"
                type="submit"
                text="Add Proposal"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}
export default connect(mapStateToProps)(Add_Proposal_Form);

const Label = ({ children }) => (
  <label
    htmlFor="example-text-input"
    className="col-3 col-form-label justify_end"
  >
    {children}
  </label>
);

const Input = ({ name, type, value, handle_input, required, disabled }) => {
  // console.log({disabled})
  let [_disabled, set_disabled] = useState(disabled);
  let [edit, set_edit] = useState(false);
  // console.log({ _disabled });
  if (_disabled !== disabled && !edit) {
    // console.log('Forcing disabled set state')
    set_disabled(disabled);
  }
  return (
    <Relaive_Div>
      <input
        disabled={_disabled}
        onChange={event => handle_input(name, event.target.value)}
        type={type}
        value={value}
        className="form-control"
        required={required}
      />
      {_disabled && (
        <>
          {!edit && (
            <Edit_Overide_Button
              textcolor="white"
              color="steelblue"
              onClick={() => {
                set_disabled(false);
                set_edit(true);
              }}
            >
              EDIT
            </Edit_Overide_Button>
          )}
        </>
      )}
      {edit && (
        <Edit_Overide_Button
          color="lawngreen"
          textcolor={"black"}
          onClick={() => {
            set_edit(false);
            set_disabled(true);
          }}
        >
          OK
        </Edit_Overide_Button>
      )}
    </Relaive_Div>
  );
};

const Relaive_Div = styled.div`
  position: relative;
`;

const Edit_Overide_Button = styled.p`
  background: ${props => props.color};
  color: ${props => props.textcolor};
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  padding: 0.5em;
  cursor: pointer;
`;
const Styled_Input = styled.input`
  display: inline;
`;
