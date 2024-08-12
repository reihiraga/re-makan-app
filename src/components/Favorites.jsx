import RecipeCard from "./RecipeCard"
import { useState, useEffect } from "react"
import "./Favorites.css"
import Clear from "./clearFavorites"

const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  return (
    <div className="favorite-container">
      <div className="f-header-wrapper">
        <h1>Favorites</h1>
        <Clear />
      </div>
      <div className="f-grid-layout">
        {favorites.map((favorite) => (
          <RecipeCard key={favorite.id} data={favorite} />
        ))}
      </div>
    </div>
  )
}

export default Favorites
