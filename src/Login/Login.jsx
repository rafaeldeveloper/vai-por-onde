import { TextField } from "@mui/material";


function Login() {
  return (
    <>
      <img src="src\vpn.jpeg" className="logoicon" alt="logoproject" />
      <h1>Vai Por Onde ?</h1>
      <TextField id="filled-basic" label="Email" variant="filled" />
      <br />
      <TextField
        id="filled-basic"
        label="Password"
        variant="filled"
        type="password"
      />
      <div className="card">
        <a href="Map.jsx">
          <button>Logar</button>
        </a>
      </div>
    </>
  );
}

export default Login;
