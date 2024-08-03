import React from "react";
import "../Styles/Navigation.css";

const Navigation = (props) => {
  return (
    <nav className="Navigation" id="Navigation">
      <div className="Container Nav">
        <div className="Logo">
          <h1>To-Do List</h1>
        </div>
        <ul className="action">
          <li onClick={props.HandleAddTask}>Add New Task</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
