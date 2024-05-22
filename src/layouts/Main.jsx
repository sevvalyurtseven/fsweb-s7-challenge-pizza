import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "../pages/HomePage";
import OrderPizzaPage from "../pages/OrderPizzaPage";
import SuccessPage from "../pages/SuccessPage";

function Main() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/order-pizza">
          <OrderPizzaPage />
        </Route>
        <Route path="/success">
          <SuccessPage />
        </Route>
      </Switch>
    </>
  );
}

export default Main;
