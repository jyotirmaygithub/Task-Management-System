import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { UserTasks } from "../../context/TaskContext";
import MyStyledTextField from "../myStyledTextField";
import { toast } from "react-toastify";

export default function FormDialog({ open, openState, entireTask }) {
  const { handleEditTask } = UserTasks();
  const { _id, title, description, tag } = entireTask;
  const [combinedState, setCombinedState] = useState({
    id: _id,
    title: title,
    description: description,
    tag: tag,
  });
  function returnResponse(response) {
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }
  function onchange(e) {
    setCombinedState({ ...combinedState, [e.target.name]: e.target.value });
  }
  async function handleEdit() {
    openState(false);
    const reponse = await handleEditTask(
      combinedState.id,
      combinedState.title,
      combinedState.description,
      combinedState.tag
    );
    returnResponse(reponse);
  }
  async function handleClose() {
    openState(false);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Revamp Your Ideas</DialogTitle>
      <DialogContent className="space-y-4">
        <DialogContentText>
          Edit and elevate your existing Task effortlessly.
        </DialogContentText>
        <MyStyledTextField
          onChange={onchange}
          label="Note Title"
          variant="outlined"
          name="title"
          value={combinedState.title}
          fullWidth
          required
        />
        <MyStyledTextField
          onChange={onchange}
          label="Description"
          name="description"
          value={combinedState.description}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          required
        />
        <MyStyledTextField
          onChange={onchange}
          label="Tag Name"
          name="tag"
          value={combinedState.tag}
          rows={1}
          variant="outlined"
          fullWidth
          required
        />
      </DialogContent>
      <DialogActions className="mb-3">
        <Button sx={{ color: "black" }} onClick={handleClose}>
          Cancel
        </Button>
        <Button sx={{ color: "black" }} onClick={handleEdit}>
          Edit Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}
