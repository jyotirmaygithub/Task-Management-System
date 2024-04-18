import React, { useState } from "react";
import { UserTasks } from "../context/TaskContext";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/system";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import PopUp from "../components/PopUps/EditTask";
import Warning from "../components/PopUps/Warning";
import Assign from "../components/PopUps/Assign";
import { useLocation } from "react-router-dom";

export default function TaskLayout({ task }) {
  const location = useLocation();
  // const { handleDeleteTask } = UserTasks();
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  const StyledCard = styled(Card)({
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease",
    "&:hover": {
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
    },
  });

  const colors = {
    work: "#8D6E63",
    money: "#43A047",
    todos: "#1976D2",
    reminders: "#D32F2F",
    default: "#009688",
  };

  const getUsernameColor = () => {
    return task.tag ? colors[task.tag] : colors.default;
  };

  return (
    <>
      <div className="mx-4 my-3 w-[80vw]">
        <StyledCard elevation={0}>
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  backgroundColor: getUsernameColor(),
                }}
              >
                {task.tag && task.tag[0].toUpperCase()}
              </Avatar>
            }
            action={
              <div>
                {location.pathname !== "/all-created-tasks" &&
                  !task.assignedTo && (
                    <Assign taskId={task._id}>
                      <CheckIcon />
                    </Assign>
                  )}

                {location.pathname !== "/all-created-tasks" &&
                  location.pathname !== "/Tasks" && (
                    <IconButton>
                      <Warning taskId={task._id} />
                    </IconButton>
                  )}

                {location.pathname !== "/all-created-tasks" &&
                  location.pathname !== "/Tasks" && (
                    <IconButton onClick={handleOpen}>
                      <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                  )}
                <PopUp entireTask={task} open={open} openState={setOpen} />
              </div>
            }
            title={
              <Typography variant="h6" component="div">
                {task.title}
              </Typography>
            }
            subheader={task.tag}
          />
          <CardContent>
            <div
              style={{
                marginBottom: "8px",
                padding: "8px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                <span style={{ fontWeight: "bold" }}>Created by:</span>{" "}
                <span style={{ color: getUsernameColor() }}>
                  {task.username}
                </span>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <span style={{ fontWeight: "bold" }}>Assigned to:</span>{" "}
                {task.assignedTo ? task.assignedTo : "Not Assigned"}
              </Typography>
            </div>
            <Typography variant="body2" color="textSecondary">
              {task.description}
            </Typography>
          </CardContent>
        </StyledCard>
      </div>
    </>
  );
}
