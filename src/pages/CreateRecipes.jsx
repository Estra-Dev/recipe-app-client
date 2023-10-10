import { useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useGetUserId } from "../hooks/useGetUserId"
import {useCookies} from "react-cookie"

const CreateRecipes = () => {

  const [cookies, ] = useCookies(['access_token'])

  const navigate = useNavigate()
  const userID = useGetUserId()


  const [recipes, setRecipes] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID
  })

  const {name, ingredients, instructions, imageUrl, cookingTime} = recipes

  const handleChange = (ev) => {
    const {name, value} = ev.target
    setRecipes({...recipes, [name]: value})

    console.log(recipes)
  }

  const handleIngredientChange = (ev, idx) => {
    const {value} = ev.target
    const ingredients = recipes.ingredients
    ingredients[idx] = value

    setRecipes({...recipes, ingredients})

    console.log(recipes)
  }

  const addIngredient = () => {
    setRecipes({...recipes, ingredients: [...recipes.ingredients, ""]})
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_RECIPE_API}/recipes`, recipes, {
        headers: {authorization: cookies.access_token}
      })
      alert("recipe created");

      navigate("/")
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=' w-full flex justify-center items-center bg-slate-200 h-screen px-4'>
      <form onSubmit={onSubmit} className=' w-[100%] md:w-[50%] bg-white py-[2%] px-[3%] rounded-md form'>
        <div className=' flex flex-col border p-2 rounded-md'>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Name" value={name} onChange={handleChange} className=' py-3 px-0 outline-none' />
        </div>
        <div className=' flex flex-col border p-2 rounded-md mt-2'>
          <label htmlFor="ingredients">Ingredients</label>
          {
            ingredients.map((ingredient, idx) => (
              <input key={idx} type="text" name="ingredients" value={ingredient} placeholder="Add ingredient" onChange={(ev) => handleIngredientChange(ev, idx)} className=' py-3 px-0 outline-none' />
            ))
          }
          <button onClick={addIngredient} type="button">Add ingredient</button>
        </div>
        <div className=' flex flex-col border p-2 rounded-md mt-2'>
          <label htmlFor="instructons">Instructons</label>
          <textarea name="instructions" id="instructions" value={instructions} placeholder="Instruction" onChange={handleChange}></textarea>
        </div>
        <div className=' flex flex-col border p-2 rounded-md mt-2'>
          <label htmlFor="imageUrl">ImageUrl</label>
          <input type="text" name="imageUrl" value={imageUrl} placeholder="imageUrl" onChange={handleChange} />
        </div>
        <div className=' flex flex-col border p-2 rounded-md mt-2'>
          <label htmlFor="cooking_time">Cooking Time</label>
          <input type="number" name="cookingTime" value={cookingTime} placeholder="Cooking time" onChange={handleChange} />
        </div>
        <button type="submit" className=' w-full bg-red-500 text-center p-3 rounded-md mt-1 text-white font-bold text-xl'>Create Recipe</button>
      </form>
    </div>
  )
}

export default CreateRecipes