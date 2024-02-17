import React from "react";

interface UserAvatarProps {
  imageUrl: string;
  alt: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ imageUrl, alt }) => (
  <img
    src={imageUrl}
    alt={alt}
    className="user-image me-2"
    id="list-group-item-img"
  />
);

export default UserAvatar;
