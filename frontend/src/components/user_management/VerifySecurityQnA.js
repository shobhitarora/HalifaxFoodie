import useForm from "./useFormHook";
import { ToastContainer, toast } from 'react-toastify';
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';


export function VerifySecurityQnA(props) {
    const location = useLocation()
	const initialValues = {
		securityQuestion1: "",
		securityAnswer1: "",
		securityQuestion2: "",
		securityAnswer2: "",
	};

	const navigate = useNavigate();
	const onSubmit = async (e) => {
		let that = this;

		try {
			try {
				
				axios({
					method: 'post',
					url: 'https://us-central1-csci5410-365703.cloudfunctions.net/verifySecurityQnA',
					data: {
						email: location.state,
						securityA1: values.securityA1,
						securityA2: values.securityA2,
					},
					headers: {
						"Access-Control-Allow-Headers": "*",
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "*"
					}
				})
					.then((response) => {
						console.log(response.data);
						toast.success("2nd Factor authentication verified Successfully")
						navigate('/verifyCipher',{state:location.state});
					})
					.catch((error) => {
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
				<h3 className="text-center">Security Question Answer</h3>


				<div className="col-md-12 mt-4">

					<div className="form-group mt-3">
					<small className="lblposition">Your First Security Question</small>
						<input value="Name your favorite destination" onChange={changeHandler} name="securityQ1" type="text" className="form-control" placeholder="Security Question 1" readOnly />
						
					</div>

					<div className="form-group mt-3">
					<small className="lblposition">Your First Security Answer</small>
						<input value={values.securityA1} onChange={changeHandler} name="securityA1" type="text" className="form-control" placeholder="Security Answer 1" />
						
					</div>

					<div className="form-group mt-3">
					<small className="lblposition">Your Second Security Question</small>

						<input value="Name your first school" onChange={changeHandler} name="securityQ2" type="text" className="form-control" placeholder="Security Question 2" readOnly />
					</div>

					<div className="form-group mt-3">
					<small className="lblposition">Your Second Security Answer</small>

						<input value={values.securityA2} onChange={changeHandler} name="securityA2" type="text" className="form-control" placeholder="Security Answer 2" />
					</div>

					<button type="submit" className="btn btn-primary signup-btn mt-5" onClick={submitHandler}>Submit</button>

				</div>
			</div>
		</div>
	)

}

