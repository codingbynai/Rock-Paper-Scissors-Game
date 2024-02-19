// Selecting DOM elements
const menuContainer = document.querySelector('.menu');
const gameContainer = document.getElementById('game-container');
const playButton = document.getElementById('play-btn');
const backButton = document.getElementById('back-btn');

// Event listeners for play and back buttons
playButton.addEventListener('click', () => {
   // Hide menu and show game container
    menuContainer.style.display = 'none';
    gameContainer.classList.remove('hidden');
});

backButton.addEventListener('click', () => {
    // Hide game container and show menu
    gameContainer.classList.add('hidden');
    menuContainer.style.display = 'flex';
});

// Selecting player, PC and result message
const spans = document.querySelectorAll('#player-container span img');
const pcImage = document.getElementById('pc-image');
const msg = document.getElementById('result-message');

// Event handler for player choice selection
const clicked = function (event) {
  if (!document.body.classList.contains('noclick')) {
    document.body.classList.add('noclick');
    const target = event.target;
    target.classList.add('chosen');
    for (var span of spans) {
      if (target !== span) {
        span.classList.add('hidden');
      }
    }
    var random = parseInt(Math.random() * 3);
    pcImage.setAttribute('src', getPCImage(random));
    pcImage.dataset.id = spans[random].parentElement.id;
    pcImage.classList.remove('hidden');
    setTimeout(results.bind(this, target), 250);
  }
};

// Function to get the PC image based on a random number
const getPCImage = function (random) {
  if (random === 0) {
    return './assets/images/pc-paper.png';
  } else if (random === 1) {
    return './assets/images/pc-rock.png';
  } else {
    return './assets/images/pc-scissors.png';
  }
};

// Function to determine the game result
const results = function (target) {
  const playerChoice = target.getAttribute('src');
  const pcChoice = pcImage.getAttribute('src');

    // Check for tie
  if (
    (playerChoice.includes('rock') && pcChoice.includes('rock')) ||
    (playerChoice.includes('paper') && pcChoice.includes('paper')) ||
    (playerChoice.includes('scissors') && pcChoice.includes('scissors'))
  ) {
    msg.textContent = 'Tie';
    // Check for player win
  } else if (
    (playerChoice === './assets/images/player-rock.png' && pcChoice === './assets/images/pc-scissors.png') ||
    (playerChoice === './assets/images/player-paper.png' && pcChoice === './assets/images/pc-rock.png') ||
    (playerChoice === './assets/images/player-scissors.png' && pcChoice === './assets/images/pc-paper.png')
  ) {
    msg.textContent = 'You Win';
    // Player lost
  } else {
    msg.textContent = 'You lost';
  }

  // Show result message and reset after a delay
  msg.classList.remove('hidden');
  setTimeout(reset, 1500);
};

// Reset the game
const reset = function () {
  for (var span of spans) {
    span.classList.remove('hidden', 'chosen');
  }
  msg.classList.add('hidden');
  pcImage.classList.add('hidden');
  setTimeout(function () {
    document.body.classList.remove('noclick');
  }, 500);
};

// Event listeners for player choice
for (var span of spans) {
  span.addEventListener('click', clicked);
}