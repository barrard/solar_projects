import React, { useState } from "react";
import styled from "styled-components";

const Client_Details_View = ({ client }) => {
  let [edit_mode, set_edit_mode] = useState(false);
  let [tmp_client_data, set_tmp_client_data] = useState({});
  if (!client || !client.firstname) return <p>Select a client.</p>;

  const Edit_Buttons = ({ client, set_edit, edit_mode }) => {
    console.log({ edit_mode });
    if (edit_mode) {
      /* return save or cancel buttons */
      return (
        <Edit_Client_Buttons_Container>
          <button
            onClick={() => set_edit(!edit_mode)}
            type="button"
            class="btn btn-success"
          >
            Save
          </button>
          <button
            onClick={() => set_edit(!edit_mode)}
            type="button"
            class="btn btn-danger"
          >
            Cancel
          </button>
        </Edit_Client_Buttons_Container>
      );
    } else {
      return (
        <Edit_Client_Buttons_Container>
          <button
            onClick={() => {
              set_edit(!edit_mode);
              set_tmp_client_data(client);
            }}
            type="button"
            class="btn btn-info"
          >
            Edit
          </button>
        </Edit_Client_Buttons_Container>
      );
    }
  };

  const Client_Contact = ({ client }) => {
    return (
      <div className="row">
        <div className="col-sm-12">
          <p>{client.email}</p>
          <p>{client.phone}</p>
        </div>
      </div>
    );
  };
  const ClienNameHeading = ({ name }) => {
    return (
      <div className="row">
        <div className="col-sm-12 flex_center">
          <StyledHeading>{name}</StyledHeading>
        </div>
      </div>
    );
  };

  const Client_Address = ({ client }) => {
    return (
      <>
        <h5>Address</h5>
        <p>{client.street_address}</p>
        <p>{client.city}</p>
        <p>{client.zip}</p>
      </>
    );
  };
  const edit_tmp_client = (value, property) => {
    console.log({ value, property });
    set_tmp_client_data({ ...tmp_client_data, [property]: value });
  };

  return (
    <>
      <ClienNameHeading name={client.firstname} />
      <View_Container>
        <Edit_Buttons
          client={client}
          set_edit={set_edit_mode}
          edit_mode={edit_mode}
        />
        <Client_Name
          edit_tmp_client={edit_tmp_client}
          mode={edit_mode}
          client={client}
          tmp_client_data={tmp_client_data}
        />
        <Client_Address mode={edit_mode} client={client} />
        <Client_Contact mode={edit_mode} client={client} />
      </View_Container>
    </>
  );
};

export default Client_Details_View;

const Client_Name = ({ client, mode, edit_tmp_client, tmp_client_data }) => {
  if (mode) {
    return (
      <Input
        handle_input={edit_tmp_client}
        type="text"
        name="firstname"
        value={tmp_client_data.firstname}
      />
    );
  }
  return (
    <p>
      {client.firstname} {client.lastname}
    </p>
  );
};

const Input = ({ name, type, value, handle_input, required }) => (
  <input
    onChange={event => handle_input(event.target.value, name)}
    type={type}
    value={value}
    className="form-control"
    required={required}
  />
);

const View_Container = styled.div`
  padding: 1em;
  width: 100%;
  border: 1px solid black;
  min-height: 40vh;
  overflow-y: auto;
  position: relative;
`;
const Edit_Client_Buttons_Container = styled.div`
  position: absolute;
  right: 1em;
`;
const StyledWaveDirectionIcon = styled.i`
  -webkit-text-stroke-color: black;
  background: ${props => props.color_ft};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: ${props => props.size_period + "px"};
`;
const StyledWindIcon = styled.i`
  font-weight: 900;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* padding: 3px; */
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  background: linear-gradient(
    ${props => `${props.color_spd}, ${props.color_gst}`}
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: ${props => props.size + "px"};
`;

const StyledI = styled.i`
  font-size: ${props => props.size_period + "px"};
  /* padding: 3px; */
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  background: linear-gradient(
    ${props => `${(props.color[0], props.color[1] || props.color[0])}`}
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const StyledHeading = styled.h3`
  /* padding-bottom: 2em; */
`;
