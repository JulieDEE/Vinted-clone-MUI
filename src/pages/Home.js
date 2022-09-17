import { Typography, Button, Box, Link } from "@mui/material";
import hero from "../images/hero.jpg";
import tear from "../images/tear.svg";
import CardItem from "../components/CardItem";
import { useNavigate } from "react-router-dom";

const Home = ({ data, isLoading, userToken }) => {
  const navigate = useNavigate();

  return isLoading ? (
    console.log("loading")
  ) : (
    <>
      <Box sx={{ position: "relative", width: "100vw" }}>
        <img
          src={hero}
          alt=""
          style={{
            height: "500px",
            width: "100vw",
            objectFit: "cover",
          }}
        />
        <img
          src={tear}
          alt=""
          style={{
            position: "absolute",
            bottom: "0px",
            right: "0",
            width: "70%",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "25%",
            left: "2%",
            backgroundColor: "white",
            padding: "50px",
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            flexDirection: "column",
            gap: "30px",
            borderRadius: "5px",
            width: "450px",
          }}
        >
          <Typography variant="h2" sx={{ fontSize: "30px", fontWeight: "500" }}>
            Prêts à faire du tri dans vos placards ?
          </Typography>
          <Button
            onClick={() => {
              if (userToken) {
                navigate("/publish");
              } else {
                navigate("/login");
              }
            }}
            variant="contained"
            color="primary"
            sx={{ width: "100%", height: "50px" }}
          >
            Commencez à vendre
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "15px",
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "15px",
          borderRadius: "5px",
          width: "100vw%",
        }}
      >
        <Typography variant="h2" sx={{ fontSize: "25px", fontWeight: "400" }}>
          Prêts à faire du tri dans vos placards ?{" "}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%", height: "50px" }}
        >
          Commencez à vendre
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography variant="h4" sx={{ fontSize: { xs: "20px", md: "30px" } }}>
          Articles populaires
        </Typography>
        <Link href="#">Voir tout</Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          gap: "10px",
        }}
      >
        {data.offers &&
          data.offers.map((card, index) => {
            return <CardItem key={index} data={card} />;
          })}
      </Box>
    </>
  );
};

export default Home;
