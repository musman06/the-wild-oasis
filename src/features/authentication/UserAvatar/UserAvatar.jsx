import useUser from "../useUser";
import "./useravatar.css";

const UserAvatar = () => {
  const { user } = useUser();

  return (
    <div className="user-avatar">
      <img
        className="user-avatar-image"
        src={user.user_metadata.avatar || "/default-user.jpg"}
      />
      <p>{user.user_metadata.fullName}</p>
    </div>
  );
};

export default UserAvatar;
