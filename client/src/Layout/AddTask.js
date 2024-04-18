import React, { useState } from "react";
import { UserNotes } from "../context/TaskContext";
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
// import  Alert  from "../components/Alerts";

export default function AddNote() {
  // Function : To take title,description and tag as argument to make a new note.
  const { fetchAllNotes } = UserNotes();
  // create a object in state with name and values. which need to be update on user entered input and then need to pass as arugement in the given function.
  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  const [alertState, setAlertState] = useState(false);
  const [details, setDetails] = useState({ type: "", message: "" });

  function getCookie(cookieName) {
    const cookies = document.cookie;
    const cookieArray = cookies.split("; ");

    for (const cookie of cookieArray) {
      if (cookie.startsWith(`${cookieName}=`)) {
        const cookieValue = cookie.split("=")[1];
        return cookieValue;
      }
    }

    return null;
  }

  function alertRemoval() {
    setTimeout(() => {
      setAlertState(false);
    }, 1500);
  }


  // API call : To add note.
  async function handleAddNote(title, description, tag) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/notes/addnote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": getCookie("auth_token"),
          },
          // sending data to the data base to update.
          body: JSON.stringify({ title, description, tag }),
        }
      );
      fetchAllNotes();

      if (!response.ok) {
        setAlertState(true);
        setDetails({ type: "error", message: "Sorry, Incomplete Note" });
        alertRemoval();
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setDetails({ type: "success", message: "Note placed in a vault or basket." });
        setAlertState(true);
        alertRemoval();
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  function handleClick(e) {
    e.preventDefault()
    // passing all required arugements
    handleAddNote(note.title, note.description, note.tag);
  }
  function onchange(e) {
    // IMP spread operator : Making shallow copy of the existing note object.
    // Note State mangement : for numbers and string direct mutation of the state is possible and fesible , but for objects and arrays it not as it previous one.
    setnote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <>
     <div className="h-[50px]">
        {/* {alertState && <Alert type={details.type} message={details.message} />} */}
      </div>
      <Container className="space-y-3">
        <Typography variant="h6" color="black" component="h2" gutterBottom>
          Create a new note
        </Typography>

        <form
          onSubmit={handleClick}
          className="flex flex-col space-y-8"
        >
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
