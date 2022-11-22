import React from "react";
import { useQuery } from "react-query";
import styled from "@emotion/styled";
import { fetchClubList } from "../api";
import { IClub } from "../types/types";
import BackBtn from "../components/BackBtn";
import { DAYS } from "../lib/const";

const DetailPage = () => {
  const {
    data: clubs,
    isLoading,
    isError,
    error,
  } = useQuery<IClub[], Error>("clubs", fetchClubList);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  /** 할부 */
  const installmentPrice = `${
    clubs && clubs[0].price / clubs[0].meeting.length
  }`;

  /** 할부 금액 변환을 위한 정규표현식 */
  const regExForInstallMent = installmentPrice
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  console.log(clubs);

  return (
    <React.Fragment>
      <BackBtn />
      {clubs && (
        <>
          <ClubHeader.Container>
            <ClubHeader.CoverImage
              src={`${clubs[0].thumbnail}`}
              alt={`${clubs[0].title}`}
            />
            <ClubHeader.HeadInfo>
              <ClubHeader.ClubTitle>{clubs[0].title}</ClubHeader.ClubTitle>
              <ClubHeader.ClubLeader>
                {clubs[0].leaders[0].name} 님
              </ClubHeader.ClubLeader>
              <ClubHeader.Place>모임 장소 | {clubs[0].place}</ClubHeader.Place>
              <ClubHeader.FirstMeet>
                첫 모임일 | {clubs[0].startTime.slice(0, 10)}(
                {DAYS[new Date(clubs[0].startTime).getDay()]}){" "}
                {clubs[0].startTime.slice(11, 16)}
              </ClubHeader.FirstMeet>
            </ClubHeader.HeadInfo>
            <ClubHeader.SubInfo>
              <span>
                5만원 이상 결제 시 모든 신용카드 무이자 4개월 / 월{" "}
                {`${regExForInstallMent}`}원
              </span>
              <p>
                {clubs[0].meeting.length}회{" "}
                {clubs[0].price
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                원
              </p>
            </ClubHeader.SubInfo>
          </ClubHeader.Container>
          <ClubContent.Container>
            <ClubContent.Label>클럽 상세 안내</ClubContent.Label>
            <ClubContent.Label>모임정보</ClubContent.Label>
            <ClubContent.Description>{clubs[0].desc}</ClubContent.Description>
            <ClubContent.Label>모임장소</ClubContent.Label>
            <ClubContent.Description>{clubs[0].place}</ClubContent.Description>
            <ClubContent.Label>모임일정</ClubContent.Label>
            <ClubContent.Description>
              {clubs[0].meeting.map((item, idx) => (
                <li key={idx}>
                  {idx + 1}회차 | {item.startedAt.slice(0, 10)}(
                  {DAYS[new Date(item.startedAt).getDay()]}){" "}
                  {item.startedAt.slice(11, 16)}
                </li>
              ))}
            </ClubContent.Description>
          </ClubContent.Container>
        </>
      )}
    </React.Fragment>
  );
};

const ClubHeader = {
  Container: styled.div`
    padding-top: 48px;
    margin-bottom: 44px;
    display: flex;
    flex-direction: column;
  `,

  CoverImage: styled.img`
    width: 100%;
    height: 80vw;
    object-fit: cover;
  `,

  HeadInfo: styled.div`
    margin: 20px;
  `,

  ClubTitle: styled.p`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
  `,

  ClubLeader: styled.p`
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 12px;
  `,

  Place: styled.p`
    font-size: 14px;
    color: gray;
    font-weight: 500;
    margin-bottom: 4px;
  `,

  FirstMeet: styled.p`
    font-size: 14px;
    font-weight: 400;
    color: gray;
    padding-bottom: 20px;
    border-bottom: 1px solid lightgray;
  `,

  SubInfo: styled.div`
    margin: 0 20px 20px;

    span {
      font-size: 14px;
      font-weight: 400;
      color: gray;
      line-height: 1.3;
    }

    p {
      font-size: 20px;
      font-weight: 700;
      color: #ff7900;
      margin-top: 6px;
    }
  `,
};

const ClubContent = {
  Container: styled.div`
    margin: 0 20px 64px;
  `,

  Label: styled.p`
    font-size: 20px;
    font-weight: 700;
    margin-top: 24px;
  `,

  Description: styled.p`
    font-size: 16px;
    line-height: 1.5;
    margin-top: 16px;

    li {
      list-style-type: none;
    }
  `,
};

export default DetailPage;
