import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 0,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    background: "linear-gradient(to left, #00d2ff, #3a7bd5)",
    borderRadius: "50%",
    border: "2px solid #383db5",
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
      width: 30,
      height: 30,
   },
  },
  title: {
    flex: 1,
    color: "white",
    fontFamily: "Montserrat",
    fontSize: 20,
    fontWeight: "bold",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
   },
  },
  selectLoginContainer: {
    display: "flex",
    alignItems: "center",
  },
  select: {
      width: 100,
      height: 40,
      border: "1px solid #383db5",
      [theme.breakpoints.down("xs")]: {
        width: 70,
        height: 30,
        marginRight: -15,
        fontSize: 10,
     },
  },
  menuItem: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
   },
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const { currency, setCurrency, user } = CryptoState();

  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        style={{
          backgroundColor: "#070B1C",
          borderBottom: "1px solid rgba(56, 61, 181, .5)",
          width: "100%",
        }}
        color="transparent"
        position="static"
      >
        <Container>
          <Toolbar className={classes.headerContainer}>
            <div className={classes.logoContainer}>
              <Typography className={classes.logo}>C</Typography>
              <Typography
                onClick={() => history.push("/")}
                className={classes.title}
              >
                Coinverse
              </Typography>
            </div>
            <div>
              <Typography
                onClick={() => history.push("/News")}
                className={classes.title}
              >
                News
              </Typography>
            </div>
            <div className={classes.selectLoginContainer}>
              <Select className={classes.select}
                variant="outlined"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem className={classes.menuItem}
                  style={{ background: "rgba(36, 40, 66, 1)" }}
                  value={"USD"}
                >
                  USD
                </MenuItem>
                <MenuItem className={classes.menuItem}
                  style={{ background: "rgba(36, 40, 66, 1)" }}
                  value={"EUR"}
                >
                  EUR
                </MenuItem>
              </Select>
              {user ? <UserSidebar /> : <AuthModal />}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
