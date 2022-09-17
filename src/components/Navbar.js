import { styled } from "@mui/material/styles";
import { Toolbar, AppBar, Button, InputBase, Stack } from "@mui/material";
import logo from "../images/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ userToken, setUser, searchBar, setSearchBar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentURLPathname = location.pathname;

  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });

  const Search = styled("div")(({ theme }) => ({
    display: "flex",
    backgroundColor: "#F5F6F7",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%",
    height: "40px",
    justifyContent: "center",
    gap: "10px",
  }));

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          height: "80px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <StyledToolbar>
          <img
            src={logo}
            alt=""
            style={{ height: "70px", cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          />
          {currentURLPathname === "/" && (
            <>
              <Search sx={{ display: { xs: "none", md: "flex" } }}>
                <SearchIcon
                  color="primary"
                  fontSize="medium"
                  sx={{ height: "100%" }}
                />
                <InputBase
                  placeholder="Rechercher des articles.."
                  sx={{ height: "100%", width: "100%" }}
                  onChange={(e) => setSearchBar(e.target.value)}
                  value={searchBar}
                ></InputBase>
              </Search>
            </>
          )}

          {userToken ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setUser(null);
              }}
            >
              Se déconnecter
            </Button>
          ) : (
            <Stack
              spacing={2}
              direction="row"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                S'inscrire
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Se connecter
              </Button>
            </Stack>
          )}
          <MenuIcon
            color="primary"
            fontSize="large"
            sx={{
              height: "100%",
              display: { sm: "block", md: "none" },
              cursor: "pointer",
            }}
          />
        </StyledToolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
