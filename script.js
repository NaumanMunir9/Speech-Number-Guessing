const messageElement = document.getElementById("message");

const randomNum = getRandomNumber();
console.log(randomNum);

function getRandomNumber() {
  return Math.ceil(Math.random() * 10);
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
recognition.start();

recognition.addEventListener("result", onSpeak);
function onSpeak(e) {
  const message = e.results[0][0].transcript;
  writeMessage(message);
  checkNumber(message);
}

function writeMessage(message) {
  messageElement.innerHTML = `
    <div>
      You Said:
    </div>
    <span class="box" >
      ${message}
    </span>
  `;
}

function checkNumber(message) {
  const number = +message;

  if (Number.isNaN(number)) {
    messageElement.innerHTML += `
      <div>
        That Is Not A Valid Number
      </div>
    `;
    return;
  }

  if (number > 10 || number < 1) {
    messageElement.innerHTML = `
      <div>
        Number Must Be Between 1 - 10
      </div>
    `;
    return;
  }

  if (number === randomNum) {
    document.body.innerHTML = `
      <h2>
        Congratulations! You Have Guessed The Number
        <br><br>
        It Was ${number}
      </h2>
      <button class="play-again" id="play-again" >
        Play Again
      </button>
    `;
  } else if (number > randomNum) {
    messageElement.innerHTML = `
      <div>
        Guess A Lower Number!
      </div>
    `;
  } else {
    messageElement.innerHTML = `
      <div>
        Guess A Higher Number!
      </div>
    `;
  }
}

recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
