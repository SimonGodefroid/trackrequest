import React from "react";
import { Link } from "react-router-dom";
import RequestList from "./Requests/RequestList";
const Dashboard = () => {
  return (
    <div>
      <RequestList />
      <div className="fixed-action-btn">
        <Link to={`/requests/new`} className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
