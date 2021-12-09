/** @format */

import { Button, TextField } from "@mui/material";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useContext, useEffect, useRef } from "react";
import { db } from "../firebase";
import { TodoContext } from "../pages/TodoContext";

const TodoForm = () => {
  const inputAreaRef = useRef();
  //   const [todo, setTodo] = useState({ title: "", detail: "" });
  const { showAlert, todo, setTodo } = useContext(TodoContext);
  const onSubmit = async () => {
    if (todo?.hasOwnProperty("timestamp")) {
      // update data
      const docRef = doc(db, "todos", todo.id);
      const todoUpdated = { ...todo, timestamp: serverTimestamp() };
      updateDoc(docRef, todoUpdated);
      setTodo({ title: "", detail: "" });
      showAlert("info", `Todo Wirh Id ${docRef.id}Updated successfully`);
    } else {
      const collectionRef = collection(db, "todos");
      const docRef = await addDoc(collectionRef, {
        ...todo,
        timestamp: serverTimestamp(),
      });
      setTodo({ title: "", detail: "" });
      showAlert("success", `Todo Wirh Id ${docRef.id}is added successfully`);
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        console.log("Outside input area");
        setTodo({ title: "", detail: "" });
      } else {
        console.log("Inside input area");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);
  return (
    <div ref={inputAreaRef}>
      {/* <pre>{JSON.stringify(todo)}</pre>
      <pre>{JSON.stringify(todo, null, "\t")}</pre> */}
      <TextField
        fullWidth
        label="title"
        margin="normal"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <TextField
        fullWidth
        label="detail"
        multiline
        maxRows={4}
        value={todo.detail}
        onChange={(e) => setTodo({ ...todo, detail: e.target.value })}
      />
      <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>
        {todo.hasOwnProperty("timestamp") ? "Update Todo" : "Add New Todo"}
      </Button>
    </div>
  );
};

export default TodoForm;
