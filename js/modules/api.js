"use strict";

// 鬼滅の刃APIのURL
export const kimetsuApiBaseUrl = "https://ihatov08.github.io/";

// カテゴリー別でキャラ情報を取得する関数(リポジトリ層)
export const fetchCharacters = async (category) => {
  try {
    const charactersJson = await fetch(
      `${kimetsuApiBaseUrl}/kimetsu_api/api/${category}.json`,
    );
    const charactersList = await charactersJson.json();
    console.log(charactersList);
    return charactersList;
  } catch (error) {
    console.error("エラーが発生しました");
    return [];
  }
};
