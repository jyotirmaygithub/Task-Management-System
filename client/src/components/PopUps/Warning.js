import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DeleteOutlineOutlined } from "@mui/icons-material"; 
import { UserTasks } from "../../context/TaskContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ taskId }) {
  const { handleDeleteTask } = UserTasks();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handleDeleteTask(taskId);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <DeleteOutlineOutlined onClick={handleClickOpen}/>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If the task is deleted, it cannot be retrieved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:"black"}} onClick={handleClose}>Cancel</Button>
          <Button sx={{color:"black"}} onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
