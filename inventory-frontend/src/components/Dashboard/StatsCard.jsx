import React from "react";
import {motion} from "framer-motion";

const StatsCard = ({title, value, icon, color}) => (
  <motion.div
    className="stats-card"
    style={{borderLeft: `4px solid ${color}`}}
    whileHover={{scale: 1.05}}
    transition={{type: "spring", stiffness: 300}}>
    <div className="stats-icon" style={{color}}>
      {icon}
    </div>
    <div className="stats-content">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  </motion.div>
);

export default StatsCard;
