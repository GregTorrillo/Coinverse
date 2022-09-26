import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import {
  makeStyles,
  Typography,
  LinearProgress,
  Button,
} from "@material-ui/core";
import CoinInfo from "../components/CoinInfo";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../components/CoinsTable";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      margin: 40,
      [theme.breakpoints.down("md")]: {
        margin: "40px 20px",
        paddingBottom: 40,
      },
       [theme.breakpoints.down("sm")]: {
        margin: 20,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      [theme.breakpoints.down("xs")]: {
        margin: 20,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    sidebar: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",     
      background:
        "radial-gradient(ellipse at center, #1e2060 0%, #071623 100%, #0B2033 100%)",
      border: "1px solid #4DB9F6",
      borderRadius: 10,
       [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: 500,
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        height: 500,
      },
    },
    coinHeadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "0px 0px 20px 0px",
      [theme.breakpoints.down("lg")]: {
        paddingTop: 20,
      },
      [theme.breakpoints.down("md")]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
       [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
       [theme.breakpoints.down("xs")]: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    coinImage: {
      paddingBottom: 20,
      height: 200,
      [theme.breakpoints.down("lg")]: {
        height: 80,
        paddingBottom: 0,
      },
      [theme.breakpoints.down("md")]: {
        height: 80,
        padding: "0px 0px 10px 0px",
      },
       [theme.breakpoints.down("sm")]: {
        height: 60,
        paddingRight: 10,
        paddingBottom: 15,
      },
      [theme.breakpoints.down("xs")]: {
        height: 60,
        paddingRight: 10,
        paddingBottom: 15,
      },
    },
    coinHeading: {
      fontWeight: "bold",
      fontFamily: "Montserrat",
      color: "white",
      fontSize: 50,
      [theme.breakpoints.down("lg")]: {
        fontSize: 40,
      },
      [theme.breakpoints.down("md")]: {
        fontSize: 26,
      },
       [theme.breakpoints.down("sm")]: {
        fontSize: 30,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 30,
      },
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      fontSize: 16,
      padding: "0px 40px 15px 40px",
      textAlign: "justify",
      color: "darkgrey",
      [theme.breakpoints.down("lg")]: {
        padding: "0px 20px 20px 20px",
        fontSize: 14,
      },
      [theme.breakpoints.down("md")]: {
        fontSize: 12,
      },
       [theme.breakpoints.down("sm")]: {
        fontSize: 12,
        padding: 20,
        paddingTop: 0,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 12,
        padding: 20,
        paddingTop: 0,
      },
    },
    marketData: {
      alignSelf: "start",
      padding: 40,
      width: "100%",
      [theme.breakpoints.down("lg")]: {
        padding: 20,
      },
      [theme.breakpoints.down("md")]: {
        padding: "0px 20px",
      },
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 20,
        padding: 0,
      },
    },
    marketDataRow: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        marginBottom: -10,
      },
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        marginBottom: -15,
      },
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 40,
      fontFamily: "Montserrat",
      color: "white",
      fontSize: 24,
      paddingRight: 10,
      [theme.breakpoints.down("lg")]: {
        fontSize: 18,
      },
      [theme.breakpoints.down("md")]: {
        fontSize: 12,
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 18,
        paddingRight: 5,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 18,
        paddingRight: 10,
      },
    },
    marketRowData: {
      fontFamily: "Montserrat",
      color: "#4DB9F6",
      fontSize: 24,
      fontWeight: "bold",
      [theme.breakpoints.down("lg")]: {
        fontSize: 18,
      },
      [theme.breakpoints.down("md")]: {
        fontSize: 12,
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 18,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 18,
      },
    },
    watchlistButton: {
      width: "50%",
      height: 50,
      color: "white",
      fontWeight: "bold",
      marginBottom: 20,
      backgroundImage: inWatchlist
        ? "linear-gradient(to right, #9D50BB 0%, #6E48AA  51%, #9D50BB  100%)"
        : "linear-gradient(to right, #1FA2FF 0%, #12D8FA  51%, #1FA2FF  100%)",
      [theme.breakpoints.down("md")]: {
        height: 40,
        fontSize: 10,
      },
       [theme.breakpoints.down("sm")]: {
        fontSize: 14,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 12,
      },
    },
  }));

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin.id] : [coin?.id],
      });

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "#4DB9F6" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <div className={classes.coinHeadingContainer}>
          <img
            className={classes.coinImage}
            src={coin?.image.large}
            alt={coin?.name}
          />
          <Typography className={classes.coinHeading}>{coin?.name}</Typography>
        </div>
        <Typography className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <div className={classes.marketDataRow}>
            <Typography className={classes.heading}>Rank:</Typography>
            <Typography className={classes.marketRowData}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </div>
          <div className={classes.marketDataRow}>
            <Typography className={classes.heading}>Current Price:</Typography>
            <Typography className={classes.marketRowData}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </div>
          <div className={classes.marketDataRow}>
            <Typography className={classes.heading}>Market Cap:</Typography>
            <Typography className={classes.marketRowData}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </div>
        </div>
        {user && (
          <Button
            className={classes.watchlistButton}
            variant="outlined"
            onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
          >
            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </Button>
        )}
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
