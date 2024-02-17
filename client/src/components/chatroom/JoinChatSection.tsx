import React from "react";
import JoinChat from "../joinchat/JoinChat";
import UserList from "../users/UserList";
import { User } from "../../interfaces/user";
import "../../styles/ChatRoom.css";

interface JoinChatSectionProps {
  setUserList: React.Dispatch<React.SetStateAction<User[]>>;
  userList: User[];
}

const JoinChatSection: React.FC<JoinChatSectionProps> = ({
  setUserList,
  userList,
}) => {
  return (
    <div className="d-flex " id="united-join-chat-users">
      <div style={{ width: "250px" }}>
        <JoinChat setUserList={setUserList} />
      </div>
      <UserList userList={userList} />
    </div>
  );
};

export default JoinChatSection;
