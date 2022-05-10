import * as React from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import {createRoot} from "react-dom/client";

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

createRoot(document.querySelector("#app")).render(<App />);
