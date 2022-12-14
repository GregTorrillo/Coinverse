import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { CryptoState } from "../../CryptoContext";
import { Avatar, Button } from '@material-ui/core';
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from '../CoinsTable';
import { AiFillDelete } from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';

const useStyles = makeStyles((theme) => ({
    container: {
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
        backgroundColor: "#222741",
        [theme.breakpoints.down("xs")]: {
          width: 300,
        },
      },
      profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
        fontFamily: "Montserrat",
      },
      logout: {
        height: "8%",
        width: "100%",
        backgroundImage: "linear-gradient(to right, #1FA2FF 0%, #12D8FA  51%, #1FA2FF  100%)", 
        color: "white",
        marginTop: 20,
        fontSize: 18,
        fontFamily: "Montserrat",
        fontWeight: "bold",
      },
      avatarHeader: {
          height: 38,
          width: 38,
          marginLeft: 15,
          cursor: "pointer",
          backgroundImage: "linear-gradient(to right, #1FA2FF 0%, #12D8FA  51%, #1FA2FF  100%)",
          [theme.breakpoints.down("xs")]: {
            width: 30,
            height: 30,
          },
      },
      picture: {
        width: 200,
        height: 200,
        cursor: "pointer",
        backgroundImage: "linear-gradient(to right, #1FA2FF 0%, #12D8FA  51%, #1FA2FF  100%)",
        objectFit: "contain",
        [theme.breakpoints.down("md")]: {
          width: 80,
          height: 80,
        },
      },
      watchlist: {
        flex: 1,
        width: "100%",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",
        background: "radial-gradient(ellipse at center, #1e2060 0%, #071623 100%, #0B2033 100%)",
      },
      coin: {
        padding: 10,
        borderRadius: 5,
        color: "white",
        width: "100%",
        height: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#222741",
        boxShadow: "0 0 3px black",
        fontFamily: "Montserrat",
      },
}));

export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, watchlist, coins, symbol } = CryptoState()

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const removeFromWatchlist = async (coin) => {
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

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });

    toggleDrawer();
  };
  
  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar className={classes.avatarHeader}
            onClick={toggleDrawer(anchor, true)}
            src={user.photoURL}
            alt={user.displayName || user.email}/>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
           <div className={classes.container}>
                <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist}>
                <span style={{ fontSize: 18, fontFamily: "Montserrat",fontWeight: "bold", textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className={classes.coin}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}
                </div>
                </div>
                <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
              >
                Log Out
              </Button>
           </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}