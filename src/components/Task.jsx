import classNames from "classnames";
import "./Task.css";
import trashSolid from "../assets/trash-solid.svg";

import { useBearStore } from "../store";

const Task = ({ title }) => {
  const task = useBearStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const deleteTask = useBearStore((store) => store.deleteTask);
  const setDraggedTask = useBearStore((store) => store.setDraggedTask);

  return (
    <div
      className="task"
      draggable
      onDragStart={() => {
        setDraggedTask(task.title);
      }}
    >
      <div>{task.title}</div>
      <div className="bottom-wrapper">
        <div style={{ backgroundColor: "white" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2891/2891491.png"
            width="20px"
            style={{ cursor: "pointer" }}
            onClick={() => deleteTask(task.title)}
          />
        </div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
};

export default Task;
