document.addEventListener('DOMContentLoaded', function() {

    const cards = document.getElementsByClassName('game-card');
    
    const icons = Array.from(cards);

    function flipCard() {
        this.classList.toggle('flipped');
    }

    icons.forEach(card => card.addEventListener('click', flipCard));
    
    
    

})

