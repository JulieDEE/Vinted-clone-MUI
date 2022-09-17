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
  Checkbox,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ setUser }) => {
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    username: "",
    password: "",
    email: "",
    newsletter: false,
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        "https://vinted-api-serveur.herokuapp.com/user/signup",
        {
          username: values.username,
          email: values.email,
          password: values.password,
          newsletter: values.newsletter,
        }
      );

      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.log(err.response);
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
              S'inscrire
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
                label="Nom d'utilisateur"
                variant="standard"
                required
                value={values.username}
                onChange={handleChange("username")}
              />
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "30px 0",
                  }}
                >
                  <Checkbox />
                  <Typography color="#737373">
                    S'inscrire à notre newsletter
                  </Typography>
                </Box>
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
                S'inscrire
              </Button>
              <Typography
                onClick={() => navigate("/login")}
                variant="body"
                color="primary"
                sx={{
                  marginTop: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  ":hover": { textDecoration: "underline" },
                }}
              >
                Tu as déjà un compte ? Connecte toi !
              </Typography>
            </Box>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default Signup;
