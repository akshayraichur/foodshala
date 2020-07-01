import React from "react";
import { Container, Grid } from "@material-ui/core";
import classes from "./Res.module.css";
import { ItemCard } from "../../UI/ItemCard";
import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import {
  getARestaurant,
  findItemsFromARestaurant,
} from "../../Helper/Restaurant";

export const RestaurantPage = () => {
  const { resid } = useParams();

  const [restaurant, setRestaurant] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    getARestaurant(resid).then((data) => {
      setRestaurant(data.data.restaurant);
    }).catch((err) => console.log(err));
  }, [resid]);

  useEffect(() => {
    findItemsFromARestaurant(resid).then((data) => {
      setItems(data.data.items);
    }).catch((err) => console.log(err));
  }, [resid]);

  return (
    <div>
      <Container component="main" maxWidth="md" className="my-5">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
              className={`img img-fluid my-2`}
              alt=""
            />
          </Grid>
          <Grid item xs={12}>
            <div className={` ${classes.heading}`}>
              <h2 className="h2 text-center">{restaurant.name}</h2>
              <h5>Email id : {restaurant.email}</h5>
              <h6>
                Rating : <span className=" btn-sm btn-success">4.5</span>
              </h6>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container component="menu" maxWidth="md">
        <Grid container spacing={1} className={`${classes.menu} my-5`}>
          <Grid item xs={12}>
            {items.length === 0
              ? (<>
                <div
                  className="d-flex align-items-center justify-content-center"
                >
                  <h3
                    className="h3 text-center my-3"
                  >
                    No Menu items added yet!
                  </h3>
                  <br />
                </div>
              </>)
              : (<h3 className="h3 text-center">Menu</h3>)}
          </Grid>
          {items.map((item, index) => {
            return <Grid item xs={4} key={item._id.toString()}>
              <ItemCard
                itemId={item._id}
                name={item.name}
                isVeg={item.isVeg}
                price={item.price}
                description={item.description}
                resid={resid}
              />
            </Grid>;
          })}
        </Grid>
      </Container>
    </div>
  );
};
