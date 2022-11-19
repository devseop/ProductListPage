import React from "react";
import styled from "@emotion/styled";

const SearchBar = () => {
  return (
    <BarContainer>
      <SearchContainer></SearchContainer>
    </BarContainer>
  );
};

const BarContainer = styled.div`
  padding: 20px;
`;

const SearchContainer = styled.input``;

export default SearchBar;
