import { motion } from 'framer-motion'; // Import motion for animations
import Chart from "./components/Chart";
import Motivation from "./components/Motivation";
import Summary from "./components/Summary";
import LatestData from "./components/LatestData";
import "./styles.css";
import ChartData from './components/ChartData';

const Dashboard = () => {
  return (
    <div className='pt-20'>
      <motion.div
        className="dashboard--parent "
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Fade in to opacity 1
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Chart Section */}
        <motion.div
          className="dashboard--chart"
          initial={{ opacity: 0, y: 50 }} // Start slightly below the screen
          animate={{ opacity: 1, y: 0 }} // Fade and slide up
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ChartData />
        </motion.div>

        {/* Latest Income Section */}
        <motion.div
          className="dashboard--income--expense"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="latest--income">
            <LatestData />
          </div>
        </motion.div>

        {/* Summary Section */}
        <motion.div
          className="dashboard--summary"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }} // Adding delay to stagger animation
        >
          <Summary />
        </motion.div>

        {/* Motivation Section */}
        <motion.div
          className="dashboard--motivation"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }} // Adding more delay for staggered effect
        >
          <Motivation />
        </motion.div>
      </motion.div>
    </div>

  );
};

export default Dashboard;
