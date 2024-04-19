import React, { useContext, createContext } from "react";
import { TokenStatusContext } from "./tokenStatus";

const EditProfile = createContext();

export function EditProfileContextFunc(props) {
  const { getAuthToken } = TokenStatusContext();

  // Function to upload the choosen image by the user into cloudinary.
  async function saveImage(image) {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "myCloud");
    data.append("cloud_name", "doz9uitd2");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/doz9uitd2/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const cloudData = await res.json();
      console.log(cloudData.url);
      return cloudData.url;
    } catch (error) {
      console.error("Internal Servor error:", error.message);
    }
  }

  // Route : To edit the profile of the existing user.
  async function handleEditProfile(name, picture) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/editProfile/edit-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": getAuthToken(),
          },
          body: JSON.stringify({ name, picture }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return { success: true, message: "profile updated successfully" };
    } catch (error) {
      console.error("Error creating user:", error.message);
      return { success: false, message: error.message };
    }
  }
  return (
    <EditProfile.Provider value={{ saveImage, handleEditProfile }}>
      {props.children}
    </EditProfile.Provider>
  );
}

export function EditProfileContext() {
  return useContext(EditProfile);
}
