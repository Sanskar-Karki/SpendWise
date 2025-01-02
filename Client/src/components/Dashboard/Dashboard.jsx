import Chart from "./components/Chart"
import Motivation from "./components/Motivation"
import Summary from "./components/Summary"
import Top3Expense from "./components/Top3Expense"
import Top3Income from "./components/Top3Income"
import "./styles.css"


const Dashboard = () => {
  return (
    <div className="dashboard--parent ">
      <div className="dashboard--chart">
        <Chart/>
      </div>
      <div className="dashboard--income--expense">
        <div className="latest--income">
          <Top3Income />
        </div>
        <div className="latest--expense">
          <Top3Expense />
        </div>
      </div>
      <div className="dashboard--summary">
        <Summary />
      </div>
      <div className="dashboard--motivation">
        <Motivation />
      </div>
    </div>
  )
}

export default Dashboard
