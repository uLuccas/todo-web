import { useState } from "react";
import { Header } from "./components/Header";
import { TasksWrapper } from "./components/Tasks";
import "./styles/global.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="AppContainer">
      <Header />
      <TasksWrapper />
    </div>
  );
}

export default App;
