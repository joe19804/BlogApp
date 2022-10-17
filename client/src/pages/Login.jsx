import React, { useContext } from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
  const [inputs, setInputs] = useState ({
    username:"",
    password:"",
  })

  const [err,setError] = useState(null)

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);

  console.log(currentUser)

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e =>{
    e.preventDefault()
    try{
      await login(inputs)
      navigate("/");
    }catch(err){
    setError(err.response.data);
    }
  }

  return (
    <div className='auth'>
        <h1>Login</h1>
        <form>
          <input required type="text" placeholder='username' name="username" onChange={handleChange}/>
          <input required type="password" placeholder='password' name="password" onChange={handleChange}/>
          <button onClick={handleSubmit} >Login</button>
          {err && <p>{err}</p> }
          <span>尚未有帳號?<Link to="/register">註冊</Link></span>
          
        </form>
    </div>
  )
}

export default Login