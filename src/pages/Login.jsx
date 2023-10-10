import { useState } from "react"
import axios from "axios"
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom"

const initialState = {
  username: "",
  password: ""
}

const Login = () => {

  const [details, setDetails] = useState(initialState)
  const {username, password} = details
  // cookies
  const [ , setCookies] = useCookies(['access_token'])

  const navigate = useNavigate()

  const handleChanges = (ev) => {
    const {name, value} = ev.target
    setDetails({...details, [name]: value})

    console.log(details)
  }

  const register = async (data) => {
    await axios.post(`${import.meta.env.VITE_RECIPE_API}/auth/login`, data).then((response) => {

      console.log(response)
      setCookies("access_token", response.data.token)
      window.localStorage.setItem('access_token', response.data.userID)

      navigate("/")
    }).catch(err => console.log(err))
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

    register(details)
  }

  return (
    <div className=' w-full flex flex-col justify-center gap-9 items-center bg-white h-screen'>
      <form onSubmit={handleSubmit} className=' w-[80%] md:w-[40%] bg-white py-[2%] px-[3%] rounded-md form'>
        <h1 className=" text-center mb-9">Login</h1>
        <div className=' flex flex-col border p-2 rounded-md'>
          <label htmlFor="username">Usename</label>
          <input type="text" name="username" value={username} onChange={handleChanges} className=' py-3 px-0 outline-none' />
        </div>
        <div className=' flex flex-col border p-2 rounded-md mt-4'>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={handleChanges} className=' py-3 px-0 outline-none' />
        </div>
        <button className=' w-full bg-red-500 text-center p-3 rounded-md mt-4 text-white font-bold text-xl'>Login</button>
      </form>
    </div>
  )
}

export default Login