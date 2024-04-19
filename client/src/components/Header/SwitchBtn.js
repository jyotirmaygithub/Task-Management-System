import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { StateContext } from "../../context/States";
import { AssignmentIndOutlined } from "@mui/icons-material";
import { TokenStatusContext } from "../../context/tokenStatus";

export default function SwitchBtn() {
  const userLocation = useLocation();
  const { checkCookie } = TokenStatusContext();
  const navigate = useNavigate();
  const [userSpot, setUserSpot] = useState("Add Note");
  const { userDocument } = StateContext();

  useEffect(() => {
    if (userLocation.pathname === "/") {
      setUserSpot("Assigned Tasks");
    } else {
      setUserSpot("Create Tasks");
    }
  }, []);

  function handleClick() {
    if (!checkCookie()) {
      navigate("/login");
    } else if (userLocation.pathname === "/") {
      navigate(`/assigned-unassigned-tasks/${userDocument.name}`);
    } else {
      navigate(`/`);
    }
  }
  return (
    <div>
      <Button
        onClick={handleClick}
        sx={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "full",
          width: "100%",
          gap: "8px",
          border: "2px solid black",
          padding: "8px",
          "&:hover": {
            backgroundColor: "black",
            color: "white",
          },
        }}
      >
        {userLocation.pathname !== "/create-notes" && <AssignmentIndOutlined />}
        {userSpot}
      </Button>
    </div>
  );
}
