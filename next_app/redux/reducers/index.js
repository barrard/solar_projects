import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import meta_reucer from "./meta_reducer.js";
import user_reucer from "./user_reducer.js";
import clients_reducer from "./clients_reducer";
import projects_reducer from "./projects_reducer";
import proposals_reducer from "./proposals_reducer";
import materials_reducer from "./materials_reducer";

export default combineReducers({
  toastr: toastrReducer,
  user: user_reucer,
  meta: meta_reucer,
  clients: clients_reducer,
  proposals: proposals_reducer,
  projects: projects_reducer,
  materials: materials_reducer
});
