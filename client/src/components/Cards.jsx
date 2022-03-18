import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Cards.css";
import Card from "./Card";
import Loading from "./Loading";
import image from "../assets/perroCreate.jpg";
import { getAllDogs } from "../redux/actions";

export default function Cards({ currentDog }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  return (
    <div className="dogsCards">
      {currentDog?.map((d) => (
        <Card
          key={d.id}
          id={d.id}
          name={d.name}
          image={d.image || image}
          temperament={d.temperament}
          weight_min={d.weight_min}
          weight_max={d.weight_max}
        />
      ))}
    </div>
  );
}
