"use strict";

// ? ELEMENTS SELECTION -

const optionsContainer = document.querySelector(".game-choices"),
	computerChoice = document.querySelector(".rock-computer"),
	userChoice = document.querySelector(".rock-user"),
	options = document.querySelectorAll(".choice"),
	gameTitle = document.querySelector(".game-title"),
	computerPoint = document.querySelector(".computer-score"),
	userPoint = document.querySelector(".user-score"),
	rockImages = document.querySelector(".container-images");

let [userScore, computerScore] = [0, 0];
let gameTimer, timer;
let playing = true;

// ? FUNCTIONS -

const gameCounting = function () {
	const counting = function () {
		if (count > 3) {
			gameTitle.classList.remove("game-counting");
			clearInterval(newTimer);
		} else {
			gameTitle.classList.add("game-counting");
			gameTitle.textContent = count;
			count++;
		}
	};

	let count = 1;
	counting();
	const newTimer = setInterval(counting, 1000);
	return newTimer;
};

// ? EVENT HANDLERS -

optionsContainer.addEventListener("click", function (e) {
	if (playing) {
		// * ACTIVATE THE SELECTED ELEMENT -
		userChoice.src = computerChoice.src = "./images/rock.png";
		rockImages.classList.add("start");

		const option = e.target.closest(".choice");
		if (!option) return;
		options.forEach((opt) => {
			if (option === opt) {
				opt.classList.add("choice-active");
				opt.classList.remove("pointer-event");
			} else {
				opt.classList.remove("choice-active");
				opt.classList.add("pointer-event");
			}
		});

		// * GAME TIMER -
		gameTimer = setTimeout(() => {
			rockImages.classList.remove("start");

			// * COMPUTER PORTION -
			const randomInt = Math.floor(Math.random() * 3);
			const computerOption = ["rock", "paper", "scissors"][randomInt];
			computerChoice.src = `./images/${computerOption}.png`;

			// * USER PORTION -
			const userOption = option.firstElementChild.getAttribute("id");
			const userChance = ["PR", "SP", "RS"];
			userChoice.src = `./images/${userOption}.png`;

			// * GAME RESULT -
			const finalResult = (userOption[0] + computerOption[0]).toUpperCase();

			// * CHECKING WINNER -
			if (userOption[0] === computerOption[0]) {
				gameTitle.textContent = "Match Draw!";
			} else if (userChance.includes(finalResult)) {
				gameTitle.textContent = "User Won!!";
				userScore++;
				userPoint.textContent = String(userScore).padStart(2, 0);
			} else {
				gameTitle.textContent = "Computer Won!!";
				computerScore++;
				computerPoint.textContent = String(computerScore).padStart(2, 0);
			}

			// * GAME WINNER -
			if (userScore === 2) {
				playing = false;
				gameTitle.textContent = "User Won The Game 🎉";
			} else if (computerScore === 2) {
				playing = false;
				gameTitle.textContent = "Computer Won The Game 🎉";
			}

			// * RESETTING OPTIONS -
			options.forEach((option) => {
				option.classList.remove("pointer-event");
				option.classList.remove("choice-active");
			});

			if (userScore === 2 || computerScore === 2) {
				options.forEach((option) => {
					option.classList.add("pointer-event");
				});
			}
		}, 3000);

		if (timer) clearInterval(timer);
		timer = gameCounting();
	}
});

document.querySelector(".btn").addEventListener("click", function () {
	clearTimeout(gameTimer);
	clearInterval(timer);
	gameTitle.classList.remove("game-counting");
	[computerScore, userScore] = [0, 0];
	options.forEach((option) => {
		option.classList.remove("choice-active");
		option.classList.remove("pointer-event");
	});
	userChoice.src = computerChoice.src = "./images/rock.png";
	rockImages.classList.remove("start");
	gameTitle.textContent = "Let's Play!!";
	computerPoint.textContent = computerScore;
	userPoint.textContent = userScore;
	playing = true;
});
