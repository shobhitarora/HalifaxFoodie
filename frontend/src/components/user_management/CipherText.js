import useForm from "./useFormHook";
import { toast } from 'react-toastify';
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Lambda from 'aws-sdk/clients/lambda'; 
import { useLocation } from 'react-router-dom';


export function CipherText(props) {
    const location = useLocation()
    const initialValues = {
        key: "",
        text: ""
    };
    console.log(location.state)
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        try {
            axios({
                method: 'post',
                url: 'https://us-central1-csci5410-365703.cloudfunctions.net/cipherText',
                data: {
                  email:location.state,
                  key:values.key,
                  text:values.text
                },
              })
              .then((response) => {
                console.log(response.data);
                toast.success("3 Factor Authentication done successfully");
                navigate("/showcipher",{state:response.data});
              })
              .catch((error) => {
                console.log(error);
              });
            
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    const {
        values,
        changeHandler,
        errors,
        touched,
        submitHandler
    } = useForm({ initialValues: initialValues, validations: [], onSubmit: onSubmit });

    return (
        <div className="w-50 mx-auto border rounded p-3">
            <h1> 3rd Factor Authentication</h1>

            <div className="form-group mt-3">
            <small className="lblposition">Key</small>
                <input value={values.key} onChange={changeHandler} name="key" type="text" className="form-control" placeholder="Enter Key of length 4" />
            </div>

            <div className="form-group mt-3">
            <small className="lblposition">Plain Text</small>

                <input value={values.text} onChange={changeHandler} name="text" type="text" className="form-control" placeholder="Enter Plain Text" />
            </div>

            <button type="submit" className="btn btn-primary signup-btn mt-5" onClick={submitHandler}>Submit</button>
        </div>
    )
}
