import React from "react";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { useParams } from "react-router";

import "../styles/DogDetail.css";
import image from "../assets/perroCreate.jpg";

import { getDogDetail } from "../redux/actions";

import Loading from "./Loading";

export default function DogDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    dispatch(getDogDetail(id)).then(() => setLoad(false));
  }, [dispatch, id]);

  const myDog = useSelector((state) => state.dogDetail);

  if (load) {
    return <Loading />;
  }

  return (
    <div className="centralContainer">
      <>
        {myDog &&
          myDog.map((d) => {
            return (
              <div key={d.id} className="containerInfo">
                <div className="containerleft">
                  <h2 className="titleDetail">{d.name}</h2>
                  <img
                    className="imageDetail"
                    src={d.image || image}
                    alt={`img of ${d.name}`}
                    width="400px"
                    height="250px"
                  />
                </div>

                <div className="containerRight">
                  <p className="description">
                    <strong>Height</strong> <br /> Min. {d.height_min} cm - Max.{" "}
                    {d.height_max} cm{" "}
                  </p>
                  <p className="description">
                    <strong>Weight</strong> <br /> Min. {d.weight_min} kg - Max.{" "}
                    {d.weight_max} kg
                  </p>
                  <p className="description">
                    {" "}
                    <strong>Life Span</strong> <br /> {d.life_span}
                  </p>
                  <p className="description">
                    <strong>Temperament</strong> <br />
                    {d.temperament
                      ? d.temperament.join(", ")
                      : d.temperaments
                      ? d.temperaments.join(", ")
                      : "No temperaments"}
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
