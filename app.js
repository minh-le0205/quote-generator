const quoteButton = document.querySelector("#btn-quote");
const text = document.querySelector(".card-text");
const title = document.querySelector(".card-title");
const copyButton = document.querySelector("#btn-copy");
const speechButton = document.querySelector("#btn-speech");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "aac23286b8msh7633f1dfeecfff8p15724bjsncc6d8e7fc34c",
    "X-RapidAPI-Host": "quotes-by-api-ninjas.p.rapidapi.com",
  },
};

async function randomQuote() {
  const res = await fetch(
    "https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes",
    options
  );

  const response = await res.json();
  return response;
}

quoteButton.addEventListener("click", async function () {
  try {
    const randomIndex = Math.floor(Math.random() * 10);
    const quote = await randomQuote();
    console.log(quote[0]);
    text.textContent = quote[0].quote;
    title.textContent = "-" + quote[0].author;
  } catch (error) {
    swal({
      title: "Error",
      text: error.message,
      icon: "error",
    });
  }
});

copyButton.addEventListener("click", function () {
  if (text.textContent === "") {
    swal({
      title: "Error",
      text: "The text is empty !",
      icon: "error",
    });
  } else {
    const content = text.textContent;
    navigator.clipboard.writeText(content);
    swal({
      title: "Success",
      text: "Text copied to clipboard !",
      icon: "success",
    });
  }
});
speechButton.addEventListener("click", function () {
  const synth = window.speechSynthesis;
  const speech = new SpeechSynthesisUtterance(text.textContent);
  synth.speak(speech);
});
