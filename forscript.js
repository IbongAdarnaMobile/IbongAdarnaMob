
const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word"),
    inputField = document.querySelector("input"),
    scoreDisplay = document.getElementById("score"),
    modal = document.getElementById("modal"),
    closeModalBtn = document.getElementById("closeModalBtn");

let correctWord, timer;
let score = 0; // Initialize score

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time off! ${correctWord.toUpperCase()} is the correct word`);
        initGame();
    }, 1000);
};

const initGame = () => {
    initTimer(16);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
};

initGame();

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) return alert("Enter a word");
    if (userWord !== correctWord) return alert(`Nah, ${userWord} is not the correct word`);

    score++; // Increment score
    scoreDisplay.innerText = score; // Update score display
    alert(`Congrats! ${userWord.toUpperCase()} is the correct word`);

    if (score >= 5) { // Show modal if score reaches 5
        showModal();
    }

    initGame();
};

inputField.addEventListener("keyup", event => {
    console.log("Key pressed:", event.key); // Debug log
    if (event.key === "Enter") { // Check if the pressed key is "Enter"
        event.preventDefault(); // Prevent form submission if inside a form
        checkWord(); // Call the checkWord function
    }
});
const showModal = () => {
    modal.style.display = "block"; // Show the modal
};

closeModalBtn.onclick = () => {
    modal.style.display = "none"; // Hide the modal
};

window.onclick = event => {
    if (event.target === modal) {
        modal.style.display = "none"; // Hide the modal if clicked outside
    }
};

function goToNextPage() {
    window.location.href = 'POAC5.html'; // Change to your target HTML file
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
