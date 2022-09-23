import { BrowserRouter, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import "./App.css";
import Header from "./components/Header";
import Alert from "./components/Alert";
import { lazy, Suspense } from "react";
import News from "./pages/News";

const Homepage = lazy(() => import("./pages/Homepage"));
const CoinPage = lazy(() => import("./pages/CoinPage"));

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      background: "linear-gradient(to bottom, #070B1C, #0e1b2b)",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Route path="/" component={Homepage} exact />
          <Route path="/coins/:id" component={CoinPage} />
          <Route path="/News" component={News} />
        </Suspense>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
