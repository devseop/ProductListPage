import React, { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "@emotion/styled";
import { fetchClubList } from "../api";
import { IClub } from "../types/types";
import iconUnlike from "../image/unlike.png";
import iconLike from "../image/like.png";
import { DAYS } from "../lib/const";

const ClubItem = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: clubs,
    isLoading,
    isError,
    error,
  } = useQuery<IClub[], Error>("clubs", fetchClubList);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  // console.log(clubs);

  /** 인코딩된 키워드를 디코딩하기 */
  const decodeKeyword = decodeURI(
    location.search.slice(15, location.search.length)
  );

  return (
    <React.Fragment>
      <ClubList.ClubItemContainer>
        {location.search
          ? clubs
              ?.filter((club) =>
                club.title.toLowerCase().includes(decodeKeyword)
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
          : clubs?.map((club, idx) => (
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
    </React.Fragment>
  );
});

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

export default ClubItem;
