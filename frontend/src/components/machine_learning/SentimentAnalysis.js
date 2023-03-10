import React, { useState } from "react";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";

const userCollection = collection(db, "polarity");

export function SentimentAnalysis(props) {
  const navigate = useNavigate();
  const extract = async (e) => {
    try {
      axios
        .get(
          "https://rvqkndqghefycmxkp2oul56lyy0omphk.lambda-url.us-east-1.on.aws/"
        )
        .then(async (response) => {
          console.log(response.data[0]);
          response.data.map(async x=>{
            await addDoc(userCollection, {
              sentiment:response.data[0].Sentiment,
              mixed:response.data[0].SentimentScore['Mixed'],
              negative:response.data[0].SentimentScore['Negative'],
              nuutral:response.data[0].SentimentScore['Mixed'],
              positive:response.data[0].SentimentScore['Mixed']
            });
          })

          
          axios
          .get(
            "https://us-central1-csci5410-365703.cloudfunctions.net/polarity-machine-learning"
          )
          
          
          navigate("/polarityvisualize");
        });
    } catch (error) {
      
    }
  };
  return (
    <div>
      <button onClick={extract}>Refresh</button>
    </div>
  );
}
