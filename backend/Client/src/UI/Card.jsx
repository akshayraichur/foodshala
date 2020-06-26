import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "@material-ui/core";

export const Card = (props) => {
  return (
    <Link to={`/restaurant/view/${props.link}`}>
      <div className="card my-1">
        <div className="view overlay">
          <img
            className="card-img-top"
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80"
            alt="Cardimage cap"
          />
        </div>

        <div className="card-body">
          <h4 className="card-title text-dark">{props.name}</h4>
          <span className="h6 text-info">{props.email}</span>
          <br />
          <span href="." className="btn-sm btn-success p-1">
            4.5
          </span>
          <p className="card-text mt-2">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </Link>
  );
};
