import React from "react";
import Sender from "./components/Sender";
import { Box, CssBaseline } from "@mui/material";
import io from "socket.io-client";
import RoomSetter from "./components/RoomSetter";

export const socket = io.connect("http://localhost:8080");

function App() {
  return (
    <Box
      ml={"auto"}
      mr={"auto"}
      maxWidth={400}
      p={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"

    >
      <CssBaseline />
      <RoomSetter />
      <Sender />
    </Box>
  );
}

export default App;
