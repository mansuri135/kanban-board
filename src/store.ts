import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BearState {
  tasks: { title: String; state: String }[];
  draggedTask: String | null;
  addTask: (title: String, state: String) => void;
  deleteTask: (title: String) => void;
  setDraggedTask: (title: String) => void;
  moveTask: (title: String, state: String) => void;
}

export const useBearStore = create<BearState>()(
  persist(
    (set) => ({
      tasks: [],
      draggedTask: null,
      addTask: (title, state) =>
        set((store) => ({ tasks: [...store.tasks, { title, state }] })),
      deleteTask: (title) =>
        set((store) => ({
          tasks: store.tasks.filter((task) => task.title !== title),
        })),
      setDraggedTask: (title) => set({ draggedTask: title }),
      moveTask: (title, state) =>
        set((store) => ({
          tasks: store.tasks.map((task) =>
            task.title === title ? { title, state } : task
          ),
        })),
    }),
    {
      name: "bear-storage",
    }
  )
);
