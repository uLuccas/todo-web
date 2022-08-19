import {FaTrash} from "react-icons/fa"
import "./style.css";

interface ItaskProps {
  id?: number;
  title?: string;
  done?: boolean;
  handleDeleteTask: (id: number | undefined) => void;
  handleChangeStatus: (id: number | undefined, done: boolean) => void;
}

export function TaskItem({
  id,
  done,
  title,
  handleDeleteTask,
  handleChangeStatus,
}: ItaskProps) {

  return (
    <div className={done ? "containerTaskItemDone":"containerTaskItem"}>
      <div style={{ display: "flex" }}>
        <input
          type="checkbox"
          checked={done}
          onClick={(e) => handleChangeStatus(id, e.currentTarget.checked)}
        />
        <span className={done ? "taskDone" : "taskText"}>{title}</span>
      </div>
      <div>
        <button onClick={() => handleDeleteTask(id)}><FaTrash size={16} /></button>
      </div>
    </div>
  );
}
