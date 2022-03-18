import React from "react";

import { useState, useEffect } from "react";
//useState

import { useDispatch, useSelector } from "react-redux";

//COMPONENTES
import NavBar from "./NavBar";
import Cards from "./Cards";
import Paginado from "./Paginate";
import NotFound from "./NotFound";
import Loading from "./Loading";
import Funcionalidades from "./Funcionalidades";

import "../styles/Home.css";

//ACTIONS
import {
  sortBy,
  filterBySource,
  getTemperaments,
  filterByTemps,
  getAllDogs,
} from "../redux/actions";

//Defino el componente
export default function Home() {
  const dispatch = useDispatch();

  const temps = useSelector((state) => state.temperaments);
  const allDogs = useSelector((state) => state.dogs);

   const [currentPage, setCurrentPage] = useState(1);
  const [dogPerPage, setdogPerPage] = useState(8);
  const lastDog = currentPage * dogPerPage;
  const firstDog = lastDog - dogPerPage;

  const paginate = (pgNumber) => {
    setCurrentPage(pgNumber);
  };

  const currentDog = allDogs.slice(firstDog, lastDog);

  const [load, setLoad] = useState(true);
  const [, setOrderDog] = useState("");

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getAllDogs()).then(() => setLoad(false));
  }, [dispatch]);

  //FUNCIONES EVENTO
  function handleSort(e) {
    e.preventDefault();
    dispatch(sortBy(e.target.value));
    setCurrentPage(1);
    setOrderDog(e.target.value);
    // console.log("SOY EL ESTADO LOCAL: ", setOrderDog);
  }

  function handleSource(e) {
    e.preventDefault();
    dispatch(filterBySource(e.target.value));
    setCurrentPage(1);
  }

  function handleTemp(e) {
    e.preventDefault();
    dispatch(filterByTemps(e.target.value));
    setCurrentPage(1);
  }

  if (load) {
    return <Loading />;
  }

  return (
    <div className="Home">
      <div>
        <NavBar />
      </div>

      <div>
        {currentDog.length && !load ? (
          <div>
            <Funcionalidades
              handleSort={handleSort}
              handleSource={handleSource}
              handleTemp={handleTemp}
            />

            <div>
              <Cards currentDog={currentDog} />
            </div>

            <div>
              <Paginado
                dogsPerPage={dogPerPage}
                allDogs={allDogs.length}
                paginate={paginate}
              />
            </div>
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
}
