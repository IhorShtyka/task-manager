import { css } from "../styled-system/css";

function App() {
  return (
    <div className={css({ minHeight: "100vh", bg: "#121212", color: "#e0e0e0" })}>
      <h1 className={css({ fontSize: "2xl", fontWeight: "bold", p: "4" })}>
        Task Manager
      </h1>
    </div>
  );
}

export default App;
