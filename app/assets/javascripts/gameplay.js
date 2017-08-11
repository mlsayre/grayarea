var ready = function() {
	if(!!window.performance && window.performance.navigation.type == 2)
		{
		  window.location.reload();
		}

	$(document).off("click", ".chatopenbutton");
	$(document).off("click", ".messageenter");

	$(".startguess").click(function() {
    $.ajax({
      url: "/games/startguesser",
      type: "POST"
    })
  })

	$(".menu").on("click", function() {
		$(".pagecover").show();
		$(".menubox").show();
	});

	$(".menuclose").on("click", function() {
		$(".pagecover").hide();
		$(".menubox").hide();
	});

	$(".pagecover").on("click", function() {
		$(".pagecover").hide();
		$(".menubox").hide();
	});

	var sound = gon.sound;
	soundOnOff(sound);

	$(".soundon").on("click", function() {
		if (sound === 1) {
			sound = 0;
		} else {
			sound = 1;
		}
		soundOnOff(sound);
		$.ajax({
      url: "/games/soundonoff",
      type: "POST",
      dataType:'json',
      data: { 'sound' : sound }
    })
	})
	function chatButton() {
		$(document).on("click", ".chatopenbutton", function() {
			refreshChat();
			if ($(".chatbox").attr("data-chatopen") === "open") {
				clearInterval(refreshingChat);
				$(".chatbox").attr("data-chatopen", "closed");
			} else {
				refreshingChat = setInterval(refreshChat, 5000);
				$(".chatbox").attr("data-chatopen", "open")
			}
			$(".chatbox").slideToggle(200);	
			$(".chatenter").focus();
			$.ajax({
		      url: "/games/resetchatnotify",
		      type: "POST",
		      dataType:'json',
		      data: {'game_id' : gameid }
		    })
			$(".unreadchats").text("");
		});
		$(document).on("click", ".messageenter", function() {
			var msg = $(".chatenter").val();
			if (msg !== "") {
				$.ajax({
		      url: "/games/entermessage",
		      type: "POST",
		      dataType:'json',
		      data: { 'message' : msg,
		              'game_id' : gameid }
		    })
			}
			$(".chatenter").val("");
			refreshChat();
		});
	}
	if ($(".chatcontent").length > 0) {
		chatButton();
	}

	var pathname = window.location.pathname;
	function refreshChat() {
	  var wrapper = $('.chatcontent');
		wrapper.load(pathname + " .chatcontent", function() {
		   wrapper.children('.chatcontent').unwrap();
		});
	}
	function showChat() {
		$(document).off("click", ".chatopenbutton");
		$(document).off("click", ".messageenter");
	  var wrapper = $('.chatarea');
		wrapper.load(pathname + " .chatarea", function() {
		   wrapper.children('.chatarea').unwrap();
		});
		chatButton();
	}

	$(document).on("keypress", ".chatenter", function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
       $(".messageenter").click();
    }
	})

	function soundOnOff(onoff) {
		console.log("soundonoff running" + onoff)
		if (onoff === 0) {
			$(".soundon").text("Turn Sound On");
			Howler.mute(true);
		} else {
			$(".soundon").text("Turn Sound Off");
			Howler.mute(false);
		}
	}

	var gameid = $(".gametop").data("gameid");
	var hint1 = "";
	var hint1num = 0;
	var hint2 = "";
	var hint2num = 0;
	var scoring = {0:0, 1:10, 2:20, 3:35, 4:50, 5:70, 6:100};
	var keepitup = ["Keep it up!", "Great work!", "Keep it going!", "Very nice!", "Superb vocabulary!",
	     "Happy dance!", "Next up!", "Fantastic work!", "Superb effort!", "No end in sight!", 
	     "This is making the highlight reel!"]
	//word show anim
	var wordindarr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
	function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
	}
	wordindarr = shuffleArray(wordindarr);
	var speedtoshow = 120;
	function removeShrunken(k) {
		setTimeout(function() {
			$(".word").eq(wordindarr[k]).removeClass("shrunken")
		}, (speedtoshow + 110))
	}
	for (var i = 0; i < wordindarr.length; i++) {
		(function() {
			var tm = speedtoshow * (i + 2);
			var toremove = wordindarr[i];
			if ($(".allwords").length !== 0) {
				var k = i;
				setTimeout(function() {
					if (k === 0) {
						wordshow0.on("play", removeShrunken(k));
						wordshow0.play();
					} else if (k === 1) {
						wordshow1.on("play", removeShrunken(k));
						wordshow1.play();
					} else if (k === 2) {
						wordshow2.on("play", removeShrunken(k));
						wordshow2.play();
					} else if (k === 3) {
						wordshow3.on("play", removeShrunken(k));
						wordshow3.play();
					} else if (k === 4) {
						wordshow4.on("play", removeShrunken(k));
						wordshow4.play();
					} else if (k === 5) {
						wordshow5.on("play", removeShrunken(k));
						wordshow5.play();
					} else if (k === 6) {
						wordshow6.on("play", removeShrunken(k));
						wordshow6.play();
					} else if (k === 7) {
						wordshow7.on("play", removeShrunken(k));
						wordshow7.play();
					} else if (k === 8) {
						wordshow8.on("play", removeShrunken(k));
						wordshow8.play();
					} else if (k === 9) {
						wordshow9.on("play", removeShrunken(k));
						wordshow9.play();
					} else if (k === 10) {
						wordshow10.on("play", removeShrunken(k));
						wordshow10.play();
					} else if (k === 11) {
						wordshow11.on("play", removeShrunken(k));
						wordshow11.play();
					} else if (k === 12) {
						wordshow12.on("play", removeShrunken(k));
						wordshow12.play();
					} else if (k === 13) {
						wordshow13.on("play", removeShrunken(k));
						wordshow13.play();
					} else if (k === 14) {
						wordshow14.on("play", removeShrunken(k));
						wordshow14.play();
					}
				}, tm)
			}
		})(i);
	}
	var hint1numselected = 0;
	var hint2numselected = 0;
	$(".hint1number button").on("click", function() {
		$(".hint1number button").removeClass("wordnumselected");
		$(this).addClass("wordnumselected");
		hint1numselected = parseInt($(this).attr("value"));
	})
	$(".hint2number button").on("click", function() {
		$(".hint2number button").removeClass("wordnumselected");
		$(this).addClass("wordnumselected");
		hint2numselected = parseInt($(this).attr("value"));
	})

	$(".submithint1").click(function() {
		var enteredtext = $(".hint1word").val();
		var val = validate(enteredtext, hint1numselected);
		if (val === false) {
			return false;
		}
		hint1 = enteredtext.toUpperCase();
		submithint1(hint1, hint1numselected);
	});

	$(".submithint2").click(function() {
		var enteredtext = $(".hint2word").val();
		var val = validate(enteredtext, hint2numselected);
		if (val === false) {
			return false;
		}
		hint2 = enteredtext.toUpperCase();
		submithint2(hint2, hint2numselected);
	});

	$(".skiphint2").click(function() {
		skiphint("false");
	});

	function validate(word, num) {
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
		if (num === 0) {
			errorbox("Please select a number of words this hint applies to.");
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
                'word1num' : hint1numselected,
                'word2' : hint2,
                'word2num' : hint2numselected }
      })
        .always(function() {
        	if (hint1numselected === 1) {
						var wordword1 = "word";
					} else {
						var wordword1 = "words"
					}
					if (hint2numselected === 1) {
						var wordword2 = "word";
					} else {
						var wordword2 = "words"
					}
          $(".hint2").hide();
          $(".hintheadline").hide();
          $(".submittedword1").text(hint1);
          $(".submittednum1").text(hint1numselected + " " + wordword1);
          $(".submittedword2").text(hint2);
          $(".submittednum2").text(hint2numselected + " " + wordword2);
          $(".submitted").show();
					closemessagebox();
					if ($(".chatcontent").length === 0) {
        		showChat();
        	}
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
                'word1num' : hint1numselected,
                'word2' : hint2,
                'word2num' : hint2numselected }
      })
        .always(function() {
        	if (hint1numselected === 1) {
						var wordword1 = "word";
					} else {
						var wordword1 = "words"
					}
					if (hint2numselected === 1) {
						var wordword2 = "word";
					} else {
						var wordword2 = "words"
					}
          $(".hint2").hide();
          $(".hintheadline").hide();
          $(".submittedword1").text(hint1);
          $(".submittednum1").text(hint1numselected + " " + wordword1);
          $(".submittedword2").text(hint2);
          $(".submittednum2").text(hint2numselected + " " + wordword2);
          $(".submitted").show();
					closemessagebox();
        })
		})
		$(".closemessagebox").click(function() { closemessagebox(); });
		$(".pagecover").click(function() { closemessagebox(); });
		$(".messagebox").show();
		$(".pagecover").show();
	}

	$(document).on("click", ".returntomain", function() {
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
	  	var guessernum = gon.guessernum;

	  	//beginning state
	  	var guessedwords = gon.guessedwords;
	  	if (guessedwords === null) {guessedwords = [];}
	  	var guessstatus = gon.guessstatus
	  	var gamespoiled = gon.spoiler;
	  	var currenthint = hintword1;
	  	var currenthintnum = hintnum1;
	  	if (guessstatus.split(",")[0] === "hint2") {
	  		currenthint = hintword2;
	  		currenthintnum = hintnum2;
	  	}
	  	var correctwordsguessed = [];
	  	var correctwordshint2 = [];
	  	for (var i = 0; i < guessedwords.length; i++) {
	  		if (twords.indexOf(guessedwords[i]) !== -1) {
	  			correctwordsguessed.push(guessedwords[i]);
	  		}
	  	}
	  	var playerscore = scoring[correctwordsguessed.length];
	  	var notifytimeout;
	  	boardupdate(0, "true");

	  	//board setup/update
	  	function boardupdate(endgametime, firstload) {
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
		  	playerscore = scoring[correctwordsguessed.length];
		  	var correctwordcount = correctwordsguessed.length
		  	if (gamespoiled === 1) {
		  		playerscore = 0;
		  		correctwordcount = 0;
		  	}
		  	$(".wordcount").text(correctwordcount);
		  	$(".scorecount").text(playerscore);
		  	$(".thehintword").text(currenthint);
		  	$(".thehintnum").text(currenthintnum);
		  	if (currenthintnum === 1) {var thewordword = "word";} else {var thewordword = "words";}
		  	$(".thewordword").text(thewordword);
		  	if (currenthint === hintword2) {
		  		$(".skip1").text("Too risky? End game now.");
		  		$(".hintheadline").text("Your final hint is...")
		  	}

		  	if (guessstatus === "bonus,bonus") {
		  		$(".hintheadline").text("Bonus! Go for one more?")
		  		$(".guessword").remove();
		  		$(".guessnum").text("This game's hints were " + hintword1 + " and " + hintword2 + ".");
		  	}
		  	
		  	if (guessstatus === "over,over") {
		  		$("[data-guessword]").addClass("guessedword").addClass("neutralword");
		  		for (var i = 0; i < twords.length; i++) {
		  			$("[data-guessword='" + twords[i] + "']").removeClass("neutralword").addClass("targetword");
		  		}
		  		$("[data-guessword='" + bword + "']").removeClass("neutralword").addClass("badword");
		  		if (gamespoiled === 1) {
			  		playerscore = 0;
			  	}
			  	setTimeout(function() {
			  		$(".hintheading").remove();
			  		$(".submitted").removeClass("hidden");
			  		for (var i = 0; i < guessedwords.length; i++) {
				  		$("[data-guessword='" + guessedwords[i] + "']").addClass("finalguessesshow");
				  	}
				  	if (gamespoiled === 0 && endgametime !== 0) {
				  		gameovergoodsfx.play();
				  	}
				  	$(".finalpoints" + guessernum).text(playerscore + "pts");
				  }, endgametime);
		  	}
		  	//ajax call to update db
		  	if (firstload !== "true") {
			  	$.ajax({
		        url: "/games/updategame",
		        type: "POST",
		        dataType:'json',
		        data: { 'game_id' : parseInt(gameid),
		                'guessedwords' : guessedwords,
		                'guessstatus' : guessstatus,
		                'gamespoiled' : gamespoiled,
		                'gamescore' : playerscore }
		      })
		        .always(function() {
		        	//$(".allguesserinfo").load(location.href + " .allguesserinfo>*", "");
		        	if ($(".chatcontent").length === 0) {
		        		showChat();
		        	}
		        })
		     }
		  }

	  	$(document).on("click", ".firstclick", function() {
	  		var selected = $(this).find("span").text();
	  		clearTimeout(notifytimeout);
	  		$(".word").removeClass("unselected");
	  		$(".word").addClass("firstclick");
	  		$(".clickagain").removeClass("wordsubmitanim")
	  		$(".reallysubmit").off("click").removeClass("reallysubmit");
	  		$(this).find(".clickagain").addClass("wordsubmitanim");
	  		$(this).addClass("reallysubmit").removeClass("firstclick");
	  		$(".firstclick").addClass("unselected");
				$(".reallysubmit").on("click", function() {
					guessoutcome(selected);
					$(".clickagain").removeClass("wordsubmitanim");
	  			$(".reallysubmit").removeClass("reallysubmit");
	  			$(".word").removeClass("unselected");
				})
	  	})

	  	function guessoutcome(chosen) {
	  		guessedwords.push(chosen);
	  		$(".clickagain").removeClass("wordsubmitanim");
	  		$(".reallysubmit").removeClass("reallysubmit");
	  		// correct word 
	  		if (twords.indexOf(chosen) !== -1) {
	  			correctwordsguessed.push(chosen);
	  			if (currenthint === hintword2) {
	  				correctwordshint2.push(chosen);
	  			}
	  			if (currenthint === hintword1 && correctwordsguessed.length === currenthintnum) {
	  				$(".gamenotify").html("You found all the words for the first hint! On to the second hint...");
						shownotification();
						currenthint = hintword2;
	  				currenthintnum = hintnum2;
	  				guessstatus = "hint2,word1";
	  			} else if (correctwordsguessed.length === 6) {
	  				$(".gamenotify").html("You got all six words! Very difficult to do... Well done!");
	  				resultscheersfx.play();
						shownotification();
						guessstatus = "over,over";
					} else if (currenthint === hintword2 && correctwordshint2.length === currenthintnum) {
						$(".gamenotify").html("You found all the words for the second hint! Try for one bonus word?");
						shownotification("bonus");
	  				guessstatus = "bonus,bonus";
	  			} else if (currenthint === hintword2 && correctwordshint2.length === (currenthintnum + 1)) {
						$(".gamenotify").html("You found all the words for the second hint!");
						shownotification();
	  				guessstatus = "over,over";
	  			} else if (correctwordsguessed.length < 6) {
	  				$(".gamenotify").html(chosen + " is one of the six words you're looking for! " + 
							keepitup[Math.floor(Math.random() * keepitup.length)]);
						shownotification();
					} 
					$("[data-guessword='" + chosen + "'] .anim_correct").fadeIn(200).addClass("animating");
					setTimeout(function() {
						$("[data-guessword='" + chosen + "'] img.animating").fadeOut(1200, function() {
							$("[data-guessword='" + chosen + "'] img.animating").remove();
						})
					}, 1100);
					setTimeout(function() {
						$("[data-guessword='" + chosen + "'] div.animating").css("transform", "translateY(-500%)").fadeOut(400, function() {
							$("[data-guessword='" + chosen + "'] div.animating").remove();
						})
					}, 3100);
					targetwordsfx.play();
					boardupdate(4000);
	  		}
	  		// bad word
	  		if (bword === chosen) {
	  			$(".gamenotify").html('Oh no! ' + chosen + ' was the "Spoiler". Game over and all points lost.');
					shownotification();
  				guessstatus = "over,over";
  				gamespoiled = 1;
  				$("[data-guessword='" + chosen + "'] .anim_spoiler").fadeIn(200).addClass("animating");
					setTimeout(function() {
						$("[data-guessword='" + chosen + "'] img.animating").fadeOut(1200, function() {
							$("[data-guessword='" + chosen + "'] img.animating").remove();
						})
					}, 1100);
					setTimeout(function() {
						$("[data-guessword='" + chosen + "'] div.animating").css("transform", "translateY(500%)").fadeOut(400, function() {
							$("[data-guessword='" + chosen + "'] div.animating").remove();
						})
					}, 3100);
					badwordsfx.play();
  				boardupdate(4000);
	  		}
	  		// neutral word
	  		if (twords.indexOf(chosen) === -1 && bword !== chosen) {
	  			if (currenthint === hintword1) {
	  				$(".gamenotify").html(chosen + " was not one of the target words. " + 
	  					"Moving on to the second hint...");
						shownotification();
						currenthint = hintword2;
	  				currenthintnum = hintnum2;
	  				guessstatus = "hint2,word1";
	  			} else if (currenthint === hintword2) {
	  				$(".gamenotify").html(chosen + " was not one of the target words. " + 
	  					"The game is now over.");
						shownotification();
						guessstatus = "over,over";
					}
					$("[data-guessword='" + chosen + "'] .anim_neutral").fadeIn(200).addClass("animating");
					setTimeout(function() {
						$("[data-guessword='" + chosen + "'] img.animating").fadeOut(1200, function() {
							$("[data-guessword='" + chosen + "'] img.animating").remove();
						})
					}, 1100);
					setTimeout(function() {
						$("[data-guessword='" + chosen + "'] div.animating").css("transform", "translateY(200%)").fadeOut(400, function() {
							$("[data-guessword='" + chosen + "'] div.animating").remove();
						})
					}, 3100);
					neutralwordsfx.play();
					boardupdate(4000);
	  		}
	  	}

	  	$(".skip1").click(function() {
	  		if (currenthint === hintword1) {
	  			currenthint = hintword2;
  				currenthintnum = hintnum2;
  				guessstatus = "hint2,word1";
	  		} else {
	  			guessstatus = "over,over";
	  		}
	  		boardupdate(4000);
	  	});

	  	function shownotification(trigger) {
	  		$(".hintheadline").fadeOut(125, function() {
					$(".gamenotify").fadeIn(125);
				});
				notifytimeout = setTimeout(function() {
	  			$(".gamenotify").fadeOut(125, function() {
						$(".hintheadline").fadeIn(125);
					});
					if (trigger === "bonus") {
						bonusstartsfx.play();
					}
	  		}, 4000)
	  	}

	  })();
	}
}

//$(document).ready(ready);
$(document).on('turbolinks:load', ready);