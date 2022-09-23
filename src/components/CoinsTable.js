import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import {
  Typography,
  Container,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {

  const [search, setSearch] = useState("");
  const history = useHistory();
  const [page, setPage] = useState(1);

  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const useStyles = makeStyles((theme) => ({
    coinsTableTitle: {
      marginTop: 40, 
      marginBottom: 10, 
      fontSize: 34,
      fontWeight: "bold", 
      fontfamily: "Montserrat", 
      color: "white",
      [theme.breakpoints.down("sm")]: {
        fontSize: 30,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 26,
      },
    },
    coinsTableDesc: {
      width: "100%", 
      marginBottom: 40, 
      fontSize: 16, 
      fontfamily: "Montserrat", 
      color: "darkgrey",
      [theme.breakpoints.down("sm")]: {
        fontSize: 14,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 12,
      },
    },
    TextField: {
      marginBottom: 20, width: "100%",
    },
    tableHead: {
      backgroundColor: "rgba(36, 40, 66, .4)", 
      borderBottom: "2px solid rgba(56, 61, 181, .3)",
    },
    tableRowHeader: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        fontFamily: "Montserrat",
        paddingLeft: 20,
        [theme.breakpoints.down("xs")]: {
          fontSize: 14,
        },
    },
    row: {
      backgroundColor: "rgba(36, 40, 66, .4)",
      cursor: "pointer",
      borderBottom: "1px solid rgba(56, 61, 181, .3)",
      "&:hover": {
        backgroundColor: "rgba(56, 61, 181, .3)",
      },
      fontFamily: "Montserrat",
    },
    coinCell: {
      display: "flex", 
      alignItems: "center",
    },
    coinImage: {
       height: 40,
       paddingRight: 15,
       [theme.breakpoints.down("xs")]: {
        height: 30,
        paddingRight: 10,
      },
    },
    coinName: {
      color: "white", 
      fontSize: 18, 
      paddingRight: 15,
      [theme.breakpoints.down("xs")]: {
        paddingRight: 5,
      },
    },
    coinSymbol: {
        textTransform: "uppercase",
        fontSize: 14,
        color: "grey",
    },
    tableCell: { 
      borderBottom: "none", 
      [theme.breakpoints.down("xs")]: {
        minWidth: 150,
      },
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "darkgrey",
        border: "1px solid darkgrey",
        padding: 5,
        margin: "5px 5px",
      },
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container >
        <Typography className={classes.coinsTableTitle}>
          Today's Cryptocurrency Prices by Market Cap
        </Typography>
        <Typography className={classes.coinsTableDesc}>
          Market Capitalization is calculated by multiplying the current coin price to its circulating supply.
        </Typography>
        <TextField className={classes.TextField}
          placeholder="Search..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon style={{color: "darkgrey"}} />
                </IconButton>
              </InputAdornment>
            ) 
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#4DB9F6" }} />
          ) : (
            <Table>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "24h Volume", "Market Cap"].map((head) => (
                    <TableCell className={classes.tableRowHeader}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap:15,
                            borderBottom: "none",
                          }}
                        >
                          <div className={classes.coinCell}>
                           <img className={classes.coinImage}
                            src={row?.image}
                            alt={row.name}/>
                             <span className={classes.coinName}>
                              {row.name}
                            </span>
                            <span className={classes.coinSymbol}>
                              {row.symbol}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className={classes.tableCell}
                          align="right"
                        >
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell className={classes.tableCell}
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                            borderBottom: "none",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell className={classes.tableCell}
                          align="right"
                          style={{ borderBottom: "none" }}
                        >
                          {symbol}{" "}
                          {numberWithCommas(
                            row.total_volume.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                        <TableCell className={classes.tableCell}
                          align="right"
                          style={{ borderBottom: "none"}}
                        >
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
