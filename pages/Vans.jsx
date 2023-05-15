import React, { useEffect } from "react";
import { vanActions } from "./store/van-slice";
import { useSelector, useDispatch } from "react-redux";

export default function Vans() {
  const vansData = useSelector((state) => state.vans.vansData);
  const filterData = useSelector((state) => state.vans.filterData);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("api/vans");
        const data = await response.json();

        dispatch(vanActions.updateState(data.vans));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const typeOfVan = vansData.map((van, i, arr) => van.type);
  const filtypeOfVan = typeOfVan.filter(
    (type, i, arr) => arr.indexOf(type) === i
  );

  const filterHandler = (e) => {
    dispatch(vanActions.filterVans(e.target.innerText.toLowerCase()));
  };
  const clearFilterHandler = () => {
    dispatch(vanActions.updateState(vansData));
  };

  return (
    <>
      <h1>Explore our van options</h1>
      <div className="van-type">
        {filtypeOfVan.map((type, i) => (
          <p key={`t${1 + i}`} onClick={filterHandler}>
            {type.slice(0, 1).toUpperCase() + type.slice(1)}
          </p>
        ))}

        <button onClick={clearFilterHandler}>Clear filters</button>
      </div>
      <div className="vans">
        {filterData.map((van) => (
          <div key={van.id} className="van">
            <div className="img">
              <img src={van.imageUrl} />
            </div>
            <div className="van-info">
              <h2>{van.name}</h2>
              <h3>
                ${van.price}
                <span>/day</span>
              </h3>
              <p className={van.type}>
                {van.type.slice(0, 1).toUpperCase() + van.type.slice(1)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
