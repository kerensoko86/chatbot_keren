import React from "react";
import { Card } from "react-bootstrap";

import "../../styles/UserList.css";

interface UserCardProps {
  user: {
    _id: string;
    username: string;
    imageUrl: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card className="card">
      <Card.Title className="card-title">{user.username}</Card.Title>
      <Card.Img
        variant="top"
        src={user.imageUrl}
        alt={`${user.username}'s image`}
        className="card-image"
      />
    </Card>
  );
};

export default UserCard;
