import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from './components/user_management/Authentication';
import { Login } from './components/user_management/Login';
import { Home } from './components/Home';
import { Registration } from './components/user_management/Registration';
import { CipherText } from './components/user_management/CipherText';
import { ShowCipherText } from './components/user_management/ShowCipherText';
import { ConfirmPin } from './components/user_management/ConfirmPin';
import { VerifySecurityQnA } from './components/user_management/VerifySecurityQnA';
import { VerifyCipherText } from './components/user_management/verifyCipherText';
import  Chat  from './components/chat/Chat';
import  { SentimentAnalysis }  from './components/machine_learning/SentimentAnalysis';
import './App.css';
import {Amplify} from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import awsconfig from './aws-exports';
import S3upload from './components/data_processing/S3upload';
import MachineLearning from './components/machine_learning/MachineLearning';
import Visualisation from './components/visualisation/Vsualisation';
import HomeAdmin from './components/HomeAdmin';
import SignIn from './components/chat/SignIn';
import { auth } from './firebase.js'
import { useAuthState } from 'react-firebase-hooks/auth'

Amplify.configure(awsconfig);

function App() {
  const [user] = useAuthState(auth);
  return (
    
    <div className="App container ">
      <ToastContainer />
      <div>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Registration />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/signup' element={<Registration />}></Route>
              <Route path='/cipher' element={<CipherText />}></Route>
              <Route path='/recepieupload' element={<S3upload />} />
              <Route path='/showcipher' element={<ShowCipherText />} />
              <Route path='/confirmpin' element={<ConfirmPin />} />
              <Route path='/verifyQnA' element={<VerifySecurityQnA />} />
              <Route path='/verifyCipher' element={<VerifyCipherText />} />'
              <Route path='/polarity' element={<SentimentAnalysis />} />'
              <Route path='/polarityvisualize' element={<MachineLearning />} />'
              <Route path='/visualize' element={<Visualisation />} />
              <Route path='/homeadmin' element={<HomeAdmin />}></Route>
              <Route path='/home' element={<Home />}></Route>
              <Route path='/chat' element={user ? <Chat /> : <SignIn />} />
            
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
