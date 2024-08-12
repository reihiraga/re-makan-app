import { useEffect, useState } from "react"
import Modal from "../components/Modal"
import "./Recipe.css"
import { useParams, useNavigate } from "react-router-dom"
import { API_KEY } from "../assets/API_KEY"
import { useQuery } from "@tanstack/react-query"
import {
  Button,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { MdFavorite, MdFavoriteBorder } from "react-icons/md"

const Recipe = () => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [active, setActive] = useState("summary")
  const navigate = useNavigate()
  const params = useParams()

  const {
    isLoading,
    isError,
    data: details,
    error,
  } = useQuery(["recipes", params.name], async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${API_KEY}`,
    )
    if (!response.ok) throw new Error("Network response was not ok")
    return response.json()
  })

  useEffect(() => {
    const currentFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    )
    const isFavorited = currentFavorites.some((fav) => fav.id === details?.id)
    setIsFavorite(isFavorited)
  }, [details])

  const toggleFavorite = () => {
    const currentFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    )
    let newFavorites

    if (isFavorite) {
      newFavorites = currentFavorites.filter((fav) => fav.id !== details.id)
    } else {
      newFavorites = [...currentFavorites, details]
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  const handleClick = (status) => {
    setActive(status)
  }

  if (isLoading) {
    return (
      <div className="recipe-shimmer-container">
        <div className="recipe-shimmer-left">
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} animation="wave" />
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={300}
            width={500}
          />
        </div>
        <div className="recipe-shimmer-right">
          <div className="btn-shimmer-right">
            <Skeleton
              variant="rounded"
              animation="wave"
              height={35}
              width={120}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              height={35}
              width={120}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              height={35}
              width={120}
            />
          </div>
          <div className="shimmer-content-right">
            <Skeleton
              variant="text"
              sx={{ fontSize: "2.5rem" }}
              animation="wave"
            />
            <div className="text-container-shimmer">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
                animation="wave"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="recipe-container-main">
      <h1>{details?.title}</h1>
      <p></p>
      <div className="recipe-container">
        <div className="recipe-container-left">
          <img src={details?.image} className="recipe-imgs" />
        </div>
        <div className="recipe-container-right">
          <div className="btn-container">
            <Button
              variant="contained"
              onClick={() => handleClick("summary")}
              disabled={active === "summary" ? true : false}
            >
              Summary
            </Button>
            <Button
              variant="contained"
              onClick={() => handleClick("ingredients")}
              disabled={active === "ingredients" ? true : false}
            >
              Ingredients
            </Button>
            <Button
              variant="contained"
              onClick={() => handleClick("steps")}
              disabled={active === "steps" ? true : false}
            >
              Steps
            </Button>
            <Button
              className="f-button"
              variant="contained"
              onClick={() => {
                {
                  isFavorite ? setShowModal(true) : toggleFavorite()
                }
              }}
            >
              Favorite
              {isFavorite ? (
                <MdFavorite size={18} />
              ) : (
                <MdFavoriteBorder size={18} />
              )}
            </Button>
            {showModal ? (
              <Modal>
                <Dialog open={showModal} keepMounted>
                  <DialogTitle style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {"Confirmation"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Are you sure to remove {details?.title} from favorites?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <Button onClick={() => setShowModal(false)}>No</Button>
                    <Button
                      onClick={() => {
                        const currentFavorites = JSON.parse(
                          localStorage.getItem("favorites") || "[]",
                        )
                        const newFavorites = currentFavorites.filter(
                          (fav) => fav.id !== details.id,
                        )
                        localStorage.setItem(
                          "favorites",
                          JSON.stringify(newFavorites),
                        )
                        setShowModal(false)
                        setIsFavorite(false)
                      }}
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </Modal>
            ) : null}
          </div>
          {active === "summary" && (
            <div className="recipe-right-main">
              <div className="summary">
                <h2>Summary</h2>
                <p dangerouslySetInnerHTML={{ __html: details?.summary }}></p>
              </div>
              <div className="instructions">
                <h2>Instructions</h2>
                <p
                  dangerouslySetInnerHTML={{ __html: details?.instructions }}
                ></p>
              </div>
            </div>
          )}
          {active === "ingredients" &&
            details?.extendedIngredients.map((data) => (
              <div className="ingredient-bar" key={data?.id}>
                <h3 className="ingredients-h3">
                  <p>{data?.name}</p>
                  <p> {data?.amount} grams</p>
                </h3>
              </div>
            ))}
          {active === "steps" && (
            <div className="steps">
              <h1>Steps</h1>
              {details?.analyzedInstructions[0]?.steps.map((data) => (
                <div className="step" key={data?.step}>
                  <h2>Step - {data?.number}</h2>
                  <p>{data?.step}</p>
                  <h4>Ingredients - {data?.ingredients[0]?.name}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Recipe
