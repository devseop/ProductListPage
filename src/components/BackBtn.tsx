import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import btnBack from "../image/arrow-left.png";

const BackBtn = () => {
  const navigate = useNavigate();
  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <BackIcon.Container>
      <BackIcon.Image src={btnBack} onClick={onClickBack} />
    </BackIcon.Container>
  );
};

const BackIcon = {
  Container: styled.div`
    padding: 12px 20px;
    position: fixed;
    background-color: #fff;
    width: 100%;
  `,

  Image: styled.img`
    width: 24px;
    height: 24px;
  `,
};

export default BackBtn;
