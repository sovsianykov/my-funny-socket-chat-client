import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { RoomContext } from "../RoomContext";
import { socket } from "../App";
import { useContext } from "react";

export default function RoomSet() {
  const [open, setOpen] = React.useState(false);
  const { talkingRoom, setTalkingRoom } = useContext(RoomContext);

  const joinRoom = () => {
    if (talkingRoom !== "") {
      socket.emit("join_room", talkingRoom);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    joinRoom();
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} sx={{ marginBottom:"10px"}} >
        {!!talkingRoom ? `room ${talkingRoom}` : `choose your room`}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose your room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="room"
            type="text"
            fullWidth
            variant="standard"
            value={talkingRoom}
            onChange={e => setTalkingRoom(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
