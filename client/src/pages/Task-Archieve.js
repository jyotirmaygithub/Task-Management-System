import React, { useEffect } from "react";
import { UserTasks } from "../context/TaskContext";
import Task from "../Layout/TaskLayout";
import { Grid, Typography } from "@mui/material";
import { WarningRounded } from "@mui/icons-material";

export default function ExitingTasks() {
  const { tasks, fetchAllTasks } = UserTasks();

  // To show all the existing tasks to the client
  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center  items-center my-4 mx-4 space-y-5">
      <h2 className="text-lg font-semibold mb-3 border-b-2 border-green-500">
               Task Archieve
            </h2>
        {/* Render tasks */}
        {tasks.length > 0 ? (
          tasks.map((data) => (
            <Task task={data} key={data._id} />
          ))
        ) : (
          <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          mt={8}
        >
          <WarningRounded sx={{ fontSize: 72, color: "gray" }} />
          <Typography
            variant="h6"
            component="h2"
            mt={4}
            color="textSecondary"
          >
            No tasks found
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            mt={2}
            textAlign="center"
          >
            Currently, there are no available tasks. Please check back later
            or keep an eye out for new tasks.
          </Typography>
        </Grid>
        )}
      </div>
    </>
  );
}
