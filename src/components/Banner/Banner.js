import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Carousel from "./Carousel";
import fire from '../../img/flame.png';

const useStyles = makeStyles((theme) => ({
  banner:{
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  bannerContent: {
    height: 250,
    display: "flex",
    flexDirection: "column",
    background: "radial-gradient(ellipse at center, #1e2060 0%, #071623 100%, #0B2033 100%)",
    borderRadius: 10,
    border: "1px solid #4DB9F6",
  },
  bannerHeading: {
    display: "flex",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  fire: {
    width: 25,
    paddingTop: 5,
  },
  bannerTitle: {
      fontWeight: "bold",
      paddingLeft: 10,
      fontFamily: "Montserrat",
      fontSize: 24,
      color: "white",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.bannerHeading}>
          <div>
            <img className={classes.fire} src={fire} alt=""/>
          </div>
        <Typography className={classes.bannerTitle}
          >Trending
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  );
};

export default Banner;
