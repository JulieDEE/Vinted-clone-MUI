import { TextField, Box, Typography, Button } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Publish = ({ userToken }) => {
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    title: "",
    description: "",
    brand: "",
    size: "",
    color: "",
    price: "",
    city: "",
    condition: "",
  });
  const [file, setFile] = useState({});
  const [preview, setPreview] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (file && values.title && values.price) {
        const formData = new FormData();
        formData.append("picture", file);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("condition", values.condition);
        formData.append("city", values.city);
        formData.append("brand", values.brand);
        formData.append("size", values.size);
        formData.append("color", values.color);

        const response = await axios.post(
          "https://vinted-api-serveur.herokuapp.com/offer/publish",
          formData,
          {
            headers: {
              Authorization: "Bearer " + userToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );


        if (response.data._id) {
          
          navigate(`/offer/${response.data._id}`);
        }
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex,",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h4"
          color="primary"
          sx={{ textAlign: "center", marginTop: "20px", fontWeight: "bold" }}
        >
          Publier une annonce
        </Typography>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: " center",
          }}
          onSubmit={handleSubmit}
        >
          {!preview ? (
            <Box
              sx={{
                width: { xs: "95%", md: "80%" },
                height: "300px",
                border: "1px dotted #00535B",
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                id="contained-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={(event) => {
                  setFile(event.target.files[0]);
                  setPreview(URL.createObjectURL(event.target.files[0]));
                }}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span">
                  Ajouter une photo
                </Button>
              </label>
            </Box>
          ) : (
            <Box
              sx={{
                width: { xs: "95%", md: "80%" },
                height: "300px",
                border: "1px dotted #00535B",
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <img
                src={preview}
                alt="pré-visualisation"
                style={{ height: "100%", objectFit: "contain" }}
              />
              <Button
                variant="contained"
                component="span"
                sx={{ marginLeft: { xs: "50px", sm: "200px", md: "220px" } }}
                onClick={() => {
                  setPreview("");
                }}
              >
                Modifier la photo
              </Button>
            </Box>
          )}
          <Box sx={{ display: "flex", flexDirection: "column", width: "80%" }}>
            <TextField
              label="Titre"
              placeholder="ex : Chemise Sezane Verte"
              variant="standard"
              type="text"
              required
              margin="dense"
              value={values.title}
              onChange={handleChange("title")}
            />
            <TextField
              label="Description"
              placeholder="ex : porté quelques fois, taille correctement"
              variant="standard"
              type="text"
              margin="dense"
              value={values.description}
              onChange={handleChange("description")}
            />
            <TextField
              label="Marque"
              placeholder="ex : SEZANE"
              variant="standard"
              type="text"
              margin="dense"
              value={values.email}
              onChange={handleChange("email")}
            />
            <TextField
              label="Taille"
              placeholder="ex : 34"
              variant="standard"
              type="text"
              margin="dense"
              value={values.size}
              onChange={handleChange("size")}
            />
            <TextField
              label="Couleur"
              placeholder="ex : Gris"
              variant="standard"
              type="text"
              margin="dense"
              value={values.color}
              onChange={handleChange("color")}
            />
            <TextField
              label="Etat"
              placeholder="ex : bon état, peu porté"
              variant="standard"
              type="text"
              margin="dense"
              value={values.condition}
              onChange={handleChange("condition")}
            />
            <TextField
              label="Lieu"
              placeholder="ex : Paris"
              variant="standard"
              type="text"
              margin="dense"
              value={values.city}
              onChange={handleChange("city")}
            />
            <TextField
              label="Prix"
              placeholder="ex : 50"
              variant="standard"
              type="text"
              required
              margin="dense"
              value={values.price}
              onChange={handleChange("price")}
            />
          </Box>
          <Button
            type="submit"
            value="submit"
            variant="contained"
            sx={{ width: "80%", marginTop: "30px", marginBottom: "30px" }}
          >
            Publier votre offre
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Publish;
