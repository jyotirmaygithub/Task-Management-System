import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { HotelOutlined, PersonOutline } from "@mui/icons-material";
import { StateContext } from "../../context/States";

export default function BasicPopover() {
  const navigate = useNavigate();
  const { userDocument } = StateContext();
  console.log("userdocument = " , userDocument)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRoutes = (value) => {
    if (value === "/booking") {
      navigate(`${value}/${userDocument.name}`);
    } else {
      navigate(`${value}`);
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <MoreHorizOutlinedIcon
        className="relative left-[220px] cursor-pointer"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Typography
          className="p-2 gap-2 hover:underline cursor-pointer flex justify-center items-center"
          onClick={() => handleRoutes("/account/edit-profile")}
        >
          Edit Profile
          <PersonOutline className="text-green-800 text-xl" />
        </Typography>
        <hr />
        <Typography
          className="p-2 gap-2 hover:underline cursor-pointer flex justify-center items-center"
          onClick={() => handleRoutes("/booking")}
        >
          Bookings
          <HotelOutlined className="" />
        </Typography>
      </Popover>
    </div>
  );
}
