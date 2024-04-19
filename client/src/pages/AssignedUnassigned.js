import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UserTasks } from "../context/TaskContext";
import Task from "../Layout/TaskLayout";
import { Grid, Typography } from "@mui/material";
import { WarningRounded } from "@mui/icons-material";
import { TokenStatusContext } from "../context/tokenStatus";

export default function ExitingTasks() {
  const { getAuthToken } = TokenStatusContext();
  const { tasks, fetchAllTasks } = UserTasks();
  const [userId, setUserId] = useState(null); // State to store user ID
  console.log("things are working ");
  useEffect(() => {
    // Decode the JWT token to extract user ID
    fetchAllTasks();
    const authToken = getAuthToken();
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      console.log("authtoken id = ", decodedToken.newUser.id);
      setUserId(decodedToken.newUser.id);
    }
  }, []);
  console.log("numebr of taks ", tasks);
  // Filter tasks based on whether they are assigned to the user
  const assignedTasks = tasks.filter((task) => task.assignedUser === userId);
  const unassignedTasks = tasks.filter((task) => !task.assignedTo);

  return (
    <>
      <div className="flex flex-col justify-center my-4 mx-4 space-y-5">
        {/* Render assigned tasks */}
        {assignedTasks.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b-2 border-blue-500">
              Assigned Tasks
            </h2>
            <div className="flex flex-col justify-center items-center gap-4">
              {assignedTasks.map((data) => (
                <Task task={data} key={data._id} />
              ))}
            </div>
          </div>
        )}

        {/* Render unassigned tasks */}
        {unassignedTasks.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3 border-b-2 border-green-500">
              Unassigned Tasks
            </h2>
            <div className="flex flex-col justify-center items-center gap-4">
              {unassignedTasks.map((data) => (
                <Task task={data} key={data._id} />
              ))}
            </div>
          </div>
        )}

        {/* Show message if no tasks */}
        {assignedTasks.length === 0 && unassignedTasks.length === 0 && (
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
