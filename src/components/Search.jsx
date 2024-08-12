import "./Search.css"
import { React, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { Button, TextField, Autocomplete, MenuItem, Chip } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import SearchIcon from "@mui/icons-material/Search"

const categories = [
  "Breakfast",
  "Brunch",
  "Lunch",
  "Beverage",
  "Appetizer",
  "Soup",
  "Salad",
  "Beef",
  "Poultry",
  "Pork",
  "Seafood",
  "Vegetarian",
  "Vegan",
  "Starter",
  "Side Dish",
  "Pasta",
  "Condiment",
  "Sauce",
  "Seasoning",
  "Dessert",
  "Bread",
]

const Search = () => {
  const [searchInput, setSearchInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState([])
  const navigate = useNavigate()

  const handleInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let urlPath = "/searched/"

    const joinedCategories = selectedCategory.join("+")
    if (joinedCategories && searchInput) {
      urlPath += `${joinedCategories.toLowerCase()}+${searchInput.replace(/\s+/g, "+").toLowerCase()}`
    } else if (joinedCategories) {
      urlPath += `${joinedCategories.toLowerCase()}`
    } else if (searchInput) {
      urlPath += `${searchInput.replace(/\s+/g, "+").toLowerCase()}`
    }

    navigate(urlPath)
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <Autocomplete
          sx={{ m: 1, width: 300 }}
          multiple
          className="select-category"
          options={categories}
          value={selectedCategory}
          onChange={(event, newValue) => {
            setSelectedCategory(newValue)
          }}
          disableCloseOnSelect
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Categories"
              placeholder="Categories"
            />
          )}
          renderOption={(props, category, { selected }) => (
            <MenuItem
              {...props}
              key={category}
              value={category}
              sx={{ justifyContent: "space-between" }}
            >
              {category}
              {selected ? (
                <CheckIcon color="info" key={`${category}-selected`} />
              ) : null}
            </MenuItem>
          )}
        />
        <TextField
          className="search-field"
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={searchInput}
          onChange={handleInput}
        />
        <Button
          className="s-btn"
          type="submit"
          variant="outlined"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </form>
    </div>
  )
}

export default Search
