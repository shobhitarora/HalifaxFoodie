import React from "react";
import axios from "axios";

const graph = () => {
  axios
    .post(
      "https://us-central1-csci5410-365703.cloudfunctions.net/login-visualization",
      { message: "message" }
    )
    .then((response) => {
      console.log(response.status);
      console.log(response.data);
      
    });

  axios
    .post(
      "https://us-central1-csci5410-365703.cloudfunctions.net/recepie-visualization",
      { message: "message" }
    )
    .then((response) => {
      console.log(response.status);
      console.log(response.data);
      
    });
};


function Visualisation() {
  return (
    <div>
      <iframe
        width="600"
        height="450"
        src="https://datastudio.google.com/embed/reporting/ac65dfa0-1a58-4558-9723-ea7f835e916a/page/e2v8C"
        
      ></iframe>
      <iframe
        width="600"
        height="450"
        src="https://datastudio.google.com/embed/reporting/ee950a5c-2a6b-4920-9553-acde27ea7817/page/NcT9C"
        
      ></iframe>
      <div>
      <button onClick={graph}  className="btn btn-primary signup-btn mt-5">Refresh Graph </button>
      </div>
      
    </div>

  );
}

export default Visualisation;
