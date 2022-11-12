import React from "react";
import Canvas from "./Canvas";
import styled from "styled-components";
import Button from "../../components/Button";
import Search from "../../components/Search";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import { toggleSearch } from "../../store/ui/ui.slice";
import { useDispatch, useSelector } from "react-redux";
// import { encodeURL } from "../../utils/URL";

const StyledCanvasPage = styled.div`
  display: flex;
  justify-content: center;
`;

const CanvasPage = () => {
  const { isSearchOpen } = useSelector((state) => state.ui);
  // const { cities } = useSelector((state) => state.cities);

  const dispatch = useDispatch();

  const handleToggleSearch = () => {
    dispatch(toggleSearch());
  };

  // const handleCopyURL = () => {
  //   const url = encodeURL(cities);
  //   navigator.clipboard.writeText(url);
  // };

  return (
    <StyledCanvasPage>
      <Header></Header>
      <Canvas></Canvas>
      <Menu>
        <Button
          text={`${isSearchOpen ? "Close Search" : "Add a new timezone"} `}
          action={handleToggleSearch}
        ></Button>
        {/* <Button text={"Copy as a link"} action={handleCopyURL}></Button> */}
      </Menu>

      {isSearchOpen && <Search></Search>}
    </StyledCanvasPage>
  );
};

export default CanvasPage;
