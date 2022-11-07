import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { getGMTOffset, getTime } from "./../utils/Time";
import { addCity } from "../store/cities/cities.slice";
import { toggleSearch } from "../store/ui/ui.slice";
import { useDispatch } from "react-redux";

const StyledSearch = styled.div`
  transition: opacity 0.2s ease;

  display: flex;
  flex-direction: column;
  background-color: rgba(22, 22, 22, 0.99);
  box-shadow: 0px 0px 200px 40px rgb(0 0 0 / 74%);

  max-width: 400px;
  width: 100%;
  margin: 12px;

  position: absolute;
  top: 30%;
  /* transform: translateY(-50%); */
  border-radius: 4px;

  z-index: 100;
`;

const StyledSearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 6px 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px 4px 0 0;
`;

const StyledSearchIcon = styled.div`
  width: 18px;
  height: 18px;
`;

const StyledSearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #ffffff;
  font-size: 18px;
  font-family: "Crimson Pro", serif;

  padding: 8px 0;

  &::placeholder {
    font-size: 18px;
    color: #717171;
  }
`;

const StyledResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none;
  border-radius: 0 0 4px 4px;
`;

const StyledMessage = styled.div`
  color: #858585;
  margin: auto;
  padding: 8px;

  a {
    color: #d0d0d0;
    text-decoration: none;
  }
`;

const StyledResult = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  width: 100%;

  /* --delay: 120ms;
  --start: 0ms;

  animation: enter 0.6s both;
  animation-delay: calc(var(--stagger) * var(--delay) + var(--start)); */

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(255, 255, 255, 0.8);
    .timezone {
      width: 6ch;
      display: flex;
      justify-content: center;

      color: rgba(255, 255, 255, 0.7);

      background-color: rgb(255 255 255 / 11%);
      padding: 2px 6px;
      border-radius: 3px;
    }
  }
  .right {
    .time {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const SearchIcon = () => {
  return (
    <StyledSearchIcon>
      <svg fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 15.5L11.6166 12.1166M13.4445 7.72226C13.4445 11.1587 10.6587 13.9445 7.22226 13.9445C3.7858 13.9445 1 11.1587 1 7.72226C1 4.2858 3.7858 1.5 7.22226 1.5C10.6587 1.5 13.4445 4.2858 13.4445 7.72226Z"
          stroke="#555555"
          strokeOpacity="0.66"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </StyledSearchIcon>
  );
};

const Search = () => {
  const [cities, setCities] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const dispatch = useDispatch();

  const fetchCities = async () => {
    await fetch("./cities.json").then((res) => {
      res.json().then((data) => {
        setCities(data);
      });
    });
  };

  const searchCities = (query) => {
    const results = cities
      .filter((city) => {
        return city["name"].toLowerCase().includes(query.toLowerCase());
      })
      .sort((a, b) => {
        return (
          a["name"].toLowerCase().indexOf(query.toLowerCase()) -
          b["name"].toLowerCase().indexOf(query.toLowerCase())
        );
      });

    return results.slice(0, 5);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleSearch = () => {
    if (query.length > 0) {
      const res = searchCities(query);
      setResults(
        res.map((city) => ({
          city: city["name"],
          timezone: getGMTOffset(city["timezone"]),
          time: getTime(city["timezone"]),
          tz: city["timezone"],
          country: city["iso2"],
        }))
      );
    }
  };

  const handleSelect = (result) => {
    dispatch(
      addCity({
        name: result.city,
        timezone: result.tz,
        country: result.country,
      })
    );

    setQuery("");
    dispatch(toggleSearch());
    setResults([]);
  };

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setQuery("");
      dispatch(toggleSearch());
      setResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <StyledSearch>
        <StyledSearchContainer>
          <SearchIcon></SearchIcon>
          <StyledSearchInput
            placeholder="Search for a city"
            type="text"
            spellCheck="false"
            autoComplete="chrome-off"
            onChange={handleQuery}
            autoFocus
            value={query}
          ></StyledSearchInput>
        </StyledSearchContainer>
        {query.length > 0 && (
          <StyledResultsContainer>
            {results.length < 1 ? (
              <StyledMessage>
                Sorry, we couldn't find that.{" "}
                <a
                  href="https://github.com/mohanvpatta/jikan"
                  target="_blank"
                  rel="noreferrer"
                >
                  Report here!
                </a>
              </StyledMessage>
            ) : (
              results.map((result, index) => (
                <StyledResult
                  key={index}
                  onClick={() => {
                    handleSelect(result);
                  }}
                >
                  <div className="left">
                    <div className="timezone">{result.timezone}</div>
                    <div className="city">{`${result.city}, ${result.country}`}</div>
                  </div>
                  <div className="right">
                    <div className="time">{result.time}</div>
                  </div>
                </StyledResult>
              ))
            )}
          </StyledResultsContainer>
        )}
      </StyledSearch>
    </>
  );
};

export default Search;
