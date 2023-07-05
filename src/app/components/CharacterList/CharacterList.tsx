"use client";

import React, { useEffect, useState } from "react";
import { CircularProgress, Pagination } from "@mui/material";
import { fetchCharacters } from "@/app/services/CharacterServices";
import Character from "@/app/interfaces/Character";
import styles from "./CharacterList.module.css";
import CharacterCard from "../CharacterCard/CharacterCard";

const NUM_PER_PAGE: number = 20;

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [curPage, setCurPage] = useState<number>(1);
  const [pageNum, setPageNum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  // fetch characters data from backend api
  const fetchRawCharactersData = async (page: number) => {
    const rawCharactersData = await fetchCharacters(page);
    setPageNum(Math.ceil(rawCharactersData["info"]["count"] / NUM_PER_PAGE));
    // clear previous characters info
    setCharacters([]);
    for (
      let i: number = 0;
      i < Math.min(NUM_PER_PAGE, rawCharactersData["results"].length);
      i++
    ) {
      // get name and img from response data
      const name: string = rawCharactersData["results"][i]["name"];
      const image: string = rawCharactersData["results"][i]["image"];
      setCharacters((prev) => [...prev, { name: name, image: image }]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRawCharactersData(curPage);
  }, [curPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurPage(value);
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <div className={styles.container}>
            {characters.map((character, index) => (
              <CharacterCard
                name={character.name}
                image={character.image}
                key={index}
              ></CharacterCard>
            ))}
          </div>
          <div className={styles.paginationContainer}>
            <Pagination
              count={pageNum}
              page={curPage}
              onChange={handlePageChange}
            ></Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
