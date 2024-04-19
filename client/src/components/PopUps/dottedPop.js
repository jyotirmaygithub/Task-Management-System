import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { AssignmentTurnedInOutlined, PersonOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/States";

export default function BasicPopover() {
  const navigate = useNavigate();
  const { userDocument } = StateContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRoutes = (value) => {
    if (value === "/my-tasks") {
      navigate(`/my-tasks/${userDocument.name}`);
    } else {
      navigate(`/account/edit-profile`);
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <MoreHorizOutlinedIcon
        className="relative left-[245px] cursor-pointer"
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
          onClick={() => handleRoutes()}
        >
          Edit Profile
          <PersonOutline />
        </Typography>
        <hr />
        <Typography
          className="p-2 gap-2 hover:underline cursor-pointer flex justify-center items-center"
          onClick={() => handleRoutes("/my-tasks")}
        >
          My tasks
          <AssignmentTurnedInOutlined  />
        </Typography>
      </Popover>
    </div>
  );
}
