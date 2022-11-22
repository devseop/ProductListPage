import React, { memo, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useFetch } from "../hooks";
import styled from "@emotion/styled";
import { IClubListFromServer, IClub } from "../types/types";
import iconUnlike from "../image/unlike.png";
import iconLike from "../image/like.png";
import iconSearch from "../image/search.png";
import iconFilter from "../image/filter.png";
import { useLocation, useNavigate } from "react-router-dom";

/** 한국식 요일 설정을 위한 상수 */
export const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

// useFetch로 API 받아오기
const ClubListFromServer = () => {
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

  const clubList = formatClubList(ClubsFromServer);

  return <ClubItemUI clubList={clubList} />;
};

/**받아온 데이터를 쓸 수 있도록 재조합하기*/
const formatClubList = (data: IClubListFromServer[]): IClub[] => {
  return data.map((clubList) => ({
    id: clubList.club.id,
    thumbnail: clubList.club.coverUrl,
    title: clubList.club.name,
    desc: clubList.club.description,
    leaders: clubList.leaders,
    partners: clubList.partners,
    startTime: clubList.club.meetings[0].startedAt,
    endTime: clubList.club.meetings[0].endedAt,
    place: clubList.club.place,
    meeting: clubList.club.meetings,
    price: clubList.price,
  }));
};

/**받아온 데이터를 UI로 구성하기*/
const ClubItemUI = memo(({ clubList }: { clubList: IClub[] }) => {
  console.log(clubList);
  const [like, setLike] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  /** 인코딩된 키워드를 디코딩하기 */
  const decodeKeyword = decodeURI(
    location.search.slice(15, location.search.length)
  );

  // console.log(location.search.length);
  // console.log(decodeURI(location.search.slice(15, location.search.length)));

  return (
    <>
      <ClubList.ClubItemContainer>
        {location.search
          ? clubList
              .filter((clubList) =>
                clubList.title.toLowerCase().includes(decodeKeyword)
              )
              .map((club, idx) => (
                <ClubList.ClubItem
                  key={idx}
                  onClick={() => {
                    navigate(`/clubs/${club.id}`);
                  }}
                >
                  <ClubList.ClubThumbnail
                    src={`${club.thumbnail}`}
                    alt={`${club.title}`}
                  />
                  <ClubList.ClubInfoHeader>
                    <p>{club.title}</p>
                    {Object.values(club.leaders[0]) ? (
                      <ClubList.ClubLeaderLabel>
                        {Object.values(club.leaders[0])}
                      </ClubList.ClubLeaderLabel>
                    ) : (
                      ""
                    )}
                    <span>{club.desc}</span>
                  </ClubList.ClubInfoHeader>
                  <ClubList.ClubSubInfo>
                    <div>
                      <p>모임 장소 | {club.place}</p>
                      <p>
                        첫 모임일 | {club.startTime.slice(0, 10)}(
                        {DAYS[new Date(club.startTime).getDay()]}){" "}
                        {club.startTime.slice(11, 16)}
                      </p>
                    </div>
                    {/* <ClubList.LikeButton
              onClick={() => {
                setLike(!like);
              }}
              >
                <img
                  src={like === false ? iconUnlike : iconLike}
                  alt="아이콘"
                />
              </ClubList.LikeButton> */}
                  </ClubList.ClubSubInfo>
                </ClubList.ClubItem>
              ))
          : clubList.map((club, idx) => (
              <ClubList.ClubItem
                key={idx}
                onClick={() => {
                  navigate(`/clubs/${club.id}`);
                }}
              >
                <ClubList.ClubThumbnail
                  src={`${club.thumbnail}`}
                  alt={`${club.title}`}
                />
                <ClubList.ClubInfoHeader>
                  <p>{club.title}</p>
                  {Object.values(club.leaders[0]) ? (
                    <ClubList.ClubLeaderLabel>
                      {Object.values(club.leaders[0])}
                    </ClubList.ClubLeaderLabel>
                  ) : (
                    ""
                  )}
                  <span>{club.desc}</span>
                </ClubList.ClubInfoHeader>
                <ClubList.ClubSubInfo>
                  <div>
                    <p>모임 장소 | {club.place}</p>
                    <p>
                      첫 모임일 | {club.startTime.slice(0, 10)}(
                      {DAYS[new Date(club.startTime).getDay()]}){" "}
                      {club.startTime.slice(11, 16)}
                    </p>
                  </div>
                  {/* <ClubList.LikeButton
              onClick={() => {
                setLike(!like);
              }}
              >
                <img
                  src={like === false ? iconUnlike : iconLike}
                  alt="아이콘"
                />
              </ClubList.LikeButton> */}
                </ClubList.ClubSubInfo>
              </ClubList.ClubItem>
            ))}
      </ClubList.ClubItemContainer>
    </>
  );
});

const ListPage = () => {
  return (
    <>
      <SearchBar />
      <ClubListContainer>
        <ListTitle>모든 클럽 보기</ListTitle>
        <ClubListFromServer />
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

const ClubList = {
  ClubItemContainer: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 0;
    padding: 0;
  `,

  ClubItem: styled.li`
    list-style-type: none;
    width: 100%;
  `,

  ClubThumbnail: styled.img`
    width: 100%;
    object-fit: cover;
    height: auto;
    border-radius: 4px 4px 0 0;
  `,

  ClubInfoHeader: styled.div`
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
  `,

  ClubLeaderLabel: styled.span`
    font-size: 12px;
    font-weight: 700;
    color: #000000 !important;
    margin-bottom: 8px;
  `,

  ClubSubInfo: styled.div`
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
  `,

  LikeButton: styled.button`
    border: none;
    background-color: #e9ecef;
    border-radius: 4px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  `,
};

export default ListPage;
