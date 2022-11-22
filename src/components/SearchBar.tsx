import React, { useState } from "react";
import styled from "@emotion/styled";
import iconSearch from "../image/search.png";
import iconFilter from "../image/filter.png";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryString = `${searchInput}`;

  const submitSearchInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (queryString.length <= 0) {
        navigate("/clubs");
      } else {
        navigate(`/clubs/?searchKeyword=${queryString}`);
      }
    }
  };

  return (
    <SearchUI.Container>
      <SearchUI.Wrapper>
        <SearchUI.SearchIcon src={iconSearch} alt="검색" />
        <SearchUI.Input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={submitSearchInput}
        />
      </SearchUI.Wrapper>
      <SearchUI.FilterIcon src={iconFilter} alt="필터" />
    </SearchUI.Container>
  );
};

const SearchUI = {
  Container: styled.div`
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  `,

  Wrapper: styled.div`
    width: 100%;
    padding: 8px 16px;
    background-color: #e5e5e5;
    border: none;
    border-radius: 24px;
    display: flex;
    gap: 8px;
  `,

  SearchIcon: styled.img`
    // position: absolute;
    // left: 36px;
    // top: 28px;
    width: 24px;
    height: 24px;
  `,

  Input: styled.input`
    width: 100%;
    height: 24px;
    border: none;
    background-color: #e5e5e5;
    outline: none;
    cursor: text;
  `,

  FilterIcon: styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
  `,
};

export default SearchBar;
