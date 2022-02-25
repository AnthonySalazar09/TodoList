import React, { useState } from "react";
import { signup } from '../services/task_service'
function AuthForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      return;
    }
    const request = { username, password };
    signup(request, props.addUser);
    setUsername("");
    setPassword("");
  }


  const handleChangeUsername = ({ target: { value } }) => {
    setUsername(value);
  }

  const handleChangePassword = ({ target: { value } }) => {
    console.log(value);
    setPassword(value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="username"
        className="input input__lg"
        name="username"
        autoComplete="off"
        value={username}
        onChange={handleChangeUsername}
        placeholder="Username"
      />
      <input
        type="password"
        id="password"
        className="input input__lg"
        name="password"
        autoComplete="off"
        value={password}
        onChange={handleChangePassword}
        placeholder="Password"
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Login
      </button>
    </form>
  );
}

export default AuthForm;
