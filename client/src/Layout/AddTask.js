import React, { useState } from "react";
import { UserTasks } from "../context/TaskContext";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MyStyledTextField from "../components/myStyledTextField";
import { toast } from "react-toastify";

export default function AddNote() {
  const { handleAddNote } = UserTasks();
  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  async function handleClick(e) {
    e.preventDefault();
    // Check if any of the fields are empty
    if (!note.title || !note.description || !note.tag) {
      toast.error("All fields are required");
      return;
    }
    try {
      const response = await handleAddNote(
        note.title,
        note.description,
        note.tag
      );
      returnResponse(response);
    } catch (error) {
      // Handle API errors
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  }
  function onchange(e) {
    setnote({ ...note, [e.target.name]: e.target.value });
  }
  function returnResponse(response) {
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }
  return (
    <>
      <Container className="mt-[130px] space-y-3">
        <Typography variant="h6" color="black" component="h2" gutterBottom>
          Create a new note
        </Typography>

        <form onSubmit={handleClick} className="flex flex-col space-y-8">
          <MyStyledTextField
            onChange={onchange}
            label="Note Title"
            variant="outlined"
            name="title"
            fullWidth
            required
          />

          <MyStyledTextField
            onChange={onchange}
            label="Description"
            name="description"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            required
          />
          <FormControl>
            <FormLabel className="text-black">Note Tags</FormLabel>
            <RadioGroup onChange={onchange}>
              <FormControlLabel
                name="tag"
                value="money"
                control={<Radio className="text-black" />}
                label="Money"
              />
              <FormControlLabel
                name="tag"
                value="todos"
                control={<Radio className="text-black" />}
                label="Todos"
              />
              <FormControlLabel
                name="tag"
                value="work"
                control={<Radio className="text-black" />}
                label="Work"
              />
              <MyStyledTextField
                className="w-[30vw]"
                onChange={onchange}
                label="Custom Tag"
                name="tag"
              />
            </RadioGroup>
          </FormControl>

          <Button
            className="bg-black mx-4 my-0 mt-4"
            type="submit"
            variant="contained"
            endIcon={<ArrowForwardIosIcon />}
          >
            Submit
          </Button>
        </form>

        <br />
      </Container>
    </>
  );
}
