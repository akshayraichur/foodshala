import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { AuthContext } from "../Context/AuthContext";
import { orderFood } from "../Helper/Customer";
import { useState } from "react";
import { Message } from "./Message";

export const ItemCard = (props) => {
  const { resid, itemId } = props;
  const { user, access_token } = useContext(AuthContext);

  const [error, setError] = useState(null);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);

  const { id } = user;

  let flag = true;

  const hurray = "🎉🎉";

  const order = () => {
    //TODO: To be taken care of
    orderFood(access_token, resid, id, itemId).then((data) => {
      if (data.err) {
        setError(data.err);
        setSuccess(false);
      } else {
        setSuccess(true);
        return <Modal />;
      }
    }).catch((err) => console.log(err));
  };

  const card = () => {
    return <div className="card my-1">
      <div className="view overlay">
        <img
          className="card-img-top"
          src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
          alt="Cardimage cap"
        />
      </div>

      <div className="card-body">
        <h4 className="card-title text-dark">{props.name}</h4>
        <h6>Rs : {props.price}/-</h6>
        <div className="d-flex justify-content-between">
          <span className="btn-sm btn-info p-1">4.5</span>
          {props.isVeg
            ? (<span className={`btn-sm btn-success p-1`}>Veg</span>)
            : (<span className={`btn-sm btn-danger p-1`}>Non-Veg</span>)}
        </div>
        <p className="card-text mt-2">
          {props.description}
        </p>
        {user.role === 0 ? flag = false : null}
        {/* {user.role === 0
        ? ()
        : null} */}
        <Button
          variant="contained"
          color="primary"
          type="button"
          disabled={flag}
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={() => order()}
        >
          Order Now!
        </Button>
      </div>
    </div>;
  };

  const Modal = () => {
    return <div>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Ordered Successfully! <span>{hurray}</span>
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Thank you for ordering from our Restaurant! We have accepted your
              order, kindly sit back and relax while we deliever it to you
              within 30mins
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
  };

  return (
    <>
      {card()}
      {error ? <Message severity="error" message={error} /> : null}
      {Modal()}
    </>
  );
};

// <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
//   Launch demo modal
// </button>
