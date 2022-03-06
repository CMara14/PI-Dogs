import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { postDog, getTemperaments } from "../redux/actions";

export default function CreateDog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const temps = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  // //me defino un estado local como objeto vacio para poder setear los errores, modificando las props
       const [errors, setErrors] = useState({})

// //Creo una funcion para validar los inputs
        function validate(input) {
         let errors = {};//Me creo un obj porque es lo que voy a tener que devolver en caso de error
         //Lo pimero que tengo que validar es que si cada input tiene un value, 
        if (!input.name) {//si el input name no tiene value
           errors.name = "Name is required";//le creamos una prop al objeto errors         
        // else if ( .test(input.name)){//testear solo letras
        //     errors.name = "Name is invalid, it must be only letters";
        } else if (!input.height_min) {
          errors.height_min = "Min height is required"
        } else if (input.height_min <= 0) {//numeros negativos no
          errors.height_min = "Min height should be greater than 0"
        } else if (!input.height_max) {
          errors.height_max = "Max height is required"
        }  else if (input.height_max <= 0) {//numeros negativos no
            errors.height_max = "Max height should be greater than 0"
        } else if (parseInt(input.height_min) >= parseInt(input.height_max)) { //convierto el peso que me viene en string en un entero para compararlo
          errors.height_max = "Max height should be greater than Min height"
        } else if (!input.weight_min) {
          errors.weight_min = "Min weight is required"
        } else if (input.weight_min <= 0) {//numeros negativos no
          errors.weight_min = "Min weight should be greater than 0"
        } else if (!input.weight_max) {
          errors.weight_max = "Max weight is required"
        } else if (input.weight_min <= 0) {//numeros negativos no
          errors.weight_min = "Min weight should be greater than 0"
        } else if (parseInt(input.weight_min) >= parseInt(input.weight_max)) {//numeros negativos no
          errors.weight_max = "Max weight should be greater than Min weight"
        } else if (!input.image) {
         errors.image = "Please insert an image URL";
        } else if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image)) {
          errors.image = "Image is invalid, it must be an URL"
        } else if (input.image.length > 255) {
          errors.image = "Please insert a correct URL image";
        } else if (input.life_span <= 0) {//numeros negativos no
          errors.life_span = "Life span should be greater than 0"
        }else if (input.life_span > 20) {
          errors.life_span  = "Life span should be smaller than 20";
        } 
        return errors;
      };
         
  function handleChange(e) {
    console.log(e.target.value)
    setInput((prev) => ({ 
      ...prev,
      [e.target.name]: e.target.value,
          }));
    setErrors(validate({
      ...input, 
      [e.target.name]: e.target.value,
    })); //seteo el estado errors con el nuevo valor que acabo de mofidicar    
    console.log(input)  
  };


  function handleSelect(e) {
    console.log(e.target.value)
        setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  }

  //funcion para eliminar temperamentos si se equivoca el usuario
  function handleDelete(t) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== t),
    });
  }


  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postDog(input));
    alert("¡Dog created successfully!");
    setInput({
      name: "",
      height_min: "",
      height_max: "",
      weight_min: "",
      weight_max: "",
      life_span: "",
      image: "",
      temperaments: [], 
    });
    navigate("/home")
  }

  return (
    <div>
      <Link to="/home">
        {" "}
        <button>Return</button>
      </Link>
      <h1>¡Create your dog!</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input
            key="name"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
            required
          />
           {errors.name && (//pregunto si esta mi estado de errores
            <p >{errors.name}</p>//si llega a ser asi, renderizo un parrafo con el error
             )}
        </div>
        <div>
          <label>Height: </label>         
          <input
            key="height_min"
            type="number"
            placeholder="Min.."
            value={input.height_min}
            name="height_min"
            onChange={(e) => handleChange(e)}
            required
          />
          {errors.height_min && (//pregunto si esta mi estado de errores
            <p >{errors.height_min}</p>//si llega a ser asi, renderizo un parrafo con el error
             )}
          <input
            key="height_max"
            type="number"
            placeholder="Max.."
            value={input.height_max}
            name="height_max"
            onChange={(e) => handleChange(e)}
            required
          />
          {errors.height_max && (//pregunto si esta mi estado de errores
            <p >{errors.height_max}</p>//si llega a ser asi, renderizo un parrafo con el error
             )}          
        </div>
        <div>
          <label>Weight: </label>
          <input
            key="weight_min"
            placeholder="Min.."
            type="number"
            value={input.weight_min}
            name="weight_min"
            onChange={(e) => handleChange(e)}
            required
          />
          {errors.weight_min && (//pregunto si esta mi estado de errores
            <p>{errors.weight_min}</p>//si llega a ser asi, renderizo un parrafo con el error
             )}
          <input
            key="weight_max"
            placeholder="Max.."
            type="number"
            value={input.weight_max}
            name="weight_max"
            onChange={(e) => handleChange(e)}
            required
          />
          {errors.weight_max && (//pregunto si esta mi estado de errores
            <p >{errors.weight_max}</p>//si llega a ser asi, renderizo un parrafo con el error
             )}
        </div>
        <div>
          <label>Life Span: </label>
          <input
            key="life_span"
            type="number"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
          />
          {errors.life_span && (//pregunto si esta mi estado de errores
            <p>{errors.life_span}</p>//si llega a ser asi, renderizo un parrafo con el error
             )}
        </div>
        <div>
          <label>Image URL: </label>
          <input
            key="image"
            type="url"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          {errors.image && (//pregunto si esta mi estado de errores
            <p>{errors.image}</p>//si llega a ser asi, renderizo un parrafo con el error
             )}
        </div>
        <div>
          <div>
            <label>Temperaments: </label>
            <select onChange={(e) => handleSelect(e)}>
              {/* <option value={input.temperaments} disabled hidden>
                           </option> */}
              {temps?.map((temp) => (
                  <option value={temp} key={temp} name="temperaments">
                    {temp}
                  </option>
                ))}
            </select>
            <div>
              <label>You have selected: </label>
             {input.temperaments.map(t => (
              <div key={t}>
                <label>{t}</label>             
              <button onClick={() => handleDelete(t)}>x</button>
            </div>
          ))}
             </div>
          </div>                 
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}


