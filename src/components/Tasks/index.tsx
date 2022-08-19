import React, { useEffect, useState } from "react";
import { TaskItem } from "./taskItem";
import { TbPlaylistAdd } from "react-icons/tb";

import "./style.css"

interface Tasks {
  id: number;
  title: string;
  done: boolean;
}

export function TasksWrapper() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [contentTask, setContentTask] = useState<string>("");

  async function getTasks() {
    try {
      const get = await fetch("http://127.0.0.1:3080/", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      let result: Tasks[] = await get.json();

      setTasks(result);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleNewTask() {
    if (contentTask.length === 0)
      return alert("Não é possivel cadastrar uma tarefa vazia!");
    try {
      await fetch("http://127.0.0.1:3080/createTask", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title: contentTask,
        }),
      });
      setContentTask("");
      getTasks();
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDeleteTask(id: number | undefined) {
    try {
      await fetch("http://127.0.0.1:3080/deleteTask", {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id,
        }),
      });

      getTasks();
    } catch (e) {
      console.log(e);
    }
  }

  async function handleChangeStatus(id: number | undefined, done: boolean) {
    console.log(done);
    try {
      await fetch("http://127.0.0.1:3080/changeStatus", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id,
          done,
        }),
      });

      getTasks();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "70%",
        alignItems: "center",
      }}
    >
      <div style={{ marginTop: 10, display: "flex", alignItems:"center"}}>
        <input
        className="inputTask"
          type="text"
          placeholder="Qual sua tarefa de hoje?"
          value={contentTask}
          onChange={(e) => setContentTask(e.target.value)}
        />
        <button className="btnAddTask" onClick={() => handleNewTask()}>
          <TbPlaylistAdd size={22} />
        </button>
      </div>

      {tasks &&
        tasks.map((item, index) => (
          <TaskItem
            key={index}
            id={item.id}
            done={item.done}
            title={item.title}
            handleDeleteTask={handleDeleteTask}
            handleChangeStatus={handleChangeStatus}
          />
        ))}
    </div>
  );
}
