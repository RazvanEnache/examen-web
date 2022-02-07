import * as React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import VirtualShelfPage from "./VirtualShelfPage/VirtualShelfPage";
import BookListPage from "./BookListPage/BookListPage";

export default function App() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/virtualshelflist" exact>
          <VirtualShelfPage />
        </Route>

        <Route path="/virtualshelflist/:idVirtualShelf" exact>
          <BookListPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
