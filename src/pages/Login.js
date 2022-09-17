import * as React from "react";
import {
  TextField,
  FormControl,
  Box,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  InputLabel,
  Input,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPublish = location.state?.fromPublish ? true : null;

  const [values, setValues] = React.useState({
    password: "",
    email: "",
    showPassword: false,
  });

  // CHANGE STATE INPUT :
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // SHOW PASSWORD FUNCTIONS :
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // ON SUBMIT SEND DATA TO SERVER :

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://vinted-api-serveur.herokuapp.com/user/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        navigate(fromPublish ? "/publish" : "/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "90vh",
          marginTop: "80px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <FormControl
            sx={{
              width: "500px",
              height: "500px",
              padding: "40px 10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              color="#017782"
              sx={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              Se connecter
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "30px",
              }}
            >
              <TextField
                label="Email"
                variant="standard"
                type="email"
                required
                margin="dense"
                value={values.email}
                onChange={handleChange("email")}
              />
              <FormControl sx={{ width: "100%" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password" required>
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%", height: "50px" }}
                type="submit"
              >
                Se connecter
              </Button>
              <Typography
                onClick={() => navigate("/signup")}
                variant="body"
                color="primary"
                sx={{
                  marginTop: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  ":hover": { textDecoration: "underline" },
                }}
              >
                Tu n'as pas de compte ? Inscris toi !
              </Typography>
            </Box>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default Login;
