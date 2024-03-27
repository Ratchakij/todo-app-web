import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import * as Yup from "yup";

export default function TodoForm(props) {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is Required"),
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ title }, { abortEarly: false });
      props.onSubmit(title);
      setTitle("");
      setErrors({});

      // if create mode
      // else edit mode
      // try {
      //   const res = await axios.post('http://localhost:8080/todos', {
      //     title,
      //     completed: false
      //   });
      //   props.fetchTodos();
      //   setTitle('');
      //   console.log(res.data);
      // } catch (err) {
      //   console.log(err);
      // }
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const handleClickCancel = () => {
    setTitle("");
    setErrors({});
    props.onCancel?.();
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
      onSubmit={handleSubmitForm}
    >
      <TextField
        value={title}
        sx={{
          ml: 1,
          flex: 1,
          input: {
            color: errors.title ? "red" : undefined,
            "&::placeholder": { opacity: 1 },
          },
          "& fieldset": { border: "none" }, // remove border in TextField
        }}
        placeholder={errors.title ? errors.title : "Add To Do..."}
        inputProps={{ "aria-label": "Add To Do..." }}
        onChange={(e) => setTitle(e.target.value)}
        // error={!!errors.title}
        // helperText={errors.title}
      />
      {/* {errors.title && (
        <span className="text-red-500 text-xs">{errors.title}</span>
      )} */}

      <IconButton
        type="submit"
        color="primary"
        sx={{ p: "10px" }}
        aria-label="submit"
      >
        <CheckIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="cancel"
        onClick={handleClickCancel}
      >
        <CloseIcon />
      </IconButton>
    </Paper>
  );
}
