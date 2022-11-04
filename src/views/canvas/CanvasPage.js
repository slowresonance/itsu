import React from "react";
import Canvas from "./Canvas";
import styled from "styled-components";
import Button from "../../components/Button";
import Search from "../../components/Search";
import { Plus } from "../../assets/Icons";
import { toggleSearch } from "../../store/ui/ui.slice";
import { useDispatch, useSelector } from "react-redux";

const StyledCanvasPage = styled.div`
  display: flex;
  justify-content: center;
`;

const CanvasPage = () => {
  const { isSearchOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleToggleSearch = () => {
    dispatch(toggleSearch());
  };

  return (
    <StyledCanvasPage>
      <Canvas></Canvas>
      <Button
        text={"Add a new timezone"}
        icon={<Plus />}
        action={handleToggleSearch}
      ></Button>
      {isSearchOpen && <Search></Search>}
    </StyledCanvasPage>
  );
};

export default CanvasPage;
