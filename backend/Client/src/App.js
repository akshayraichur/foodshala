import React, { useContext } from "react";
import { NavBar } from "./UI/NavBar";
import { Switch, Route } from "react-router";
import { Login } from "./Screens/Login/Login";
import { Signup } from "./Screens/Signup/Signup";
import { CustomerLogin } from "./Screens/CustomerLogin/CustomerLogin";
import { CustomerRegister } from "./Screens/CustomerRegister/CustomerRegister";
import { RestaurantRegister } from "./Screens/RestaurantRegister/RestaurantRegister";
import { RestaurantLogin } from "./Screens/RestaurantLogin/RestaurantLogin";
import { HomeScreen } from "./Screens/HomeScreen/HomeScreen";
import { RestaurantPage } from "./Screens/RestaurantPage/RestaurantPage";
import { AddItems } from "./Screens/AddItems/AddItems";
import { AuthContext } from "./Context/AuthContext";
import { Error404 } from "./Screens/Error404";
import { Orders } from "./Screens/Orders/Orders";

function App() {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <HomeScreen />
        </Route>

        <Route path="/restaurant/signup" exact>
          <RestaurantRegister />
        </Route>

        <Route path="/restaurant/login" exact>
          <RestaurantLogin />
        </Route>

        <Route path="/login" exact>
          <Login />
        </Route>

        <Route path="/signup" exact>
          <Signup />
        </Route>

        <Route path="/customer/login" exact>
          <CustomerLogin />
        </Route>

        <Route path="/customer/signup" exact>
          <CustomerRegister />
        </Route>

        <Route path="/restaurant/view/:resid">
          <RestaurantPage />
        </Route>

        {isAuthenticated
          ? (
            <>
              {user.role === 1
                ? (<>
                  <Route path="/restaurant/add-item" exact>
                    <AddItems />
                  </Route>
                  <Route path="/restaurant/orders" exact>
                    <Orders />
                  </Route>
                </>)
                : <Route>
                  <Error404 />
                </Route>}
            </>
          )
          : (
            <Route>
              <Error404 />
            </Route>
          )}
      </Switch>
    </div>
  );
}

export default App;
