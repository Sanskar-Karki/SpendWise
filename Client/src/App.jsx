import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { store } from "./redux/store"
import { Provider } from "react-redux"

function App() {

  return (
    <>
      <Provider store={store}>
        <div className="bg-gradient-to-br from-blue-900 via-purple-100 to-slate-400">
          <Navbar style={{ postion: "relative" }} />
          <Outlet />
        </div >
      </Provider>
    </>
  )
}

export default App
