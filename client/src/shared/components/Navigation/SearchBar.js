import React, { useState } from "react";
import "./SearchBar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import Backdrop from '../UI/Backdrop/Backdrop'

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
      setOpen(false);
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setOpen(false);
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search main-navigation__search">
      { open && <Backdrop onClick={clearInput}  />}
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
              }}
            />
          ) : (
            <AiOutlineClose
              style={{
                color: "black",
                width: "1rem",
                height: "1rem",
              }}
              id="clearBtn"
              onClick={clearInput}
            />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div
          className={`dataResult  ${open ? "openModal" : "closeModal"}`}
          id="searchInputs"
        >
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <Link className="dataItem" to={"/products/" + value._id}>
                <div>
                  <img
                    src={`http://localhost:8080/uploads${value?.images[0]}`}
                    alt={value.name}
                  />
                  <p>{value.name} </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
