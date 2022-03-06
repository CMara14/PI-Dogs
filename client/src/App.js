import './App.css';
// import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Home from "./components/Home";
import DogDetail from './components/DogDetail';
import CreateDog from './components/CreateDog';
import NotFound from './components/NotFound';

// import NavBar from "./components/NavBar"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Routes>
       <Route path={'/home'} element={<Home/>} />
       <Route path={'/dogs/:id'} element={<DogDetail/>}/>
       <Route exact path={'/'} element={<LandingPage />} />
       <Route path={'/dog'} element = {<CreateDog/>} />
       <Route path={"*"} element={<NotFound/>} />
       </Routes>
      <h1>Henry Dogs</h1>
    </div>
    </BrowserRouter>
  );
}


export default App;

