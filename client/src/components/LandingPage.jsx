/* 
////COMPONENTE DE TIPO PRESENTACIONAL:
+)PORQUE NO ESTA CONECTADO A NINGUN ESTADO
+)NO DESPACHA NINGUNA ACCION

// [ ] Alguna imagen de fondo representativa al proyecto
// [ ] Botón para ingresar al home (Ruta principal) */

import React from "react";
import { Link } from "react-router-dom";

import "../styles/LandingPage.css"
// import styles from '../styles/Landingpage.module.css';




export default function LandingPage(){
    return (
        <div className="landingPage">
            <h1 className="welcome_letters">Welcome to the Dogs App</h1>
            <Link to = "/home">
            <button className="button_landing">HOME</button>
            </Link>
        </div>
    )
};
//<button className="button_landing">HOME</button>
//                <button className={styles.button_landing} >HOME</button>
