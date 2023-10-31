import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Statistics from "./pages/statistics";
import Transaction from "./pages/transaction";
import Transaction2 from "./pages/transaction2";
import MyWallet from "./pages/myWallet";
import Inbox from "./pages/inbox";
import Users from "./pages/users";
import Error from "./pages/error";
import Layout from "./component/layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/swap",
        element: <Transaction />,
      },
      {
        path: "/usdswap",
        element: <Transaction2 />,
      },
      {
        path: "/miner",
        element: <Statistics />,
      },
      {
        path: "/messages",
        element: <Inbox />,
      },
      {
        path: "/my-wallet",
        element: <MyWallet />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/404",
    element: <Error />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
