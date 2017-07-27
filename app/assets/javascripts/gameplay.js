$(document).ready(function() {

	var gameid = $(".gametop").data("gameid");
	var hint1 = "";
	var hint1num = 0;
	var hint2 = "";
	var hint2num = 0;

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

});