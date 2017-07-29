$(document).ready(function() {

	var gameid = $(".gametop").data("gameid");
	var hint1 = "";
	var hint1num = 0;
	var hint2 = "";
	var hint2num = 0;
	var scoring = {0:0, 1:10, 2:20, 3:35, 4:50, 5:70, 6:100};
	var keepitup = ["Keep it up!", "Great work!", "Keep it going!", "Very nice!", "Superb vocabulary!",
	     "Happy dance!", "Next up!", "Fantastic work!", "Superb effort!", "No end in sight!", 
	     "This is making the highlight reel!"]

	$(".submithint1").click(function() {
		var enteredtext = $(".hint1word").val();
		var val = validate(enteredtext);
		if (val === false) {
			return false;
		}
		hint1 = enteredtext.toUpperCase();
		hint1num = parseInt($(".hint1number").val())
		submithint1(hint1, hint1num);
	});

	$(".submithint2").click(function() {
		var enteredtext = $(".hint2word").val();
		var val = validate(enteredtext);
		if (val === false) {
			return false;
		}
		hint2 = enteredtext.toUpperCase();
		hint2num = parseInt($(".hint2number").val())
		submithint2(hint2, hint2num);
	});

	$(".skiphint2").click(function() {
		skiphint("false");
	});

	function validate(word) {
		var letters = /^[a-zA-Z\s]+$/;
		var numberofwords = word.trim().split(/\s+/).length
		if (word.length === 0) {
			errorbox("Please enter a hint word.");
			return false;
		} else if (word.length > 28) {
			errorbox("Please keep hint shorter than 29 characters. Reminder: just give one word or two words if it's somebody's name.");
			return false;
		} else if (!word.match(letters)) {
			errorbox("Please make sure your hint contains letters only.");
			return false;
		} else if (numberofwords > 1) {
			errorbox("Please make sure your hint is one word only.");
			return false;
		}
	}

	function errorbox(message) {
		$(".messagetitle").text("Oopies!")
		$(".messageinfo").text(message);
		$(".messageaction").html('<button class="button closemessagebox">Return to game</button>');
		$(".messagesubtext").text("Push button or click anywhere outside this box to continue.");
		$(".closemessagebox").click(function() { closemessagebox(); });
		$(".pagecover").click(function() { closemessagebox(); });
		$(".messagebox").show();
		$(".pagecover").show();
	}

	function submithint1(hint, num) {
		if (num === 1) {
			var wordword = "word";
		} else {
			wordword = "words"
		}
		$(".messagetitle").text("Submit Hint?")
		$(".messageinfo").html('You have entered the hint "' + hint + '" which applies to <bold>' +
		                        num + '</bold> ' + wordword + '. Submit this hint and move to the final hint?');
		$(".messageaction").html('<button class="button submithint1final">Submit Hint 1</button>' +
			                       '<button class="button closemessagebox">Cancel</button>');
		$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.");
		$(".submithint1final").click(function() {
			$(".hint1").hide();
			$(".firstinfoword").text(hint);
			$(".firstinfonum").text(num + " " + wordword);
			$(".hint2").show();
			closemessagebox();
			// if (num === 6) {
			// 	skiphint("true");
			// }
		})
		$(".closemessagebox").click(function() { closemessagebox(); });
		$(".pagecover").click(function() { closemessagebox(); });
		$(".messagebox").show();
		$(".pagecover").show();
	}

	function submithint2(hint, num) {
		if (num === 1) {
			var wordword = "word";
		} else {
			var wordword = "words"
		}
		$(".messagetitle").text("Submit Second Hint?")
		$(".messageinfo").html('You have entered the hint "' + hint + '" which applies to <bold>' +
		                        num + '</bold> ' + wordword + '. Submit final hint and let people play the game?');
		$(".messageaction").html('<button class="button submithint2final">Submit - Ready for Players!</button>' +
			                       '<button class="button closemessagebox">Cancel</button>');
		$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.");
		$(".submithint2final").click(function() {
			$.ajax({
        url: "/games/submithints",
        type: "POST",
        dataType:'json',
        data: { 'game_id' : parseInt(gameid),
                'word1' : hint1,
                'word1num' : hint1num,
                'word2' : hint2,
                'word2num' : hint2num }
      })
        .always(function() {
        	if (hint1num === 1) {
						var wordword1 = "word";
					} else {
						var wordword1 = "words"
					}
					if (hint2num === 1) {
						var wordword2 = "word";
					} else {
						var wordword2 = "words"
					}
          $(".hint2").hide();
          $(".hintheadline").hide();
          $(".submittedword1").text(hint1);
          $(".submittednum1").text(hint1num + " " + wordword1);
          $(".submittedword2").text(hint2);
          $(".submittednum2").text(hint2num + " " + wordword2);
          $(".submitted").show();
					closemessagebox();
        })
		})
		$(".closemessagebox").click(function() { closemessagebox(); });
		$(".pagecover").click(function() { closemessagebox(); });
		$(".messagebox").show();
		$(".pagecover").show();
	}

	function skiphint(auto) {
		if (auto === "true") {

		} else {
			$(".messagetitle").text("Skip Second Hint?")
			$(".messageinfo").html('No second hint needed to get all six words? Confirm to skip the second hint.');
			$(".messageaction").html('<button class="button submithint2final">Submit - Ready for Players!</button>' +
				                       '<button class="button closemessagebox">Cancel</button>');
			$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.");
		}
		
		$(".submithint2final").click(function() {
			$.ajax({
        url: "/games/submithints",
        type: "POST",
        dataType:'json',
        data: { 'game_id' : parseInt(gameid),
                'word1' : hint1,
                'word1num' : hint1num,
                'word2' : hint2,
                'word2num' : hint2num }
      })
        .always(function() {
        	if (hint1num === 1) {
						var wordword1 = "word";
					} else {
						var wordword1 = "words"
					}
					if (hint2num === 1) {
						var wordword2 = "word";
					} else {
						var wordword2 = "words"
					}
          $(".hint2").hide();
          $(".hintheadline").hide();
          $(".submittedword1").text(hint1);
          $(".submittednum1").text(hint1num + " " + wordword1);
          $(".submittedword2").text(hint2);
          $(".submittednum2").text(hint2num + " " + wordword2);
          $(".submitted").show();
					closemessagebox();
        })
		})
		$(".closemessagebox").click(function() { closemessagebox(); });
		$(".pagecover").click(function() { closemessagebox(); });
		$(".messagebox").show();
		$(".pagecover").show();
	}

	$(".returntomain").click(function() {
		window.location = "/main";
	})

	function closemessagebox() {
		$(".messagebox").hide();
		$(".pagecover").hide();
		$(".messagetitle").html("");
		$(".messageinfo").html("");
		$(".messageaction").html("");
		$(".messagesubtext").html("");
	}

	// handle words up to "antidisestablishmentarianism"
	$('.hintenter').keyup(function() {
    var tlength = $(this).val().length;
    $(this).val($(this).val().substring(0,28));
    var tlength = $(this).val().length;
    // remain = parseInt(tlength);
    // $('#remain').text(remain);
  }); 

  $('.hintenter').on("keypress", function(e) {
  	if (e.keyCode === 13) {
  		e.preventDefault();
  		$(this).closest(".hints").find("button").first().click();
  	}
  });

  if ($(".allwords").hasClass("guesswordslist")) {
  	var GUESS = (function() {

	  	var twords = gon.targetwords;
	  	var bword = gon.badword;
	  	var hintword1 = gon.hintword1;
	  	var hintword2 = gon.hintword2;
	  	var hintnum1 = gon.hintnum1;
	  	var hintnum2 = gon.hintnum2;

	  	//beginning state
	  	var guessedwords = gon.guessedwords;
	  	var guessstatus = gon.guessstatus
	  	var currenthint = hintword1;
	  	var currenthintnum = hintnum1;
	  	if (guessstatus.split(",")[0] === "hint2") {
	  		currenthint = hintword2;
	  		currenthintnum = hintnum2;
	  	}
	  	var correctwordsguessed = [];
	  	for (var i = 0; i < guessedwords.length; i++) {
	  		if (twords.indexOf(guessedwords[i]) !== -1) {
	  			correctwordsguessed.push(guessedwords[i]);
	  		}
	  	}
	  	boardupdate();

	  	//board setup/update
	  	function boardupdate() {
		  	if (guessedwords.length > 0) {
		  		for (var i = 0; i < guessedwords.length; i++) {
			  		$("[data-guessword='" + guessedwords[i] + "']").addClass("guessedword");
			  	}
		  	}
		  	$(".guessedword").each(function() {
		  		var theword = $(this).attr("data-guessword");
		  		if (twords.indexOf(theword) !== -1) {
		  			$(this).addClass("targetword");
		  		} 
		  		if (bword === theword) {
		  			$(this).addClass("badword");
		  		}
		  		if (bword !== theword && twords.indexOf(theword) === -1) {
		  			$(this).addClass("neutralword");
		  		}
		  	})
		  	$(".wordcount").text(correctwordsguessed.length);
		  	$(".scorecount").text(scoring[correctwordsguessed.length]);
		  	$(".thehintword").text(currenthint);
		  	$(".thehintnum").text(currenthintnum);
		  	if (currenthintnum === 1) {var thewordword = "word";} else {var thewordword = "words";}
		  	$(".thewordword").text(thewordword);
		  	if (currenthint === hintword2) {
		  		$(".skip1").text("Too risky? End game now.");
		  		$(".hintheadline").text("Your final hint is...")
		  	}
		  }

	  	$(".guesswordslist .word").click(function() {
	  		var selected = $(this).find("span").text();
	  		$(".messagetitle").text("Confirm")
				$(".messageinfo").html('You have selected the word "' + selected + '" based on the hint "' +
				                        currenthint + '" . Submit this guess?');
				$(".messageaction").html('<button class="button submitguessyes yesnobtn">Yes</button>' +
					                       '<button class="button closemessagebox yesnobtn">No</button>');
				$(".messagesubtext").text("Push No or click anywhere outside this box to cancel.");
				$(".submitguessyes").click(function() {
					closemessagebox();
					guessoutcome(selected);
				})
				$(".closemessagebox").click(function() { closemessagebox(); });
				$(".pagecover").click(function() { closemessagebox(); });
				$(".messagebox").show();
				$(".pagecover").show();
	  	})

	  	function guessoutcome(chosen) {
	  		guessedwords.push(chosen);
	  		// correct word 
	  		if (twords.indexOf(chosen) !== -1) {
	  			correctwordsguessed.push(chosen);
	  			$(".messagetitle").text("Correct!")
	  			if (currenthint === hintword1 && correctwordsguessed.length === currenthintnum) {
	  				$(".messageinfo").html("You found all the words for the first hint! " + 
							keepitup[Math.floor(Math.random() * keepitup.length)]);
						$(".messageaction").html('<button class="button closemessagebox">Continue to Second Hint</button>');
						$(".messagesubtext").text("Push Continue or click anywhere outside this box to continue.");
						currenthint = hintword2;
	  				currenthintnum = hintnum2;
	  				guessstatus = "hint2,word1";
	  			} else if (correctwordsguessed.length < 6) {
						$(".messageinfo").html(chosen + " is one of the six words you're looking for! " + 
							keepitup[Math.floor(Math.random() * keepitup.length)]);
						$(".messageaction").html('<button class="button closemessagebox">Continue</button>');
						$(".messagesubtext").text("Push Continue or click anywhere outside this box to continue.");
					} else {
						$(".messageinfo").html("You got all six words! Very difficult to do... Well done!");
						$(".messageaction").html('<button class="button closemessagebox">Continue</button>');
						$(".messagesubtext").text("Push Continue or click anywhere outside this box to continue.");
					}
					$(".closemessagebox").click(function() { 
						closemessagebox();
					});
					$(".pagecover").click(function() { 
						closemessagebox(); 
					});
					boardupdate();
					$(".messagebox").show();
					$(".pagecover").show();
	  		}
	  		// bad word
	  		if (bword === chosen) {

	  		}
	  		// neutral word
	  		if (twords.indexOf(chosen) === -1 && bword !== chosen) {

	  		}
	  	}

	  	$(".skip1").click(function() {
	  		if (currenthint === hintword1) {
	  			currenthint = hintword2;
  				currenthintnum = hintnum2;
  				guessstatus = "hint2,word1";
	  		} else {

	  		}
	  		boardupdate();
	  	});

	  })();
	}
});