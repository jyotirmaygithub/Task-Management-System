import React from "react";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    // <div>
      <div className="flex items-center gap-1 cursor-pointer" onClick={handleClick}>
        <AssignmentOutlinedIcon
          className="h-8 w-8 md:h-10 md:w-10"
          sx={{ color: "blue" }}
        />

        <span className="hidden text-2xl font-bold text-blue-400 md:block">
          Tasks
        </span>
      </div>
    // </div>
  );
}
