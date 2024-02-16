import "./App.css";
import MainContent from "./components/MainContent";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function App() {
  return (
    <div
      css={css`
        height: 100vh;
        width: 100vw;
        background-color: #faf0e6;
      `}
    >
      <MainContent />
    </div>
  );
}

export default App;
