document.addEventListener('DOMContentLoaded', function() {

    const cards = document.getElementsByClassName('game-card');

    const icons = Array.from(cards);

    let cardFlipped = false;
    let cardOne;
    let cardTwo;
    let stopFlip = true;
    let countdown = null;
    let timeLeft = 60;
    let score = 0;

    function startGame() {
        unflipCards();
        icons.forEach(card => card.addEventListener('click', flipCard));
        stopFlip = false;
        timeLeft = 60;
        randomiseBoard();
        startTimer();
        score = 0;
    }

    function resetGame() {
        const reset = confirm('Are you sure you want to reset?');
        if(reset) {
            unflipCards();
            document.getElementById('score').innerHTML = '0';
            clearTimeout(countdown);
            document.getElementById('timer').innerHTML = '60';
            document.getElementById('saveScore').style.display = 'none';
        }
    }

    let time = document.getElementById('timer');
    time.innerHTML = `${timeLeft}`;

    function startTimer() {
        countdown = setInterval(function() {
            timeLeft--;
            time.innerHTML = `${timeLeft}`;
            if(timeLeft === 0) {
                stopFlip = true;
                clearTimeout(countdown);
                alert('Time is up!');
                document.getElementById('saveScore').style.display = 'block';
            }
        }, 1000)
    }

    // Once all matches have been revealed, the timer stops. 
    function stopTimer() {
        if(document.getElementById('score').innerHTML === '8') {
            clearTimeout(countdown);
            alert('You matched all 8 pairs in under 60 seconds, Congratulations!');
            document.getElementById('saveScore').style.display = 'block';
        }
    }

    function unflipCards () {
        const flippedCards = Array.from(document.getElementsByClassName('game-card'));
        flippedCards.forEach(flippedCard => flippedCard.classList.remove('flipped'));
    }
    
    //This code was written from Marina Ferreira's memory flip game. See credits
    function flipCard() {
        if(stopFlip) return;
        // stops user from clicking a third icon before
        //the first two clicked, have flipped back
        this.classList.toggle('flipped');
        if(cardFlipped === false) {
            cardFlipped = true;
            cardOne = this;
            //check if cardOne has been flipped
            // any icon clicked after the event will be false(not CardOne)
        } else {
            cardFlipped = false;
            cardTwo = this;
            //if cardFlipped is set to true, the user will be clicking for cardTwo

            matchingCards();
            stopTimer();
        }
    }

    //This code was written from Marina Ferreira's memory flip game. See credits
    function matchingCards() {
        if(cardOne.dataset.icon === cardTwo.dataset.icon) {
            cardOne.removeEventListener('click', flipCard);
            cardTwo.removeEventListener('click', flipCard);
            document.getElementById('score').innerHTML = ++score;
            //checks if the two icons are the same
            //if the same, the event listener is removed
            //icons cant be flipped back
        } else {
            stopFlip = true;
            setTimeout(function() {
                cardOne.classList.remove('flipped');
                cardTwo.classList.remove('flipped');
                stopFlip = false;
            }, 1000);
            //timeout allow user to see incorrect match before flipped back over
        }
    }

    //This code was written from Marina Ferreira's memory flip game. See credits
    function randomiseBoard() {
        icons.forEach(icons => {
            let randomNum = Math.floor(Math.random() * 16);
            icons.style.order = randomNum;
        });
    }

    function saveScore() {
        const userName = document.getElementById('userScore').value;
        localStorage.setItem(userName, score);
        showScores();
    }

    function showScores() {
        const list = document.getElementById('highScores');
        list.innerHTML = '';
        Object.keys(localStorage).forEach(function(key) {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(`${key}: ${localStorage.getItem(key)}`));
            list.appendChild(li);
        });
    }

    icons.forEach(card => card.addEventListener('click', flipCard));
    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('resetGame').addEventListener('click', resetGame);
    document.getElementById('saveScore').addEventListener('click', saveScore);
    showScores();
});

