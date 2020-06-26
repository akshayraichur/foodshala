import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export default ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [access_token, setAccess_token] = useState();

  useEffect(() => {
    if (
      localStorage.getItem("access_token") && localStorage.getItem("customer")
    ) {
      const access = localStorage.getItem("access_token").toString();
      const userStorage = JSON.parse(localStorage.getItem("customer"));
      setAccess_token(access);
      setIsAuthenticated(true);
      setUser(userStorage);
      setIsLoaded(true);
    } // Put an else if here for restaurant
    else if (
      localStorage.getItem("access_token") && localStorage.getItem("restaurant")
    ) {
      const access = localStorage.getItem("access_token").toString();
      const userStorage = JSON.parse(localStorage.getItem("restaurant"));
      setAccess_token(access);
      setIsAuthenticated(true);
      setUser(userStorage);
      setIsLoaded(true);
    } else {
      setIsAuthenticated(false);
      setAccess_token(null);
      setUser({});
      setIsLoaded(true);
    }
  }, []);

  return (
    //   or can also be used simply with <></>
    <React.Fragment>
      {isLoaded
        ? (
          <AuthContext.Provider
            value={{
              user,
              setUser,
              isAuthenticated,
              setIsAuthenticated,
              access_token,
            }}
          >
            {children}
          </AuthContext.Provider>
        )
        : (
          <h1>Loading.....</h1>
        )}
    </React.Fragment>
  );
};
