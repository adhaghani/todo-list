import React, { useRef, useState } from "react";

import Delete from "../assets/Delete";
const Add_Task = (props) => {
  const [IsEmpty, setIsEmpty] = useState(false);

  const titleref = useRef();
  const detailsref = useRef();
  const priorityref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleref.current.value;
    const details = detailsref.current.value;
    const priority = priorityref.current.value;
    if (!title || !priority) {
      setIsEmpty(true);
      return;
    } else {
      setIsEmpty(false);
      props.addTodo(title, priority, details);
    }
  };

  return (
    <div className="Add_Task">
      <div className="Add-Task_Container">
        <div className="Delete" onClick={props.handleAddTask}>
          <h2>Add New Task</h2>
          <Delete />
        </div>
        <p className="Error-text">{IsEmpty && "* fields must be filled."} </p>
        <div className="Input_Container">
          <label htmlFor="">* Task Name</label>
          <input
            className={IsEmpty ? "Error" : ""}
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
          <label htmlFor="">* Task Priority</label>
          <select
            className={IsEmpty ? "Error" : ""}
            required
            ref={priorityref}
            name="priority"
            id="priority"
          >
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
