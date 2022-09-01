import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path=":id" element={<Home/>}/>
        <Route path="basket" element={<Home/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
