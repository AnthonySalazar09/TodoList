import React, { useState } from "react";

function CreateForm(props) {
  const [title, setTitle] = useState(props.title || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    props.createData(title);
    setTitle("");
  }


  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={title}
        onChange={handleChangeTitle}
        placeholder="Titulo"
      />
      <button type="submit" className="btn btn__primary btn__lg">
        {props.buttonText}
      </button>
    </form>
  );
}

export default CreateForm;
