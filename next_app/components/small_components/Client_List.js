import React from "react";
import styled from "styled-components";

const Client_List = ({ clients, onClientSelect }) => {
  return (
    <>
      <ClientListHeading />
      <StyledClientListContainer>
        {clients &&
          clients.map &&
          clients.map(client => (
            <Client_Item
              onClientSelect={onClientSelect}
              key={client._id}
              client={client}
            />
          ))}
      </StyledClientListContainer>
    </>
  );
};

export default Client_List;

const ClientListHeading = () => {
  return (
    <div className="row">
      <div className="col-sm-12 flex_center">
        <StyledHeading>Client List</StyledHeading>
      </div>
    </div>
  );
};

const Client_Item = ({ client, onClientSelect }) => {
  return (
    <StyledClientItemDiv onClick={(e)=> onClientSelect(client)}>
      <StyledClientName>{client.firstname}</StyledClientName>
    </StyledClientItemDiv>
  );
};

const StyledClientName = styled.p`
  margin: 1em;
`;

const StyledClientItemDiv = styled.div`
  width: 100%;
  border: 1px solid black;
  /* padding: 1em; */
`;

const StyledClientListContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  min-height: 40vh;
  max-height: 40vh;
  overflow-y: auto;
`;
const StyledHeading = styled.h3`
  /* padding-bottom: 2em; */
`;
