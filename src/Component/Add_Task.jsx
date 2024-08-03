import React, { useRef } from "react";

import Delete from "../assets/Delete";
const Add_Task = (props) => {
  const titleref = useRef();
  const detailsref = useRef();
  const priorityref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleref.current.value;
    const details = detailsref.current.value;
    const priority = priorityref.current.value;
    props.addTodo(title, priority, details);
  };

  return (
    <div className="Add_Task">
      <div className="Add-Task_Container">
        <div className="Delete" onClick={props.handleAddTask}>
          <h2>Add New Task</h2>
          <Delete />
        </div>
        <div className="Input_Container">
          <label htmlFor="">Task Name</label>
          <input
            type="text"
            ref={titleref}
            id="title"
            placeholder="Task Name"
            required
          />
        </div>
        <div className="Input_Container">
          <label htmlFor="">Additional note</label>
          <input
            type="text"
            ref={detailsref}
            id="details"
            placeholder="Additional notes"
            required
          />
        </div>
        <div className="Input_Container">
          <label htmlFor="">Task Priority</label>
          <select required ref={priorityref} name="priority" id="priority">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="Input_Container">
          <input type="submit" placeholder="Add Task" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Add_Task;
