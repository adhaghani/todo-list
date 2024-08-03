import React from "react";

import Delete from "../assets/Delete";
const Todo_Card = (props) => {
  return (
    <li className="Todo__Card">
      <div className="Delete">
        <Delete />
      </div>
      <h3 className="Todo_Title">{props.title}</h3>
      <div className="Details">
        <p
          className={
            props.priority === "High"
              ? "Todo_priority High"
              : props.priority === "Medium"
              ? "Todo_priority Medium"
              : "Todo_priority"
          }
        >
          {props.priority} Priority
        </p>
        <p className="Todo_Details">{props.details}</p>
      </div>
    </li>
  );
};

export default Todo_Card;
