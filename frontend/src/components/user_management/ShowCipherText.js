
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


export function ShowCipherText(props) {
    const location = useLocation()
    
    console.log(location.state)
    const navigate = useNavigate();
    function submitHandler() {
        navigate("/confirmpin");
      }
    
    return (
        <div className="w-50 mx-auto border rounded p-3">
            <h1> Your Cipher Key is given below. Please Note down for further authentication</h1>

            <div className="form-group mt-3">
                <p>{location.state}</p>
            </div>

            <button type="submit" className="btn btn-primary signup-btn mt-5" onClick={submitHandler}>Confirm Email</button>
        </div>
    )
}

