import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UserTasks } from "../context/TaskContext";
import Task from "../Layout/TaskLayout";
import Welcome from "../components/Welcome";
import { TokenStatusContext } from "../context/tokenStatus";
import { Typography, Grid, Box, CircularProgress } from "@mui/material";

export default function ExitingTasks() {
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

  return (
    <>
      <Box p={4}>
        <Welcome />
        <Grid container spacing={3} justifyContent="center">
          {loading ? (
            <CircularProgress />
          ) : userTasks.length > 0 ? (
            userTasks.map((data) => (
              <Grid item key={data._id}>
                <Task task={data} />
              </Grid>
            ))
          ) : (
            <Grid item>
              <Typography variant="h6" gutterBottom>
                No tasks found
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Click on the "+" button to create a new task.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}
