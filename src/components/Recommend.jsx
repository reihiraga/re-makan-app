import { useState, useEffect } from "react"
import RecipeCard from "./RecipeCard"
import "@splidejs/splide/dist/css/splide.min.css"
import { Skeleton } from "@mui/material"
import "./Recommend.css"
import Refresh from "./refreshRecommend"
import { API_KEY } from "../assets/API_KEY"
import { useQuery } from "@tanstack/react-query"

const Recommend = () => {
  const [recommend, setRecommend] = useState([])
  const fetchRandomRecipes = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10`,
    )
    if (!api.ok) throw new Error("Failed to fetch random recommend recipes")
    return api.json().then((json) => json.recipes)
  }

  const {
    isLoading,
    isError,
    data: recommendFromApi,
  } = useQuery(["randomRecipes"], fetchRandomRecipes)

  useEffect(() => {
    const check = localStorage.getItem("recommend")
    if (check) {
      setRecommend(JSON.parse(check))
    } else {
      if (recommendFromApi) {
        localStorage.setItem("recommend", JSON.stringify(recommendFromApi))
        setRecommend(recommendFromApi)
      }
    }
  }, [recommendFromApi])

  if (isLoading) {
    return (
      <div className="loading-container">
        {[...Array(10)].map((_, index) => (
          <Skeleton key={index} height={200} width={300} />
        ))}
      </div>
    )
  }

  return (
    <div className="recommend-container">
      <div className="r-header-wrapper">
        <h1>Recommend</h1>
        <Refresh />
      </div>
      <div className="r-grid-layout">
        {recommend.map((recipe) => (
          <RecipeCard key={recipe.id} data={recipe} />
        ))}
      </div>
    </div>
  )
}

export default Recommend
