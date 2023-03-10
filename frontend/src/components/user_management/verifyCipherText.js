import useForm from "./useFormHook";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import {addDoc, collection} from "firebase/firestore";
import { db } from "../../firebase";


export function VerifyCipherText(props) {
    const location = useLocation()
	const initialValues = {
		cipherText: "",
	};

	const navigate = useNavigate();
	const onSubmit = async (e) => {
	console.log(location.state)

		try {
			try {
				
				axios({
					method: 'post',
					url: 'https://us-central1-csci5410-365703.cloudfunctions.net/verifyCipher',
					data: {
						email: location.state,
						cipherText: values.cipherText,
					},
					headers: {
						"Access-Control-Allow-Headers": "*",
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "*"
					}
				})
					.then(async (response) => {
						console.log(response.data);
						const userCollection = collection(db, "login_logs");
						await addDoc(userCollection, {
							email:location.state,
							login_time:new Date(),
							logout_time:""
						  });
						
						axios
						.post(
						  "https://ycqder3pa4nmubt7jijtrbag440jasuo.lambda-url.us-east-1.on.aws/",
						  {email:location.state}
						)
						.then((response) => {
						  console.log(response);
						  if(response.data==="Customer"){
							toast.success("3rd Factor authentication verified Successfully")
							navigate('/home',{state:location.state});
						  } else{
							toast.success("3rd Factor authentication verified Successfully")
							navigate('/homeadmin');
						  }
						});
					
						
					})
					.catch((error) => {
                        console.log(error)
                        toast.error("Wrong security answer!")
					});

				
			} catch (error) {
				console.error(error);
				toast.error(error)
			}
		} catch (err) {
			toast.error(err);
		}
	};
	const {
		values,
		changeHandler,
		errors,
		touched,
		submitHandler
	} = useForm({ initialValues: initialValues, validations: [], onSubmit: onSubmit });

	return (
		<div id="Signup" className="mt-5">
			<div className="mt-3 border bg-white p-3 rounded w-50 mx-auto">
				<h3 className="text-center">3rd Factor Authentication</h3>


				<div className="col-md-12 mt-4">

                <h4 className="text-center">Enter your cipher key</h4>

					<div className="form-group mt-3">
					<small className="lblposition">Your Cipher Text</small>
						<input value={values.cipherText} onChange={changeHandler} name="cipherText" type="text" className="form-control" placeholder="Cipher Text" />
						
					</div>

					<button type="submit" className="btn btn-primary signup-btn mt-5" onClick={submitHandler}>Submit</button>

				</div>
			</div>
		</div>
	)

}

