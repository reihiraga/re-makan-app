import Home from "./Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Search from "../components/Search"
import Searched from "./Searched"
import Recipe from "./Recipe"
import Header from "../components/Header"

const Pages = () => {
  return (
    <Router>
      <Header />
      <div className="pages-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search />
                <Home />
              </>
            }
          ></Route>
          <Route
            path="/searched/:search"
            element={
              <>
                <Search />
                <Searched />
              </>
            }
          ></Route>
          <Route
            path="/searched/:search/recipe/:name"
            element={<Recipe />}
          ></Route>
          <Route path="recipe/:name" element={<Recipe />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default Pages
