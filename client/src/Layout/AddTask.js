import React, { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import MyStyledTextField from "../components/myStyledTextField";
import { useNavigate } from "react-router-dom";
import { UserTasks } from "../context/TaskContext";
import { TokenStatusContext } from "../context/tokenStatus";
import { toast } from "react-toastify";

export default function AddNote() {
  const navigate = useNavigate();
  const { handleAddNote } = UserTasks();
  const { checkCookie } = TokenStatusContext();
  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  async function handleClick(e) {
    e.preventDefault();
    if (!checkCookie()) {
      navigate("/login");
    }
    // Check if any of the fields are empty
    else if (!note.title || !note.description || !note.tag) {
      toast.error("All fields are required");
      return;
    } else {
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
      <Container className="mt-5 space-y-3">
        <h1 className="text-black text-[25px]">Create a new task</h1>

        <form onSubmit={handleClick} className="flex flex-col space-y-8">
          <MyStyledTextField
            onChange={onchange}
            label="Task Title"
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
            <h1 className="text-black text-[20px]">Task Tags</h1>
            <RadioGroup onChange={onchange}>
              <FormControlLabel
                name="tag"
                value="Administrative"
                control={
                  <Radio
                    sx={{ color: "black" }}
                    checkedIcon={
                      <RadioButtonCheckedIcon sx={{ color: "black" }} />
                    }
                  />
                }
                label="Administrative"
              />
              <FormControlLabel
                name="tag"
                value="Creative"
                control={
                  <Radio
                    sx={{ color: "black" }}
                    checkedIcon={
                      <RadioButtonCheckedIcon sx={{ color: "black" }} />
                    }
                  />
                }
                label="Creative"
              />
              <FormControlLabel
                name="tag"
                value="Technical"
                control={
                  <Radio
                    sx={{ color: "black" }}
                    checkedIcon={
                      <RadioButtonCheckedIcon sx={{ color: "black" }} />
                    }
                  />
                }
                label="Technical"
              />
              <FormControlLabel
                name="tag"
                value="Research"
                control={
                  <Radio
                    sx={{ color: "black" }}
                    checkedIcon={
                      <RadioButtonCheckedIcon sx={{ color: "black" }} />
                    }
                  />
                }
                label="Research"
              />
              <FormControlLabel
                name="tag"
                value="Assistance"
                control={
                  <Radio
                    sx={{ color: "black" }}
                    checkedIcon={
                      <RadioButtonCheckedIcon sx={{ color: "black" }} />
                    }
                  />
                }
                label="Assistance"
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
            sx={{
              background: "black",
              "&:hover": {
                background: "white",
                border: "2px solid black",
                color: "black", // Change text color to white on hover
              },
            }}
            className="mx-4 my-0 mt-4"
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
