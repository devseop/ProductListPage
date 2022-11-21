import React from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { IClub, IClubListFromServer } from "../types/types";
import { useFetch } from "../hooks";
import BackBtn from "../components/BackBtn";
import { DAYS } from "./ListPage";

const ClubFromServer = () => {
  const { data: ClubsFromServer, error } = useFetch<IClubListFromServer[]>(
    "https://api.json-generator.com/templates/ePNAVU1sgGtQ/data",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer 22swko029o3wewjovgvs9wcqmk8p3ttrepueemyj",
      },
    }
  );

  if (!ClubsFromServer) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  const clubDetail = formatClubDetail(ClubsFromServer);

  return <ClubDetailUI clubDetail={clubDetail} />;
};

const formatClubDetail = (data: IClubListFromServer[]): IClub[] => {
  const params = useParams();

  return data
    .filter((clubList) => clubList.club.id === params.clubId)
    .map((club) => {
      // console.log(club);
      return {
        id: club.club.id,
        thumbnail: club.club.coverUrl,
        title: club.club.name,
        desc: club.club.description,
        leaders: club.leaders,
        partners: club.partners,
        startTime: club.club.meetings[0].startedAt,
        endTime: club.club.meetings[0].endedAt,
        place: club.club.place,
        meeting: club.club.meetings,
        price: club.price,
      };
    });
};

const ClubDetailUI = ({ clubDetail }: { clubDetail: IClub[] }) => {
  const installmentPrice = `${
    clubDetail[0].price / clubDetail[0].meeting.length
  }`;

  const regExForInstallMent = installmentPrice
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  console.log(clubDetail);

  return (
    <React.Fragment>
      <ClubHeader.Container>
        <ClubHeader.CoverImage
          src={`${clubDetail[0].thumbnail}`}
          alt={`${clubDetail[0].title}`}
        />
        <ClubHeader.HeadInfo>
          <ClubHeader.ClubTitle>{clubDetail[0].title}</ClubHeader.ClubTitle>
          <ClubHeader.ClubLeader>
            {clubDetail[0].leaders[0].name} 님
          </ClubHeader.ClubLeader>
          <ClubHeader.Place>모임 장소 | {clubDetail[0].place}</ClubHeader.Place>
          <ClubHeader.FirstMeet>
            첫 모임일 | {clubDetail[0].startTime.slice(0, 10)}(
            {DAYS[new Date(clubDetail[0].startTime).getDay()]}){" "}
            {clubDetail[0].startTime.slice(11, 16)}
          </ClubHeader.FirstMeet>
        </ClubHeader.HeadInfo>
        <ClubHeader.SubInfo>
          <span>
            5만원 이상 결제 시 모든 신용카드 무이자 4개월 / 월{" "}
            {`${regExForInstallMent}`}원
          </span>
          <p>
            {clubDetail[0].meeting.length}회{" "}
            {clubDetail[0].price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            원
          </p>
        </ClubHeader.SubInfo>
      </ClubHeader.Container>
      <ClubContent.Container>
        <ClubContent.Label>클럽 상세 안내</ClubContent.Label>
        <ClubContent.Label>모임정보</ClubContent.Label>
        <ClubContent.Description>{clubDetail[0].desc}</ClubContent.Description>
        <ClubContent.Label>모임장소</ClubContent.Label>
        <ClubContent.Description>{clubDetail[0].place}</ClubContent.Description>
        <ClubContent.Label>모임일정</ClubContent.Label>
        <ClubContent.Description>
          {clubDetail[0].meeting.map((item, idx) => (
            <li key={idx}>
              {idx + 1}회차 | {item.startedAt.slice(0, 10)}(
              {DAYS[new Date(item.startedAt).getDay()]}){" "}
              {item.startedAt.slice(11, 16)}
            </li>
          ))}
        </ClubContent.Description>
      </ClubContent.Container>
    </React.Fragment>
  );
};

const DetailPage = () => {
  return (
    <>
      <BackBtn />
      <ClubFromServer />
    </>
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
