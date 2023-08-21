import React from "react";
import UserProfile from "../features/users/components/UserProfile";
import Navbar from "../features/navbar/Navbar";

function ProfilePage() {
  return (
    <div>
      <Navbar>
        <UserProfile></UserProfile>
      </Navbar>
    </div>
  );
}

export default ProfilePage;
