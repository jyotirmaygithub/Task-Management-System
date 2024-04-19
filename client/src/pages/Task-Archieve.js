import React, { useEffect } from "react";
import { UserTasks } from "../context/TaskContext";
import Task from "../Layout/TaskLayout";
import Welcome from "../components/Welcome";

export default function ExitingTasks() {
  const { tasks, fetchAllTasks } = UserTasks();

  // To show all the existing tasks to the client
  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center my-4 mx-4 space-y-5">
        <div>
          <Welcome />
        </div>

        {/* Render tasks */}
        {tasks.length > 0 ? (
          tasks.map((data) => (
            <Task task={data} key={data._id} />
          ))
        ) : (
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
