"use strict";

// 鬼滅の刃APIのURL
export const kimetsuApiBaseUrl = "https://ihatov08.github.io";

// カテゴリー別でキャラ情報を取得する関数(リポジトリ層)
export const fetchCharacters = async (category) => {
  try {
    const response = await fetch(
      `${kimetsuApiBaseUrl}/kimetsu_api/api/${category}.json`,
    );
    if (!response.ok) {
      throw new Error("fetchにエラーが発生しました");
    }
    return await response.json();
  } catch (error) {
    console.error("エラーが発生しました");
    return [];
  }
};
