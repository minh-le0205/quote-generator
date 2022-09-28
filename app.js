const quoteButton = document.querySelector("#btn-quote");
const text = document.querySelector(".card-text");
const title = document.querySelector(".card-title");
const copyButton = document.querySelector("#btn-copy");
const speechButton = document.querySelector("#btn-speech");

async function randomQuote() {
  const res = await fetch("https://quote-garden.herokuapp.com/api/v3/quotes");
  const response = await res.json();
  return response.data;
}

quoteButton.addEventListener("click", async function () {
  try {
    const randomIndex = Math.floor(Math.random() * 10);
    const quote = await randomQuote();
    text.textContent = quote[randomIndex].quoteText;
    title.textContent = "-" + quote[randomIndex].quoteAuthor;
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
