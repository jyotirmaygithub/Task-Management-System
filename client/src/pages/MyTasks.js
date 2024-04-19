import React, { useEffect, useState } from "react";
import { Button, Typography, Grid, Box, CircularProgress } from "@mui/material";
import { AddBoxOutlined } from "@mui/icons-material";
import Task from "../Layout/TaskLayout";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserTasks } from "../context/TaskContext";
import { TokenStatusContext } from "../context/tokenStatus";

export default function ExitingTasks() {
  const navigate = useNavigate();
  const { getAuthToken } = TokenStatusContext();
  const { tasks, fetchAllTasks } = UserTasks();
  const [userId, setUserId] = useState(null); // State to store user ID
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllTasks();
    const authToken = getAuthToken();
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      setUserId(decodedToken.newUser.id);
    }
  }, []);

  // Filter tasks based on whether they are created by the user
  const userTasks = tasks.filter((task) => task.user === userId);

  useEffect(() => {
    if (tasks.length > 0) setLoading(false);
  }, [tasks]);

  function handleCreateTask() {
    navigate("/");
  }
  return (
    <>
      <Box  p={4} >
        <Grid container spacing={3} justifyContent="center" className="mt-10">
          {loading ? (
            <CircularProgress sx={{ color: "black" }} />
          )
           : userTasks.length > 0 ? (
            userTasks.map((data) => (
              <Grid item key={data._id}>
                <Task task={data} />
              </Grid>
            ))
          ) 
          : (
            <Grid item>
              <Typography variant="h6" gutterBottom>
                No tasks found
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Click on the{" "}
                <Button onClick={handleCreateTask} color="primary">
                  <AddBoxOutlined sx={{ color: "black" }} />
                </Button>{" "}
                button to create a new task.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}
