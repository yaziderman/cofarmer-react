import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//Css Import
import "../src/assets/plugins/bootstrap/css/bootstrap.min.css";
import "../src/assets/plugins/datatables/media/css/jquery.dataTables.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../src/assets/plugins/select2/dist/css/select2.css";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
// import "material-icons/css/material-icons.css";

import "./css/style.css";
import "./css/custom.css";

//Js Import
import "../src/assets/plugins/select2/dist/js/select2.js";
import "bootstrap/dist/js/bootstrap.js";
import "../src/js/custom.js";
import "react-toastify/dist/ReactToastify.css";
import "../src/assets/plugins/datatables/media/js/jquery.dataTables";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
