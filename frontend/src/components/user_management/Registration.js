import useForm from "./useFormHook";
import { ToastContainer, toast } from 'react-toastify';
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";
import { OnlineSupport } from '../online_support/OnlineSupport'

export function Registration(props) {
	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		securityQuestion1: "",
		securityAnswer1: "",
		securityQuestion2: "",
		securityAnswer2: "",
	};
	const [role,setRole]=useState();

	const navigate = useNavigate();
	const onSubmit = async (e) => {
		let that = this;

		try {
			try {
				const { user } = await Auth.signUp({
					username: values.email,
					password: values.password,
					attributes: {
						email: values.email,
						name: values.firstName,
						profile:role
						
					},
				}).then({

				}).catch((error) => {
					toast.error("Error Registring User")
						console.log(error);
					});
				
				axios({
					method: 'post',
					url: 'https://us-central1-csci5410-365703.cloudfunctions.net/createSecurityQnA',
					data: {
						email: values.email,
						securityQ1: "Name your favorite destination",
						securityA1: values.securityA1,
						securityQ2: "Name your first school",
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
						toast.success("Successfully signed up")
						navigate('/cipher',{state:values.email});
					})
					.catch((error) => {
						toast.error(error)
						console.log(error);
					});

				
			} catch (error) {
				console.error(error);
				toast.error(error)
			}
		} catch (err) {
			toast.error(err);
		}
	};

	const signup = async (e) => {
        try {
          navigate('/login')
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
		<div id="Signup" className="mt-5">
			<div className="mt-3 border bg-white p-3 rounded w-50 mx-auto">
				<h3 className="text-center">Registration</h3>


				<div className="col-md-12 mt-4">
					<div className="form-group">
						<small className="lblposition">Name</small>
						<input value={values.firstName} onChange={changeHandler} name="firstName" type="text" className="form-control" placeholder="First Name" />
						
					</div>

					<div className="form-group mt-3">
						<small className="lblposition">Your Email Address</small>
						<input value={values.email} onChange={changeHandler} name="email" type="email" className="form-control" placeholder="Enter Your email" />
						
					</div>

					<div className="form-group mt-3">
						<small className="lblposition">Passowd with atleast 8 characters, 1 special char, 1 digit and 1 uppercase</small>
						<input value={values.password} onChange={changeHandler} name="password" type="password" className="form-control" placeholder="Password" />
						
					</div>

					

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

					{/* <button type="submit" className="btn btn-primary signup-btn mt-5" onClick={submitHandler}>Sign up</button> */}
					<div className="form-group mt-3">
						<small className="lblposition">Role</small>
						<br/>
						<div className="mt-3">
						<label className="radioposition"><input  value="Restaurant Owner" onChange={e=>setRole(e.target.value)} name="role" type="radio"/>Restaurant Owner</label>
						<br/>
						<label  className="radioposition"><input value="Customer" onChange={e=>setRole(e.target.value)} name="role" type="radio" />Customer</label>
						</div>
						<br/>
					</div>
					<div className="form-group mt-3">
					<br/><button type="submit" className="btn btn-primary signup-btn" onClick={submitHandler}>Sign up</button>
					<br/><button type="submit" className="btn btn-primary signup-btn mt-5" onClick={signup}>Login</button>
					</div>

				</div>
			</div>
			<OnlineSupport />
		</div>
	)

}

/** References
1. https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#option-1-use-pre-built-ui-components
*/

