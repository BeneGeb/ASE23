import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import GamePage from "./components/gamepage/gamepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import LobbyPage from "./components/lobby/lobby";

export class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App" style={{ width: "100%", height: "100vh" }}>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gamepage" element={<GamePage />} />
            <Route path="/lobby" element={<LobbyPage />} />
            {/*hier weitere Routen */}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
