import { Button, Container, Typography } from "@mui/material";

function Login() {

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Weather App Login
      </Typography>
      <Button variant="contained" color="primary" fullWidth onClick={handleGoogleLogin}>
        Login with Google
      </Button>
    </Container>
  );
}

export default Login;
