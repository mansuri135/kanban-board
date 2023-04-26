import { useBearStore } from "../store";
import { shallow } from "zustand/shallow";
import "./Column.css";
import Task from "./Task";
import { useState } from "react";
import classNames from "classnames";

const Column = ({ state }) => {
  const [text, setText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [drop, setDrop] = useState(false);
  const tasks = useBearStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );
  const addTask = useBearStore((store) => store.addTask);
  const draggedTask = useBearStore((store) => store.draggedTask);
  const setDraggedTask = useBearStore((store) => store.setDraggedTask);
  const moveTask = useBearStore((store) => store.moveTask);

  return (
    <div
      className={classNames("column", { drop: drop })}
      onDragOver={(e) => {
        e.preventDefault();
        setDrop(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDrop(false);
      }}
      onDrop={(e) => {
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className="title-wrapper">
        <p>{state}</p>
        <button onClick={() => setOpenModal(true)}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
      {openModal && (
        <div className="modal">
          <div className="modal-content">
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpenModal(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Column;
