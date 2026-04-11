"use strict";

// 鬼滅の刃API用のモジュールを呼び出す
import { kimetsuApiBaseUrl, fetchCharacters } from "./modules/api.js";

// loading画面の要素を取得(関数化)
const initLoading = () => {
  const loadingViewElement = document.querySelector(".loading");
  window.addEventListener("load", () => {
    // 1.5秒経過後にローディング画面を非表示にするためloadedクラスをHTMLに追加
    setTimeout(() => {
      loadingViewElement.classList.add("loaded");
    }, 1500);
  });
};

// loadingアニメーションの実行
initLoading();

// キャラクター表示部分のHTMLElement
const characterListElement = document.getElementById("character-list");

// ラジオボタン部分の要素を取得し配列に格納
const characterCategoryElementList = document.querySelectorAll(
  '[name="character-category"]', // name="character-category"のタグを持つ要素を対象
);

// debug
console.log(characterCategoryElementList);

// ラジオボタンのイベントリスナー関数(コントローラ層)
characterCategoryElementList.forEach((element) => {
  element.addEventListener("change", async (event) => {
    // ラジオボタンのクラス名チェック
    if (event.target.name != "character-category") {
      return;
    }

    // debug
    console.log(event);
    console.log(event.target.value);

    // eventからradio buttonのvalueを取得
    const category = event.target.value;

    // 鬼滅の刃APIリクエスト
    const characterList = await fetchCharacters(category);

    // 鬼滅の刃APIから画像取得、画面に反映
    const baseUri = kimetsuApiBaseUrl;
    viewCharacters(characterList, baseUri);
  });
});

// 全キャラ表示(ビュー層)
const viewCharacters = (characterList, baseUri) => {
  const characterHtmlList = characterList.map((character) => {
    const imageUri = `${baseUri}${character.image}`;
    return `        
    <div class="character">
          <img src="${imageUri}" alt="">
          <p class="name">${character.name}</p>
          <p class="role">${character.category}</p>
    </div>
    `;
  });
  characterListElement.innerHTML = characterHtmlList.join("");
};
