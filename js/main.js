"use strict";

/*
処理関数
- init(): 初回ページアクセス時の初期化
- updateCharacterView(): 鬼滅の刃APIから情報取得～画面表示までを共通化（以下関数を内包）
  - renderHtml(): キャラクター一覧のHTMLをレンダリング
  - fetchCharacters(): 鬼滅の刃APIから情報を取得
  - showLoading(): ローディング画面の表示 
  - hideLoading(): ローディング画面の非表示
*/

// 鬼滅の刃API用のモジュールを呼び出す
import { kimetsuApiBaseUrl, fetchCharacters } from "./modules/api.js";

// HTML内のキャラクター表示（character-listクラス）の要素を取得
const characterListElement = document.getElementById("character-list");

// HTML内のローディング画面（loadingクラス）の要素を取得
const loadingViewElement = document.querySelector(".loading");

// HTML内のラジオボタン要素を取得し配列に格納
const characterCategoryElementList = document.querySelectorAll(
  '[name="character-category"]', // name="character-category"のタグを持つ要素を対象
);

// // debug
// console.log(characterListElement);
// console.log(characterCategoryElementList);

// 初回ラジオボタン(checked)情報を取得し画面表示する初期化関数（コントローラ層）
const init = () => {
  characterCategoryElementList.forEach((element) => {
    // // debug
    // console.log(element);
    // console.dir(element); // elementオブジェクトの構造確認

    if (element.checked) {
      // // debug
      // console.log("ラジオボタンにcheckedついてます");

      // カテゴリ取得
      const category = element.value;

      // 画面に全キャラ反映
      updateCharacterView(category);
      return;
    }
  });
};

// loading画面を見せる関数（UI層）
const showLoading = () => {
  if (loadingViewElement.classList.contains("loaded")) {
    loadingViewElement.classList.remove("loaded");
  }
};

// loading画面を隠す関数（UI層）
const hideLoading = () => {
  if (loadingViewElement.classList.contains("loaded")) {
    return;
  }
  loadingViewElement.classList.add("loaded");
};

// 鬼滅の刃APIからデータ取得～画面表示までを共通化した関数(コントローラ層)
const updateCharacterView = async (category) => {
  // ローディング画面の表示
  showLoading();

  // 鬼滅の刃APIリクエスト(ローディング画面で0.5秒待つ)
  const [characterList] = await Promise.all([
    fetchCharacters(category),
    new Promise((resolve) => {
      setTimeout(resolve, 500);
    }),
  ]);

  // 鬼滅の刃APIから画像取得、画面に反映
  const baseUri = kimetsuApiBaseUrl;
  renderHtml(characterList, baseUri);

  // ローディング画面を非表示
  hideLoading();
};

// 全キャラ表示する関数(UI層)
const renderHtml = (characterList, baseUri) => {
  const characterHtmlList = characterList.map((character) => {
    const imageUri = `${baseUri}${character.image}`;
    return `        
    <div class="character">
          <p class="name">${character.name}(${character.category})</p>
          <img src="${imageUri}" alt="${character.name}の画像">
    </div>
    `;
  });
  characterListElement.innerHTML = characterHtmlList.join("");
};

// ラジオボタンのイベントリスナーを登録(コントローラ層)
characterCategoryElementList.forEach((element) => {
  element.addEventListener("change", (event) => {
    // ラジオボタンのクラス名チェック
    if (event.target.name != "character-category") {
      return;
    }

    // // debug
    // console.log(event);
    // console.log(event.target.value);

    // eventからradio buttonのvalueを取得
    const category = event.target.value;

    // 鬼滅の刃APIリクエスト～画面表示
    updateCharacterView(category);
  });
});

// 初回アクセス時の処理実行
init();
