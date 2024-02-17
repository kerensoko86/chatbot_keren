import React, { useEffect } from "react";
import { Socket } from "socket.io-client";
import createSocket from "../../utils/socketUtils";
import WebSocketService from "../../services/WebSocketService";

import "../../styles/UserList.css";
import UserCard from "./UserCard";

interface UserListProps {
  userList: Array<{
    _id: string;
    username: string;
    imageUrl: string;
  }>;
}

const socket: Socket = createSocket();

const UserList: React.FC<UserListProps> = ({ userList }) => {
  useEffect(() => {
    const handlePageRefresh = async () => {
      try {
        await WebSocketService.sendPageRefresh();
        console.log("WebSocket message sent to delete all users.");
      } catch (error) {
        console.error("Error sending WebSocket message:", error);
      }
    };

    socket.on("refresh-response", (data) => {
      console.log(data.message);
    });

    return () => {
      socket.off("page-refresh", handlePageRefresh);
    };
  }, []);

  return (
    <>
      {userList.length > 0 && <h5>Users</h5>}
      <div className="mt-3" style={{ height: "200px" }}>
        <div className="user-list">
          {userList.map((user) => (
            <div key={user._id}>
              <UserCard user={user} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserList;
