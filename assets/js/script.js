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
        } else {
            cardFlipped = false;
            cardTwo = this;
        }
    }

    icons.forEach(card => card.addEventListener('click', flipCard));
    
    
    

})

