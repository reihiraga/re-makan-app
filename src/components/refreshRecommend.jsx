import { React, Component } from "react"
import IconButton from "@mui/material/IconButton"
import RefreshIcon from "@mui/icons-material/Refresh"

class Refresh extends Component {
  constructor(props) {
    super(props)
    this.refreshRecommend = this.refreshRecommend.bind(this)
  }

  refreshRecommend() {
    localStorage.removeItem("recommend")
    window.location.reload()
  }

  render() {
    return (
      <div className="r-btn">
        <IconButton
          aria-label="delete"
          size="large"
          onClick={this.refreshRecommend}
        >
          <RefreshIcon style={{ color: "black", fontSize: 28 }} />
        </IconButton>
      </div>
    )
  }
}

export default Refresh
