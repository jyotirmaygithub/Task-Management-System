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

export default function ActionAreaCard() {
  const { deleteAuthTokenCookie } = TokenStatusContext();
  const navigate = useNavigate();
  const { userDocument } = StateContext();
  const { name, email, picture } = userDocument;

  const [popUp, setPopUp] = useState(false);

  function handleLogout() {
    deleteAuthTokenCookie();
    navigate("/");
  }

  function handleSubmit() {
    setPopUp(true);
  }

  return (
    <div className="flex justify-center items-center">
      <Card className="p-2">
        <CardActionArea className="flex-col justify-center">
          <Avatar
            alt="profile picture"
            src={picture}
            sx={{ width: 250, height: 250, margin: "auto" }} // Center the avatar
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
        <div className="flex justify-between gap-8 p-4"> {/* Added padding for button container */}
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
                border: "2px solid black",
                color: "white", // Change text color to white on hover
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
                border: "2px solid black",
                color: "black", // Change text color to white on hover
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
