console.log("Up and running! Hi there GA.");

var cards = [
{
	rank: "queen",
	suit: "hearts",
	cardImage: "images/queen-of-hearts.png",
	flipped: false
},
{
	rank: "queen",
	suit: "diamonds",
	cardImage: "images/queen-of-diamonds.png",
	flipped: false
},
{
	rank: "king",
	suit: "hearts",
	cardImage: "images/king-of-hearts.png",
	flipped: false
},
{
	rank: "king",
	suit: "diamonds",
	cardImage: "images/king-of-diamonds.png",
	flipped: false
}
];


var cardsInPlay = [];


// ** ENDGAME

var checkFlipped = function(card) {
	return card.flipped === true;
};







// ** MAIN GAMEPLAY


var checkForMatch = function() {
	if (cardsInPlay[0].playRank === cardsInPlay[1].playRank) {
		// IF MATCHING
		// update player console
		document.getElementById('game-status').innerHTML = 'You found a match!<span class="continue">Continue &gt;</span>';
		// prevent flipping more cards until continue button pressed
		document.getElementById('game-board').style.pointerEvents = "none";
		// reset for next turn if user presses continue button
		document.getElementsByClassName('continue')[0].addEventListener('click', resetCardsWhenMatch);
		// but also check if game is finished
		var endGame = cards.every(checkFlipped, true);
		if (endGame === true) {
			document.getElementById('game-status').innerHTML = "Congratulations! You've found all the pairs!<span class='continue'>Reset &gt;</span>";
			document.getElementsByClassName('continue')[0].addEventListener('click', resetAll);
		};
	} else {
		// IF NON-MATCHING
		// update player console
		document.getElementById('game-status').innerHTML = 'Sorry, try again.<span class="continue">Next turn &gt;</span>';
		// prevent flipping more cards until continue button pressed
		document.getElementById('game-board').style.pointerEvents = "none";
		// reset for next turn if user presses continue button
		document.getElementsByClassName('continue')[0].addEventListener('click', resetCardsWhenNoMatch);
	};
};


var flipCard = function(){
	var cardId = this.getAttribute('data-id');
	console.log("User flipped " + cards[cardId].rank);
	var playedObject = 
		{
			playRank: cards[cardId].rank,
			playId: cardId
		};
	cardsInPlay.push(playedObject);

	console.log("Image: " + cards[cardId].cardImage);
	console.log("Suit: " + cards[cardId].suit);
	this.setAttribute('src', cards[cardId].cardImage);
	cards[cardId].flipped = true;
	if (cardsInPlay.length === 2) {
		checkForMatch();
	}
};

var resetCardsWhenNoMatch = function(){
	// display back of cards
			// for each card in play
	 		for (var i=0; i<cardsInPlay.length; i++) {
 				// find card element 
				var cardToFlipBack = document.querySelectorAll('[data-id]')[cardsInPlay[i].playId];
		 		// change to back of card image
			 	cardToFlipBack.setAttribute('src', 'images/back.png');
			 	cards[cardsInPlay[i].playId].flipped = false;
			 };
	// empty cardsInPlay array
	cardsInPlay = [];
	// update player console
	document.getElementById('game-status').innerHTML = 'Click two cards';
	document.getElementById('game-board').style.pointerEvents = "auto";
};

var resetCardsWhenMatch = function() {
	cardsInPlay= [];
	document.getElementById('game-status').innerHTML = 'Click two new cards';
	document.getElementById('game-board').style.pointerEvents = "auto";
};


var shuffle = function(array) {
	//declare variables and assign array length to current index
	var currentIndex = array.length, tempValue, randomIndex;
	// while there are still elements to shuffle
	while (0 !== currentIndex) {
		// pick a random element of remaining elements
		randomIndex = Math.floor(Math.random() * currentIndex);
		// swap random element with current element on end
		currentIndex -= 1;
		tempValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = tempValue;
	};
	return array;
};


var createBoard = function() {
	shuffle(cards);
	for (var i=0; i<cards.length; i++){
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		// add click event
		cardElement.addEventListener('click', flipCard);
		// append card
		document.getElementById('game-board').appendChild(cardElement);
	};
};

var resetAll = function() {
	document.getElementById('game-board').innerHTML = '';
	cardsInPlay = [];
	for (var i=0; i<cards.length; i++) {
		cards[i].flipped = false;
	};
	createBoard();
	document.getElementById('game-status').innerHTML = 'Click any two cards';
	document.getElementById('game-board').style.pointerEvents = "auto";
};

createBoard();


