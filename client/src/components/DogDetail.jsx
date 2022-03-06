
import React from 'react';

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from 'react-router-dom';

import { useParams } from 'react-router';

//me importo la action que se va a dispachar 
import { getDogDetail } from '../redux/actions';

//import { getDogDetail  } from '../actions';

//me importo el componente:
//import GameCard from './GameCard';

export default function DogDetail() {
    const dispatch = useDispatch()
    
    //BASICAMENTE NECESITO ACCEDER AL ID PARA PODER DESPACHAR LA ACCION, QUE ME TRAIGA Y ME LLENE MI ESTADO CON ESE PERSONAJE
    
    const {id} = useParams();
    
    useEffect(() => {//tengo que pasarle un id a mi action porque asi lo estipule cuando lo defini, pero tengo que acceder a el pasandole props a mi componente. Puedo usar el hook useParams de import { useParams } from 'react-router' o sino:
    dispatch(getDogDetail(id));//con esta sentencia accedo al id de ese VIDEOGAME porque dentro de las props que recibo, se encuentra el objeto params que es el que contiene el ID. Entonces despacho la accion con ese id.
    }, [dispatch, id])
    
    
    // useEffect(() => {//tengo que pasarle un id a mi action porque asi lo estipule cuando lo defini, pero tengo que acceder a el pasandole props a mi componente. Puedo usar el hook useParams de import { useParams } from 'react-router' o sino:
    //     dispatch(getVgDetail(props.match.params.id));//con esta sentencia accedo al id de ese VIDEOGAME porque dentro de las props que recibo, se encuentra el objeto params que es el que contiene el ID. Entonces despacho la accion con ese id.
    // }, [dispatch])
    
    // console.log("ESto me llega por ID", id, `${id}`)
    // console.log("Detalle del Videojuego",  vgameDetailed)
    
    
    //Me traigo y guardo en una constante mi estado global del reducer, llenandolo con lo que despache de la accion anteriormente
    // me traigo el estado detail desde el reducer con useSelector
    const myDog = useSelector((state) => state.dogDetail)
    console.log("ESTADO GLOBAL: ", myDog)

  return (
    <div>
 <div>
{myDog && myDog.map((d) => {return (
  <div key={d.id}>
    <img src={d.image || "https://cdn.shopify.com/s/files/1/0300/9124/7748/products/mockup-6161d4a6_1000x.jpg?v=1581906455"} alt={`img of ${d.name}`} width="400px" weight="250px" />
    <p>Name: {d.name}</p>
    <p>Height Min: {d.height_min} cm</p>
    <p>Height Max: {d.height_max} cm </p>
    <p>Weight Min: {d.weight_min} kg</p>
    <p>Weight Max: {d.weight_max} kg</p>
    <p>Temperament: {d.temperament? d.temperament.join(' - ') : d.temperaments.join(' - ')}</p>
    <p>Life Span: {d.life_span}</p>
  </div>
);}

)}

</div>
            <Link to="/home">
                <button>Return</button>
            </Link>
    </div>
  )
}
/* [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
[ ] Altura
[ ] Peso
[ ] Años de vida


className={}*/




