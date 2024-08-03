import React, { useState } from "react";

import Delete from "../assets/Delete";

import { Droppable, Draggable } from "react-beautiful-dnd";
const Task_Column = ({
  type,
  tasks,
  deleteTask,
  updateTaskStatus,
  ColumnID,
  Drag
}) => {
  const onDeleteClick = (id) => {
    deleteTask(id);
  };

  const updateTask = (id, ColumnID) => {
    const NewColumnID = ColumnID + 1;
    updateTaskStatus(id, NewColumnID);
  };

  return (
    <div className="Todo-Section">
      <h2 className="Title">{type}</h2>
      <div className="Todo_Container_Card">
        <Droppable droppableId={ColumnID.toString()}>
          {(provided) => (
            <ul
              className={Drag ? "Task_Columns Drag" : "Task_Columns"}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map(({ id, title, priority, details }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <li
                      className="Todo__Card"
                      key={id}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <div className="Delete" onClick={() => onDeleteClick(id)}>
                        <Delete />
                      </div>
                      <h3 className="Todo_Title">{title}</h3>
                      <div className="Details">
                        <p
                          className={
                            priority === "High"
                              ? "Todo_priority High"
                              : priority === "Medium"
                              ? "Todo_priority Medium"
                              : "Todo_priority"
                          }
                        >
                          {priority} Priority
                        </p>
                        <p className="Todo_Details">{details}</p>
                        {ColumnID !== 3 && (
                          <button onClick={() => updateTask(id, ColumnID)}>
                            {ColumnID === 1 ? "Doing" : "Done"}
                          </button>
                        )}
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Task_Column;
