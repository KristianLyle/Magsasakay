import {useState} from 'react';
import {Link, useHistory} from  'react-router-dom';
import './index.css';
import Axios from 'axios';

const Login = () => {
    const [userEmail,setUserEmail]= useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    // const history = useHistory(); // Create a history object

    const login = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:8000/login", {
          email: userEmail,
          password: userPassword,
        }).then((response) => {
          if(response.data.message){
            setLoginStatus(response.data.message);
          }else{
            setLoginStatus(response.data[0].email);
            // history.push('/home'); // Redirect to home page
          }
        })
      }

    return ( 
        <div>
            <div className="container">
                <h1>Login to Continue</h1>
                <form className="loginForm">
                    <label className = 'text-left' for='email'>Email</label> <br></br>
                    <input className =' border border-black p-1 border-lg'
                        type='email' 
                        placeholder='Enter email here' 
                        required
                        value= {userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    /> <br></br>
                    <label className= '' for='password'>Password</label> <br></br>
                    <input className = 'border border-black p-1 border-lg pb-1'
                        type='password' 
                        placeholder='Enter password here'
                        required
                        value = {userPassword}
                        onChange = {(e) => setUserPassword(e.target.value)}
                    /> <br></br> <br></br>
                    <div className="createAccount">
                        <p> Don't have an account yet?</p> <Link className='underline' to='/SignUp'> Click Here! </Link>
                    </div> <br></br>
                    <button class = 'text-center rounded-full bg-red-500 px-5' onClick={login}> Login </button> <br></br>
                    <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{loginStatus}</h1>
                </form>
            </div>
        </div>
     );
}
 
export default Login ;