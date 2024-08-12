import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import RecipeCard from "../components/RecipeCard"
import "./Searched.css"
import { API_KEY } from "../assets/API_KEY"
import { Skeleton } from "@mui/material"
import { useQuery } from "@tanstack/react-query"

const Searched = () => {
  const params = useParams()
  const {
    isLoading,
    isError,
    data: searchedRecipes,
  } = useQuery(
    ["searched", params.search],
    async () => {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${params.search}`,
      )
      if (!data.ok) throw new Error("Failed to fetch searched recipes")
      return data.json().then((json) => json.results)
    },
    {
      enabled: !!params.search,
    },
  )

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
    <div className="searched-container">
      {searchedRecipes.map((data) => (
        <RecipeCard data={data} key={data.id} />
      ))}
    </div>
  )
}

export default Searched
