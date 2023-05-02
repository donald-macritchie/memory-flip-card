document.addEventListener('DOMContentLoaded', function() {

    const cards = document.getElementsByClassName('game-card');
    
    const icons = Array.from(cards);

    let cardFlipped = false;
    let cardOne;
    let cardTwo;

    function flipCard() {
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
        } 
    }

    icons.forEach(card => card.addEventListener('click', flipCard));
    
    
    

})

