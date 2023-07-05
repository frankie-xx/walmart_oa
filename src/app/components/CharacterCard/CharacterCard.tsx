"use client";
import React from "react";
import styles from "./CharacterCard.module.css";
import Character from "@/app/interfaces/Character";

const CharacterCard: React.FC<Character> = ({ name, image }) => {
  return (
    <div className={styles["card"]}>
      <div className={styles["img-box"]}>
        <img src={image} alt=""></img>
      </div>
      <div className={styles["name-box"]}>{name}</div>
    </div>
  );
};

export default CharacterCard;
