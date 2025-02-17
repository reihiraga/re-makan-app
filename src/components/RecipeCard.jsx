import "./RecipeCard.css"
import { Link } from "react-router-dom"

const RecipeCard = ({ data }) => {
  return (
    <Link to={"recipe/" + data.id}>
      <div className="recipe-card-container">
        <img src={data.image} className="recipe-img" />
        <h3 className="recipe-p">{data.title}</h3>
        <div className="recipe-gradient"></div>
      </div>
    </Link>
  )
}

export default RecipeCard
