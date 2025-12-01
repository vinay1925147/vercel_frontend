import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Adminlayout from "./components/admin-view/layout";
import Authlayout from "./components/auth/layout";
import CheckAuth from "./components/commen/check-auth";
import Shoppinglayout from "./components/shoppig-view/layout";
import Admindashboard from "./pages/admin-view/dashboard";
import Adminfeatures from "./pages/admin-view/features";
import Adminorder from "./pages/admin-view/order";
import Adminproduct from "./pages/admin-view/product";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Notfound from "./pages/not-found";
import Shoppingaccount from "./pages/shoppig-view/account";
import Shoppingcheckout from "./pages/shoppig-view/checkout";
import Shoppinghome from "./pages/shoppig-view/home";
import Shoppinglist from "./pages/shoppig-view/listing";
import Shoppingorder from "./pages/shoppig-view/order";
import Unauth from "./pages/un-auth/unauth";
import { checkAuth } from "./store/auth-slice";

function App() {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8">
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full  animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          {/* Auth layout - login and register */}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <Authlayout />
              </CheckAuth>
              //  <Authlayout />
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Admin Layout */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <Adminlayout />
              </CheckAuth>
              // <Adminlayout />
            }
          >
            <Route path="dashboard" element={<Admindashboard />} />
            <Route path="order" element={<Adminorder />} />
            <Route path="product" element={<Adminproduct />} />
            <Route path="feature" element={<Adminfeatures />} />
          </Route>

          {/* Shopping */}
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <Shoppinglayout />
              </CheckAuth>
              //  <Shoppinglayout/>
            }
          >
            <Route path="home" element={<Shoppinghome />} />
            <Route path="account" element={<Shoppingaccount />} />
            <Route path="list" element={<Shoppinglist />} />
            <Route path="checkout" element={<Shoppingcheckout />} />
            <Route path="order" element={<Shoppingorder />} />
          </Route>

          {/* not found page */}
           <Route path="/" element={<Shoppinglayout/>}></Route>
          <Route path="*" element={<Notfound />}></Route>
          <Route path="/unauth-page" element={<Unauth />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
