import useForm from "./useFormHook";
import { toast } from 'react-toastify';
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { OnlineSupport } from '../online_support/OnlineSupport'

export function Login(props) {
    const initialValues = {
      email: "",
      password: ""
    };

    const navigate = useNavigate();
    const onSubmit = async (e) => {
        try {
          await Auth.signIn(values.email, values.password);
          toast.success("1st Factor authentication verified Successfully");
          navigate('/verifyQnA',{state:values.email})
        } catch (error) {
          toast.error(error.message);
        }
      }
      const signup = async (e) => {
        try {
          navigate('/signup')
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
        <div className="w-50 mx-auto border rounded p-3 mt-5">
            <h1> Login </h1>

            <div className="form-group mt-3">
              <small className="lblposition">Your Email Address</small>
              <input value={values.email} onChange={changeHandler} name="email" type="email" className="form-control" placeholder="Enter Your email" />
              
            </div>

            <div className="form-group mt-3">
              <small className="lblposition">Your Password</small>
              <input value={values.password} onChange={changeHandler} name="password" type="password" className="form-control" placeholder="Enter Your password" />
              
            </div>

            <button type="submit" className="btn btn-primary signup-btn mt-5" onClick={submitHandler}>Login</button>
            <br/><button type="submit" className="btn btn-primary signup-btn mt-5" onClick={signup}>Signup</button>
            <OnlineSupport />
          </div>
      )
}

/** References
1. https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#option-1-use-pre-built-ui-components
2. https://reactjs.org/docs/forms.html 
*/