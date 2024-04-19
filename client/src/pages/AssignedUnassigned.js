import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UserTasks } from "../context/TaskContext";
import Task from "../Layout/TaskLayout";
import Welcome from "../components/Welcome";
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
  
  // Filter tasks based on whether they are assigned to the user
  const assignedTasks = tasks.filter((task) => task.assignedUser === userId);
  const unassignedTasks = tasks.filter((task) => !task.assignedTo);

  return (
    <>
      <div className="flex flex-col justify-center my-4 mx-4 space-y-5">
        <div>
          <Welcome />
        </div>

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
        {tasks.length === 0 && (
          <div className="flex flex-col items-center mt-8">
            <svg
              className="w-12 h-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h2 className="text-lg font-medium text-gray-600 mt-4">
              No tasks found
            </h2>
            <p className="text-gray-400 mt-2">
              Click on the "+" button to create a new task.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
