import Recommend from "../components/Recommend"
import { useEffect, useState } from "react"
import "./Home.css"
import Favorites from "../components/Favorites"

const Home = () => {
  return (
    <div className="home-container">
      <Recommend />
      <Favorites />
    </div>
  )
}

export default Home
