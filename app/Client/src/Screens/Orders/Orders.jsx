import React from "react";
import { Container, Grid } from "@material-ui/core";
import { RestaurantOrders } from "../../UI/RestaurantOrders";
import { useState } from "react";
import { useEffect } from "react";
import { getOrders } from "../../Helper/Restaurant";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
// eslint-disable-next-line
import { findCustomer } from "../../Helper/Customer";

export const Orders = () => {
  const [order, setOrder] = useState([]);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  // eslint-disable-next-line
  const [customer, setCustomer] = useState([]);

  const { access_token } = useContext(AuthContext);

  useEffect(() => {
    getOrders(access_token).then((data) => {
      if (data.err) {
        setError(data.err);
        setSuccess(false);
        return;
      }
      setOrder(data.orders);
      setSuccess(true);
    }).catch((err) => console.log(err));
  }, [access_token]);

  return (
    <div className="my-5">
      <Container component="main" maxWidth="sm" className="my-5">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <h2 className="h2 text-center my-5">View your orders here!</h2>
          </Grid>
          {order.map((o) => {
            return <Grid item xs={12} key={o._id}>
              <RestaurantOrders
                customerName={o.customerName}
                customerEmail={o.customerEmail}
                itemName={o.itemName}
                itemPrice={o.itemPrice}
                restaurantName={o.restaurantName}
              />
            </Grid>;
          })}
        </Grid>
      </Container>
    </div>
  );
};
