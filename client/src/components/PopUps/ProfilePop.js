import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MyStyledTextField from "../myStyledTextField";
import Avatar from "@mui/material/Avatar";
import { StateContext } from "../../context/States";
import { toast } from "react-toastify";
import { EditProfileContext } from "../../context/EditProfile";
import {FrontAuthContext} from "../../context/front-auth"

export default function FormDialog({ open, openState }) {
  const { userDocument } = StateContext();
  const {handleExistingUserData} = FrontAuthContext()
  const { name, picture } = userDocument;
  const [selectedFile, setSelectedFile] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userImage, setuserImage] = useState(null);
  const { saveImage, handleEditProfile } = EditProfileContext();
  // To render the image url into the state, when data of the user get fetch.
  useEffect(() => {
    if (picture) {
      setSelectedFile(picture);
    }
    if (name) {
      setUserName(name);
    }
  }, [userDocument]);

  function onchange(e) {
    setUserName(e.target.value);
  }
  function handleClose() {
    openState(false);
  }
  async function handleEditProfileBtn() {
    openState(false);
    let imageURL = await saveImage(userImage);
    console.log("response = ", imageURL);
    let waiting = returnResponse(await handleEditProfile(userName, imageURL));
    console.log("reply of the waiting = ", waiting);
    handleExistingUserData()
  }
  function returnResponse(response) {
    console.log("what is response = ", response);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Edit Your Profile</DialogTitle>
      <DialogContent className="space-y-4">
        <DialogContentText>
          {" "}
          Click the image below to update your profile picture.{" "}
        </DialogContentText>
        <label htmlFor="avatarInput" className="cursor-pointer">
          <Avatar
            alt="profile picture"
            src={userImage ? URL.createObjectURL(userImage) : picture}
            sx={{ width: 250, height: 250 }}
          />
        </label>
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              if (file.size > 10 * 1024 * 1024) {
                // Check file size (10MB limit)
                // Show error using toastify
                toast.error("File size exceeds 10MB limit");
                return;
              }
              // If conditon is satisfied, set the user image
              setuserImage(file);
            }
          }}
        />
         <DialogContentText>
          {" "}
          Update User Name.{" "}
        </DialogContentText>
        <MyStyledTextField
          margin="normal"
          value={userName}
          required
          fullWidth
          id="username"
          name="username"
          autoComplete="name"
          onChange={onchange}
          autoFocus
        />
      </DialogContent>
      <DialogActions className="mb-3">
        <Button onClick={handleClose} className="text-white bg-black">
          Cancel
        </Button>
        <Button onClick={handleEditProfileBtn} className="text-white bg-black">
          Edit Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
}
