/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "../App.css";
import React, { createContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export const CountryDataContext = React.createContext();

function MainContent() {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");

  const defaultFetchData = async () => {
    if (search === "") {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/thailand`
      );
      setSearchData(response.data[0]);
    }
  };

  useEffect(() => {
    defaultFetchData();
  }, []);

  const fetchData = async () => {
    if (search !== "") {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${search}`
      );
      setSearchData(response.data[0]);

      setSearch("");
    }
  };

  console.log(searchData);

  const firstCurrencyKey = Object.keys(searchData?.currencies || {})[0];
  const firstCurrencyValue = Object.values(searchData?.currencies || {})[0];

  return (
    <div
      css={css`
        width: full;
        height: 100%;
      `}
    >
      <div
        css={css`
          width: full;
          height: 10%;
          font-weight: bold;
          font-size: 2vw;
          padding-left: 60px;
          display: flex;
          align-items: center;
          box-shadow: 0px 1px 5px 0px #d6cfd3;
          background-color: #ffdab9;
        `}
      >
        Where in the world ?
      </div>
      <div
        css={css`
          width: 100%;
          height: 10%;
          padding-left: 60px;
          display: flex;
          align-items: center;
          margin-top: 15px;
        `}
      >
        <input
          type="text"
          placeholder="Search for a country ..."
          css={css`
            width: 25%;
            height: 40px;
            outline: 1px solid #d6cfd3;
            border: 1px solid #d6cfd3;
            border-radius: 5px;
            text-align: center;
            font-size: 1vw;
          `}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          value={search}
        />
        <img
          css={css`
            width: 30px;
            height: 30px;
            margin-left: 10px;
            &:hover {
              cursor: pointer;
            }
          `}
          src="https://cdn.pixabay.com/photo/2021/10/11/00/59/search-6699087_640.png"
          onClick={() => {
            fetchData();
          }}
        />
      </div>
      <div
        css={css`
          width: 100%;
          height: 75%;
          margin-top: 15px;
          display: flex;
          justify-content: center;
        `}
      >
        <div
          css={css`
            width: 95%;
            height: 95%;
            display: flex;
            border: solid 1px #c0c4cc;
            border-radius: 5px;
          `}
        >
          <div
            css={css`
              width: 50%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            `}
          >
            <p
              css={css`
                text-align: center;
                font-size: 3vw;
                font-weight: bold;
                margin-bottom: 10px;
              `}
            >
              <u>{searchData?.name?.common}</u>
            </p>
            <img
              css={css`
                width: 80%;
                height: auto;
                object-fit: cover;
              `}
              src={searchData?.flags?.png}
            />
          </div>
          <div
            css={css`
              width: 50%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: 20px 20px 20px 20px;
            `}
          >
            <p
              css={css`
                font-size: 2vw;
                margin-top: 20px;
              `}
            >
              <b>Official Name</b> : {searchData?.name?.official}
            </p>
            <p
              css={css`
                font-size: 2vw;
                margin-top: 20px;
              `}
            >
              <b>Population</b> : {searchData?.population?.toLocaleString()}{" "}
              people
            </p>
            <p
              css={css`
                font-size: 2vw;
                margin-top: 20px;
              `}
            >
              <b>Region</b> : {searchData?.region}
            </p>
            <p
              css={css`
                font-size: 2vw;
                margin-top: 20px;
              `}
            >
              <b>Subregion</b> : {searchData?.subregion}
            </p>
            <p
              css={css`
                font-size: 2vw;
                margin-top: 20px;
              `}
            >
              <b>Capital</b> : {searchData?.capital?.[0]}
            </p>
            <p
              css={css`
                font-size: 2vw;
                margin-top: 20px;
              `}
            >
              <b>Area</b> : {searchData?.area?.toLocaleString()} sq km.
            </p>
            <p
              css={css`
                font-size: 2vw;
                margin-top: 20px;
              `}
            >
              <b>Currency</b> : {firstCurrencyKey} ({firstCurrencyValue?.name})
            </p>
            <p
              css={css`
                font-size: 2vw;
                margin-top: 20px;
              `}
            >
              <b>Language</b> :{" "}
              {Object.entries(searchData?.languages || {}).map(
                ([key, value], index, array) => (
                  <span key={key}>
                    {value}
                    {index < array.length - 1 ? ", " : ""}
                  </span>
                )
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
