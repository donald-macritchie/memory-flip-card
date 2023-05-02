document.addEventListener('DOMContentLoaded', function() {

    const cards = document.getElementsByClassName('game-card');
    
    const icons = Array.from(cards);

    let cardFlipped = false;
    let cardOne;
    let cardTwo;
    let stopFlip = false;

    function flipCard() {
        if(stopFlip) return;
        //stops user from clicking a third icon before
        //the first two clicked, have flipped back
        this.classList.toggle('flipped');
        if(cardFlipped === false) {
            cardFlipped = true;
            cardOne = this;
            //check if cardOne has been flipped
            //any icon clicked after event will be false(not cardOne)
        } else {
            cardFlipped = false;
            cardTwo = this;
            //if cardFlipped is set to true, the user will be clicking for cardTwo

            matchingCards();
        }
    }

    function matchingCards() {
        if(cardOne.dataset.icon === cardTwo.dataset.icon) {
            cardOne.removeEventListener('click', flipCard);
            cardTwo.removeEventListener('click', flipCard);
            //checks if the two icons are the same
            //if the same, the event listener is removed
            // icons cant be flipped back
        } else {
            stopFlip = true;
            setTimeout( function() {
                cardOne.classList.remove('flipped');
                cardTwo.classList.remove('flipped');
                stopFlip = false;
            }, 1000);
            //Timeout allows users to see incorrect match before flipping back over
            
        }
    }

    icons.forEach(card => card.addEventListener('click', flipCard));
    
    
    

})

