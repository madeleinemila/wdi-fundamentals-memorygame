console.log("Up and running!");

var cards = ['queen', 'queen', 'king', 'king'];

var cardsInPlay = [];

var cardOne; // first card user flipped
var cardTwo; // second card user flipped

cardOne = cards[0];
cardsInPlay.push(cardOne);
console.log('User flipped ' + cardOne);

cardTwo = cards[2];
cardsInPlay.push(cardTwo);
console.log('User flipped ' + cardTwo);


if (cardsInPlay.length === 2) {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		alert('You found a match!');
	} else {
		alert('Sorry, try again.');
	}
	
}