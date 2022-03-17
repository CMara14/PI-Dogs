import React from "react";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { useParams } from "react-router";

import "../styles/DogDetail.css";

//me importo la action que se va a dispachar
import { getDogDetail } from "../redux/actions";

import Loading from "./Loading";

//me importo el componente:
//import GameCard from './GameCard';

export default function DogDetail() {
  const dispatch = useDispatch();
  //BASICAMENTE NECESITO ACCEDER AL ID PARA PODER DESPACHAR LA ACCION, QUE ME TRAIGA Y ME LLENE MI ESTADO CON ESE PERSONAJE
  const { id } = useParams();

const [load, setLoad] = useState(true)


  useEffect(() => {
    //tengo que pasarle un id a mi action porque asi lo estipule cuando lo defini, pero tengo que acceder a el pasandole props a mi componente. Puedo usar el hook useParams de import { useParams } from 'react-router' o sino:
    dispatch(getDogDetail(id)).then(()=>setLoad(false)); //con esta sentencia accedo al id de ese VIDEOGAME porque dentro de las props que recibo, se encuentra el objeto params que es el que contiene el ID. Entonces despacho la accion con ese id.
  }, [dispatch, id]);

  
  
  // useEffect(() => {//tengo que pasarle un id a mi action porque asi lo estipule cuando lo defini, pero tengo que acceder a el pasandole props a mi componente. Puedo usar el hook useParams de import { useParams } from 'react-router' o sino:
  //     dispatch(getVgDetail(props.match.params.id));//con esta sentencia accedo al id de ese VIDEOGAME porque dentro de las props que recibo, se encuentra el objeto params que es el que contiene el ID. Entonces despacho la accion con ese id.
  // }, [dispatch])
  
  // console.log("ESto me llega por ID", id, `${id}`)
  // console.log("Detalle del Videojuego",  vgameDetailed)
  
  //Me traigo y guardo en una constante mi estado global del reducer, llenandolo con lo que despache de la accion anteriormente
  // me traigo el estado detail desde el reducer con useSelector
  const myDog = useSelector((state) => state.dogDetail);
  console.log("ESTADO GLOBAL: ", myDog);
  
  if(load) {
    return <Loading/>
  }
  
  return (
    <div className="centralContainer" >
      < >
        {myDog &&
          myDog.map((d) => {
            return (
              <div key={d.id} className="containerInfo">
                <div className="containerleft">
                  <h2 className="titleDetail">{d.name}</h2>
                  <img
                    className="imageDetail"
                    src={
                      d.image ||
                      "https://cdn.shopify.com/s/files/1/0300/9124/7748/products/mockup-6161d4a6_1000x.jpg?v=1581906455"
                    }
                    alt={`img of ${d.name}`}
                    width="400px"
                    height="250px"
                    
                  />
                                  </div>

                <div className="containerRight">
                  <p className="description"><strong>Height</strong> <br /> Min. {d.height_min} cm - Max. {d.height_max} cm   </p>
                  {/* <p className="description">Height Max:{" "}{" "}  {d.height_max} cm </p> */}
                  <p className="description"><strong>Weight</strong> <br /> Min. {d.weight_min} kg - Max. {d.weight_max} kg</p>
                  {/* <p className="description">Weight Max: {" "}{" "} {d.weight_max} kg</p> */}
                  <p className="description"> <strong>Life Span</strong> <br /> {d.life_span}</p>
                  <p className="description"> 
                  <strong>Temperament</strong>{" "} <br />                    
                    {d.temperament 
                      ? d.temperament.join(", ")
                      // : d.temperaments.join(" - ")
                      : d.temperaments? d.temperaments.join(", ")
                      : "No temperaments"
                      }
                  </p>
                </div>
              </div>
            );
          })}      
      </>
      <br />
      <Link to="/home">
        <button className="returnButton">Return</button>
      </Link>
    </div>
  );
}
/* [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
[ ] Altura
[ ] Peso
[ ] Años de vida


className={}*/
