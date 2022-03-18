import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { postDog, getTemperaments } from "../redux/actions";

import "../styles/CreateDog.css";
import icon from "../assets/perroCreate.jpg";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Z ]+$/i.test(input.name)) {
    errors.name = "Name is invalid, it must be only letters";
  }

  if (!input.height_min) {
    errors.height_min = "Min height required";
  } else if (input.height_min <= 0) {
    errors.height_min = "Min height should be greater than 0";
  } else if (!input.height_max) {
    errors.height_max = "Max height required";
  } else if (input.height_max <= 0) {
    errors.height_max = "Max height should be greater than 0";
  } else if (parseInt(input.height_min) >= parseInt(input.height_max)) {
    errors.height_max = "Max height should be greater than Min height";
  }

  if (!input.weight_min) {
    errors.weight_min = "Min weight required";
  } else if (input.weight_min <= 0) {
    errors.weight_min = "Min weight should be greater than 0";
  } else if (!input.weight_max) {
    errors.weight_max = "Max weight required";
  } else if (input.weight_min <= 0) {
    errors.weight_min = "Min weight should be greater than 0";
  } else if (parseInt(input.weight_min) >= parseInt(input.weight_max)) {
    errors.weight_max = "Max weight should be greater than Min weight";
  }

  if (!input.minlife_span) {
    errors.minlife_span = "Min Life Span required";
  } else if (input.minlife_span <= 0) {
    errors.minlife_span = "Min Life Span should be greater than 0";
  } else if (!input.maxlife_span) {
    errors.maxlife_span = "Max Life Span required";
  } else if (input.maxlife_span <= 0) {
    errors.maxlife_span = "Max Life Span should be greater than 0";
  } else if (parseInt(input.minlife_span) >= parseInt(input.maxlife_span)) {
    errors.maxlife_span = "Max Life Span should be greater than Min Life Span";
  }

  const regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  if (input.image.length && !regex.test(input.image)) {
    errors.image = "Image is invalid, it must be an URL";
  }

  return errors;
}

export default function CreateDog() {
  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    minlife_span: "",
    maxlife_span: "",
    image: "",
    temperaments: [],
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const temps = useSelector((state) => state.temperaments);
  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleSubmit(e) {
    const dogsFiltered = allDogs.filter((d) => d.name.toLowerCase() === input.name.toLowerCase() || d.name.toLowerCase() + " " === input.name.toLowerCase());
    e.preventDefault();
    console.log(input);
    let error = Object.keys(validate(input));

    if (error.length !== 0 || !input.temperaments.length) {
      alert("Please complete all the fields.");
    } else if (dogsFiltered.length >= 1  ) {
      alert("That name is already taken, please choose another.");
    } else {
      dispatch(postDog(input));
      setInput({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        minlife_span: "",
        maxlife_span: "",
        image: "",
        temperaments: [],
      });
      alert("¡Dog created successfully!");
      navigate("/home");
    }
  }

  function handleChange(e) {
    e.preventDefault();
    console.log(e.target.value);
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    if (!input.temperaments.includes(e.target.value)) {
      console.log(e.target.value);
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });
    }
  }

  function handleDelete(t) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== t),
    });
  }

  return (
    <div className="bodyForm">
      <form className="formCreate" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="titleCreate">¡Create your dog! </h1>

        <div className="containerform">
          <div className="group">
            <label className="inputLabel">Name: </label>
            <input
             
           
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              required
              className="inputBox"
            />
            <strong className="errors">{errors.name}</strong>
          </div>

          <div className="group">
            <label className="inputLabel">Image URL: </label>
            <input
              // key="image"
              type="url"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              className="inputBox"
              placeholder="URL"
              maxLength="255"
            />{" "}
            <strong className="errors"> {errors.image}</strong>
          </div>

          <div className="group">
            <label className="inputLabel">Height: </label>
            <input
             
              type="number"
              placeholder="Min.."
              value={input.height_min}
              name="height_min"
              onChange={(e) => handleChange(e)}
              // required
              className="inputBox"
              min="0"
            />
            <strong className="errors">{errors.height_min}</strong>
            <br />
            <input
              
              type="number"
              placeholder="Max.."
              value={input.height_max}
              name="height_max"
              onChange={(e) => handleChange(e)}
              // required
              className="inputBox"
              min="0"
            />
            <strong className="errors">{errors.height_max}</strong>
          </div>

          <div className="group">
            <label className="inputLabel">Weight: </label>
            <input
              
              placeholder="Min.."
              type="number"
              value={input.weight_min}
              name="weight_min"
              onChange={(e) => handleChange(e)}
              // required
              className="inputBox"
              min="0"
            />
            <strong className="errors"> {errors.weight_min}</strong>
            <br />
            <input
            
              placeholder="Max.."
              type="number"
              value={input.weight_max}
              name="weight_max"
              onChange={(e) => handleChange(e)}
              // required
              className="inputBox"
              min="0"
            />{" "}
            <strong className="errors"> {errors.weight_max}</strong>
          </div>
          <div className="group">
            <label className="inputLabel"> Life Span: </label>
            <input
              type="number"
              placeholder="Min.."
              value={input.minlife_span}
              name="minlife_span"
              onChange={(e) => handleChange(e)}
              // required
              className="inputBox"
              min="0"
            />
            <strong className="errors">{errors.minlife_span}</strong>
            <br />
            <input
            
              type="number"
              placeholder="Max.."
              value={input.maxlife_span}
              name="maxlife_span"
              onChange={(e) => handleChange(e)}
              // required
              className="inputBox"
              min="0"
            />
            <strong className="errors"> {errors.maxlife_span}</strong>
          </div>

          <div className="group">
            <label className="inputLabel">Temperaments: </label>

            <select
              defaultValue=""
              className="selectCreate"
              onChange={(e) => handleSelect(e)}
            >
              <option value="" disabled hidden>
                Select Temperaments...
              </option>
              {temps?.map((temp) => (
                <option value={temp.name} key={temp.id} name="temperaments">
                  {temp}
                </option>
              ))}
            </select>
            <div className="optionsTemps">
              {input.temperaments.map((t) => (
                <div className="box_opcion" key={t}>
                  <div className="opcion_title">
                    <p>{t}</p>
                  </div>
                  <button
                    className="btn_remove"
                    onClick={() => handleDelete(t)}
                    key={t}
                    value={t}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <strong className="errors">{errors.temperaments}</strong>
          </div>
          <div className="containerButtons">
            <div className="containerButtonreturn">
              <button
                className="buttonCreate"
                type="submit"
                onSubmit={(e) => handleSubmit(e)}
              >
                Create
              </button>

              <NavLink className="navLink" to="/home">
                <button className="buttonReturn">Cancel</button>
              </NavLink>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

