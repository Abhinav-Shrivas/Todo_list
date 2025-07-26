let bt1 = document.querySelector(".theme");
let body = document.querySelector("body");
let div = document.querySelector(".message");
let theme = document.querySelector(".theme");
let themeImg = document.querySelector(".theme img");

//toogling dark and light theme
bt1.addEventListener("click", () => {
  let mode = body.className;
  if (mode === "light") {
    body.classList.add("dark");
    body.classList.remove("light");
    div.style.color = "white";
    theme.style.mixBlendMode = "darken";
    themeImg.src = "items/darkmode.png";

    let styleTag = document.createElement("style");
    styleTag.innerHTML = `
  @keyframes blinkingCursor {
    from { border-color: white; }
    to { border-color: transparent; }
  }
`;
    document.head.appendChild(styleTag);
  } else {
    body.classList.add("light");
    body.classList.remove("dark");
    div.style.color = "black";
    theme.style.mixBlendMode = "color-burn";
    themeImg.src = "items/lightmode.png";

    let styleTag = document.createElement("style");
    styleTag.innerHTML = `
  @keyframes blinkingCursor {
    from { border-color: black; }
    to { border-color: transparent; }
  }
`;
    document.head.appendChild(styleTag);
  }
});


//opening todo.html by clicking on the 'Get started' button & if already opened then switch to that already opened todo.html
document.querySelector(".start").addEventListener("click", function openOrFocusPage() {
    existingWindow = window.open("todo.html","secondWindow");
  }
);