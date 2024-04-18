import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { UserTasks } from "../../context/TaskContext";
import MyStyledTextField from "../myStyledTextField";

export default function FormDialog({ open, openState, entireTask }) {
  const { handleEditTask } = UserTasks();
  let { _id, title, description, tag } = entireTask;
  const [combinedState, setCombinedState] = useState({
    id: _id,
    title: title,
    description: description,
    tag: tag,
  });

  function onchange(e) {
    setCombinedState({ ...combinedState, [e.target.name]: e.target.value });
  }

  function handleClose() {
    openState(false);
    handleEditTask(
      combinedState.id,
      combinedState.title,
      combinedState.description,
      combinedState.tag
    );
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Revamp Your Ideas</DialogTitle>
      <DialogContent className="space-y-4">
        <DialogContentText>
          Edit and elevate your existing notes effortlessly in the NoteVault app
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
        <Button onClick={handleClose} className="text-white bg-black">
          Cancel
        </Button>
        <Button onClick={handleClose} className="text-white bg-black">
          Edit Note
        </Button>
      </DialogActions>
    </Dialog>
  );
}
