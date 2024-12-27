import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      <div className="bg-gradient-to-br from-blue-900 via-purple-100 to-slate-400">
        <Navbar style={{ postion: "relative" }} />
        <Outlet />
      </div>
    </>
  )
}

export default App
