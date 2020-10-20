var matchingGame = {
    elapsedTime: 0
};

matchingGame.deck = [];

var listaCards = new Array();

var cardsArray = [

{	
	"id":"Lavar as mãos",
	"texto":"Lavar as mãos",
	"avatar_url":"./images/cards/1.png",
	"acertou":"Lave suas mãos frequentemente com água e sabão ou use solução de álcool gel.",
},
{
	"id":"Mantenha o distanciamento social",
	"texto":"Mantenha o distanciamento social",
	"avatar_url":"./images/cards/2.png",
	"acertou":"Mantenha pelo menos 1,5m de distância de outras pessoas se precisar sair de casa."
},
{
	"id":"Evitar tocar olhos, nariz e boca",
	"texto":"Evitar tocar olhos, nariz e boca",
	"avatar_url":"./images/cards/3.png",
	"acertou":"Evite coçar, esfregar ou ter qualquer tipo de contato com as mucosas. Se for necessário, lave as mãos antes."
},
{
	"id":"Higienize o que vem da rua",
	"texto":"Higienize o que vem da rua",
	"avatar_url":"./images/cards/4.png",
	"acertou":"Higienize com água e sabão, solução de água sanitária ou álcool, tudo o que vem da rua."
},
{
	"id":"Ao identificar sintomas, procure ajuda",
	"texto":"Ao identificar sintomas, procure ajuda",
	"avatar_url":"./images/cards/5.png",
	"acertou":"Ao sentir dificuldade para respirar, febre, dor de garganta ou dor de cabeça, procure imediatamente uma Unidade de Saúde."
},
{
	"id":"Uso de máscaras",
	"texto":"Uso de máscaras",
	"avatar_url":"./images/cards/6.png",
	"acertou": "Use máscara sempre que sair de casa, mesmo que não apresente qualquer sintoma. Elas devem tapar a boca e nariz e precisam ser higienizadas ou descartadas após o uso."
},
{
	"id":"Evite ambientes fechados",
	"texto":"Evite ambientes fechados",
	"avatar_url":"./images/cards/7.png",
	"acertou": "Dê preferência a lugares arejados e bem ventilados, onde o vírus possa se dissipar no ar."
},
{
	"id":"Brinquedos limpos",
	"texto":"Brinquedos limpos",
	"avatar_url":"./images/cards/8.png",
	"acertou": "Procure manter limpos e higienizados todos os brinquedos que as crianças têm contato. Use água e sabão ou álcool."
},

];


 
function getAllCards() {
		 
  
  for(item in cardsArray) {
	  
	  listaCards.push(cardsArray[item]);
	  
  }
       
    
 data = window.listaCards;
      
}

// http://stackoverflow.com/a/2450976/1420197
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function selectCard() {
	if ($(".card-flipped").size() > 1) {
		return;
	}
	$(this).addClass("card-flipped");
	if ($(".card-flipped").size() == 2) {
		setTimeout(checkPattern,1400);
	}
}

function checkPattern() {
	if (isMatchPattern()) {
		document.getElementById('modal-text').innerHTML = $(".card-flipped").attr("data-element-text");
		document.getElementById('myBtn').click();
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
		$(".card-removed").bind("webkitTransitionEnd",removeTookCards);
		 
	} else {
		$(".card-flipped").removeClass("card-flipped");
	}
}

function isMatchPattern() {
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");
	return (pattern == anotherPattern);
}

function removeTookCards() {
	$(".card-removed").remove();
	if ($(".card").length == 0) {
		gameover();
	}
}

function gameover() {
	clearInterval(matchingGame.timer);
	$(".score").html($("#elapsed-time").html());

	var lastScore = localStorage.getItem("last-score");
	lastScoreObj = JSON.parse(lastScore);
	if (lastScoreObj == null) {
		lastScoreObj = {"savedTime": "no record", "score": 0};
	}
	var lastElapsedTime = lastScoreObj.score;
	var minute = Math.floor(lastElapsedTime / 60);
	var second = lastElapsedTime % 60;
	if (minute < 10) minute = "0" + minute;
	if (second < 10) second = "0" + second;
	$(".last-score").html(minute+":"+second);
	var savedTime = lastScoreObj.savedTime;
	$(".saved-time").html(savedTime);

	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	if (minutes < 10) minutes = "0" + minutes;
	var seconds = currentTime.getSeconds();
	if (seconds < 10) seconds = "0" + seconds;
	var now = day+"/"+month+"/"+year+" "+hours+":"+minutes+":"+seconds;
	var obj = {
		"savedTime": now,
		"score": matchingGame.elapsedTime
	};
	localStorage.setItem("last-score", JSON.stringify(obj));

	if (lastElapsedTime == 0 || matchingGame.elapsedTime < lastElapsedTime) {
		$(".ribbon").removeClass("hide");
	}

	$("#popup").removeClass("hide");
}

function countTimer() {
	matchingGame.elapsedTime++;
	var minute = Math.floor(matchingGame.elapsedTime / 60);
	var second = matchingGame.elapsedTime % 60;

	if (minute < 10) minute = "0" + minute;
	if (second < 10) second = "0" + second;
	$("#elapsed-time").html(minute+":"+second);
}

$(function(){
	
	// Get the modal
	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal 
	btn.onclick = function() {
	  modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
		modal.style.display = "none";
	  }
	}

    var $cards = $("#cards");
    var $loader = $("#loader");
	
	getAllCards();

    $cards.hide();
	for (var i = 0; i < listaCards.length; ++i) {
		matchingGame.deck.push(listaCards[i], listaCards[i]);
	}
	shuffle(matchingGame.deck);
	for(var i=0;i<15;i++){
		$('.card:first-child').clone().appendTo($cards);
	}
	$cards.children().each(function(index) {
		var $this = $(this);
		$this.css({
			'left': ($this.width() + 15) * (index % 4),
			'top': ($this.height() + 15) * Math.floor(index / 4)
		});

		var Hubber = matchingGame.deck.pop();

		// This is some shit - we are going to dynamically apply css to the card(s).
		$this
			.css("background", "#efefef url(" + Hubber.avatar_url + ")")
			.css("background-size", "128px 128px")

		$this.attr("data-pattern",Hubber.id);
		$this.attr("data-element-text",Hubber.acertou);

		if ($("[data-pattern="+Hubber.id+"] .texto").text() == "" && Hubber.texto) {
			$this.find(".texto").text(Hubber.texto);
		} else {
			$this.find(".id").text(Hubber.id);
		}

		$this.click(selectCard);
	});
	$cards.fadeIn();
	$loader.fadeOut();
	matchingGame.timer = setInterval(countTimer, 1000);
   
});
