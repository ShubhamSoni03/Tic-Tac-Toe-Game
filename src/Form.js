import { useState } from 'react';

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  function handleSubmit(e) {
    e.preventDefault(); // stops page refresh
    alert(`Username: ${username}, Password: ${password}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Form</h2>

      <input 
        type="text" 
        placeholder="Enter username"
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <br /><br />

      <input 
        type={show ? "text" : "password"}
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="button" onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"}
      </button>
      <br /><br />

      <button type="submit">Login</button>
    </form>
  );
}

export default Form;
