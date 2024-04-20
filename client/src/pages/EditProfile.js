import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Logout, Person2Outlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ProfilePopUp from "../components/PopUps/ProfilePop"; // Assuming this is a custom component for profile editing
import { useNavigate } from "react-router-dom";
import { TokenStatusContext } from "../context/tokenStatus";
import { StateContext } from "../context/States";
import { FrontAuthContext } from "../context/front-auth";

export default function ActionAreaCard() {
  const navigate = useNavigate();
  const { deleteAuthTokenCookie } = TokenStatusContext();
  const { userDocument } = StateContext();
  const {handleExistingUserData} = FrontAuthContext()
  const { name, email, picture } = userDocument;

  const [popUp, setPopUp] = useState(false);

  function handleLogout() {
    deleteAuthTokenCookie();
    handleExistingUserData()
    navigate("/login");
  }

  function handleSubmit() {
    setPopUp(true);
  }

  return (
    <div className="flex justify-center items-center mt-5">
      <Card className="p-2">
        <CardActionArea className="flex-col justify-center">
          <Avatar
            alt="profile picture"
            src={picture}
            sx={{ width: 250, height: 250, margin: "auto" }} 
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <EmailOutlinedIcon sx={{ marginRight: 1 }} />
              {email ? email : ""}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Person2Outlined sx={{ marginRight: 1 }} />
              {name ? name : ""}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div className="flex justify-between gap-8 p-4"> 
          <Button
            onClick={handleSubmit}
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{
              background: "white",
              color : "black",
              borderColor: "black",
              "&:hover": {
                background: "black",
                borderColor: "white",
                color: "white", 
              },
            }}
          >
            Edit Profile
          </Button>
          <ProfilePopUp open={popUp} openState={setPopUp} />
          <Button
            onClick={handleLogout}
            variant="contained"
            startIcon={<Logout />}
            sx={{
              background: "black",
              "&:hover": {
                background: "white",
                color: "black", 
              },
            }}
          >
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
}
