export {
  new_client, client_model
};

const client_model = {
  firstname: "",
  lastname: "",
  street_address: "",
  city: "",
  zip: "",
  state:"",
  phone: "",
  email: ""
};

function new_client(data) {
  let new_client = {};
  for (let prop in client_model) {
    new_client[prop] = data[prop];
  }
  return new_client;
}
