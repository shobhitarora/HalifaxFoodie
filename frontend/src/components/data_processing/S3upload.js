import React, { useState } from "react";
import AWS from "aws-sdk";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";

//Reference: https://javascript.plainenglish.io/how-to-upload-files-to-aws-s3-in-react-591e533d615e

const S3_BUCKET = "serverless-project-group10";
const REGION = "us-east-1";
const userCollection = collection(db, "Recipes");
let responseData;
let fileName;

AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  sessionToken:
    "",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const S3upload = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const extract = (ext) => {
    fileName = selectedFile.name;
    fileName = fileName.replace(".txt", "");
    console.log(fileName);
    let userData = { fileName: fileName };
    axios
      .post(
        "https://mpll3ff7sq4uuob7wc2vxgb2bu0bvhww.lambda-url.us-east-1.on.aws/",
        userData
      )
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        responseData = response.data;
        toast.success("Recipe " + fileName + " Extracted Successfully");
      });
  };

  const saveData = async () => {
    await addDoc(userCollection, {
      recepieName: fileName,
      data: responseData,
    });
    toast.success("Recipe Saved Successfully");
  };

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  const similarity = () => {
    const params = {
      filename: fileName,
    };
    axios
      .post(
        "https://us-central1-csci5410-365703.cloudfunctions.net/similarity",
        params
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(response.data[0]);
        responseData = response.data;
        var arr = [];
        var str = "";
        responseData.map(async (x) => {
          arr.push(responseData[0].name);
          str =
            str +
            responseData[0].name +
            " with similarity score : " +
            responseData[0].score +
            " ";
        });
        toast.success("Similar Recipe  " + str);
      });
  };

  return (
    <div>
      <div className="col-md-12 mt-4">
        <div className="form-group mt-3">
          <div className="mt-3 border bg-white p-3 rounded w-50 mx-auto">
            File Upload Progress is {progress}%
          </div>
          <input type="file" onChange={handleFileInput} />
          <button onClick={() => uploadFile(selectedFile)}>
            {""}
            Upload to S3
          </button>
          <div className="form-group mt-3">
            <button
              className="btn btn-primary signup-btn mt-5"
              onClick={extract}
            >
              Extract{" "}
            </button>
          </div>
          <div className="form-group mt-3">
            <button
              className="btn btn-primary signup-btn mt-5"
              onClick={saveData}
            >
              Save Data
            </button>
          </div>
          <div>
            <button
              className="btn btn-primary signup-btn mt-5"
              onClick={similarity}
            >
              View Similar recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default S3upload;
