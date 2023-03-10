const {initializeApp} = require("firebase/app");
const {getFirestore} = require("firebase/firestore")
const {collection, addDoc} = require("firebase/firestore");

const chatRoomCollection = "chatroom";

const firebaseConfig = {
  apiKey: "AIzaSyChimtSa5KhlKVwu1K842WNHmjKsqkdtuY",
  authDomain: "csci5410-365703.firebaseapp.com",
  projectId: "csci5410-365703",
  storageBucket: "csci5410-365703.appspot.com",
  messagingSenderId: "1032745267496",
  appId: "1:1032745267496:web:614246aed1b4e99d47a01d",
  measurementId: "G-9W97WCDLGS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

exports.helloPubSub = async (event, context) => {
  
  const publishedMessage = JSON.parse(
    Buffer.from(event.data, "base64").toString()
  );

  try {
    let chatroomDocument = publishedMessage;

    const chatDocumentRef = await addDoc(collection(db, chatRoomCollection), 
      chatroomDocument
    );

  } catch (error) {
    console.log("Error occured: ", error);
  }
};

/** References
1. https://cloud.google.com/functions/docs/samples/functions-pubsub-subscribe
*/