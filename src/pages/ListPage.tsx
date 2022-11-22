import React, { memo } from "react";
import styled from "@emotion/styled";
import SearchBar from "../components/SearchBar";
import ClubItem from "../components/ClubItem";

const ListPage = memo(() => {
  return (
    <React.Fragment>
      <SearchBar />
      <Styled.ClubListContainer>
        <Styled.ListTitle>모든 클럽 보기</Styled.ListTitle>
        <ClubItem />
      </Styled.ClubListContainer>
    </React.Fragment>
  );
});

const Styled = {
  ClubListContainer: styled.section`
    margin: 0 20px;
  `,
  ListTitle: styled.p`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
  `,
};
export default ListPage;
