var ready=function(){function e(){$(document).on("click",".chatopenbutton",function(){t(),"open"===$(".chatbox").attr("data-chatopen")?(clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed")):(refreshingChat=setInterval(t,5e3),$(".chatbox").attr("data-chatopen","open")),$(".chatbox").slideToggle(200),$(".chatenter").focus(),$.ajax({url:"/games/resetchatnotify",type:"POST",dataType:"json",data:{game_id:p}}),$(".unreadchats").text("")}),$(document).on("click",".messageenter",function(){var e=$(".chatenter").val();""!==e&&$.ajax({url:"/games/entermessage",type:"POST",dataType:"json",data:{message:e,game_id:p}}),$(".chatenter").val(""),t()})}function t(){var e=$(".chatcontent");e.load(v+" .chatcontent",function(){e.children(".chatcontent").unwrap()})}function a(){$(document).off("click",".chatopenbutton"),$(document).off("click",".messageenter");var t=$(".chatarea");t.load(v+" .chatarea",function(){t.children(".chatarea").unwrap()}),e()}function o(e){0===e?($(".soundon").text("Turn Sound On"),Howler.mute(!0)):($(".soundon").text("Turn Sound Off"),Howler.mute(!1))}function n(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),o=e[t];e[t]=e[a],e[a]=o}return e}function s(e){setTimeout(function(){$(".word").eq(_[e]).removeClass("shrunken")},S+110)}function i(e,t){var a=/^[a-zA-Z\s]+$/,o=e.trim().split(/\s+/).length;return 0===e.length?(r("Please enter a hint word."),!1):e.length>28?(r("Please keep hint shorter than 29 characters. Reminder: just give one word or two words if it's somebody's name."),!1):e.match(a)?o>1?(r("Please make sure your hint is one word only."),!1):0===t?(r("Please select a number of words this hint applies to."),!1):void 0:(r("Please make sure your hint contains letters only."),!1)}function r(e){$(".messagetitle").text("Oopies!"),$(".messageinfo").text(e),$(".messageaction").html('<button class="button closemessagebox">Return to game</button>'),$(".messagesubtext").text("Push button or click anywhere outside this box to continue."),$(".closemessagebox").click(function(){g()}),$(".pagecover").click(function(){g()}),$(".messagebox").show(),$(".pagecover").show()}function d(){$.ajax({url:"/games/givingdeletegame",type:"POST",dataType:"json",data:{game_id:parseInt(p)}}).done(function(){location.href="/main"}).fail(function(){h()})}function l(e,t){if(1===t)var a="word";else a="words";$(".messagetitle").text("Submit Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+a+". Submit this hint and move to the next hint?"),$(".messageaction").html('<button class="button submithint1final">Submit Hint 1</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint1final").click(function(){$(".hint1").hide(),$(".firstinfoword").text(e),$(".firstinfonum").text(t+" "+a),$(".hint2").show(),g()}),$(".closemessagebox").click(function(){g()}),$(".pagecover").click(function(){g()}),$(".messagebox").show(),$(".pagecover").show()}function c(e,t){if(1===t)var a="word";else a="words";$(".messagetitle").text("Submit Second Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+a+". Submit this hint and move to the final hint?"),$(".messageaction").html('<button class="button submithint2final">Submit Hint 2</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint2final").click(function(){$(".hint2").hide(),$(".secondinfoword").text(e),$(".secondinfonum").text(t+" "+a),$(".hint3").show(),g()}),$(".closemessagebox").click(function(){g()}),$(".pagecover").click(function(){g()}),$(".messagebox").show(),$(".pagecover").show()}function u(e,t){if(1===t)var o="word";else var o="words";$(".messagetitle").text("Submit Final Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+o+". Submit final hint and let people play the game?"),$(".messageaction").html('<button class="button submithint3final">Submit - Ready for Players!</button><button class="button submitredo">Start Over</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submitredo").click(function(){$(".hint3").hide(),$(".hint1").show(),$(".hintenter").val(""),g()}),$(".submithint3final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(p),word1:b,word1num:P,word2:x,word2num:j,word3:y,word3num:I}}).always(function(){if(1===P)var e="word";else var e="words";if(1===j)var t="word";else var t="words";if(1===I)var o="word";else var o="words";$(".hint3").hide(),$(".hintheadline").hide(),$(".submittedword1").text(b),$(".submittednum1").text(P+" "+e),$(".submittedword2").text(x),$(".submittednum2").text(j+" "+t),$(".submittedword3").text(y),$(".submittednum3").text(I+" "+o),$(".submitted").show(),g(),0===$(".chatcontent").length&&a()})}),$(".closemessagebox").click(function(){g()}),$(".pagecover").click(function(){g()}),$(".messagebox").show(),$(".pagecover").show()}function h(){$("body").html("Please check your connection. Please reload game when you have reconnected to the internet.")}function m(e){"true"===e||($(".messagetitle").text("Skip Second Hint?"),$(".messageinfo").html("No second hint needed to get all six words? Confirm to skip the second hint."),$(".messageaction").html('<button class="button submithint2final">Submit - Ready for Players!</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.")),$(".submithint2final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(p),word1:b,word1num:P,word2:x,word2num:j}}).always(function(){if(1===P)var e="word";else var e="words";if(1===j)var t="word";else var t="words";$(".hint2").hide(),$(".hintheadline").hide(),$(".submittedword1").text(b),$(".submittednum1").text(P+" "+e),$(".submittedword2").text(x),$(".submittednum2").text(j+" "+t),$(".submitted").show(),g()})}),$(".closemessagebox").click(function(){g()}),$(".pagecover").click(function(){g()}),$(".messagebox").show(),$(".pagecover").show()}function g(){$(".messagebox").hide(),$(".pagecover").hide(),$(".messagetitle").html(""),$(".messageinfo").html(""),$(".messageaction").html(""),$(".messagesubtext").html("")}function f(){function e(e,t){$(".word").removeClass("guesser1show").removeClass("guesser2show").removeClass("guesser3show").removeClass("guesser4show").removeClass("guesser5show").removeClass("guesser6show");for(var a=0;a<t.length;a++)$('[data-guessword="'+t[a]+'"]').addClass("guesser"+e+"show")}for(var t=gon.allwords,a=gon.targetwords,o=[],n=12;n<18;n++)o.push(t[a[n]]);var s=gon.badword,i=t[s[8]],r=(gon.hintword1,gon.hintword2,gon.hintword3,gon.hintnum1,gon.hintnum2,gon.hintnum3,gon.g1words),d=gon.g2words,l=gon.g3words,c=gon.g4words,u=gon.g5words,h=gon.g6words;$(".word").each(function(){var e=$(this).attr("data-guessword");-1!==o.indexOf(e)?$(this).addClass("targetword"):i===e&&$(this).addClass("badword")}),$(".guesser1").click(function(){e(1,r)}),$(".guesser2").click(function(){e(2,d)}),$(".guesser3").click(function(){e(3,l)}),$(".guesser4").click(function(){e(4,c)}),$(".guesser5").click(function(){e(5,u)}),$(".guesser6").click(function(){e(6,h)})}window.performance&&2==window.performance.navigation.type&&window.location.reload(),$(document).off("click",".chatopenbutton"),$(document).off("click",".chatclosebutton"),$(document).off("click",".messageenter"),$(document).on("click",".chatclosebutton",function(){clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed"),$(".chatbox").slideToggle(200)}),$(".startguess").click(function(){$.ajax({url:"/games/startguesser",type:"POST"})}),$(".bigplaybutton").click(function(e){e.preventDefault(),$(".pagecover").show(),$(".mainmenubuttons").show()}),$(".gd").click(function(){$.ajax({url:"/games/delgame",type:"POST",dataType:"json",data:{game_id:p}}).always(function(){location.href="/main"})}),$(".menu").on("click",function(){$(".pagecover").show(),$(".menubox").show()}),$(".menuclose").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()}),$(".pagecover").on("click",function(){$(".pagecover").hide(),$(".menubox").hide(),$(".mainmenubuttons").hide()}),$(".opensettings").click(function(e){e.preventDefault(),$(".settingsbox").addClass("boxin")}),$(".settingsclosebutton").click(function(){$(".settingsbox").removeClass("boxin")});var w=gon.sound;o(w),$(".soundon").on("click",function(){w=1===w?0:1,o(w),$.ajax({url:"/games/soundonoff",type:"POST",dataType:"json",data:{sound:w}})}),$(".chatcontent").length>0&&e();var v=window.location.pathname;$(document).on("keypress",".chatenter",function(e){13==e.keyCode&&(e.preventDefault(),$(".messageenter").click())}),function(){$(".allwords li").each(function(){-1!==$(this).find("span").text().indexOf("-")?(thetext=$(this).find("span").text().replace("-","-<br>"),$(this).find("span").html(thetext)):-1!==$(this).find("span").text().indexOf(" ")?$(this).addClass("spaceword"):11===$(this).find("span").text().length?$(this).addClass("spaceword"):$(this).find("span").text().length>11&&$(this).addClass("longword")})}();var p=$(".gametop").data("gameid"),b="",x="",y="",k={0:0,1:10,2:15,3:25,4:40,5:50,6:60},C={0:"",1:"",2:"Two in a row!",3:"One, two, THREE!",4:"Four in a row!",5:"Five in a row!",6:"SIX in a row!!"},T=["Keep it up!","Great work!","Keep it going!","Very nice!","Superb vocabulary!","Happy dance!","Next up!","Fantastic work!","Superb effort!","No end in sight!","This is making the highlight reel!"],_=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];_=n(_);for(var S=120,O=0;O<_.length;O++)!function(){var e=S*(O+2);_[O];if(0!==$(".allwords").length){var t=O;setTimeout(function(){0===t?(wordshow0.on("play",s(t)),wordshow0.play()):1===t?(wordshow1.on("play",s(t)),wordshow1.play()):2===t?(wordshow2.on("play",s(t)),wordshow2.play()):3===t?(wordshow3.on("play",s(t)),wordshow3.play()):4===t?(wordshow4.on("play",s(t)),wordshow4.play()):5===t?(wordshow5.on("play",s(t)),wordshow5.play()):6===t?(wordshow6.on("play",s(t)),wordshow6.play()):7===t?(wordshow7.on("play",s(t)),wordshow7.play()):8===t?(wordshow8.on("play",s(t)),wordshow8.play()):9===t?(wordshow9.on("play",s(t)),wordshow9.play()):10===t?(wordshow10.on("play",s(t)),wordshow10.play()):11===t?(wordshow11.on("play",s(t)),wordshow11.play()):12===t?(wordshow12.on("play",s(t)),wordshow12.play()):13===t?(wordshow13.on("play",s(t)),wordshow13.play()):14===t&&(wordshow14.on("play",s(t)),wordshow14.play())},e)}}();var P=0,j=0,I=0;if($(".hint1number button").on("click",function(){$(".hint1number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),P=parseInt($(this).attr("value"))}),$(".hint2number button").on("click",function(){$(".hint2number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),j=parseInt($(this).attr("value"))}),$(".hint3number button").on("click",function(){$(".hint3number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),I=parseInt($(this).attr("value"))}),$(".submithint1").click(function(){var e=$(".hint1word").val();if(!1===i(e,P))return!1;b=e.toUpperCase(),l(b,P)}),$(".submithint2").click(function(){var e=$(".hint2word").val();if(!1===i(e,j))return!1;x=e.toUpperCase(),c(x,j)}),$(".submithint3").click(function(){var e=$(".hint3word").val();if(!1===i(e,I))return!1;y=e.toUpperCase(),u(y,I)}),$(".skiphint2").click(function(){m("false")}),$(".deletegame").click(function(){$(".messagetitle").text("Delete game?"),$(".messageinfo").html("No good hints coming to mind? You may delete this game. Note you can only delete at most one out of every 3 games. Once you've created another 2 games, you'll be able to delete another unfinished game."),$(".messageaction").html('<button class="button deleteunfinished">Delete the Game</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".deleteunfinished").click(function(){d(),g()}),$(".closemessagebox").click(function(){g()}),$(".pagecover").click(function(){g()}),$(".messagebox").show(),$(".pagecover").show()}),$(document).on("click",".returntomain",function(){window.location="/main"}),$(".hintenter").keyup(function(){$(this).val().length;$(this).val($(this).val().substring(0,28));$(this).val().length}),$(".hintenter").on("keypress",function(e){13===e.keyCode&&(e.preventDefault(),$(this).closest(".hints").find("button").first().click())}),$(".allwords").hasClass("guesswordslist")){(function(){function e(e,t,o){if(S.length>0)for(var n=0;n<S.length;n++)$("[data-guessword='"+S[n]+"']").addClass("guessedword");$(".guessedword").each(function(){var e=$(this).attr("data-guessword");-1!==d.indexOf(e)&&$(this).addClass("targetword"),u===e&&$(this).addClass("badword"),u!==e&&-1===d.indexOf(e)&&$(this).addClass("neutralword")}),H+=o;var s=R.length;if(1===P&&(H=0,s=0),$(".wordcount").text(s),$(".scorecount").text(H),$(".thehintword").text(j),$(".thehintnum").text(I),1===I)var i="word";else var i="words";if($(".thewordword").text(i),j===f?($(".skip1").text("See final hint!"),$(".hintheadline").text("Second hint")):j===w&&($(".skip1").text("End game now!"),$(".hintheadline").text("Final hint")),$(".streakwarn").hide(),"bonus,hint2"===O&&($(".hintheadline").text("Bonus! Try one more?"),$(".guessword").hide(),$(".guessnum").text("The first two hints were "+m+"("+b+") and "+f+"("+x+")."),$(".streakwarn").show()),"bonus,hint3"===O&&($(".hintheadline").text("Bonus! Try one more?"),$(".guessword").hide(),$(".guessnum").text("All hints: "+m+"("+b+") and "+f+"("+x+") and "+w+"("+y+")"),$(".streakwarn").show()),"over,over"===O){$(".bighint").html("");var r=$(".scoreSection").html();$(".bighint").html(r),$(".scoreSection").remove(),$(".hintheadline").remove(),$(".hintlabel").remove(),$(".giveravatar").remove(),$(".skip1").remove(),$("[data-guessword]").addClass("guessedword").addClass("neutralword");for(var n=0;n<d.length;n++)$("[data-guessword='"+d[n]+"']").removeClass("neutralword").addClass("targetword");$("[data-guessword='"+u+"']").removeClass("neutralword").addClass("badword"),1===P&&(H=0),$(".streakwarn").hide(),setTimeout(function(){$(".hintheading").remove(),$(".submitted").removeClass("hidden");for(var t=0;t<S.length;t++)$("[data-guessword='"+S[t]+"']").addClass("finalguessesshow");0===P&&0!==e&&gameovergoodsfx.play(),!0===gon.signedin&&$(".finalpoints"+_).text(H+"pts"),$(".allguesserinfo").addClass("underwayforgiver")},e)}"true"!==t&&!0===gon.signedin&&$.ajax({url:"/games/updategame",type:"POST",dataType:"json",data:{game_id:parseInt(p),guessedwords:S,guessstatus:O,gamespoiled:P,gamescore:H,hint1words:D,hint2words:Y,hint3words:F}}).done(function(){if(0===$(".chatcontent").length&&a(),"over,over"===O){console.log("game is over, should load stuff");var e=$(".allguesserinfo");e.load(v+" .allguesserinfo",function(){e.children(".allguesserinfo").unwrap(),GuessFuncDuring.seeguessesafter()})}}).fail(function(){h()})}function t(t){$(".guessword").show();var a=0,s="";S.push(t),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),-1!==d.indexOf(t)&&(R.push(t),j===m&&(D.push(t),a=k[D.length],s=C[D.length]),j===f&&(Y.push(t),a=k[Y.length],s=C[Y.length]),j===w&&(F.push(t),a=k[F.length],s=C[F.length]),"bonus"===O.split(",")[0]&&(a=5,s=""),6===R.length?($(".gamenotify").html("You got all six words! Very difficult to do... Well done!"),resultscheersfx.play(),o(),a+=25,O="over,over"):j===m&&D.length===I?($(".gamenotify").html("You found all the words for the first hint! On to the second hint..."),o(),n(".raRound1toRound2"),j=f,I=x,O="hint2,word1"):j===f&&Y.length===I&&D.length<b?($(".gamenotify").html("You found all the words for the second hint! Try for one bonus word?"),o("bonus"),n(".raBonusstart"),O="bonus,hint2"):j===f&&Y.length===I?($(".gamenotify").html("You found all the words for the first two hints! On to the final hint..."),o(),n(".raRound2toRound3"),j=w,I=y,O="hint3,word1"):j===w&&F.length===I?($(".gamenotify").html("You found all the words for the last hint! Try for one bonus word?"),o("bonus"),n(".raBonusstart"),O="bonus,hint3"):"bonus,hint2"===O?($(".gamenotify").html("You picked up a bonus word. On to the third hint..."),o(),n(".raBonustoRound3"),j=w,I=y,O="hint3,word1"):"bonus,hint3"===O?($(".gamenotify").html("You picked up a bonus word. Great way to end the game!"),o(),O="over,over"):R.length<6&&($(".gamenotify").html(t+" is one of the six words you're looking for! "+T[Math.floor(Math.random()*T.length)]),o()),$('[data-guessword="'+t+'"]').find("div.anim_correct").text("+"+a),$('[data-guessword="'+t+'"]').find("div.anim_correct.inarow").text(s),$("[data-guessword='"+t+"'] .anim_correct").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(-500%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),targetwordsfx.play(),e(4e3,"false",a)),u===t&&($(".gamenotify").html("Oh no! "+t+' was the "Spoiler". Game over and all points lost.'),o(),O="over,over",P=1,$("[data-guessword='"+t+"'] .anim_spoiler").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(500%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),badwordsfx.play(),e(4e3)),-1===d.indexOf(t)&&u!==t&&(j===m?($(".gamenotify").html(t+" was not one of the target words. Moving on to the second hint..."),o(),n(".raRound1toRound2"),j=f,I=x,O="hint2,word1"):"bonus,hint3"===O?($(".gamenotify").html(t+" was not one of the target words. Game over."),o(),O="over,over"):"bonus,hint2"===O?($(".gamenotify").html(t+" was not one of the target words. Moving on to the final hint..."),o(),n(".raBonustoRound3"),j=w,I=y,O="hint3,word1"):j===f?($(".gamenotify").html(t+" was not one of the target words. Moving on to the final hint..."),o(),n(".raRound2toRound3"),j=w,I=y,O="hint3,word1"):j===w&&($(".gamenotify").html(t+" was not one of the target words. Game over."),o(),O="over,over"),$("[data-guessword='"+t+"'] .anim_neutral").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(200%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),neutralwordsfx.play(),e(4e3,"false",0))}function o(e){$(".hintheadline").fadeOut(125,function(){$(".gamenotify").fadeIn(125)}),G=setTimeout(function(){$(".gamenotify").fadeOut(125,function(){$(".hintheadline").fadeIn(125)}),"bonus"===e&&bonusstartsfx.play()},4e3)}function n(e,t){t||(t=1e3),B=setTimeout(function(){$(".roundannounce").fadeIn(75,function(){$(e).find(".ra_anim1").removeClass("raa1_initial"),z=setTimeout(function(){$(e).find(".ra_anim1").addClass("raa1_final")},1e3),N=setTimeout(function(){$(e).find(".ra_anim2").removeClass("raa2_initial")},1050),q=setTimeout(function(){$(e).find(".ra_anim2").addClass("raa2_final")},2720)})},t),$(e).removeClass("hidden"),M=setTimeout(function(){$(".roundannounce").fadeOut(75,function(){$(".roundannounce div").addClass("hidden"),$(".ra_anim1").removeClass("raa1_final").addClass("raa1_initial"),$(".ra_anim2").removeClass("raa2_final").addClass("raa2_initial")}),$(".roundannounce div").addClass("hidden")},t+3e3)}function s(){$.ajax({url:"/games/guessingreportgame",type:"POST",dataType:"json",data:{game_id:parseInt(p)},statusCode:{666:function(){location.href="/main"},200:function(){var e=$(".cheatstatus");e.load(v+" .cheatstatus",function(){e.children(".cheatstatus").unwrap()})}}})}for(var i=gon.allwords,r=gon.targetwords,d=[],l=12;l<18;l++)d.push(i[r[l]]);var c=gon.badword,u=i[c[8]],m=gon.hintword1,f=gon.hintword2,w=gon.hintword3,b=gon.hintnum1,x=gon.hintnum2,y=gon.hintnum3,_=gon.guessernum,S=[],O="hint1,word1";S=gon.guessedwords,null===S&&(S=[]),O=gon.guessstatus;var P=gon.spoiler,j=m,I=b;"hint2"===O.split(",")[0]?(j=f,I=x):"hint3"===O.split(",")[0]?(j=w,I=y):"bonus,hint2"==O?(j=f,I=x):"bonus,hint3"==O&&(j=w,I=y);for(var R=[],D=gon.wordsh1,Y=gon.wordsh2,F=gon.wordsh3,l=0;l<S.length;l++)-1!==d.indexOf(S[l])&&R.push(S[l]);var G,H=gon.playerscore;1===gon.heartstatus&&($(".giveheart").hide(),$(".removeheart").show()),$(".giveheart").click(function(){$.ajax({url:"/games/addheart",type:"POST",dataType:"json",data:{game_id:parseInt(p),heartgiven:1}}).done(function(){$(".giveheart").hide(),$(".removeheartsuccess").css("display","none"),$(".giveheartsuccess").css("display","block");var e=$(".allguesserinfo");e.load(v+" .allguesserinfo",function(){e.children(".allguesserinfo").unwrap(),GuessFuncDuring.seeguessesafter()}),setTimeout(function(){$(".giveheartsuccess").fadeOut(function(){$(".removeheart").show()})},3500)}).fail(function(){h()})}),$(".removeheart").click(function(){$.ajax({url:"/games/removeheart",type:"POST",dataType:"json",data:{game_id:parseInt(p),heartgiven:0}}).done(function(){$(".removeheart").hide(),$(".giveheartsuccess").css("display","none"),$(".removeheartsuccess").css("display","block");var e=$(".allguesserinfo");e.load(v+" .allguesserinfo",function(){e.children(".allguesserinfo").unwrap(),GuessFuncDuring.seeguessesafter()}),setTimeout(function(){$(".removeheartsuccess").fadeOut(function(){$(".giveheart").show()})},3500)}).fail(function(){h()})}),e(0,"true",0),$(document).on("click",".firstclick",function(){$(this).data("guessword"),clearTimeout(G),$(".word").removeClass("unselected"),$(".word").addClass("firstclick"),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(this).find(".clickagain").addClass("wordsubmitanim"),$(this).addClass("reallysubmit").removeClass("firstclick"),$(".firstclick").addClass("unselected")}),$(document).on("click",".reallysubmit",function(){t($(this).data("guessword")),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(".word").removeClass("unselected")}),$(document).on("click",".gametop, .hintheading",function(){$(".word").addClass("firstclick"),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(".word").removeClass("unselected")}),$(".skip1").click(function(){function t(){$(".guessword").show(),j===m?(n(".raSkiphint",5),j=f,I=x,O="hint2,word1"):j===f?(n(".raSkiphint",5),j=w,I=y,O="hint3,word1"):O="over,over",e(0,"false",0)}$(".messagetitle").text("Skip hint?"),$(".messageinfo").html("Do you really want to skip this hint?"),$(".messageaction").html('<button class="button reallyskip">Skip</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".reallyskip").click(function(){t(),g()}),$(".closemessagebox").click(function(){return g(),!1}),$(".pagecover").click(function(){return g(),!1}),$(".messagebox").show(),$(".pagecover").show()});var M,B,z,N,q;$(".roundannounce").click(function(){clearTimeout(M),clearTimeout(B),clearTimeout(z),clearTimeout(N),clearTimeout(q),$(".roundannounce").fadeOut(125,function(){$(".roundannounce div").addClass("hidden"),$(".ra_anim1").removeClass("raa1_final").addClass("raa1_initial"),$(".ra_anim2").removeClass("raa2_final").addClass("raa2_initial")})}),$(".thumbdown").click(function(){$(".menubox").hide(),$(".messagetitle").text("Report game?"),$(".messageinfo").html("If this game uses hints you consider to be cheating or offensive, feel free to report it. If half of the players in the game (3) report the game, it will be deleted. <br>Current reports: "+gon.currentcheatnum),$(".messageaction").html('<button class="button reportacheat">Report the Game</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".reportacheat").click(function(){s(),g()}),$(".closemessagebox").click(function(){g()}),$(".pagecover").click(function(){g()}),$(".messagebox").show(),$(".pagecover").show()})})()}if($(".allguesserinfo").hasClass("underwayforgiver")){(function(){f()})()}if(GuessFuncDuring={seeguessesafter:function(){function e(e,t){$(".finalguessesshow").removeClass("finalguessesshow"),$(".word").removeClass("guesser1show").removeClass("guesser2show").removeClass("guesser3show").removeClass("guesser4show").removeClass("guesser5show").removeClass("guesser6show");for(var a=0;a<t.length;a++)$('[data-guessword="'+t[a]+'"]').addClass("guesser"+e+"show")}$(".guesswordslist").addClass("guessednotdone");for(var t=gon.guessernum,a=gon.allwords,o=gon.targetwords,n=[],s=12;s<18;s++)n.push(a[o[s]]);var i=gon.badword;a[i[8]],gon.hintword1,gon.hintword2,gon.hintword3,gon.hintnum1,gon.hintnum2,gon.hintnum3;pl1words=[],pl2words=[],pl3words=[],pl4words=[],pl5words=[],pl6words=[],pl1words=$(".guesser1").attr("data-gsrwords").split(","),pl2words=$(".guesser2").attr("data-gsrwords").split(","),pl3words=$(".guesser3").attr("data-gsrwords").split(","),pl4words=$(".guesser4").attr("data-gsrwords").split(","),pl5words=$(".guesser5").attr("data-gsrwords").split(","),pl6words=$(".guesser6").attr("data-gsrwords").split(","),$(".neutralword").removeClass("neutralword"),$(".guesser1").click(function(){e(1,pl1words)}),$(".guesser2").click(function(){e(2,pl2words)}),$(".guesser3").click(function(){e(3,pl3words)}),$(".guesser4").click(function(){e(4,pl4words)}),$(".guesser5").click(function(){e(5,pl5words)}),$(".guesser6").click(function(){e(6,pl6words)}),$(".guesser"+t).click()}},$(document).on("click",".titleavatar",function(){$(".avatarlink")[0].click()}),$(".avatar-customize").length>0){for(var R=$(".avatar-customize").data("usercomponents").split("-"),O=0;O<R.length;O++)$("[data-avatarcomponent='"+R[O]+"']").addClass("avactive");$(".avactive").each(function(){var e=$(this).attr("data-avatarcomponent");$(this).closest(".avatarpart").attr("data-activepart",e)});var D=$(".avatar-customize").attr("data-featscore");$(".compitem").each(function(){var e=$(this).attr("data-pointsneeded");parseInt(e)>parseInt(D)&&$(this).addClass("avlocked")});var Y="",F="";$(".partbuttons a").click(function(e){if(e.preventDefault(),$(".avatar_"+Y+" .avactive").hasClass("avlocked")){$(".avatar_"+Y+" .avactive").removeClass("avactive");var t=$(".avatar_"+Y).attr("data-activepart");$("[data-avatarcomponent='"+t+"']").addClass("avactive")}$(".partbuttons a").removeClass("avpartactive"),$(this).addClass("avpartactive"),$(".avbutton-left").removeClass("hidden"),$(".avbutton-right").removeClass("hidden"),Y=$(this).attr("class").split("-")[1].replace(" avpartactive",""),F=$(".avatar_"+Y+" .avactive").attr("data-compindex"),$(".compindexshow").text(F),$(".partlockedshow").addClass("hidden"),$(".avbutton-save").removeClass("disabled")}),$(".avbutton-left").click(function(e){e.preventDefault();var t=$(".avatar_"+Y+" .avactive").attr("data-avatarcomponent");if($(".avatar_"+Y+" .compitem").removeClass("avactive"),$("[data-avatarcomponent='"+t+"']").prev(".compitem").length>0?$("[data-avatarcomponent='"+t+"']").prev(".compitem").addClass("avactive"):$(".avatar_"+Y+" .compitem").last().addClass("avactive"),F=$(".avatar_"+Y+" .avactive").attr("data-compindex"),$(".compindexshow").text(F),$(".avatar_"+Y+" .avactive").hasClass("avlocked")){var a=$(".avatar_"+Y+" .avactive").attr("data-pointsneeded");$(".partlockedshow").removeClass("hidden"),$(".partlockedshow span").html(a+" Feat Score<br><span class='youhavetext'>(You have "+D+")</span>"),$(".avbutton-save").addClass("disabled")}else $(".partlockedshow").addClass("hidden"),$(".avbutton-save").removeClass("disabled")}),$(".avbutton-right").click(function(e){e.preventDefault();var t=$(".avatar_"+Y+" .avactive").attr("data-avatarcomponent");if($(".avatar_"+Y+" .compitem").removeClass("avactive"),$("[data-avatarcomponent='"+t+"']").next(".compitem").length>0?$("[data-avatarcomponent='"+t+"']").next(".compitem").addClass("avactive"):$(".avatar_"+Y+" .compitem").first().addClass("avactive"),F=$(".avatar_"+Y+" .avactive").attr("data-compindex"),$(".compindexshow").text(F),$(".avatar_"+Y+" .avactive").hasClass("avlocked")){var a=$(".avatar_"+Y+" .avactive").attr("data-pointsneeded");$(".partlockedshow").removeClass("hidden"),$(".partlockedshow span").html(a+" Feat Score<br><span class='youhavetext'>(You have "+D+")</span>"),$(".avbutton-save").addClass("disabled")}else $(".partlockedshow").addClass("hidden"),$(".avbutton-save").removeClass("disabled")}),$(".avbutton-save").click(function(e){e.preventDefault();var t=[];$(".avatarpart").each(function(){var e=$(this).find(".compitem.avactive").attr("data-avatarcomponent");t.push(e)});var a=t.join("-");$(".avatar-customize").attr("data-usercomponents",a),$.ajax({url:"/pages/updateavatar",type:"POST",dataType:"json",data:{avstring:a}}).done(function(){$(".compindexshow").text("Saved!")}).fail(function(){h()})}),$(".avbutton-random").click(function(e){e.preventDefault(),$(".partlockedshow").addClass("hidden"),$(".compindexshow").text(""),$(".compitem").removeClass("avactive"),$(".avatarpart").each(function(){var e=$(this).find(".compitem").not(".avlocked").length,t=Math.floor(Math.random()*e);$(this).find(".compitem").not(".avlocked").eq(t).addClass("avactive");var a=$(this).find(".compitem").not(".avlocked").eq(t).attr("data-avatarcomponent");$(this).attr("data-activepart",a)}),$(".avbutton-save").removeClass("disabled")})}};$(document).on("turbolinks:load",ready);