import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UsernameInput from "./UsernameInput";
import GenderSelect from "./GenderSelect";
import { GenderOptions } from "../../interfaces/gender";
import { getUserImage } from "../../utils/utils";
import { Socket } from "socket.io-client";
import createSocket from "../../utils/socketUtils";
const socket: Socket = createSocket();

interface JoinChatProps {
  setUserList: (event: any) => void;
}

const JoinChat: React.FC<JoinChatProps> = ({ setUserList }) => {
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState<GenderOptions>(GenderOptions.Female);

  const isButtonDisabled = !username || !gender;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleJoinChat({ username, gender });
    setUsername("");
  };

  const handleJoinChat = async (event: any) => {
    const { username, gender } = event;
    const userImage = await getUserImage(gender);
    const user = {
      username,
      imageUrl: userImage,
    };

    if (socket) {
      socket.emit("join", user);
      socket.emit("userList");

      socket.on("userList", async (updatedUserList) => {
        setUserList(updatedUserList);
      });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="text-center"
      style={{ height: "100%", width: "200px" }}
    >
      <UsernameInput
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <GenderSelect
        value={gender}
        onChange={(e) => setGender(e.target.value as GenderOptions)}
      />
      <Button
        variant="primary"
        type="submit"
        className="mt-3 float-end"
        disabled={isButtonDisabled}
      >
        Join Chat
      </Button>
    </Form>
  );
};

export default JoinChat;
