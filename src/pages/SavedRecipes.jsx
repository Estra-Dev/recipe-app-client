import axios from "axios"
import { useEffect, useState } from "react"
import {useGetUserId} from "../hooks/useGetUserId"

const SavedRecipes = () => {

  const userId = useGetUserId()

  useEffect(() => {
    fetchRecipes()
  }, [])

  const [savedRecipes, setSavedRecipes] = useState([])

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/recipes/savedrecipes/${userId}`)
      console.log(response)
      setSavedRecipes(response.data.savedRecipes)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <h1>Saved Recipes</h1>
      {
        savedRecipes.map(recipe => (
          <div key={recipe._id} className=" flex flex-col items-center gap-3 w-[100%] md:w-[45%] mx-auto p-3 px-5 pt-6 bg-white border-b-2 border-solid">
            <div className=" w-[100%] flex items-center justify-between gap-3">
              <h1 className=" font-bold text-2xl">{recipe.name}</h1>
            </div>
            <div>
              <h4 className=" text-center font-bold">Instructions:</h4>
              <p className=" mt-3 text-[16px] font-medium">{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt="" className="img w-[75%]" />
            <p className=" text-[11px] pt-2 text-gray-500 font-semibold">Cooking Time: {recipe.cookingTime} (minutes)</p>
          </div>
        ))
      }
    </div>
  )
}

export default SavedRecipes