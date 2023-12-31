import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route path="/tv" element={< Tv />}></Route>
          <Route path="/search" element={< Search />}></Route>
          <Route path="/" element={< Home />}></Route>
          <Route path="movie/:listType/:id" element={< Home />}></Route>
          <Route path="tv/:listType/:id" element={< Tv />}></Route>
        </Routes>
    </Router>
  );
}

export default App;
