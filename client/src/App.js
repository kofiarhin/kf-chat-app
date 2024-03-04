import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import ChatRoom from "./Pages/ChatRoom/ChatRoom";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatroom" element={<ChatRoom />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
