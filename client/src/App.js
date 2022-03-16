import './App.css';
// import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Home from "./components/Home";
import DogDetail from './components/DogDetail';
import CreateDog from './components/CreateDog';
import ErrorURL from "./components/ErrorURL"

// import NavBar from "./components/NavBar"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Routes>
       <Route exact path={'/'} element={<LandingPage />} />
       <Route path={'/home'} element={<Home/>} />
       <Route path={'/dog'} element = {<CreateDog/>} />
       <Route path={'/dogs/:id'} element={<DogDetail/>}/>
       <Route path={"*"} element={<ErrorURL/>} />
       </Routes>     
    </div>
    </BrowserRouter>
  );
}


export default App;

