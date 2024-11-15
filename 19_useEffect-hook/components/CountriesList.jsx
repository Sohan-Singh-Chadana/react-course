import React, { useEffect, useState } from "react";
// import countriesData from "../countriesData";
import CountryCard from "./CountryCard";

const CountriesList = ({ query }) => {
  const [countriesData, setCountriesData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
      });

    const intervalId = setInterval(() => {
      console.log("running countriesList Components");
    }, [1000]);

    console.log(intervalId);

    return () => {
      console.log("Cleaning UP");
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    console.log("hii");
  }, [count]);

  return (
    <>
      <h1>{count}</h1>
      <button
        onClick={function () {
          // setCountriesData([]);
          setCount(count + 1);
        }}
      >
        Increase Count
      </button>
      <div className="countries-container">
        {countriesData
          .filter((country) =>
            country.name.common.toLowerCase().includes(query)
          )
          .map((country, i) => {
            return (
              <CountryCard
                key={country.name.common}
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population}
                region={country.region}
                capital={country.capital?.[0]}
              />
            );
          })}
      </div>
    </>
  );
};

export default CountriesList;
