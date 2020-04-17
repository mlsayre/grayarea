var ready = function() {
	if(!!window.performance && window.performance.navigation.type == 2)
		{
		  window.location.reload();
		}

	$(document).off("click", ".chatopenbutton");
	$(document).off("click", ".chatclosebutton");
	$(document).off("click", ".messageenter");

	$(document).on("click", ".chatclosebutton", function() {
		clearInterval(refreshingChat);
		$(".chatbox").attr("data-chatopen", "closed");
		$(".chatbox").slideToggle(200);	
	});

	$(".startguess").click(function() {
    $.ajax({
      url: "/games/startguesser",
      type: "POST"
    })
  })
  $(".contstartguess").click(function() {
    $.ajax({
      url: "/games/startguessercont",
      type: "POST"
    })
  })
  $(".contmainplay").click(function() {
    $.ajax({
      url: "/games/startgivercont",
      type: "POST"
    })
  })

  $(".bigplaybutton").click(function(e) {
  	e.preventDefault();
  	$(".pagecover").show();
  	$(".mainmenubuttons").show();
  })

  $(".gd").click(function() {
  	$.ajax({
      url: "/games/delgame",
      type: "POST",
      dataType:'json',
      data: {'game_id' : gameid }
    })
    .always(function() {
    	location.href = '/main';
    })
  })

	$(".menu").on("click", function() {
		$(".pagecover").show();
		$(".menubox").show();
	});

	$(".menuclose").on("click", function() {
		$(".pagecover").hide().removeClass("unclickable");
		$(".menubox").hide();
	});

	$(".pagecover").not(".unclickable").click(function() {
		$(".pagecover").hide().removeClass("unclickable");
		$(".menubox").hide();
		$(".mainmenubuttons").hide();
		$(".menudialogspoiler").hide();
		$(".menudialogneutral").hide();
		$(".menudialogwatch").hide();
		$(".menudialogadblocker").hide();
		$(".menudialogaboutgiver").hide();
		$(".giveravatar").removeClass("avatarmoved");
	});
	$(".pagecoverabout").not(".unclickable").click(function() {
		$(".pagecoverabout").hide().removeClass("unclickable");
		$(".menubox").hide();
		$(".mainmenubuttons").hide();
		$(".menudialogspoiler").hide();
		$(".menudialogneutral").hide();
		$(".menudialogwatch").hide();
		$(".menudialogadblocker").hide();
		$(".menudialogaboutgiver").hide();
		$(".giveravatar").removeClass("avatarmoved");
	});

	// $(".opensettings").click(function(e) {
	// 	e.preventDefault();
	// 	$(".settingsbox").addClass("boxin");
	// });
	// $(".settingsclosebutton").click(function() {
	// 	$(".settingsbox").removeClass("boxin");
	// })

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
		if (onoff === 0) {
			$(".soundon").text("Turn Sound On");
			Howler.mute(true);
		} else {
			$(".soundon").text("Turn Sound Off");
			Howler.mute(false);
		}
	}

	(function() {
		$(".allwords li").each(function() {
			if ($(this).find("span").text().indexOf("-") !== -1) {
				thetext = $(this).find("span").text().replace("-", "-<br>");
				$(this).find("span").html(thetext)
			} else if ($(this).find("span").text().indexOf(" ") !== -1) {
				thetext = $(this).find("span").text().replace(" ", "<br>");
				$(this).find("span").html(thetext)
			} else if ($(this).find("span").text().length === 11) {
				$(this).addClass("spaceword");
			} else if ($(this).find("span").text().length > 11) {
				$(this).addClass("longword");
			}
		})
	})();

	var gameid = $(".gametop").data("gameid");
	var hint1 = "";
	var hint1num = 0;
	var hint2 = "";
	var hint2num = 0;
	var hint3 = "";
	var hint3num = 0;
	var scoring = {0:0, 1:10, 2:15, 3:25, 4:40, 5:50, 6:60};
	var scoringrow = {0: "", 1: "", 2: "Two in a row!", 3: "One, two, THREE!", 4: "Four in a row!", 5: "Five in a row!", 6: "SIX in a row!!"}
	var keepitup = ["Keep it up!", "Great work!", "Keep it going!", "Very nice!", "Superb vocabulary!",
	     "Happy dance!", "Next up!", "Fantastic work!", "Superb effort!", "No end in sight!", 
	     "This is making the highlight reel!"]
	//word show anim
	var wordindarr = [0,2,3,4,5,6,7,8,9,10,11,12,13,14]
	function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    array.push(1)
    return array;
	}

	if ($(".word").length > 0 && ($(".guesswordslist").length === 0 && $(".creatinggame").length === 0)) {
		$(".shrunken").removeClass("shrunken");
	}

	if ($(".word").length > 0 && $(".guesswordslist").length > 0 || $(".word").length > 0 && $(".creatinggame").length > 0 || 
		  $(".word").length > 0 && $(".guestplayboard").length > 0) {
		var cttop = $(".word").eq(1).position().top;
		var ctleft = $(".word").eq(1).position().left;
		for (var i = 0; i < $(".word").length; i++) {
			var curtop = $(".word").eq(i).position().top;
			var curleft = $(".word").eq(i).position().left;
			var movetop = cttop - curtop;
			var moveleft = ctleft - curleft;
			$(".word").eq(i).animate({top: movetop, left: moveleft}, 0);
		}
		wordindarr = shuffleArray(wordindarr);
		var speedtoshow = 100;
		function removeShrunken(k) {
			setTimeout(function() {
				$(".word").eq(wordindarr[k]).animate({top: "0px", left: "0px"}, {duration: 0, easing: "easeOutBounce", complete: function() {
					$(".word").eq(wordindarr[k]).removeClass("shrunken")
				}
				})
			}, (speedtoshow + 110))
		}

		if ($(".guesswordslist").length > 0 || $(".creatinggame").length > 0 || $(".guestplayboard").length > 0) {
			$(".pagecoverabout").show();
			$(".menudialogrevealwords").show();
			$(".giveravatar").addClass("avatarmoved");
			$(".menudialogrevealwords").click(function() {
				$(".giveravatar").removeClass("avatarmoved");
				beginsfx.play();
				revealWords();
				$(".giveravatar").addClass("avatarclick");
			});
		}

		function revealWords() {
			$(".pagecoverabout").hide();
			$(".pagecoveraboutstart").removeClass("pagecoveraboutstart")
			$(".menudialogrevealwords").addClass("shrunken");
			$(".revealwords").addClass("shrunken");
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
								$(".menudialogrevealwords").hide().removeClass("shrunken");
								$(".revealwords").hide().removeClass("shrunken");
								$(".word").removeAttr("style");
							}
						}, tm)
					}
				})(i);
			}
		}
	}

	$(".hintenter.hint1word").on("keyup", function() {
		$(".hws1 .sumword").text($(".hintenter.hint1word").val().toUpperCase())
	})
	$(".hintenter.hint2word").on("keyup", function() {
		$(".hws2 .sumword").text($(".hintenter.hint2word").val().toUpperCase())
	})
	$(".hintenter.hint3word").on("keyup", function() {
		$(".hws3 .sumword").text($(".hintenter.hint3word").val().toUpperCase())
	})

	var hint1numselected = 0;
	var hint2numselected = 0;
	var hint3numselected = 0;
	$(".hint1number button").on("click", function() {
		$(".hint1number button").removeClass("wordnumselected");
		$(this).addClass("wordnumselected");
		hint1numselected = parseInt($(this).attr("value"));
		$(".hns1 .sumnum").text($(this).attr("value"))
	})
	$(".hint2number button").on("click", function() {
		$(".hint2number button").removeClass("wordnumselected");
		$(this).addClass("wordnumselected");
		hint2numselected = parseInt($(this).attr("value"));
		$(".hns2 .sumnum").text($(this).attr("value"))
	})
	$(".hint3number button").on("click", function() {
		$(".hint3number button").removeClass("wordnumselected");
		$(this).addClass("wordnumselected");
		hint3numselected = parseInt($(this).attr("value"));
		$(".hns3 .sumnum").text($(this).attr("value"))
	})

	$(".submithint1").click(function() {
		var enteredtext = $(".hint1word").val();
		var val = validate(enteredtext, hint1numselected);
		if (val === false) {
			return false;
		}
		hint1 = enteredtext.toUpperCase();
		submithint1(hint1, hint1numselected);
		$(".givesummary").removeClass("offscreen");
		$(".wordsummary1").removeClass("offscreen");
	});

	$(".submithint2").click(function() {
		var enteredtext = $(".hint2word").val();
		var val = validate(enteredtext, hint2numselected);
		if (val === false) {
			return false;
		}
		hint2 = enteredtext.toUpperCase();
		submithint2(hint2, hint2numselected);
		$(".wordsummary2").removeClass("offscreen");
	});

	$(".submithint3").click(function() {
		var enteredtext = $(".hint3word").val();
		var val = validate(enteredtext, hint3numselected);
		if (val === false) {
			return false;
		}
		hint3 = enteredtext.toUpperCase();
		submithint3(hint3, hint3numselected);
		$(".wordsummary3").removeClass("offscreen");
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
			errorbox('Please keep "' + word.toUpperCase() + '" shorter than 29 characters. Reminder: just give one word or two joined words if it is a name.');
			return false;
		} else if (!word.match(letters)) {
			errorbox('Please make sure your hint "' + word.toUpperCase() + '" contains letters only.');
			return false;
		} else if (numberofwords > 1) {
			errorbox('Please make sure your hint "' + word.toUpperCase() + '" is one word only.');
			return false;
		}
		if (num === 0) {
			errorbox('Please select a number of words "' + word.toUpperCase() + '" applies to.');
			return false;
		}
	}

	function errorbox(message) {
		$(".messagetitle").text("Oopies!")
		$(".messageinfo").text(message);
		$(".messageaction").html('<button class="button closemessagebox">Return to game</button>');
		$(".messagesubtext").text("Push button or click anywhere outside this box to continue.");
		$(".closemessagebox").click(function() { closemessagebox(); });
		$(".pagecover").not(".unclickable").click(function() { closemessagebox(); });
		$(".messagebox").show();
		$(".pagecover").show();
	}

	$(".deletegame").click(function() {
		$(".messagetitle").text("Delete game?")
		$(".messageinfo").html("No good hints coming to mind? You may " +
			"delete this game. Note you have a limited number of delete credits, but receive a new credit for " +
			"every two games you successfully create. ");
		$(".messageaction").html('<button class="button deleteunfinished">Delete the Game</button>' +
			                       '<button class="button closemessagebox">Cancel</button>');
		$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.");
		$(".deleteunfinished").click(function() {
			givingdeletegame();
			closemessagebox();
		})
		$(".closemessagebox").click(function() { closemessagebox(); });
		$(".pagecover").not(".unclickable").click(function() { closemessagebox(); });
		$(".messagebox").show();
		$(".pagecover").show();
	});

	$(".deletegameoff").click(function() {
		$(".messagetitle").text("Sorry!")
		$(".messageinfo").html("You don't have enough delete credits to delete this board. For every 2 games you " +
			"successfully create, you'll receive one delete credit. Good luck!");
		$(".messageaction").html('<button class="button closemessagebox">Cancel</button>');
		$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.");
		$(".deleteunfinished").click(function() {
			closemessagebox();
		})
		$(".closemessagebox").click(function() { closemessagebox(); });
		$(".pagecover").not(".unclickable").click(function() { closemessagebox(); });
		$(".messagebox").show();
		$(".pagecover").show();
	});

	function givingdeletegame() {
		$.ajax({
      url: "/games/givingdeletegame",
      type: "POST",
      dataType:'json',
      data: { 'game_id' : parseInt(gameid)}
    })
    .done(function() {
    	location.href = '/main';
    })
    .fail(function() {
    	connectionError();
    })
	}

	function submithint1(hint, num) {
		if (num === 1) {
			var wordword = "word";
		} else {
			wordword = "words"
		}
		// $(".messagetitle").text("Submit Hint?")
		// $(".messageinfo").html('You have entered the hint "' + hint + '" which applies to <bold>' +
		//                         num + '</bold> ' + wordword + '. Submit this hint and move to the next hint?');
		// $(".messageaction").html('<button class="button submithint1final">Submit Hint 1</button>' +
		// 	                       '<button class="button closemessagebox">Cancel</button>');
		// $(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.");
		// $(".submithint1final").click(function() {
			$(".hint1").hide();
			// $(".firstinfoword").text(hint);
			// $(".firstinfonum").text(num + " " + wordword);
			$(".hint2").show();
			// closemessagebox();
			// if (num === 6) {
			// 	skiphint("true");
			// }
		// })
		// $(".closemessagebox").click(function() { closemessagebox(); });
		// $(".pagecover").not(".unclickable").click(function() { closemessagebox(); });
		// $(".messagebox").show();
		// $(".pagecover").show();
	}

	function submithint2(hint, num) {
		if (num === 1) {
			var wordword = "word";
		} else {
			wordword = "words"
		}
		// $(".messagetitle").text("Submit Second Hint?")
		// $(".messageinfo").html('You have entered the hint "' + hint + '" which applies to <bold>' +
		//                         num + '</bold> ' + wordword + '. Submit this hint and move to the final hint?');
		// $(".messageaction").html('<button class="button submithint2final">Submit Hint 2</button>' +
		// 	                       '<button class="button closemessagebox">Cancel</button>');
		// $(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.");
		// $(".submithint2final").click(function() {
			$(".hint2").hide();
			// $(".secondinfoword").text(hint);
			// $(".secondinfonum").text(num + " " + wordword);
			$(".hint3").show();
			// closemessagebox();
			// if (num === 6) {
			// 	skiphint("true");
			// }
		// })
		// $(".closemessagebox").click(function() { closemessagebox(); });
		// $(".pagecover").not(".unclickable").click(function() { closemessagebox(); });
		// $(".messagebox").show();
		// $(".pagecover").show();
	}

	function submithint3(hint, num) {
		if (num === 1) {
			var wordword = "word";
		} else {
			var wordword = "words"
		}
		// $(".messagetitle").text("Submit Final Hint?")
		// $(".messageinfo").html('You have entered the hint "' + hint + '" which applies to <bold>' +
		//                         num + '</bold> ' + wordword + '. Submit final hint and let people play the game?');
		// $(".messageaction").html('<button class="button submithint3final">Submit - Ready for Players!</button>' +
		// 												 '<button class="button submitredo">Start Over</button>' +
		// 	                       '<button class="button closemessagebox">Cancel</button>');
		// $(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.");
		// $(".submitredo").click(function() {
			// $(".hint3").hide();
			// $(".hint1").show();
			$(".submithint1").replaceWith('<button class="button submithint3final">Submit - Ready for Players!</button>')
			$(".submithint2").replaceWith('<button class="button submithint3final">Submit - Ready for Players!</button>')
			$(".submithint3").replaceWith('<button class="button submithint3final">Submit - Ready for Players!</button>')

			// $(".hintenter").val("");
			// closemessagebox();
		// })
		$(".submithint3final").click(function() {
			var enteredtext = $(".hint1word").val();
			var val = validate(enteredtext, hint1numselected);
			if (val === false) {
				return false;
			}
			hint1 = enteredtext.toUpperCase();
			var enteredtext = $(".hint2word").val();
			var val = validate(enteredtext, hint2numselected);
			if (val === false) {
				return false;
			}
			hint2 = enteredtext.toUpperCase();
			var enteredtext = $(".hint3word").val();
			var val = validate(enteredtext, hint3numselected);
			if (val === false) {
				return false;
			}
			hint3 = enteredtext.toUpperCase();
			$(".hint1").hide();
			$(".hint2").hide();
			$(".hint3").show();
			$(".hinteditbutton").remove();
			$(".submithint3final").remove();
			$(".deletegame").remove();
			$(".deletegameoff").remove();
			$(".summarytitle").addClass("summaryended")
			$.ajax({
        url: "/games/submithints",
        type: "POST",
        dataType:'json',
        data: { 'game_id' : parseInt(gameid),
                'word1' : hint1,
                'word1num' : hint1numselected,
                'word2' : hint2,
                'word2num' : hint2numselected,
                'word3' : hint3,
                'word3num' : hint3numselected,}
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
					if (hint3numselected === 1) {
						var wordword3 = "word";
					} else {
						var wordword3 = "words"
					}
          $(".hint3").hide();
          $(".hintheadline").hide();
          // $(".submittedword1").text(hint1);
          // $(".submittednum1").text(hint1numselected + " " + wordword1);
          // $(".submittedword2").text(hint2);
          // $(".submittednum2").text(hint2numselected + " " + wordword2);
          // $(".submittedword3").text(hint3);
          // $(".submittednum3").text(hint3numselected + " " + wordword3);
          $(".submitted").show();
          $(".buttons-middle").removeClass("hidden");
					closemessagebox();
					if ($(".chatcontent").length === 0) {
        		showChat();
        	}
        })
		})
		// $(".closemessagebox").click(function() { closemessagebox(); });
		// $(".pagecover").not(".unclickable").click(function() { closemessagebox(); });
		// $(".messagebox").show();
		// $(".pagecover").show();
	}

	$(".hes1").click(function(e) {
		e.preventDefault();
		$(".hint2").hide();
		$(".hint3").hide();
		$(".hint1").show()
	})
	$(".hes2").click(function(e) {
		e.preventDefault();
		$(".hint1").hide();
		$(".hint3").hide();
		$(".hint2").show()
	})
	$(".hes3").click(function(e) {
		e.preventDefault();
		$(".hint1").hide();
		$(".hint2").hide();
		$(".hint3").show()
	})

	function connectionError() {
		$("body").html("Please check your connection. Please reload game when you have reconnected to the internet.")
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
		$(".pagecover").not(".unclickable").click(function() { closemessagebox(); });
		$(".messagebox").show();
		$(".pagecover").show();
	}

	$(document).on("click", ".returntomain", function() {
		window.location = "/main";
	})

	function closemessagebox() {
		$(".messagebox").hide();
		$(".pagecover").hide().removeClass("unclickable");
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

  // giving hints, check track
  if ($(".allwords").hasClass("givewordslist")) {
  	$(".targetword").click(function() {
  		if ($(this).hasClass("tracked")) {
  			$(this).removeClass("tracked");
  			$(this).find(".trackedimage").remove();
  		} else {
  			$(this).addClass("tracked");
  			$(this).append('<img class="trackedimage" src="/assets/obj_tick.png">')
  		}
  	})
  }

  if ($(".allwords").hasClass("guesswordslist")) {
  	var GUESS = (function() {
  		var awords = gon.allwords;
	  	var twordstemp = gon.targetwords;
	  	var twords = [];
	  	for (var i = 12; i < 18; i++) {
	  		twords.push(awords[twordstemp[i]])
	  	}
	  	var bwordtemp = gon.badword;
	  	var bword = awords[bwordtemp[8]];
	  	var hintword1 = gon.hintword1;
	  	var hintword2 = gon.hintword2;
	  	var hintword3 = gon.hintword3;
	  	var hintnum1 = gon.hintnum1;
	  	var hintnum2 = gon.hintnum2;
	  	var hintnum3 = gon.hintnum3;
	  	var guessernum = gon.guessernum;
	  	var guessedwords = [];
	  	var guessstatus = "hint1,word1";
	  	var pupspoilerstatus = gon.pupspoiler || 0;
	  	var pupneutralstatus = gon.pupneutrals || 0;
	  	var pupspoilerused = pupspoilerstatus.length;
	  	var pupneutralused = pupneutralstatus.length;

	    // window.addEventListener('message', function initZ2(e) {
	    // // The following if statement is recommended after initial tests
     //        /*  if (e.origin !== "https://my.gamedomain.com") {
     //                return;
     //            } */ 
     //            if (e.data == 'sys-closing') {
     //                window.removeEventListener('message', initZ2, false);
     //            } else if (e.data == 'z2-ready') {
     //                var options2 = {
     //                    zoneId: 2640,
     //                    devId: 3705,
     //                    gameId: 4674,
     //                    // custom1: ??,
     //                    // custom2: ??,
     //                    dMode: 1,     // 1 for MD5 checksum, 0 for no MD5 checksum
     //                    // fallback: n,
     //                    // verbosity: n,
     //                    vtos: 2,	// do not change unless placement adjustment is needed
     //                    htos: 3,	//  	"		"		"
     //                }
     //                // recommended: replace "*" with "https://my.gamedomain.com" after initial tests
     //                e.source.postMessage("loadOptions=" + JSON.stringify(options2), "*");
     //                return;
     //            }
     //            adStatusCallback(e.data);
     //        }, false);

	  	//beginning state
	  	guessedwords = gon.guessedwords;
	  	if (guessedwords === null) {guessedwords = [];}
	  	guessstatus = gon.guessstatus
	  	var gamespoiled = gon.spoiler;
	  	var currenthint = hintword1;
	  	var currenthintnum = hintnum1;
	  	if (guessstatus.split(",")[0] === "hint2") {
	  		currenthint = hintword2;
	  		currenthintnum = hintnum2;
	  	} else if (guessstatus.split(",")[0] === "hint3") {
	  		currenthint = hintword3;
	  		currenthintnum = hintnum3;
	  	} else if (guessstatus == "bonus,hint2") {
	  		currenthint = hintword2;
	  		currenthintnum = hintnum2;
	  	} else if (guessstatus == "bonus,hint3") {
	  		currenthint = hintword3;
	  		currenthintnum = hintnum3;
	  	}
	  	var correctwordsguessed = [];
	  	var correctwordshint1 = gon.wordsh1;
	  	var correctwordshint2 = gon.wordsh2;
	  	var correctwordshint3 = gon.wordsh3;
	  	for (var i = 0; i < guessedwords.length; i++) {
	  		if (twords.indexOf(guessedwords[i]) !== -1) {
	  			correctwordsguessed.push(guessedwords[i]);
	  		}
	  	}
	  	var playerscore = gon.playerscore;
	  	var notifytimeout;
	  	var heartstatus = gon.heartstatus;
			if (heartstatus === 1) {
				$(".giveheart").hide();
				$(".removeheart").css("display", "inline-block");
			}
			
			if (pupspoilerstatus.length === 1) {
				setTimeout(function() {
					$(".pupspoilershow").fadeIn().addClass("show4").addClass("pos-" + pupspoilerstatus[0]);
				}, 1500)
			} else if (pupspoilerstatus.length === 2) {
				$(".pup_spoilerdetect").removeClass("pupactive").addClass("pupnotactive");
				setTimeout(function() {
					$(".pupspoilershow").fadeIn().addClass("show2").addClass("pos-" + pupspoilerstatus[1]);
				}, 1500)
			}

			$(document).on("click", ".giveheart", function() {
				$.ajax({
	        url: "/games/addheart",
	        type: "POST",
	        dataType:'json',
	        data: { 'game_id' : parseInt(gameid),
	                'heartgiven' : 1 }
	      })
	        .done(function() {
	        	var wrapper = $('.allguesserinfo');
						wrapper.load(pathname + " .allguesserinfo", function() {
						  wrapper.children('.allguesserinfo').unwrap();
						  GuessFuncDuring.seeguessesafter(); 
						  $(".giveheart").hide();
						  $(".removeheartsuccess").css("display", "none");
	        		$(".giveheartsuccess").css("display", "inline-block");
						  setTimeout(function() {
		        		$(".giveheartsuccess").fadeOut( function() {
		        			$(".removeheart").show();
		        		});
		        	}, 1500);
						});
	        })
	        .fail(function() {
	        	connectionError();
	        })
			})

			$(document).on("click", ".removeheart", function() {
				$.ajax({
	        url: "/games/removeheart",
	        type: "POST",
	        dataType:'json',
	        data: { 'game_id' : parseInt(gameid),
	                'heartgiven' : 0 }
	      })
	        .done(function() {
	        	var wrapper = $('.allguesserinfo');
						wrapper.load(pathname + " .allguesserinfo", function() {
						  wrapper.children('.allguesserinfo').unwrap();
						  GuessFuncDuring.seeguessesafter();
						  $(".giveheart").hide();
						  $(".removeheart").hide();
						  $(".giveheartsuccess").css("display", "none");
	        		$(".removeheartsuccess").css("display", "inline-block");
						  setTimeout(function() {
		        		$(".removeheartsuccess").fadeOut(function() {
		        			$(".giveheart").show();
		        		});
		        	}, 1500);
						});
	        })
	        .fail(function() {
	        	connectionError();
	        })
			})
	  	boardupdate(0, "true", 0);

	  	//board setup/update
	  	function boardupdate(endgametime, firstload, scoreadd) {
	  		$("body").css("pointer-events", "none");
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
		  	playerscore = playerscore + scoreadd;
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
		  		$(".skip1").text("See final hint!");
		  		$(".hintheadline").text("Second hint")
		  	} else if (currenthint === hintword3) {
		  		$(".skip1").text("End game now!");
		  		$(".hintheadline").text("Final hint")
		  	}
		  	$(".streakwarn").hide();

		  	if (guessstatus === "bonus,hint2") {
		  		$(".hintheadline").text("Bonus! Try one more?")
		  		$(".guessword").hide();
		  		$(".guessnum").text("The first two hints were " + hintword1 + "(" + hintnum1 + ") and " + hintword2 + 
		  			"(" + hintnum2 + ").");
		  		$(".streakwarn").show();
		  	}

		  	if (guessstatus === "bonus,hint3") {
		  		$(".hintheadline").text("Bonus! Try one more?")
		  		$(".guessword").hide();
		  		$(".guessnum").text("All hints: " + hintword1 + "(" + hintnum1 + ") and " + hintword2 + 
		  			"(" + hintnum2 + ") and " + hintword3 + "(" + hintnum3 + ")");
		  		$(".streakwarn").show();
		  	}
		  	
		  	if (guessstatus === "over,over") {
		  		// if (playerscore < 50) {
		  		// 	$(".giveheart").remove();
		  		// }
		  		$(".bighint").html("");
		  		var sstext = $(".scoreSection").html();
		  		$(".bighint").html(sstext);
		  		$(".scoreSection").remove();
		  		$(".hintheadline").remove();
		  		$(".hintlabel").remove();
		  		$(".giveravatar").remove();
		  		$(".skip1").remove();
		  		$("[data-guessword]").addClass("guessedword").addClass("neutralword");
		  		for (var i = 0; i < twords.length; i++) {
		  			$("[data-guessword='" + twords[i] + "']").removeClass("neutralword").addClass("targetword");
		  		}
		  		$("[data-guessword='" + bword + "']").removeClass("neutralword").addClass("badword");
		  		if (gamespoiled === 1) {
			  		playerscore = 0;
			  	}
			  	$(".streakwarn").hide();
			  	setTimeout(function() {
			  		$(".hintheading").remove();
			  		$(".submitted").removeClass("hidden");
			  		for (var i = 0; i < guessedwords.length; i++) {
				  		$("[data-guessword='" + guessedwords[i] + "']").addClass("finalguessesshow");
				  	}
				  	if (gamespoiled === 0 && endgametime !== 0) {
				  		gameovergoodsfx.play();
				  	}
				  	if (gon.signedin === true) {
				  		$(".finalpoints" + guessernum).text(playerscore + "pts");
				  	}
				  	$(".allguesserinfo").addClass("underwayforgiver");
				  	$(".playedgameover").show();
				  	$(".pupspoilershow").fadeOut();
				  }, endgametime);
		  	}
		  	//ajax call to update db
		  	if (firstload !== "true" && gon.signedin === true) {
			  	$.ajax({
		        url: "/games/updategame",
		        type: "POST",
		        dataType:'json',
		        data: { 'game_id' : parseInt(gameid),
		                'guessedwords' : guessedwords,
		                'guessstatus' : guessstatus,
		                'gamespoiled' : gamespoiled,
		                'gamescore' : playerscore,
		                'hint1words' : correctwordshint1,
		                'hint2words' : correctwordshint2,
		                'hint3words' : correctwordshint3 }
		      })
		        .done(function(data) {
		        	$("body").css("pointer-events", "all");
		        	if ($(".chatcontent").length === 0) {
		        		showChat();
		        	}
		        	if (guessstatus === "over,over") {
		        		console.log("game is over, should load stuff")
		        		var wrapper = $('.allguesserinfo');
		        		setTimeout(function() {
		        			wrapper.load(pathname + " .allguesserinfo", function() {
									  wrapper.children('.allguesserinfo').unwrap();
									  GuessFuncDuring.seeguessesafter();
									});
		        		}, 600)

		        		// trophy show!
		        		gotfeats = data.returnedfeats;
		        		gotfeats = gotfeats.filter(feat => feat.length > 0)
		        		console.log(gotfeats)
		        		if (gotfeats.length > 0) {
		        			setTimeout(function() {
			        			$("body").append('<div class="pagecovertrophies"></div>');
			        		
			        			var trophydata = {
			        			 "guessin500" : "Guess in 500 Games,,+150,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_028.png",
										 "guessin250" : "Guess in 250 Games,,+70,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_023.png",
										 "guessin150" : "Guess in 150 Games,,+60,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_018.png",
										 "guessin100" : "Guess in 100 Games,,+40,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_013.png",
										 "guessin50" : "Guess in 50 Games,,+30,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_009.png",
										 "guessin20" : "Guess in 20 Games,,+30,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_007.png",
										 "guessin6" : "Guess in 6 Games,,+20,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_003.png",
										 "guessin3" : "Guess in 3 Games,,+10,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_001.png",
										 "scoretwohundred" : "You Scored 200+!,,+300,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_029.png",
										 "scorehundred100" : "You Scored 100+,100x,+100,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_025.png",
										 "scorehundred50" : "You Scored 100+,50x,+60,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_020.png",
										 "scorehundred20" : "You Scored 100+,20x,+40,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_015.png",
										 "scorehundred5" : "You Scored 100+,5x,+30,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_010.png",
										 "scorehundred1" : "You Scored 100+,1x,+20,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_004.png",
										 "nospoil60" : "No-Spoiler Streak,60,+250,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_027.png",
										 "nospoil40" : "No-Spoiler Streak,40,+100,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_022.png",
										 "nospoil25" : "No-Spoiler Streak,25,+70,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_017.png",
										 "nospoil12" : "No-Spoiler Streak,12,+50,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_012.png",
										 "nospoil6" : "No-Spoiler Streak,6,+20,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_006.png",
										 "allsix100" : "You Got All Six,100x,+100,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_024.png",
										 "allsix50" : "You Got All Six,50x,+60,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_019.png",
										 "allsix20" : "You Got All Six,20x,+40,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_014.png",
										 "allsix5" : "You Got All Six,5x,+30,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_008.png",
										 "allsix1" : "You Got All Six,1x,+20,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_002.png",
										 "perfect60" : "You had Perfect Game,60x,+100,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_026.png",
										 "perfect30" : "You had Perfect Game,30x,+60,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_021.png",
										 "perfect12" : "You had Perfect Game,12x,+40,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_016.png",
										 "perfect3" : "You had Perfect Game,3x,+30,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_011.png",
										 "perfect1" : "You had Perfect Game,1x,+20,https://s3-us-west-2.amazonaws.com/wordstretch/awards/obj_guesser_medal_005.png"
										}
										if (gotfeats.length === 1) {
											var trophytext = "Trophy Received!"
										} else {
											var trophytext = "Trophies Received!"
										}
										$("body").append('<div class="featpopin">' + trophytext + '<span class="clicktrophy">Click trophy to continue</span></div>');
										trophyshow.play()
										var flyintime = 400;
										for (var i = 0; i < gotfeats.length; i++) {
											(function(i) {
												var thetime = (gotfeats.length - 1 - i) * flyintime;
												var theoffset = i;
												var thedata = trophydata[gotfeats[i]];
												var fulltext = thedata.split(",")[0];
												var multi = thedata.split(",")[1];
												var pnts = thedata.split(",")[2];
												var imgurl = thedata.split(",")[3];
												setTimeout(function(i) {
													
													$(".featpopin").append('<span class="popinfeat trophyflyin trophyoffset' + theoffset + '">' +
													                      '<div class="popinimg"><img src="' + imgurl + '"></div>' +
																							  '<div class="popindesc">' + fulltext + '</div>' +
																								'<span class="popinmult">' + multi.replace("x", " times") + '</span>' +
																								'<span class="popinpoints">' + pnts + ' feat points!</span></span>')
													wordshow3.play();
												}, thetime)
											})(i)
										}
										$(document).on("click", ".popinfeat", function() {
											function cardflyoff(card) {
												$(card).removeClass("trophyflyin").addClass("trophyflyout");
											}
											wordshow8.on("play", cardflyoff(this));
											wordshow8.play();
											if ($(".trophyflyin").length === 0) {
												setTimeout(function() {
													$(".pagecovertrophies").remove();
													$(".featpopin").remove();
												},1000)
											}
											
										})
									}, 4500)
								}
		        	}
		        })
		        .fail(function() {
		        	connectionError();
		        	$("body").css("pointer-events", "all");
		        })
		     } else {
		     	$("body").css("pointer-events", "all");
		     }
		  }

	  	$(document).on("click", ".firstclick", function() {
	  		var selected = $(this).data("guessword");
	  		clearTimeout(notifytimeout);
	  		$(".word").removeClass("unselected");
	  		$(".word").addClass("firstclick");
	  		$(".clickagain").removeClass("wordsubmitanim");
	  		//$(document).off("click", ".reallysubmit");
	  		$(".reallysubmit").removeClass("reallysubmit");
	  		$(this).find(".clickagain").addClass("wordsubmitanim");
	  		$(this).addClass("reallysubmit").removeClass("firstclick");
	  		$(".firstclick").addClass("unselected");
	  	})
	  	$(document).on("click", ".reallysubmit", function() {
	  		var selected = $(this).data("guessword");
				guessoutcome(selected);
				$(".clickagain").removeClass("wordsubmitanim");
  			$(".reallysubmit").removeClass("reallysubmit");
  			$(".word").removeClass("unselected");
			})

	  	$(document).on("click", ".gametop, .hintheading", function() {
	  		$(".word").addClass("firstclick");
	  		//$(document).off("click", ".firstclick");
	  		//$(".clickagain").removeClass("wordsubmitanim");
	  		//$(".reallysubmit").removeClass("reallysubmit");
	  		$(".clickagain").removeClass("wordsubmitanim");
	  		$(".reallysubmit").removeClass("reallysubmit");
	  		$(".word").removeClass("unselected");
	  	})

	  	function guessoutcome(chosen) {
	  		$(".guessword").show();
	  		var scoretoadd = 0;
	  		var inarowmsg = "";
	  		guessedwords.push(chosen);
	  		$(".clickagain").removeClass("wordsubmitanim");
	  		$(".reallysubmit").removeClass("reallysubmit");
	  		// correct word 
	  		if (twords.indexOf(chosen) !== -1) {
	  			correctwordsguessed.push(chosen);
	  			if (currenthint === hintword1) {
	  				correctwordshint1.push(chosen);
	  				scoretoadd = scoring[correctwordshint1.length];
	  				inarowmsg = scoringrow[correctwordshint1.length];
	  			}
	  			if (currenthint === hintword2) {
	  				correctwordshint2.push(chosen);
	  				scoretoadd = scoring[correctwordshint2.length];
	  				inarowmsg = scoringrow[correctwordshint2.length];
	  			}
	  			if (currenthint === hintword3) {
	  				correctwordshint3.push(chosen);
	  				scoretoadd = scoring[correctwordshint3.length];
	  				inarowmsg = scoringrow[correctwordshint3.length];
	  			}
	  			if (guessstatus.split(",")[0] === "bonus") {
	  				scoretoadd = 5;
	  				inarowmsg = "";
	  			}
	  			if (correctwordsguessed.length === 6) {
	  				var gmtext = "You got all six words! Very difficult to do... Well done!";
	  				$(".gamenotify").html(gmtext);
	  				resultscheersfx.play();
						shownotification(gmtext);
						scoretoadd+= 25;
						guessstatus = "over,over";
					} else if (currenthint === hintword1 && correctwordshint1.length === currenthintnum) {
	  				// $(".gamenotify").html("You found all the words for the first hint! On to the second hint...");
	  				var gmtext = "";
	  				$(".gamenotify").hide();
						//shownotification(gmtext);
						roundannounce(".raRound1toRound2");
						currenthint = hintword2;
	  				currenthintnum = hintnum2;
	  				guessstatus = "hint2,word1";
	  			} else if (currenthint === hintword2 && correctwordshint2.length === currenthintnum && correctwordshint1.length < hintnum1) {
	  				// $(".gamenotify").html("You found all the words for the second hint! Try for one bonus word?");
	  				var gmtext = "";
	  				$(".gamenotify").hide();
						//shownotification(gmtext);
						roundannounce(".raBonusstart", 1000, "bonusstart");
	  				guessstatus = "bonus,hint2";
	  			} else if (currenthint === hintword2 && correctwordshint2.length === currenthintnum) {
	  				// $(".gamenotify").html("You found all the words for the first two hints! On to the final hint...");
	  				var gmtext = "";
	  				$(".gamenotify").hide();
						//shownotification(gmtext);
						roundannounce(".raRound2toRound3");
	  				currenthint = hintword3;
	  				currenthintnum = hintnum3;
	  				guessstatus = "hint3,word1";
	  			} else if (currenthint === hintword3 && correctwordshint3.length === currenthintnum) {
	  				// $(".gamenotify").html("You found all the words for the last hint! Try for one bonus word?");
	  				var gmtext = "";
	  				$(".gamenotify").hide();
						//shownotification(gmtext);
						roundannounce(".raBonusstart", 1000, "bonusstart");
	  				guessstatus = "bonus,hint3";
	  			} else if (guessstatus === "bonus,hint2") {
						// $(".gamenotify").html("You picked up a bonus word. On to the third hint...");
						var gmtext = "";
	  				$(".gamenotify").hide();
						//shownotification(gmtext);
						roundannounce(".raBonustoRound3");
						currenthint = hintword3;
	  				currenthintnum = hintnum3;
	  				guessstatus = "hint3,word1";
	  			}  else if (guessstatus === "bonus,hint3") {
	  				var gmtext = "You picked up a bonus word. Great way to end the game!";
						$(".gamenotify").html(gmtext);
						shownotification(gmtext);
	  				guessstatus = "over,over";
	  			} else if (correctwordsguessed.length < 6) {
	  				var gmtext = "is one of the six words you're looking for!";
	  				$(".gamenotify").html(chosen + " is one of the six words you're looking for! " + 
							keepitup[Math.floor(Math.random() * keepitup.length)]);
						shownotification(gmtext);
					} 
					$('[data-guessword="' + chosen + '"]').find("div.anim_correct").text("+" + scoretoadd);
					$('[data-guessword="' + chosen + '"]').find("div.anim_correct.inarow").text(inarowmsg);
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
					boardupdate(3500, "false", scoretoadd);
	  		}
	  		// bad word
	  		if (bword === chosen) {
	  			$(".gamenotify").html('Oh no! ' + chosen + ' was the "Spoiler". Game over and all points lost.');
					shownotification("oh no...");
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
  				boardupdate(3500);
	  		}
	  		// neutral word
	  		if (twords.indexOf(chosen) === -1 && bword !== chosen) {
	  			if (currenthint === hintword1) {
	  				// $(".gamenotify").html(chosen + " was not one of the target words. " + 
	  				// 	"Moving on to the second hint...");
						var gmtext = "";
	  				$(".gamenotify").hide();
						//shownotification(gmtext);
						roundannounce(".raRound1toRound2");
						currenthint = hintword2;
	  				currenthintnum = hintnum2;
	  				guessstatus = "hint2,word1";
	  			} else if (guessstatus === "bonus,hint3") {
	  				$(".gamenotify").html(chosen + " was not one of the target words. " + 
	  					"Game over.");
						shownotification("was not one");
						guessstatus = "over,over";
					} else if (guessstatus === "bonus,hint2") {
	  				// $(".gamenotify").html(chosen + " was not one of the target words. " + 
	  				// 	"Moving on to the final hint...");
						var gmtext = "";
	  				$(".gamenotify").hide();
						//shownotification(gmtext);
						roundannounce(".raBonustoRound3");
						currenthint = hintword3;
	  				currenthintnum = hintnum3;
						guessstatus = "hint3,word1";
					} else if (currenthint === hintword2) {
	  				// $(".gamenotify").html(chosen + " was not one of the target words. " + 
	  				// 	"Moving on to the final hint...");
						var gmtext = "";
	  				$(".gamenotify").hide();
						//shownotification(gmtext);
						roundannounce(".raRound2toRound3");
						currenthint = hintword3;
	  				currenthintnum = hintnum3;
						guessstatus = "hint3,word1";
					} else if (currenthint === hintword3) {
	  				$(".gamenotify").html(chosen + " was not one of the target words. " + 
	  					"Game over.");
						shownotification("game over");
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
					boardupdate(3500, "false", 0);
	  		}
	  	}

	  	$(".skip1").click(function() {
	  		$(".messagetitle").text("Skip hint?")
				$(".messageinfo").html("Do you really want to skip this hint?");
				$(".messageaction").html('<button class="button reallyskip">Skip</button>' +
					                       '<button class="button closemessagebox">Cancel</button>');
				$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.");
				$(".reallyskip").click(function() {
					forrealskip();
					closemessagebox();
				})
				$(".closemessagebox").click(function() { closemessagebox(); return false; });
				$(".pagecover").not(".unclickable").click(function() { closemessagebox(); return false; });
				$(".messagebox").show();
				$(".pagecover").show();
	  		function forrealskip() {
	  			$(".guessword").show();
		  		if (currenthint === hintword1) {
		  			roundannounce(".raSkiphint", 5);
		  			currenthint = hintword2;
	  				currenthintnum = hintnum2;
	  				guessstatus = "hint2,word1";
		  		} else if (currenthint === hintword2) {
		  			roundannounce(".raSkiphint", 5);
		  			currenthint = hintword3;
	  				currenthintnum = hintnum3;
	  				guessstatus = "hint3,word1";
		  		} else {
		  			guessstatus = "over,over";
		  		}
		  		boardupdate(0, "false", 0);
	  		}
	  	});

	  	function shownotification(text) {
	  		if (text.length > 1) {
		  		$(".gamenotify").show();
					notifytimeout = setTimeout(function() {
		  			$(".gamenotify").hide();
		  		}, 3500)
				}
	  	}
	  	var ratimeout, raanimall, raanim1, raanim2, raanim3;

	  	function roundannounce(container, delay, status) {
	  		$(".hintlabel").css("opacity", "0");
	  		if (!delay) { delay = 1000 }
	  			$(".bighint").css("visibility", "hidden");
	  		if (status !== "bonusstart") {
	  			$(".bighint").addClass("bh_initial");
	  		} else { // it's a bonus round
	  		  setTimeout(function() {
	  		  	bonusstartsfx.play();
	  		  }, delay + 360)
	  		}
	  		raanimall = setTimeout(function() {
	  			$(".roundannounce").fadeIn(75, function() {
						$(container).find(".ra_anim1").removeClass("raa1_initial");
						raanim1 = setTimeout(function() {
							$(container).find(".ra_anim1").addClass("raa1_final");
						}, 1500)
						// raanim3 = setTimeout(function() {
						// 	$(container).find(".ra_anim2").addClass("raa2_final");
						// }, 2720)
					});
	  		}, delay)
				$(container).removeClass("hidden");
				ratimeout = setTimeout(function() {
	  			$(".roundannounce").fadeOut(75, function() {
	  				$(".bighint").css("visibility", "visible").removeClass("bh_initial");
	  				$(".hintlabel").css("opacity", "1");
	  				$(".roundannounce div").addClass("hidden");
	  				$(".ra_anim1").removeClass("raa1_final").addClass("raa1_initial");
	  				$(".ra_anim2").removeClass("raa2_final").addClass("raa2_initial");
	  			});
					$(".roundannounce div").addClass("hidden");
	  		}, delay + 1800)
	  	}

	  	// $(".roundannounce").click(function() {
	  	// 	clearTimeout(ratimeout);
	  	// 	clearTimeout(raanimall);
	  	// 	clearTimeout(raanim1);
	  	// 	clearTimeout(raanim2);
	  	// 	clearTimeout(raanim3);
	  	// 	$(".roundannounce").fadeOut(125, function() {
	  	// 		$(".roundannounce div").addClass("hidden");
	  	// 		$(".ra_anim1").removeClass("raa1_final").addClass("raa1_initial");
	  	// 		$(".ra_anim2").removeClass("raa2_final").addClass("raa2_initial");
	  	// 	});
	  	// })


	  	$(".thumbdown").click(function() {
	  		$(".menubox").hide();
	  		$(".messagetitle").text("Report game?")
				$(".messageinfo").html("If this game uses hints you consider to be cheating or offensive, " +
					"feel free to report it. If half of the players in the game (3) report the game, it will be deleted. " +
					"<br>Current reports: " + gon.currentcheatnum);
				$(".messageaction").html('<button class="button reportacheat">Report the Game</button>' +
					                       '<button class="button closemessagebox">Cancel</button>');
				$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.");
				$(".reportacheat").click(function() {
					guessingreportgame();
					closemessagebox();
				})
				$(".closemessagebox").click(function() { closemessagebox(); });
				$(".pagecover").not(".unclickable").click(function() { closemessagebox(); });
				$(".messagebox").show();
				$(".pagecover").show();
			});

			function guessingreportgame() {
				$.ajax({
		      url: "/games/guessingreportgame",
		      type: "POST",
		      dataType:'json',
		      data: { 'game_id' : parseInt(gameid)},
		      statusCode: {
				    666: function() {
				      location.href = '/main';
				    },
				    200: function() {
				      var wrapper = $('.cheatstatus');
							wrapper.load(pathname + " .cheatstatus", function() {
							   wrapper.children('.cheatstatus').unwrap();
							});
				    },
				  }
		    })
		    // .fail(function() {
		    // 	connectionError();
		    // })
			}
			function loadWrapper(container) {
				var wrapper = $(container);
				wrapper.load(pathname + " " + container, function() {
				   wrapper.children(container).unwrap();
				});
			}

			// powerups
			$(document).on("click", ".pup_spoilerdetect.pupactive", function() {
				pupspoilerused++
				if (pupspoilerused <= 2) {
					var indtmp = $("[data-guessword='" + bword + "']").index(".word")
					var inbw = (indtmp * indtmp) + 11;
					$.ajax({																																																																																																																																																																																															
			      url: "/games/decreasepupspoiler",
			      type: "POST",
			      dataType:'json',
			      data: { 'game_id' : parseInt(gameid),
			    					'indbw' : inbw }
			    })
					.done(function(data) {
			    	loadWrapper(".pupcontainer");
			    	if (data.firstorsecond === "bothdone") {
			    		$(".pagecover").show();
							$(".menudialog").show();
			    	} else {
			    		$(".pupspoilershow").fadeIn().addClass(data.firstorsecond).addClass("pos-" + data.newloc);
			    		if (data.firstorsecond === "show2") {
			    			$(".pup_spoilerdetect").removeClass("pupactive").addClass("pupnotactive")
			    		}
			    		usespoilerpup.play();
			    	}
			    })
				} else {
					$(".pup_spoilerdetect").removeClass("pupactive").addClass("pupnotactive")
					$(".pupnotactive").click();
				}
			})

			$(".watchforpupspoilers").click(function() {
				runspoilersad();
			})

			$(document).on("click", ".pup_spoilerdetect.pupnotactive", function() {
				if ($(".spoilerzero").length > 0) {  //pupspoilerused <= 2 && 
					console.log("DO THE VIDEO FOR SPOILERS HERE")
					$(".watchforpupneutrals").hide();
					$(".watchforpupspoilers").hide();
					$(".pagecover").show().addClass("unclickable");
					$(".menudialogwatch").show();
					$(".watchforpupspoilers").show();
				} else {
					$(".pagecover").show();
					$(".menudialog.menudialogspoiler").show();
					pupout.play();
				}
			})

			var nonneutralwords = [];
			nonneutralwords = nonneutralwords.concat(twords);
			nonneutralwords.push(bword);

			var nwords = awords.filter(function(n) {return nonneutralwords.indexOf(n) === -1});
			// console.log("nwords: " + nwords)

			function picktworandoms(largest) {
				var tworands = []
				function randomnum(largest) {
					var rand = Math.floor(Math.random() * (largest + 1));
					if (tworands.indexOf(rand) === -1) { 
						tworands.push(rand)
						if (tworands.length < 2) {
							randomnum(largest);
						} 
					} else {
						randomnum(largest);
					}
				}
				randomnum(largest);
				return tworands
			}

			$(document).on("click", ".pup_tworemove.pupactive", function() {
				pupneutralused++
				if (pupneutralused <= 2) {
					var possibles = [];
					var wordspicked = [];
					$(".word").not(".guessedword").each(function() {
						if (nwords.indexOf($(this).attr("data-guessword")) !== -1) {
							possibles.push($(this).attr("data-guessword"));
						}
					})
					// console.log("possibles: " + possibles)
					var twonumpicked = picktworandoms(possibles.length - 1);
					wordspicked.push(possibles[twonumpicked[0]])
					wordspicked.push(possibles[twonumpicked[1]])
					// console.log("wordspicked: " + wordspicked)
					
					$.ajax({
			      url: "/games/decreasepuptworemove",
			      type: "POST",
			      dataType:'json',
			      data: { 'game_id' : parseInt(gameid),
			    					'neutralsshown' : wordspicked }
			    })
					.done(function(data) {
						$("[data-guessword='" + wordspicked[0] + "']").removeClass("firstclick")
																						.addClass("anim_puppneutral").addClass("pupelimword")
																						.addClass("guessedword");
						useneutralspup.play();
						setTimeout(function() {
							$("[data-guessword='" + wordspicked[1] + "']").removeClass("firstclick")
																					.addClass("anim_puppneutral").addClass("pupelimword")
																					.addClass("guessedword");
						useneutralspup.play();
						}, 500)
						guessedwords = guessedwords.concat(wordspicked);
			    	// console.log("user pup decreased")
			    	loadWrapper(".pupcontainer")
			    })
			    .fail(function() {
			    	console.log("sorry, internet connection required to use powerups")
			    })
				} else {
					$(".pup_tworemove").removeClass("pupactive").addClass("pupnotactive")
					$(".pupnotactive").click();
				}
			})

			$(".watchforpupneutrals").click(function() {
				runneutralad();
			})

			$(document).on("click", ".pup_tworemove.pupnotactive", function() {
				if ($(".neutralzero").length > 0) {  //pupspoilerused <= 2 && 
					console.log("DO THE VIDEO FOR NEUTRALS HERE")
					$(".watchforpupneutrals").hide();
					$(".watchforpupspoilers").hide();
					$(".pagecover").show().addClass("unclickable");
					$(".menudialogwatch").show();
					$(".watchforpupneutrals").show();
				} else {
					$(".pagecover").show();
					$(".menudialog.menudialogneutral").show();
					pupout.play();
				}
			})

			function runneutralad() {
				function neutralAdStatusCallback(status) {
					if (status) {console.log('Applixir status: ' + status);}

					if (status === "ad-blocker") {
						console.log("USER HAS AD-BLOCKER, ASK THEM TO DISABLE")
						$(".menudialogadblocker").show();
					}
					if (status === "ad-watched" || status === "fb-watched") {
						$.ajax({
				      url: "/games/increasepuptworemove",
				      type: "POST",
				      dataType:'json'
				    })
						.done(function() {
				    	console.log("user pup increased")
				    	loadWrapper(".pupcontainer")
				    })
				    .fail(function() {
				    	console.log("sorry, attempt to add neutral remove powerups failed")
				    })
						console.log("MAKE CALL TO SERVER, ADD NEUTRAL POWERUPS!")
					}
      		if (status === "sys-closing") {
      			$(".pagecoverunclickable").hide();
      			$(".pagecover").hide();
      		}
		    }

			  var adsound = false;
			  if (sound === 1) {
			  	adsound = true;
			  }

		    var options = {
	        zoneId: 2894,
	        devId: 3705,
	        gameId: 4932,
	        dMode: 1,       // dMode 1 for MD5 checksum 0 for no MD5 checksum
	        muted: adsound, // the player will start in muted mode/
	        fallback: 1,
					// the player will start normally with no muted option
					//vpos: 'top',
	        adStatusCb: neutralAdStatusCallback,
	        //z2url: document.location.origin + '/games/applixir.iframe.html',
		    };
		    $(".menudialogwatch").hide();
				invokeApplixirVideoUnit(options);
				$(".pagecoverunclickable").show();
			}

			function runspoilersad() {
				function spoilerAdStatusCallback(status) {
					if (status) {console.log('Applixir status: ' + status);}

					if (status === "ad-blocker") {
						console.log("USER HAS AD-BLOCKER, ASK THEM TO DISABLE")
						$(".menudialogadblocker").show();
					}
					if (status === "ad-watched" || status === "fb-watched") {
						$.ajax({
				      url: "/games/increasepupspoiler",
				      type: "POST",
				      dataType:'json'
				    })
						.done(function() {
				    	console.log("user spoiler pup increased")
				    	loadWrapper(".pupcontainer")
				    })
				    .fail(function() {
				    	console.log("sorry, attempt to add spoiler remove powerups failed")
				    })
						console.log("MAKE CALL TO SERVER, ADD SPOILER POWERUPS!")
					}
      		if (status === "sys-closing") {
      			$(".pagecoverunclickable").hide();
      			$(".pagecover").hide();
      		}
		    }

			  var adsound = false;
			  if (sound === 1) {
			  	adsound = true;
			  }

		    var options = {
	        zoneId: 2894,
	        devId: 3705,
	        gameId: 4932,
	        dMode: 1,       // dMode 1 for MD5 checksum 0 for no MD5 checksum
	        muted: adsound, // the player will start in muted mode/
	        fallback: 1,
					// the player will start normally with no muted option
					//vpos: 'top',
	        adStatusCb: spoilerAdStatusCallback,
	        //z2url: document.location.origin + '/games/applixir.iframe.html',
		    };
		    $(".menudialogwatch").hide();
				invokeApplixirVideoUnit(options);
				$(".pagecoverunclickable").show();
			}

	  })();
	}

	if ($(".allguesserinfo").hasClass("underwayforgiver")) {
		var UFG = (function() {
	  	seeguesses();
		})();
	}

	function seeguesses() {
		var awords = gon.allwords;
  	var twordstemp = gon.targetwords;
  	var twords = [];
  	for (var i = 12; i < 18; i++) {
  		twords.push(awords[twordstemp[i]])
  	}
  	var bwordtemp = gon.badword;
  	var bword = awords[bwordtemp[8]];
  	var hintword1 = gon.hintword1;
  	var hintword2 = gon.hintword2;
  	var hintword3 = gon.hintword3;
  	var hintnum1 = gon.hintnum1;
  	var hintnum2 = gon.hintnum2;
  	var hintnum3 = gon.hintnum3;


  	var pl1words = gon.g1words;
  	var pl2words = gon.g2words;
  	var pl3words = gon.g3words;
  	var pl4words = gon.g4words;
  	var pl5words = gon.g5words;
  	var pl6words = gon.g6words;

  	$(".word").each(function() {
  		var word = $(this).attr("data-guessword");
  		if (twords.indexOf(word) !== -1) {
  			$(this).addClass("targetword");
  		} else if (bword === word) {
  			$(this).addClass("badword");
  		} // else {
  		// 	$(this).addClass("neutralword");
  		// }
  	})

		function showplayerwords(playernum, wordvar) {
  		$(".word").removeClass("guesser1show").removeClass("guesser2show").removeClass("guesser3show")
  		          .removeClass("guesser4show").removeClass("guesser5show").removeClass("guesser6show")
  		for (var i = 0; i < wordvar.length; i++) {
  			$('[data-guessword="' + wordvar[i] + '"]').addClass("guesser" + playernum + "show");
  		}
  	}

  	$(".guesser1").click(function() {
  		showplayerwords(1, pl1words);
  	});
  	$(".guesser2").click(function() {
  		showplayerwords(2, pl2words);
  	});
  	$(".guesser3").click(function() {
  		showplayerwords(3, pl3words);
  	});
  	$(".guesser4").click(function() {
  		showplayerwords(4, pl4words);
  	});
  	$(".guesser5").click(function() {
  		showplayerwords(5, pl5words);
  	});
  	$(".guesser6").click(function() {
  		showplayerwords(6, pl6words);
  	});
	}

	GuessFuncDuring = {
					  seeguessesafter: function() {
						$(".guesswordslist").addClass("guessednotdone");
						var gsrnum = gon.guessernum;
						var awords = gon.allwords;
				  	var twordstemp = gon.targetwords;
				  	var twords = [];
				  	for (var i = 12; i < 18; i++) {
				  		twords.push(awords[twordstemp[i]])
				  	}
				  	var bwordtemp = gon.badword;
				  	var bword = awords[bwordtemp[8]];
				  	var hintword1 = gon.hintword1;
				  	var hintword2 = gon.hintword2;
				  	var hintword3 = gon.hintword3;
				  	var hintnum1 = gon.hintnum1;
				  	var hintnum2 = gon.hintnum2;
				  	var hintnum3 = gon.hintnum3;

				  	pl1words = [];
				  	pl2words = [];
				  	pl3words = [];
				  	pl4words = [];
				  	pl5words = [];
				  	pl6words = [];

				  	pl1words = $(".guesser1").attr("data-gsrwords").split(",");
				  	pl2words = $(".guesser2").attr("data-gsrwords").split(",");
				  	pl3words = $(".guesser3").attr("data-gsrwords").split(",");
				  	pl4words = $(".guesser4").attr("data-gsrwords").split(",");
				  	pl5words = $(".guesser5").attr("data-gsrwords").split(",");
				  	pl6words = $(".guesser6").attr("data-gsrwords").split(",");

				  	$(".neutralword").removeClass("neutralword");

						function showplayerwords(playernum, wordvar) {
							$(".finalguessesshow").removeClass("finalguessesshow")
				  		$(".word").removeClass("guesser1show").removeClass("guesser2show").removeClass("guesser3show")
				  		          .removeClass("guesser4show").removeClass("guesser5show").removeClass("guesser6show")
				  		for (var i = 0; i < wordvar.length; i++) {
				  			$('[data-guessword="' + wordvar[i] + '"]').addClass("guesser" + playernum + "show");
				  		}
				  	}

				  	$(".guesser1").click(function() {
				  		showplayerwords(1, pl1words);
				  	});
				  	$(".guesser2").click(function() {
				  		showplayerwords(2, pl2words);
				  	});
				  	$(".guesser3").click(function() {
				  		showplayerwords(3, pl3words);
				  	});
				  	$(".guesser4").click(function() {
				  		showplayerwords(4, pl4words);
				  	});
				  	$(".guesser5").click(function() {
				  		showplayerwords(5, pl5words);
				  	});
				  	$(".guesser6").click(function() {
				  		showplayerwords(6, pl6words);
				  	});
				  	$(".guesser" + gsrnum).click();
				  	}
				  }
					//GuessFunc.seeguessesafter();
	
	// avatar customization
	$(document).on("click", ".titleavatar", function() {
		$(".avatarlink")[0].click();
	})

	if ($(".avatar-customize").length > 0) {
		var loaditems = $(".avatar-customize").data("usercomponents").split("-");

		for (var i = 0; i < loaditems.length; i++) {
			$("[data-avatarcomponent='" + loaditems[i] + "']").addClass("avactive");
		}
		$(".avactive").each(function() {
			var activecomp = $(this).attr("data-avatarcomponent");
			$(this).closest(".avatarpart").attr("data-activepart", activecomp);
		})

		var avatarpointshave = $(".avatar-customize").attr("data-featscore");
		$(".compitem").each(function() {
			var pointsneeded = $(this).attr("data-pointsneeded");
			if (parseInt(pointsneeded) > parseInt(avatarpointshave)) {
				$(this).addClass("avlocked");
			}
		})

		var currentpart = "";
		var currentcompindex = "";
		$(".partbuttons a").click(function(e) {
			e.preventDefault();
			if ($(".avatar_" + currentpart + " .avactive").hasClass("avlocked")) {
				$(".avatar_" + currentpart + " .avactive").removeClass("avactive");
				var originalpart = $(".avatar_" + currentpart).attr("data-activepart");
				$("[data-avatarcomponent='" + originalpart + "']").addClass("avactive");
			}
			$(".partbuttons a").removeClass("avpartactive");
			$(this).addClass("avpartactive");
			$(".avbutton-left").removeClass("hidden");
			$(".avbutton-right").removeClass("hidden");
			currentpart = $(this).attr("class").split("-")[1].replace(" avpartactive", "");
			currentcompindex = $(".avatar_" + currentpart + " .avactive").attr("data-compindex");
			$(".compindexshow").text(currentcompindex);
			$(".partlockedshow").addClass("hidden");
			$(".avbutton-save").removeClass("disabled");
		})

		$(".avbutton-left").click(function(e) {
			e.preventDefault();
			var comp = $(".avatar_" + currentpart + " .avactive").attr("data-avatarcomponent");
			$(".avatar_" + currentpart + " .compitem").removeClass("avactive");
			if ($("[data-avatarcomponent='" + comp + "']").prev(".compitem").length > 0) {
				$("[data-avatarcomponent='" + comp + "']").prev(".compitem").addClass("avactive");
			} else {
				$(".avatar_" + currentpart + " .compitem").last().addClass("avactive");
			}
			currentcompindex = $(".avatar_" + currentpart + " .avactive").attr("data-compindex");
			$(".compindexshow").text(currentcompindex);
			if ($(".avatar_" + currentpart + " .avactive").hasClass("avlocked")) {
				var theneeded = $(".avatar_" + currentpart + " .avactive").attr("data-pointsneeded");
				$(".partlockedshow").removeClass("hidden");
				$(".partlockedshow span").html(theneeded + " Feat Score<br><span class='youhavetext'>(You have " + avatarpointshave
					+ ")</span>")
				$(".avbutton-save").addClass("disabled");
			} else {
				$(".partlockedshow").addClass("hidden");
				$(".avbutton-save").removeClass("disabled");
			}
		})
		$(".avbutton-right").click(function(e) {
			e.preventDefault();
			var comp = $(".avatar_" + currentpart + " .avactive").attr("data-avatarcomponent");
			$(".avatar_" + currentpart + " .compitem").removeClass("avactive");
			if ($("[data-avatarcomponent='" + comp + "']").next(".compitem").length > 0) {
				$("[data-avatarcomponent='" + comp + "']").next(".compitem").addClass("avactive");
			} else {
				$(".avatar_" + currentpart + " .compitem").first().addClass("avactive");
			}
			currentcompindex = $(".avatar_" + currentpart + " .avactive").attr("data-compindex");
			$(".compindexshow").text(currentcompindex);
			if ($(".avatar_" + currentpart + " .avactive").hasClass("avlocked")) {
				var theneeded = $(".avatar_" + currentpart + " .avactive").attr("data-pointsneeded");
				$(".partlockedshow").removeClass("hidden");
				$(".partlockedshow span").html(theneeded + " Feat Score<br><span class='youhavetext'>(You have " + avatarpointshave
					+ ")</span>")
				$(".avbutton-save").addClass("disabled");
			} else {
				$(".partlockedshow").addClass("hidden");
				$(".avbutton-save").removeClass("disabled");
			}
		})

		$(".avbutton-save").click(function(e) {
			e.preventDefault();
			var newpartarray = []
			$(".avatarpart").each(function() {
				var newactive = $(this).find(".compitem.avactive").attr("data-avatarcomponent");
				newpartarray.push(newactive);
			})
			var aboutmestring = $("#aboutme").val();
			var newpartstring = newpartarray.join("-");
			$(".avatar-customize").attr("data-usercomponents", newpartstring);
			$.ajax({
	      url: "/pages/updateavatar",
	      type: "POST",
	      dataType:'json',
	      data: { 'avstring' : newpartstring,
	              'aboutme' : aboutmestring}
	    })
	    .done(function() {
	    	$(".compindexshow").text("Saved!");
	    })
	    .fail(function() {
	    	connectionError();
	    })
		})

		$(".avbutton-random").click(function(e) {
			e.preventDefault();
			$(".partlockedshow").addClass("hidden");
			$(".compindexshow").text("");
			$(".compitem").removeClass("avactive")
			$(".avatarpart").each(function() {
				var possnum = $(this).find(".compitem").not(".avlocked").length;
				var possran = Math.floor(Math.random() * possnum);
				$(this).find(".compitem").not(".avlocked").eq(possran).addClass("avactive");
				var newactive = $(this).find(".compitem").not(".avlocked").eq(possran).attr("data-avatarcomponent");
				$(this).attr("data-activepart", newactive);
			})
			$(".avbutton-save").removeClass("disabled");
		})

	}
	
}

$(document).ready(ready);
//$(document).on('turbolinks:load', ready);