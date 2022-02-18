import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Day } from "./components/Day";
import { Week } from "./components/Week";
import Month from "./components/Month";

export const AppContainer: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path={"/day"} element={<Day />} />
          <Route path={"/"} element={<Week />} />
          <Route path={"/month"} element={<Month />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

function App() {
  return (
    <div className="App">
      <AppContainer />
    </div>
  );
}

export default App;

//components:
// 1.grid
// 2.grid heading
// 3.Add EventModal
