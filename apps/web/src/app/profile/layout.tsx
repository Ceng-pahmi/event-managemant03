import React from 'react';
import { ProfilePopup } from '../../components/profilePopup'; // Import the popup component

const ProfilePage = () => {
  const [isPopupOpen, setPopupOpen] = React.useState(false);

  const handlePopupToggle = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      <button onClick={handlePopupToggle}>Edit Profile</button>
      
      {isPopupOpen && <ProfilePopup onClose={handlePopupToggle} />}
    </div>
  );
};

export default ProfilePage;