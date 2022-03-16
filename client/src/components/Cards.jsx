import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
// useState, 
import "../styles/Cards.css"

import Card from './Card';
import Loading from "./Loading";


import { getAllDogs } from "../redux/actions";


//current dog

// //Me guardo en una constante el metodo useDispatch() para ir despachando mis acciones
// const dispatch = useDispatch()
// /* //Me guardo en una constante allVideogames, TODO lo que contenga el estado Videogames del reducer, que en un principio es un arreglo vacio pero que se llena cuando.....

// (lo mismo que el mapstatetoprops) */
// const allDogs = useSelector(state => state.dogs) // almacena todo lo que se encuentra en el estado de 'Videogames'
// ////Para traernos los 'videogames' del 'state.videogames' cuando el componente 'Home' se carga, usamos useEffect.
//     useEffect (() => {//lo mismo que component did mount
//         dispatch(getAllDogs());//despacho la accion que me trae todos los juegos (que ya me habia importado de las actions) ¡invocandola!, es lo mismo que hacer mapdispatch to prop en componentes de clase.
//     }, [dispatch]);//si o si le debo pasar el array para que no se me cree un bucle infinito de pedidos


export default function Cards({currentDog}) {
    const dispatch = useDispatch()//para usar ese hook tengo que crearme una instancia del mismo, siempre es lo pimero que hago en MI COMPONENTE INTELIGENTE

    //const allDogs = useSelector((state) => state.dogs) 
    
//const Dogs = () => {}


    //Cuando el componente home se monte, automaticamente se va a mostrar todos los juegos  
        useEffect (() => {//lo mismo que component did mount
            dispatch(getAllDogs())
        }, [dispatch]);
        
     

  return (
    <div className="dogsCards">
      
{currentDog?.map((d) => (
 
        <Card
          key={d.id}
          id={d.id}
          name={d.name}
          image={d.image || "https://cdn.shopify.com/s/files/1/0300/9124/7748/products/mockup-6161d4a6_1000x.jpg?v=1581906455"}
          temperament={d.temperament}
          weight_min= {d.weight_min} 
          weight_max= {d.weight_max}           
        />
      
      ))}
    </div>
  )
}

/*

   <Link to={"/home/" + d.id}>  
     </Link>

? d.temperament.join(' - ') : d.temperaments
          temperament={d.temperament.join(', ')}

          comprobar si me llega una cosa de la api o de la base de datos

          lo mismo para la imagen: Pregunto si tiene imagen, si hay que me la renderice, sino le paso una por default
          d.image? d.image : <img src="https://i.pinimg.com/564x/19/54/72/1954724b289dc7d865449ce76be11001.jpg" alt="" />

    temperament={d.temperament ? d.temperament.join(', ') : d.temperaments}
TESTEAR QUE ME LLEGA ALGO, SINO MANDAR UN MENSAJE DE ERROR */