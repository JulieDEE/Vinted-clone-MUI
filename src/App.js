import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "./components/Navbar";

// IMPORT PAGES 
import Home from "./pages/Home"
import Login from "./pages/Login";
import Offer from "./pages/Offer";
import Payment from "./pages/Payment";
import Publish from "./pages/Publish";
import Signup from "./pages/Signup";



function App() {
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchBar, setSearchBar] = useState("");
  // eslint-disable-next-line
  const [sort, setSort] = useState(false);
  // eslint-disable-next-line
  const [fetchRangeValues, setFetchRangeValues] = useState([0, 10000]);

  const setUser = (token) => {
    if (token) {
      setUserToken(token);
      Cookies.set("token", token);
    } else {
      setUserToken(null);
      Cookies.remove("token");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let filters = "";

      if (searchBar) {
        filters += `&title=${searchBar}`;
      }

      if (sort) {
        filters += `&sort=descending`;
      }

      if (!sort) {
        filters += `&sort=ascending`;
      }

      const response = await axios.get(
        `https://vinted-api-serveur.herokuapp.com/offers?minPrice=${fetchRangeValues[0]}&maxPrice=${fetchRangeValues[1]}` +
          filters
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [searchBar, fetchRangeValues, sort]);

  return (
    <>
      <Router>
        <Navbar
          userToken={userToken}
          setUser={setUser}
          searchBar={searchBar}
          setSearchBar={setSearchBar}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home data={data} isLoading={isLoading} userToken={userToken} />
            }
          />
          <Route path={`/product/:productId`} element={<Offer data={data} />} />
          <Route
            path="/"
            element={<Home data={data} isLoading={isLoading} />}
          />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/publish" element={<Publish userToken={userToken} />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
