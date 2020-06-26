import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import icon from "../Assets/imgs/icon.png";
import { AuthContext } from "../Context/AuthContext";
import { Button } from "@material-ui/core";

export const NavBar = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext,
  );
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("customer");
    localStorage.removeItem("restaurant");
    localStorage.removeItem("access_token");
    setUser(null);
    setIsAuthenticated(false);
    history.push("/");
  };

  const authNavBar = () => (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark indigo fixed-top">
        <div className="container">
          <div style={{ display: "flex" }} className="">
            <img
              src={icon}
              alt="icon"
              className="img img-fluid"
              style={{ height: "40px", width: "40px" }}
            />
            <Link className="navbar-brand" to="/">
              FoodShala
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {user.role === 1
            ? (<>
              <div className=" collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item my-2">
                    <Link className="nav-link" to="/">
                      Home
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item my-2">
                    <Link className="nav-link" to="/restaurant/add-item">
                      Add Item
                    </Link>
                  </li>
                  <li className="nav-item my-2">
                    <Link className="nav-link" to="/restaurant/orders">
                      View Orders
                    </Link>
                  </li>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="nav-item"
                    onClick={() => logout()}
                  >
                    <span className="nav-link">
                      Logout
                    </span>
                  </Button>
                </ul>
              </div>
            </>)
            : (<>
              <div className=" collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item ">
                    <Link className="nav-link my-2" to="/">
                      Home
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="nav-item"
                    onClick={() => logout()}
                  >
                    <span className="nav-link">
                      Logout
                    </span>
                  </Button>
                </ul>
              </div>
            </>)}
        </div>
      </nav>
    </div>
  );

  const unAuth = () => (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark indigo fixed-top">
        <div className="container">
          <div style={{ display: "flex" }} className="">
            <img
              src={icon}
              alt="icon"
              className="img img-fluid"
              style={{ height: "40px", width: "40px" }}
            />
            <Link className="navbar-brand" to="/">
              FoodShala
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item ">
                <Link className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  SignUp
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {isAuthenticated ? (authNavBar()) : (unAuth())}
    </>
  );
};
