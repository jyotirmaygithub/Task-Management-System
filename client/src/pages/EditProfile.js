import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Logout } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { TokenStatusContext } from "../context/tokenStatus";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../context/States";
import ProfilePopUp from "../components/PopUps/ProfilePop";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import Progress from  "../components/Progress";

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
  async function handleSubmit() {
    setPopUp(true);
  }

  return (
    <div className="flex justify-center items-center">
      <Card className="p-2">
        <CardActionArea className="flex-col justify-center">
          <Avatar
            alt="profile picture"
            src={picture}
            sx={{ width: 250, height: 250 }}
          />
          <CardContent>
            <Typography
              startIcon={<EmailOutlinedIcon />}
              gutterBottom
              variant="h6"
              component="div"
            >
              {email ? email : ""}
            </Typography>
            <Typography
              startIcon={<EmailOutlinedIcon />}
              gutterBottom
              variant="h6"
              component="div"
            >
              {name ? name : ""}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div className="flex justify-between gap-8">
          <Button
            onClick={handleSubmit}
            variant="outlined"
            startIcon={<EditIcon />}
          >
            Edit Profile
          </Button>
          <ProfilePopUp open={popUp} openState={setPopUp} />
          <Button
            onClick={handleLogout}
            variant="contained"
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
}
