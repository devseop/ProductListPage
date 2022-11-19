import styled from "@emotion/styled";
import React, { memo, useCallback, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useFetch } from "../hooks";
import { ClubListFromServer, CardInfo } from "../types/types";
import iconUnlike from "../image/unlike.png";
import iconLike from "../image/like.png";

// useFetch로 API 받아오기
const ClubDataFromServer = () => {
  const { data: ClubsFromServer, error } = useFetch<ClubListFromServer[]>(
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

  const clubList = formatClubList(ClubsFromServer);
  // const meetInfo = formatDate(ClubsFromServer);

  return <ClubItemUI clubList={clubList} />;
};

// 받아온 데이터를 쓸 수 있도록 재조합하기
const formatClubList = (data: ClubListFromServer[]): CardInfo[] => {
  return data.map((clubList) => ({
    id: clubList.club.id,
    thumbnail: clubList.club.coverUrl,
    title: clubList.club.name,
    desc: clubList.club.description,
    leader: clubList.leaders[0].name,
    partner: clubList.partners[0].name,
    startTime: clubList.club.meetings[0].startedAt,
    endTime: clubList.club.meetings[0].endedAt,
    place: clubList.club.place,
  }));
};

// const formatDate = (data: ClubListFromServer[]): MeetInfo[] => {
//   return data.map((meetInfo) => ({
//     id: meetInfo.club.id,
//     startTime: meetInfo.club.meetings[0].startedAt,
//     endTime: meetInfo.club.meetings[0].endedAt,
//     place: meetInfo.club.place,
//   }));
// };

// 받아온 데이터를 UI로 구성하기
const ClubItemUI = memo(({ clubList }: { clubList: CardInfo[] }) => {
  console.log(clubList);
  // 데이터 원본을 확인하기 위한 useEffect
  // useEffect(() => {
  //   fetch("https://api.json-generator.com/templates/ePNAVU1sgGtQ/data", {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: "Bearer 22swko029o3wewjovgvs9wcqmk8p3ttrepueemyj",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => console.log(res));
  // });

  const [like, setLike] = useState(false);

  /** 한국식 요일 설정을 위한 상수 */
  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <>
      <Styled.ClubItemContainer>
        {clubList.map((club, idx) => (
          <Styled.ClubItem key={idx}>
            <Styled.ClubThumbnail src={`${club.thumbnail}`} alt="사진" />
            <Styled.ClubInfoHeader>
              <p>{club.title}</p>
              {club.leader ? (
                <Styled.ClubLeaderLabel>{club.leader}</Styled.ClubLeaderLabel>
              ) : null}
              <span>{club.desc}</span>
            </Styled.ClubInfoHeader>
            <Styled.ClubSubInfo>
              <div>
                <p>모임 장소 | {club.place}</p>
                <p>
                  첫 모임일 | {club.startTime.slice(0, 10)}(
                  {DAYS[new Date(club.startTime).getDay()]}){" "}
                  {club.startTime.slice(11, 16)}
                </p>
              </div>
              <Styled.LikeButton
                onClick={() => {
                  setLike(!like);
                }}
              >
                <img
                  src={like === false ? iconUnlike : iconLike}
                  alt="아이콘"
                />
              </Styled.LikeButton>
            </Styled.ClubSubInfo>
          </Styled.ClubItem>
        ))}
      </Styled.ClubItemContainer>
    </>
  );
});

const ListPage = () => {
  return (
    <>
      <SearchBar />
      <ClubListContainer>
        <ListTitle>모든 클럽 보기</ListTitle>
        <ClubDataFromServer />
      </ClubListContainer>
    </>
  );
};

const ClubListContainer = styled.section`
  margin: 0 20px;
`;

const ListTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const ClubItemContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0;
  padding: 0;
`;

const ClubItem = styled.li`
  list-style-type: none;
  width: 100%;
`;

const ClubThumbnail = styled.img`
  width: 100%;
  object-fit: cover;
  height: auto;
  border-radius: 4px 4px 0 0;
`;

const ClubInfoHeader = styled.div`
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: lightgray;
  padding: 10px 12px 20px;

  p {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  span {
    display: block;
    font-size: 12px;
    color: gray;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const ClubLeaderLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #000000 !important;
  margin-bottom: 8px;
`;

const ClubSubInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-width: 0 1px 1px;
  border-style: solid;
  border-color: lightgray;
  border-radius: 0 0 4px 4px;

  p {
    font-size: 12px;
    color: gray;
    margin-top: 3px;
  }
`;

const LikeButton = styled.button`
  border: none;
  background-color: #e9ecef;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const Styled = {
  ClubListContainer,
  ListTitle,
  ClubItemContainer,
  ClubItem,
  ClubThumbnail,
  ClubInfoHeader,
  ClubLeaderLabel,
  ClubSubInfo,
  LikeButton,
};

export default ListPage;
