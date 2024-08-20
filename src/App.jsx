import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import DashBoard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="cabins" element={<Cabins />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<Account />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
