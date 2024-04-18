import React, { useEffect } from "react";
import { UserTasks } from "../context/TaskContext";
import Task from "../Layout/TaskLayout";
import Welcome from "../components/Welcome";

export default function ExitingTasks() {
  const { tasks, fetchAllTasks } = UserTasks();
  // To show all the existing notes to the client
  useEffect(() => {
    fetchAllTasks();
  }, []);
  return (
    <>
      <div className="flex flex-col my-4 mx-4 space-y-5">
        <div>
          <Welcome />
        </div>
        <div className="flex flex-wrap">
          {tasks.length !== 0 ? (
            tasks.map((data) => {
              return <Task task={data} key={data._id} />;
            })
          ) : (
            <div className="w-full flex justify-center items-center mt-24">
              <h2>Your thoughts, your notes : Create now</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
