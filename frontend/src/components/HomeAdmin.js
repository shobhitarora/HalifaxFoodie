import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { OnlineSupport } from './online_support/OnlineSupport' 


export function HomeAdmin(props) {
    const navigate = useNavigate();
    const logout = () => {
        Auth.signOut().then(() => window.location.href = '/login')
      }
      const uploadRecpie = () => {
        
        navigate('/recepieupload')
        
      }

      const visualize = () => {
        
        navigate('/visualize')
        
      }

      const polarity = () => {
        
        navigate('/polarity')
        
      }
      
    return (
        
        <div className="w-50 mx-auto border rounded p-3 mt-5">
             <button type="submit" className="btn btn-primary signup-btn mt-5" onClick={logout}>Logout</button>
             <div className="form-group mt-3">
            < div className="form-group">
              
              <button value="R1" type="submit" className="btn btn-primary signup-btn mt-5" onClick={uploadRecpie}>Upload Recpie</button>
              </div>
              < div className="form-group">
              
              <button value="R2" type="submit" className="btn btn-primary signup-btn mt-5" onClick={visualize}>View Statistics</button>
              </div>
              < div className="form-group">
              
              <button value="R3" type="submit" className="btn btn-primary signup-btn mt-5" onClick={polarity}>Customer Feedback Polarity</button>
              </div>
            </div>
             <OnlineSupport/>
        </div>
        
    )
}

export default HomeAdmin