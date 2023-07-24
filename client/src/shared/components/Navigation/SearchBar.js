import React, { useState } from "react";
import "./SearchBar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [open, setOpen] = useState(false);
  //   console.log(data);
  const handleFilter = (event) => {
    setOpen(true);
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
      setOpen(false);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setOpen(false);
  };

  return (
    <div className="search main-navigation__search">
      <div className={`searchInputs`}>
        <input
          type="text"
          className=""
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <AiOutlineSearch
              style={{
                color: "black",
                width: "1rem",
                height: "1rem",
                marginRight: "1vh",
              }}
            />
          ) : (
            <AiOutlineClose
              style={{
                color: "black",
                width: "1rem",
                height: "1rem",
                marginRight: "1vh",
              }}
              id="clearBtn"
              onClick={clearInput}
            />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className={`dataResult  openModal } `} id="searchInputs">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                <p>{value.name} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
