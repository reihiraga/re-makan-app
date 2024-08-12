import { React, Component } from "react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Modal from "../components/Modal"
import {
  Button,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"

class Clear extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.clearFavorite = this.clearFavorite.bind(this)
  }

  clearFavorite() {
    localStorage.removeItem("favorites")
    window.location.reload()
  }

  render() {
    return (
      <div className="f-btn">
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => this.setState({ showModal: true })}
        >
          <DeleteIcon style={{ color: "black", fontSize: 28 }} />
        </IconButton>
        {this.state.showModal ? (
          <Modal>
            <Dialog open={this.state.showModal} keepMounted>
              <DialogTitle style={{ fontFamily: "'Poppins', sans-serif" }}>
                {"Confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Are you sure to remove all recipes from favorites?
                </DialogContentText>
              </DialogContent>
              <DialogActions style={{ fontFamily: "'Poppins', sans-serif" }}>
                <Button onClick={() => this.setState({ showModal: false })}>
                  No
                </Button>
                <Button
                  onClick={() => {
                    this.setState({ showModal: false })
                    this.clearFavorite()
                  }}
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </Modal>
        ) : null}
      </div>
    )
  }
}

export default Clear
