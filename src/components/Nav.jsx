import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

const Nav = () => {

  const [cookies, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()

  const logout = () => {
    setCookies('access_token', '')
    window.localStorage.removeItem('access_token')
    navigate("/login")
  }

  return (
    <div className=" w-[100%] bg-black px-[1%] md:px-[5%] py-[.5%] flex justify-center items-center text-white">
      <div className=" text-left w-[20%]">
        <Link to={"/"}>
          <h1 className=" text-white text-2xl">Recipe</h1>
        </Link>
      </div>
      <div className=" w-[70%] flex justify-end gap-5 text-[12px]">
        {!cookies.access_token ? (
          <>
            <Link to={'/login'}>
              <p>Login</p>
            </Link>
            <Link to={'/register'}>
              <p>Register</p>
            </Link>
          </>
        ) : <div className=" w-[70%] flex justify-end gap-5 text-[12px]">
              <button onClick={logout}>LogOut</button>
              <div className=" flex justify-end gap-5">
                <Link to={"/create-recipe"}>Create Recipe</Link>
                <Link to={"/saved-recipe"}>Saved Recipes</Link>
              </div>
            </div> }
      </div>
    </div>
  )
}

export default Nav