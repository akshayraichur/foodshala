import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Message = (props) => {
  return (
    <Snackbar open={true} autoHideDuration={6000}>
      <Alert severity={props.severity}>{props.message}</Alert>
    </Snackbar>
  );
};
