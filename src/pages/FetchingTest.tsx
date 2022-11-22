import React from "react";
import { useQuery } from "react-query";
import { fetchClubList } from "../api";
import { IClub } from "../types/types";

// const fetchClubList = async () => {
//   const { data } = await axios.get<IClubListFromServer[]>(
//     "https://api.json-generator.com/templates/ePNAVU1sgGtQ/data",
//     {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//         Authorization: "Bearer 22swko029o3wewjovgvs9wcqmk8p3ttrepueemyj",
//       },
//     }
//   );
//   return data.map((club) => {
//     return {
//       id: club.club.id,
//       thumbnail: club.club.coverUrl,
//       title: club.club.name,
//       desc: club.club.description,
//       leaders: club.leaders,
//       partners: club.partners,
//       startTime: club.club.meetings[0].startedAt,
//       endTime: club.club.meetings[0].endedAt,
//       place: club.club.place,
//       meeting: club.club.meetings,
//       price: club.price,
//     };
//   });
// };

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
          clubs?.map((club, idx) => <li key={idx}>{club.title}</li>)
        )}
      </div>
    </>
  );
};

export default FetchingTest;
