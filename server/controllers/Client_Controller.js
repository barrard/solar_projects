// const bcrypt = require("bcrypt");
// const formidable = require("formidable");
const {validate_new_client} = require('../services/validator.js')
// const Socket_emitter = require('../socket_server.js').emit_event_to;
// const Socket_emitter = () => {
//   logger.log("Socet emitter");
// };

// var mongoose = require("mongoose");

var client_schema = require("../models/client_schema.js");
// const twilio = require("../services/twilio.js");
// const sendgrid = require("../services/sendgrid.js");

const Client = client_schema;
module.exports = Client;


module.exports.add_client = async (req, res, next) => {
  let new_client = req.body
  console.log({new_client})
  logger.log('CREATE CLIENT!!')
  setTimeout(async()=>{
    try {
      let valid = validate_new_client(new_client)
      if(!valid)throw 'Invalid client data'
      let client = await new Client(new_client).save();
      return res.send(client);
    } catch (err) {
      logger.log({err})
      return res.send({err:true, msg:err});
    }
  }, 500)

};



module.exports.get_client_by_id = (id, cb) => {
  Client.findById(id, cb);
};

module.exports.get_client_by_email = async email => {
  try {
    const query = {
      primary_email: email
    };
    let client = await Client.findOne(query);
    return client;
  } catch (err) {
    throw err;
  }
};



