import React, { useContext } from "react";
import { Box, Button, FormGroup } from "@mui/material";
import { RoomContext } from "../RoomContext";
import { socket } from "../App";

const RoomSetter = ({onClick}) => {
  const { talkingRoom, setTalkingRoom } = useContext(RoomContext);
  const joinRoom = () => {
    if (talkingRoom !== "") {
      socket.emit("join_room", talkingRoom);
      onClick()
    }
  };
  return (
    <FormGroup>
      <Box display="flex" justifyContent="space-between" height={30} mb={4}>
        <input
          required
          placeholder="join the room"
          value={talkingRoom}
          onChange={(e) => setTalkingRoom(e.target.value)}
        />
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={joinRoom}
        >
          join the room
        </Button>
      </Box>
    </FormGroup>
  );
};

export default RoomSetter;
