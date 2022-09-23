import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles((theme) => ({
    selectbutton: {
      border: "1px solid #4DB9F6",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      width: "22%",
      backgroundImage: selected ? "linear-gradient(to right, #1FA2FF 0%, #12D8FA  51%, #1FA2FF  100%)" : "",
      color: selected ? "white" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundImage: "linear-gradient(to right, #9D50BB 0%, #6E48AA  51%, #9D50BB  100%)",
        color: "white",
        border: "1px solid #fff"
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 12,
     },
    },
  }));

  

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
