import React from "react";

export const RestaurantOrders = (props) => {
  return (
    <div className="">
      <div className="jumbotron aqua-gradient">
        <h5 className="h5">Customer : {props.customerName}</h5>
        <h5 className="h5">Customer email : {props.customerEmail}</h5>
        <h2 className="h2 ">{props.itemName}</h2>
        <h5 className="h5">Total Price : {props.itemPrice}/-</h5>
        <h6 className="h6">Status : Preparing</h6>
      </div>
    </div>
  );
};
