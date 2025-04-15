document.addEventListener('DOMContentLoaded', function() {
    // Game elements
    const setupSection = document.getElementById('setup-section');
    const playSection = document.getElementById('play-section');
    const gameoverSection = document.getElementById('gameover-section');
    
    // Setup elements
    const roundsInput = document.getElementById('rounds');
    const startGameBtn = document.getElementById('start-game');
    
    // Play elements
    const currentRoundEl = document.getElementById('current-round');
    const totalRoundsEl = document.getElementById('total-rounds');
    const userScoreEl = document.getElementById('user-score');
    const computerScoreEl = document.getElementById('computer-score');
    const choices = document.querySelectorAll('.choice');
    const userSelectionEl = document.getElementById('user-selection');
    const computerSelectionEl = document.getElementById('computer-selection');
    const roundResultEl = document.getElementById('round-result');
    
    // Game over elements
    const finalUserScoreEl = document.getElementById('final-user-score');
    const finalComputerScoreEl = document.getElementById('final-computer-score');
    const winnerMessageEl = document.getElementById('winner-message');
    const playAgainBtn = document.getElementById('play-again');
    
    // Game state
    let totalRounds = 3;
    let currentRound = 1;
    let userScore = 0;
    let computerScore = 0;
    
    // Start game
    startGameBtn.addEventListener('click', function() {
        totalRounds = parseInt(roundsInput.value) || 3;
        if (totalRounds < 1) totalRounds = 1;
        if (totalRounds > 10) totalRounds = 10;
        
        currentRound = 1;
        userScore = 0;
        computerScore = 0;
        
        // Update UI
        totalRoundsEl.textContent = totalRounds;
        currentRoundEl.textContent = currentRound;
        userScoreEl.textContent = userScore;
        computerScoreEl.textContent = computerScore;
        
        // Reset selections and result
        userSelectionEl.innerHTML = '<span>?</span>';
        computerSelectionEl.innerHTML = '<span>?</span>';
        roundResultEl.textContent = 'Make your choice to start the round';
        roundResultEl.className = 'round-result';
        
        // Remove selected class from choices
        choices.forEach(choice => choice.classList.remove('selected'));
        
        // Show play section
        setupSection.classList.remove('active');
        playSection.classList.add('active');
        gameoverSection.classList.remove('active');
    });
    
    // Handle user choice
    choices.forEach(choice => {
        choice.addEventListener('click', function() {
            // Remove selected class from all choices
            choices.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked choice
            this.classList.add('selected');
            
            // Get user choice
            const userChoice = this.getAttribute('data-choice');
            
            // Get computer choice
            const computerChoice = getComputerChoice();
            
            // Display choices
            displayChoice(userSelectionEl, userChoice);
            displayChoice(computerSelectionEl, computerChoice);
            
            // Determine winner
            const result = determineWinner(userChoice, computerChoice);
            
            // Update score
            updateScore(result);
            
            // Display result
            displayResult(result);
            
            // Check if game is over
            setTimeout(() => {
                if (currentRound >= totalRounds) {
                    endGame();
                } else {
                    // Prepare for next round
                    currentRound++;
                    currentRoundEl.textContent = currentRound;
                    
                    // Reset selections for next round
                    setTimeout(() => {
                        userSelectionEl.innerHTML = '<span>?</span>';
                        computerSelectionEl.innerHTML = '<span>?</span>';
                        roundResultEl.textContent = 'Make your choice to start the round';
                        roundResultEl.className = 'round-result';
                        
                        // Remove selected class from choices
                        choices.forEach(choice => choice.classList.remove('selected'));
                    }, 1500);
                }
            }, 1000);
        });
    });
    
    // Play again
    playAgainBtn.addEventListener('click', function() {
        setupSection.classList.add('active');
        playSection.classList.remove('active');
        gameoverSection.classList.remove('active');
    });
    
    // Helper functions
    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        return choices[Math.floor(Math.random() * choices.length)];
    }
    
    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return "tie";
        } else if (
            (userChoice === "rock" && computerChoice === "scissors") ||
            (userChoice === "paper" && computerChoice === "rock") ||
            (userChoice === "scissors" && computerChoice === "paper")
        ) {
            return "win";
        } else {
            return "lose";
        }
    }
    
    function displayChoice(element, choice) {
        let icon = '';
        
        if (choice === 'rock') {
            icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 9l2 2c1.3-1.3 2-3 2-5s-.7-3.7-2-5"></path>
                <path d="M4 22l3-3"></path>
                <path d="M18 22l3-3"></path>
                <path d="M15 9l-2 2c-1.3-1.3-2-3-2-5s.7-3.7 2-5"></path>
                <path d="M4 14l.3-.3c1.2-1.2 3.2-1.2 4.4 0l1.6 1.6c.8.8 2 .8 2.8 0l1.6-1.6c1.2-1.2 3.2-1.2 4.4 0l.3.3"></path>
            </svg>`;
        } else if (choice === 'paper') {
            icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="3" y1="15" x2="21" y2="15"></line>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="15" y1="3" x2="15" y2="21"></line>
            </svg>`;
        } else if (choice === 'scissors') {
            icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
                <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
                <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
            </svg>`;
        } else {
            icon = '<span>?</span>';
        }
        
        element.innerHTML = icon;
        element.classList.add('active');
        
        // Remove active class after animation
        setTimeout(() => {
            element.classList.remove('active');
        }, 1000);
    }
    
    function updateScore(result) {
        if (result === 'win') {
            userScore++;
            userScoreEl.textContent = userScore;
        } else if (result === 'lose') {
            computerScore++;
            computerScoreEl.textContent = computerScore;
        }
    }
    
    function displayResult(result) {
        let message = '';
        
        if (result === 'win') {
            message = 'You win this round!';
            roundResultEl.className = 'round-result win';
        } else if (result === 'lose') {
            message = 'You lose this round!';
            roundResultEl.className = 'round-result lose';
        } else {
            message = "It's a tie!";
            roundResultEl.className = 'round-result tie';
        }
        
        roundResultEl.textContent = message;
    }
    
    function endGame() {
        // Update final scores
        finalUserScoreEl.textContent = userScore;
        finalComputerScoreEl.textContent = computerScore;
        
        // Determine overall winner
        let winnerMessage = '';
        
        if (userScore > computerScore) {
            winnerMessage = 'Congratulations! You won the game!';
        } else if (userScore < computerScore) {
            winnerMessage = 'Game over! The computer won.';
        } else {
            winnerMessage = "It's a tie! No winner this time.";
        }
        
        winnerMessageEl.textContent = winnerMessage;
        
        // Show game over section
        setTimeout(() => {
            playSection.classList.remove('active');
            gameoverSection.classList.add('active');
        }, 1500);
    }
});