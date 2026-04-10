"use strict";

// loading画面の要素を取得(関数化)
const initLoading = () => {
  const loadingViewElement = document.querySelector(".loading");
  window.addEventListener("load", () => {
    // 3秒経過後にローディング画面を非表示にするためloadedクラスをHTMLに追加
    setTimeout(() => {
      loadingViewElement.classList.add("loaded");
    }, 3000);
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

// 同じname属性のラジオボタンのどれかが押されたことをトリガーに実行される関数の定義
characterCategoryElementList.forEach((element) => {
  element.addEventListener("change", (event) => {
    if (event.target.name != "character-category") {
      return;
    }

    // debug
    console.log(event);
    console.log(event.target.value);

    switch (event.target.value) {
      case "demon-hunters":
        console.log("鬼殺隊を表示する");
        break;
      case "pillars":
        console.log("柱を表示する");
        break;
      case "demons":
        console.log("鬼を表示する");
        break;
      default:
        console.log("全キャラクターを表示する");
    }
  });
});

//Todo
// 各キャラクターを表示する処理を書く

// 鬼殺隊
