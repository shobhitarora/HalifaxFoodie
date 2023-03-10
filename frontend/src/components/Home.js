import { Auth } from "aws-amplify";
import { OnlineSupport } from './online_support/OnlineSupport'
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useLocation } from 'react-router-dom';

export function Home(props) {
    const location = useLocation()
    var show;

    const logout = () => {
        Auth.signOut().then(() => window.location.href = '/login')
    }
    const handleClick = (event) => {
        const restaurantId = event.target.value
        console.log(restaurantId)
        let userData = { email: location.state, restaurant: restaurantId };
        axios
            .post(
                "https://7sido6wntxghei3k34urkr4cpm0wtodo.lambda-url.us-east-1.on.aws/",
                userData
            )
            .then((response) => {
                const Msg = () => {
                    return (
                        <>
                            Food Ordered successfully!.
                            <br />
                            Your order id is:
                            <br />
                            {response.data}
                        </>
                    );
                };

                show = response.data
                console.log(response.data);
                toast.success(<Msg />);
            });

    }

    return (

        <div className="w-50 mx-auto border rounded p-3 mt-5">
            <button type="submit" className="btn btn-primary signup-btn mt-5" onClick={logout}>Logout</button>
            <div className="form-group mt-3">
                < div className="form-group">
                    <small className="lblposition">Restaurant 1</small>
                    <button value="R1" type="submit" className="btn btn-primary signup-btn mt-5" onClick={handleClick}>Order Food</button>
                </div>
                < div className="form-group">
                    <small className="lblposition">Restaurant 2</small>
                    <button value="R2" type="submit" className="btn btn-primary signup-btn mt-5" onClick={handleClick}>Order Food</button>
                </div>
                < div className="form-group">
                    <small className="lblposition">Restaurant 3</small>
                    <button value="R3" type="submit" className="btn btn-primary signup-btn mt-5" onClick={handleClick}>Order Food</button>
                </div>
                < div className="form-group">
                    <small className="lblposition">Restaurant 4</small>
                    <button value="R4" type="submit" className="btn btn-primary signup-btn mt-5" onClick={handleClick}>Order Food</button>
                </div>
                <h3>{show}</h3>

            </div>
            <OnlineSupport />
        </div>

    )
}