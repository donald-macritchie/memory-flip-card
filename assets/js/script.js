document.addEventListener('DOMContentLoaded', function() {

    const cards = document.getElementsByClassName('game-card');
    
    const icons = Array.from(cards);

    function flipCard() {
        console.log('this was clicked');
    }

    icons.forEach(card => card.addEventListener('click', flipCard));
    
    
    

})

