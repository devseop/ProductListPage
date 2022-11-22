import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { IClub, IClubListFromServer } from "../types/types";

const fetchClubList = async () => {
  const { data } = await axios.get<IClub[]>(
    "https://api.json-generator.com/templates/ePNAVU1sgGtQ/data",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer 22swko029o3wewjovgvs9wcqmk8p3ttrepueemyj",
      },
    }
  );
  return data.map((clubList) => {
    return {
      id: clubList.id,
      thumbnail: clubList.thumbnail,
      title: clubList.title,
      desc: clubList.desc,
      leaders: clubList.leaders,
      partners: clubList.partners,
      startTime: clubList.meeting[0].startedAt,
      endTime: clubList.meeting[0].endedAt,
      place: clubList.place,
      meeting: clubList.meeting,
      price: clubList.price,
    };
  });
};

const FetchingTest = () => {
  const {
    data: clubs,
    isLoading,
    isError,
    error,
  } = useQuery<IClub[], Error>("clubs", fetchClubList);

  if (isError) return <div>{error.message}</div>;

  console.log(clubs);
  return (
    <>
      <div>
        {isLoading ? (
          <p>loading...</p>
        ) : (
          clubs?.map((club, idx) => (
            <React.Fragment key={club.id}>
              <p>id: {club.id}</p>
              <p>title: {club.title}</p>
              <p>desc: {club.desc}</p>
            </React.Fragment>
          ))
        )}
      </div>
    </>
  );
};

export default FetchingTest;
