import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  const location = useLocation(); // Get current route

  // Hide Navbar on the login page
  const shouldShowNavbar = location.pathname !== "/";

  return (
    <Provider store={store}>
      <div className="bg-gradient-to-br from-blue-900 via-purple-100 to-slate-400">
        {shouldShowNavbar && <Navbar />}
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
