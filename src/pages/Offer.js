import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import user from "../images/user.png";

const Offer = () => {
  const params = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-api-serveur.herokuapp.com/product/${params.id}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    <p>Loading ..</p>
  ) : (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: { xs: "100vh", md: "92vh" },
          background: "#EBEDEE",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: { xs: "100%", md: "80%" },
            width: { xs: "100%", md: "80%" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: { xs: "50%", md: "100%" },
              width: { xs: "100%", md: "50%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: { xs: "0", md: "0" },
            }}
          >
            <img
              src={data.product_image.secure_url}
              alt={data.product_name}
              style={{ height: "100%", width: "90%", objectFit: "contain" }}
            />
          </Box>
          <Box
            sx={{
              height: { xs: "40%", md: "100%" },
              width: { xs: "100%", md: "50%" },
              padding: { xs: "O", md: "25px" },
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                marginBottom: "30px",
                fontWeight: "bold",
                fontSize: { xs: "25px", md: "35px" },
              }}
            >
              {data.product_price.toFixed(2)} €
            </Typography>
            {data.product_details.map((elem, index) => {
              const keys = Object.keys(elem);
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    color: "#A3A0A0",
                  }}
                >
                  <p style={{ width: "40%" }}>{keys[0]}</p>
                  <p>{elem[keys[0]]}</p>
                </div>
              );
            })}
            <Box
              sx={{ borderBottom: "1px solid lightgray", marginTop: "70px" }}
            ></Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "60%",
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginTop: "20px",
                    marginBottom: "10px",
                  }}
                >
                  {data.product_name}
                </Typography>
                <Typography variant="body">
                  {data.product_description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "50px",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  {data.owner.account.avatar ? (
                    <img
                      src={data.owner.account.avatar.secure_url}
                      alt=""
                      style={{
                        height: "70px",
                        width: "70px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src={user}
                      alt="user"
                      style={{
                        height: "70px",
                        width: "70px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <Typography>{data.owner.account.username} </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%", height: "40px" }}
              >
                Acheter
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Offer;
