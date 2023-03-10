import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useForm from "./useFormHook";

export function ConfirmPin(props) {
  const initialValues = {
    email: "",
    pin: ""
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    try {
      await Auth.confirmSignUp(values.email, values.pin);
      toast.success("Verified Successfully");
      navigate("/login");
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
      <h1> Confrim pin</h1>

      <div className="form-group mt-3">
      <small className="lblposition">Your Email Address</small>
        <input value={values.email} onChange={changeHandler} name="email" type="email" className="form-control" placeholder="Enter Your email" />
        
      </div>

      <div className="form-group mt-3">
      <small className="lblposition">Pin Received On Email Address</small>
        <input value={values.pin} onChange={changeHandler} name="pin" type="text" className="form-control" placeholder="Enter Your pin" />
       
      </div>
      <button type="submit" className="btn btn-primary signup-btn mt-5" onClick={submitHandler}>Verify</button>
    </div>
  )
}