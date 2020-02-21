import React, { useState } from "react";
import styled from "styled-components";
import API from "../API.js";
import Loading_Button from "../small_components/Loading_button";

const Client_Details_View = ({ client, csrf, updatedClient }) => {
  let [is_loading, set_is_loading] = useState(false);
  let [edit_mode, set_edit_mode] = useState(false);
  let [tmp_client_data, set_tmp_client_data] = useState({});
  if (!client || !client.firstname) return <p>Select a client.</p>;

  const Edit_Buttons = ({ client, set_edit, edit_mode }) => {
    /* return save or cancel buttons */
    return (
      <Edit_Client_Buttons_Container>
        {/* If in edit mode retuen SAVE and CANCEL buttons */}
        {edit_mode && (
          <>
            <Loading_Button
              onClick={async () => {
                set_is_loading(true);
                let client = await API.save_client(tmp_client_data, csrf);
                setTimeout(() => {
                  updatedClient(client)
                  set_edit(!edit_mode);
                  set_is_loading(false);

                }, 500);
              }}
              is_loading={is_loading}
              className="btn btn-success btn-block"
              name="Save"
              type="submit"
              text="Save"
            >
              Save
            </Loading_Button>
            <button
              onClick={() => set_edit(!edit_mode)}
              type="button"
              className="btn btn-danger"
            >
              Cancel
            </button>
          </>
        )}
        {/* If in edit mode retuen SAVE and CANCEL buttons */}
        {!edit_mode && (
          <>
            <button
              onClick={() => {
                set_edit(!edit_mode);
                set_tmp_client_data(client);
              }}
              type="button"
              className="btn btn-info"
            >
              Edit
            </button>
          </>
        )}
      </Edit_Client_Buttons_Container>
    );
  };

  const edit_tmp_client = (value, property) => {
    console.log({ value, property });
    set_tmp_client_data({ ...tmp_client_data, [property]: value });
  };

  return (
    <>
      <StyledHeading>{"Client Details"}</StyledHeading>
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
        <Client_Address
          edit_tmp_client={edit_tmp_client}
          mode={edit_mode}
          client={client}
          tmp_client_data={tmp_client_data}
        />
        <Client_Contact
          edit_tmp_client={edit_tmp_client}
          mode={edit_mode}
          client={client}
          tmp_client_data={tmp_client_data}
        />
      </View_Container>
    </>
  );
};

export default Client_Details_View;

/* Components */

const Client_Contact = ({ client, mode, edit_tmp_client, tmp_client_data }) => {
  if (mode) {
    return (
      <div className="col-6">

        <Input
          handle_input={edit_tmp_client}
          type="email"
          name="email"
          value={tmp_client_data.email}
        />
        <Input
          handle_input={edit_tmp_client}
          type="phone"
          name="phone"
          value={tmp_client_data.phone}
        />
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-sm-12">
        <h5>Contact</h5>
        <p>{client.email}</p>
        <p>{client.phone}</p>
      </div>
    </div>
  );
};

const Client_Name = ({ client, mode, edit_tmp_client, tmp_client_data }) => {
  if (mode) {
    return (
      <div className="col-6">

        <Input
          handle_input={edit_tmp_client}
          type="text"
          name="firstname"
          value={tmp_client_data.firstname}
        />
        <Input
          handle_input={edit_tmp_client}
          type="text"
          name="lastname"
          value={tmp_client_data.lastname}
        />
      </div>
    );
  }
  return (
    <p>
      {client.firstname} {client.lastname}
    </p>
  );
};

const Client_Address = ({ client, mode, edit_tmp_client, tmp_client_data }) => {
  if (mode) {
    return (
      <div className="col-6">
      {/* street */}
        <Input
          handle_input={edit_tmp_client}
          type="text"
          name="street_address"
          value={tmp_client_data.street_address}
        />
        {/* city */}
        <Input
          handle_input={edit_tmp_client}
          type="text"
          name="city"
          value={tmp_client_data.city}
        />
        {/* zip */}
        <Input
          handle_input={edit_tmp_client}
          type="text"
          name="zip"
          value={tmp_client_data.zip}
        />
</div>    );
  }
  return (
    <>
      <h5>Address</h5>
      <p>{client.street_address}</p>
      <p>{client.city}</p>
      <p>{client.state}</p>
      <p>{client.zip}</p>
    </>
  );
};

const Input = ({ name, type, value, handle_input, required }) => {
  let label = name.replace("_", " ");
  label = name
    .split(" ")
    .map(word => {
      const first_letter = word.split("")[0].toUpperCase();
      return `${first_letter}${word
        .split("")
        .slice(1)
        .join("")}`;
    })
    .join(" ");
  return (
    <>
      <span>{label}</span>
      <input
        onChange={event => handle_input(event.target.value, name)}
        type={type}
        value={value}
        className="form-control"
        required={required}
      />
    </>
  );
};

const StyledHeading = styled.h3`
  display: flex;
  justify-content: center;
  /* padding-bottom: 2em; */
`;

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
  display: flex;
`;

// const StyledWaveDirectionIcon = styled.i`
//   -webkit-text-stroke-color: black;
//   background: ${props => props.color_ft};
//   -webkit-background-clip: text;
//   background-clip: text;
//   -webkit-text-fill-color: transparent;
//   font-size: ${props => props.size_period + "px"};
// `;
// const StyledWindIcon = styled.i`
//   font-weight: 900;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   /* padding: 3px; */
//   -webkit-text-stroke-width: 1px;
//   -webkit-text-stroke-color: black;
//   background: linear-gradient(
//     ${props => `${props.color_spd}, ${props.color_gst}`}
//   );
//   -webkit-background-clip: text;
//   background-clip: text;
//   -webkit-text-fill-color: transparent;
//   font-size: ${props => props.size + "px"};
// `;

// const StyledI = styled.i`
//   font-size: ${props => props.size_period + "px"};
//   /* padding: 3px; */
//   -webkit-text-stroke-width: 1px;
//   -webkit-text-stroke-color: black;
//   background: linear-gradient(
//     ${props => `${(props.color[0], props.color[1] || props.color[0])}`}
//   );
//   -webkit-background-clip: text;
//   background-clip: text;
//   -webkit-text-fill-color: transparent;
// `;
