/* 
////COMPONENTE DE TIPO PRESENTACIONAL:
+)PORQUE NO ESTA CONECTADO A NINGUN ESTADO
+)NO DESPACHA NINGUNA ACCION

// [ ] Alguna imagen de fondo representativa al proyecto
// [ ] Botón para ingresar al home (Ruta principal) */

import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
    return (
        <div>
            <h1>Welcome</h1>
            <Link to = "/home">
                <button>HOME</button>
            </Link>
        </div>
    )
};