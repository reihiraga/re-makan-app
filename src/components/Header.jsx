import "./Header.css"
import { Link } from "react-router-dom"
import { MdOutlineFoodBank } from "react-icons/md"
import { FaBowlFood, FaBowlRice } from "react-icons/fa6"

const Header = () => {
  return (
    <div className="header-container">
      <Link to={"/"}>
        <h1>
          Re-Makan
          <FaBowlFood size={35} />
        </h1>
      </Link>
    </div>
  )
}

export default Header
