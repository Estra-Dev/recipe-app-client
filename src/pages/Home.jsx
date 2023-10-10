import axios from "axios"
import { useEffect, useState } from "react"
import {useGetUserId} from "../hooks/useGetUserId"
import { useCookies } from "react-cookie"

const Home = () => {

  useEffect(() => {
    getRecipes()
    getSavedRecipe()
  },[])

  const [cookies, ] = useCookies(['access_token'])

  const [recipes, setRecipes] = useState([])  
  const [savedRecipes, setSavedRecipes] = useState([])
  const [saveBtn, setSaveBtn] = useState(false)  
  const userId = useGetUserId()

  const getRecipes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_RECIPE_API}/recipes`)
      console.log(response.data)

      setRecipes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getSavedRecipe = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_RECIPE_API}/recipes/savedrecipes/id/${userId}`)
      setSavedRecipes(response.data.savedRecipes)
      console.log(response.data.savedRecipes)
    } catch (error) {
      console.log(error)
    }
  } 

  console.log(`${import.meta.env.VITE_RECIPE_API}`)

  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_RECIPE_API}/recipes`, {recipeId, userId}, {
        headers: {authorization: cookies.access_token}
      })
      console.log(response)
      setSavedRecipes(response.data.saveRecipes)
      setSaveBtn(true)
    } catch (error) {
      console.log(error)
    }
  }

  // const isRecipeSaved = (id) => savedRecipes.includes(id)

  return (
    <div>
      <h1 className=" mt-3 font-medium text-center text-2xl">Awesome Recipes</h1>
      {
        recipes.map(recipe => (
          <div key={recipe._id} className=" flex flex-col items-center gap-3 w-[100%] md:w-[40%] mx-auto p-3 px-5 pt-6 bg-white border-b-2 border-solid">
            <div className=" w-[100%] flex flex-col items-start md:justify-between md:items-center md:flex-row gap-3">
              <h1 className=" font-semibold text-xl">{recipe.name}</h1>
              <button onClick={() => saveRecipe(recipe._id)}  className=' bg-red-500 text-center p-3 rounded-md text-white font-semibold text-[13px]' disabled={saveBtn === true}>{saveBtn === true ? "Saved" : "Save"}</button>
            </div>
            <div>
              <h4 className=" text-center font-bold">Instructions:</h4>
              <p className=" mt-3 text-[16px] font-medium">{recipe.instructions.slice(0, 100)}</p>
            </div>
            <img src={recipe.imageUrl} alt="" className="img w-[100%]" />
            <p className=" text-[11px] pt-2 text-gray-500 font-semibold">Cooking Time: {recipe.cookingTime} (minutes)</p>
          </div>
        ))
      }
    </div>
  )
}

export default Home