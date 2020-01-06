const { Router } = require("express");
const Client_Controller = require("../controllers/Client_Controller.js");

const {
  ensure_authenticated
} = require("../middleware/router_middleware.js");

class Client_Router {
  constructor() {
    this.client_router = Router();
    this.buildRoutes();
  }

  buildRoutes() {

    /* POST */

    /* Add client */
    this.client_router.post(
      "/add_client",
      [ensure_authenticated],
      Client_Controller.add_client
    );

  }
}

// const Client_Router = new Client_Router();

module.exports = () => new Client_Router();
