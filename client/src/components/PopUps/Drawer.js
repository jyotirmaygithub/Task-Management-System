import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar } from "@mui/material";
import { StateContext } from "../../context/States";
import {
  ContactSupport,
  Info,
  Logout,
  AssignmentIndOutlined,
  Person2Outlined,
  MenuOutlined,
  AssignmentTurnedInOutlined,
  WorkHistoryOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { TokenStatusContext } from "../../context/tokenStatus";

export default function AnchorTemporaryDrawer() {
  const navigate = useNavigate();
  const { userDocument } = StateContext();
  const { checkCookie, deleteAuthTokenCookie } = TokenStatusContext();
  const [state, setState] = React.useState({});

  const toggleDrawer = (anchor, open) => async (event) => {
    if (!checkCookie()) {
      navigate("/login");
    } else {
      setState({ ...state, [anchor]: open });
    }
  };

  function handleClick(value) {
    if (value === "Logout") {
      deleteAuthTokenCookie();
      navigate(`/login`);
    } else if (value === "View Profile") {
      navigate(`/account/${userDocument.name}`);
    } else if (value === "editProfile") {
      navigate(`/account/edit-profile`);
    } else if (value === "Assigned Tasks") {
      navigate(`/assigned-unassigned-tasks/${userDocument.name}`);
    } else if (value === "Task Archive") {
      navigate(`/task-archieve`);
    } else if (value === "My Created Tasks") {
      navigate(`/my-tasks/${userDocument.name}`);
    } else {
      navigate(`/${value}`);
    }
  }
  const icons = [
    <Person2Outlined />,
    <AssignmentTurnedInOutlined />,
    <AssignmentIndOutlined />,
    <WorkHistoryOutlined />,
  ];
  const iconCount = icons.length;
  const icons2 = [<Logout />];
  const iconCount2 = icons.length;

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="grid justify-center items-center my-2 space-y-2">
        <Avatar
          src={userDocument.picture}
          sx={{ width: 150, height: 150 }}
          alt="User Avatar"
        />
        <Button
          sx={{
            background: "black",
            "&:hover": {
              background: "white",
              border: "2px solid black",
              color: "black", // Change text color to white on hover
            },
          }}
          variant="contained"
          onClick={(e) => handleClick("editProfile")}
        >
          Edit Profile
        </Button>
      </div>
      <List>
        {[
          "View Profile",
          "My Created Tasks",
          "Assigned Tasks",
          "Task Archive",
        ].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => handleClick(text)}>
            <ListItemButton>
              <ListItemIcon>{icons[index % iconCount]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {[ "Logout"].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => handleClick(text)}>
            <ListItemButton>
              <ListItemIcon>{icons2[index % iconCount2]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key="avatar">
        <Button className="space-x-2" onClick={toggleDrawer("avatar", true)}>
          {/* Render your Avatar component here */}
          <MenuOutlined sx={{ color: "black" }} />
          <Avatar src={userDocument.picture} alt="User Avatar" />
        </Button>
        <Drawer
          anchor="right"
          open={state["avatar"]}
          onClose={toggleDrawer("avatar", false)}
        >
          {list("avatar")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
