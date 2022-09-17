import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardItem = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: { xs: "95%", sm: "48%", md: "23%", lg: "17%" },
        marginBottom: "10px",
        height : "390px"
      }}
      onClick={() => navigate(`/offer/${data._id}`)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="280"
          image={data.product_image.secure_url}
          alt={data.title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {data.product_price.toFixed(2)} €
          </Typography>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {data.product_details[1]["TAILLE"]}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textTransform: "uppercase" }}
            >
              {data.product_details[0]["MARQUE"]}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
