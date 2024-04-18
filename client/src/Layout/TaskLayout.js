import React, { useState } from "react";
import { UserTasks } from "../context/TaskContext";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { styled } from "@mui/system";
import { green, blue, red, brown, teal } from "@mui/material/colors";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import PopUp from "../components/PopUps/EditTask";

function useStyles(n) {
  if (n === "work") {
    return brown[800];
  }
  if (n === "money") {
    return green[500];
  }
  if (n === "todos") {
    return blue[500];
  }
  if (n === "reminders") {
    return red[900];
  } else {
    return teal[700];
  }
}

export default function TaskLayout({ task }) {
  const { handleDeletetask } = UserTasks();

  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  const StyledCard = styled(Card)({});
  const classes = useStyles(task.tag);
  return (
    <>
      <div className="mx-4 my-3 w-72">
        <StyledCard elevation={1}>
          <CardHeader
            avatar={
              <Avatar style={{ backgroundColor: `${classes}` }}>
                {task.tag && task.tag[0].toUpperCase()}
              </Avatar>
            }
            action={
              <div>
                <IconButton onClick={() => handleDeletetask(task._id)}>
                  <DeleteOutlineOutlined className="bg" />
                </IconButton>
                <IconButton onClick={handleOpen}>
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <PopUp entireTask={task} open={open} openState={setOpen} />
              </div>
            }
            title={task.title}
            subheader={task.tag}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {task.description}
            </Typography>
          </CardContent>
        </StyledCard>
      </div>
    </>
  );
}
