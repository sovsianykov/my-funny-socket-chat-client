import React, { useContext, useEffect, useState } from "react";
import { Box, Button, FormGroup, styled, TextField } from "@mui/material";
import { socket } from "../App";
import { RoomContext } from "../RoomContext";

const AnswerWrapper = styled(Box)`
  min-height: 100px;
  margin-top: 10px;
  padding: 20px;
  width: 100%;
  box-shadow: 0 0 10px #b4b3b3;
  background: antiquewhite;
  border-radius: 10px;
  letter-spacing: 0.06rem;
  display: flex;
  flex-direction: column;
  height: 60vh;
  overflow-y: scroll;
  margin-bottom: 20px;

  .received {
    color: #ffffff;
    background: #5b5be0;
    border-radius: 20px;
    padding: 5px 10px;
    align-self: flex-start;
  }

  .sent {
    color: #ffffff;
    background: #b04f07;
    border-radius: 20px;
    padding: 5px 10px;
    align-self: flex-end;
  }
`;

const Sender = () => {
  const [sentMessage, setMessage] = useState({ sent: false, message: "" });
  const [responses, setResponses] = useState([]);
  const { talkingRoom } = useContext(RoomContext);
  const sendMessage = () => {
    if (sentMessage.message) {
      const text = sentMessage.message;
      socket.emit("send_message", { text, talkingRoom });
      setResponses((r) => r.concat([{ sent: true, message: text }]));

      setTimeout(() => setMessage({ sent: false, message: "" }), 1000);
    } else {
      alert("Input some message!");
    }
  };
  console.log(responses);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setResponses((r) => r.concat([{ sent: false, message: data.text }]));
    });
  }, [socket]);
  return (
    <FormGroup onSubmit={sendMessage}>
      <AnswerWrapper>
        {!!responses.length &&
          responses.map((r, i) => {
            if (r.sent) {
              return (
                <p key={i} className="sent">
                  {r.message}
                </p>
              );
            } else {
              return (
                <span key={i} className="received">
                  {r.message}
                </span>
              );
            }
          })}
      </AnswerWrapper>
      <TextField
        style={{
          position: "fixed",
          bottom: 80,
          margin:"0 auto" ,
          width: 340,
          background: "antiquewhite",
          padding: 5,
        }}
        variant="outlined"
        placeholder="Input the message..."
        value={sentMessage.message}
        onChange={(e) => setMessage({ sent: true, message: e.target.value })}
      />
      <Button
        type="submit"
        style={{ position: "fixed", bottom: 10 }}
        onClick={sendMessage}
        sx={{ marginTop: 2 }}
        variant="contained"
      >
        Submit
      </Button>
    </FormGroup>
  );
};

export default Sender;
