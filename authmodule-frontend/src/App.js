import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./views/auth/ForgotPassword";
import LoginReg from "./views/auth/LoginReg";
import ResetPassword from "./views/auth/ResetPassword";
import Contact from "./views/Contact";
import Dashboard from "./views/Dashboard";
import Homepage from "./views/Homepage";
import Layout from "./views/Layout";

function App() {
  const { token } = useSelector((state) => state.authToken);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={!token ? <LoginReg /> :<Navigate to='/dashboard' /> } />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route
            path="api/user/reset/:id/:resetLink"
            element={<ResetPassword />}
          />
        </Route>
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to='/login' />} />
        <Route path="*" element={<h1>404 Page not found!</h1>} />
      </Routes>
    </>
  );
}

export default App;
