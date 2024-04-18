import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { AddCircleOutline } from "@mui/icons-material"; 
import { UserTasks } from "../../context/TaskContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AssignTaskDialog({ taskId }) {
  const { handleAssignTask } = UserTasks();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAssign = () => {
    handleAssignTask(taskId);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <AddCircleOutline onClick={handleClickOpen} style={{ cursor: 'pointer', color: 'green' }} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Assign Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to assign this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">Cancel</Button>
          <Button onClick={handleAssign} variant="contained" color="primary">Assign</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
