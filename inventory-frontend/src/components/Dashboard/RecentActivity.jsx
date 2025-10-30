import React, {useState, useEffect} from "react";
import API from "../../api/axios";
import {FiActivity, FiArrowUp, FiArrowDown} from "react-icons/fi";
import {motion} from "framer-motion";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        // Fetch recent transactions from backend
        const {data} = await API.get("/transactions");
        setActivities(data.slice(0, 10)); // Last 10 transactions
      } catch (error) {
        console.error("Failed to fetch activities");
      }
      setLoading(false);
    };
    fetchActivities();
  }, []);

  const getActivityIcon = (type) => {
    return type === "IN" ? (
      <span className="activity-icon in">
        <FiArrowUp />
      </span>
    ) : (
      <span className="activity-icon out">
        <FiArrowDown />
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h3>
            <FiActivity /> Recent Activity
          </h3>
        </div>
        <div style={{padding: "2rem", textAlign: "center", color: "#9ca3af"}}>
          Loading activities...
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>
          <FiActivity /> Recent Activity
        </h3>
      </div>

      {activities.length === 0 ? (
        <div style={{padding: "2rem", textAlign: "center", color: "#9ca3af"}}>
          No recent activities
        </div>
      ) : (
        <div className="activity-list">
          {activities.map((activity, index) => (
            <motion.div
              key={activity._id}
              className="activity-item"
              initial={{opacity: 0, x: -20}}
              animate={{opacity: 1, x: 0}}
              transition={{delay: index * 0.05}}>
              {getActivityIcon(activity.type)}
              <div className="activity-content">
                <div className="activity-title">
                  {activity.type === "IN" ? "Stock Added" : "Stock Removed"}
                </div>
                <div className="activity-meta">
                  Product: {activity.productId?.name || "Unknown"} • Qty:{" "}
                  {activity.quantity} •{formatDate(activity.createdAt)}
                </div>
                {activity.reason && (
                  <div className="activity-reason">{activity.reason}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <style jsx>{`
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1rem;
        }
        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 8px;
          border-left: 3px solid transparent;
          transition: all 0.2s;
        }
        .activity-item:hover {
          background: #f3f4f6;
          border-left-color: #667eea;
        }
        .activity-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 1rem;
        }
        .activity-icon.in {
          background: #d1fae5;
          color: #065f46;
        }
        .activity-icon.out {
          background: #fee2e2;
          color: #991b1b;
        }
        .activity-content {
          flex: 1;
        }
        .activity-title {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }
        .activity-meta {
          font-size: 0.875rem;
          color: #6b7280;
        }
        .activity-reason {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #9ca3af;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default RecentActivity;
