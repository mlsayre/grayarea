var ready=function(){function t(){$(document).on("click",".chatopenbutton",function(){a(),"open"===$(".chatbox").attr("data-chatopen")?(clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed")):(refreshingChat=setInterval(a,5e3),$(".chatbox").attr("data-chatopen","open")),$(".chatbox").slideToggle(200),$(".chatenter").focus(),$.ajax({url:"/games/resetchatnotify",type:"POST",dataType:"json",data:{game_id:z}}),$(".unreadchats").text("")}),$(document).on("click",".messageenter",function(){var e=$(".chatenter").val();""!==e&&$.ajax({url:"/games/entermessage",type:"POST",dataType:"json",data:{message:e,game_id:z}}),$(".chatenter").val(""),a()})}function a(){var e=$(".chatcontent");e.load(B+" .chatcontent",function(){e.children(".chatcontent").unwrap()})}function M(){$(document).off("click",".chatopenbutton"),$(document).off("click",".messageenter");var e=$(".chatarea");e.load(B+" .chatarea",function(){e.children(".chatarea").unwrap()}),t()}function e(e){0===e?($(".soundon").text("Turn Sound On"),Howler.mute(!0)):($(".soundon").text("Turn Sound Off"),Howler.mute(!1))}function o(e){for(var t=e.length-1;0<t;t--){var a=Math.floor(Math.random()*(t+1)),o=e[t];e[t]=e[a],e[a]=o}return e}function s(e){setTimeout(function(){$(".word").eq(f[e]).removeClass("shrunken")},w+110)}function n(e,t){var a=/^[a-zA-Z\s]+$/,o=e.trim().split(/\s+/).length;return 0===e.length?(i("Please enter a hint word."),!1):28<e.length?(i("Please keep hint shorter than 29 characters. Reminder: just give one word or two words if it's somebody's name."),!1):e.match(a)?1<o?(i("Please make sure your hint is one word only."),!1):0===t?(i("Please select a number of words this hint applies to."),!1):void 0:(i("Please make sure your hint contains letters only."),!1)}function i(e){$(".messagetitle").text("Oopies!"),$(".messageinfo").text(e),$(".messageaction").html('<button class="button closemessagebox">Return to game</button>'),$(".messagesubtext").text("Push button or click anywhere outside this box to continue."),$(".closemessagebox").click(function(){U()}),$(".pagecover").click(function(){U()}),$(".messagebox").show(),$(".pagecover").show()}function r(){$.ajax({url:"/games/givingdeletegame",type:"POST",dataType:"json",data:{game_id:parseInt(z)}}).done(function(){location.href="/main"}).fail(function(){G()})}function d(e,t){if(1===t)var a="word";else a="words";$(".messagetitle").text("Submit Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+a+". Submit this hint and move to the next hint?"),$(".messageaction").html('<button class="button submithint1final">Submit Hint 1</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint1final").click(function(){$(".hint1").hide(),$(".firstinfoword").text(e),$(".firstinfonum").text(t+" "+a),$(".hint2").show(),U()}),$(".closemessagebox").click(function(){U()}),$(".pagecover").click(function(){U()}),$(".messagebox").show(),$(".pagecover").show()}function l(e,t){if(1===t)var a="word";else a="words";$(".messagetitle").text("Submit Second Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+a+". Submit this hint and move to the final hint?"),$(".messageaction").html('<button class="button submithint2final">Submit Hint 2</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint2final").click(function(){$(".hint2").hide(),$(".secondinfoword").text(e),$(".secondinfonum").text(t+" "+a),$(".hint3").show(),U()}),$(".closemessagebox").click(function(){U()}),$(".pagecover").click(function(){U()}),$(".messagebox").show(),$(".pagecover").show()}function c(e,t){if(1===t)var a="word";else a="words";$(".messagetitle").text("Submit Final Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+a+". Submit final hint and let people play the game?"),$(".messageaction").html('<button class="button submithint3final">Submit - Ready for Players!</button><button class="button submitredo">Start Over</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submitredo").click(function(){$(".hint3").hide(),$(".hint1").show(),$(".hintenter").val(""),U()}),$(".submithint3final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(z),word1:m,word1num:b,word2:g,word2num:y,word3:p,word3num:x}}).always(function(){if(1===b)var e="word";else e="words";if(1===y)var t="word";else t="words";if(1===x)var a="word";else a="words";$(".hint3").hide(),$(".hintheadline").hide(),$(".submittedword1").text(m),$(".submittednum1").text(b+" "+e),$(".submittedword2").text(g),$(".submittednum2").text(y+" "+t),$(".submittedword3").text(p),$(".submittednum3").text(x+" "+a),$(".submitted").show(),$(".buttons-middle").removeClass("hidden"),U(),0===$(".chatcontent").length&&M()})}),$(".closemessagebox").click(function(){U()}),$(".pagecover").click(function(){U()}),$(".messagebox").show(),$(".pagecover").show()}function G(){$("body").html("Please check your connection. Please reload game when you have reconnected to the internet.")}function u(e){"true"===e||($(".messagetitle").text("Skip Second Hint?"),$(".messageinfo").html("No second hint needed to get all six words? Confirm to skip the second hint."),$(".messageaction").html('<button class="button submithint2final">Submit - Ready for Players!</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.")),$(".submithint2final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(z),word1:m,word1num:b,word2:g,word2num:y}}).always(function(){if(1===b)var e="word";else e="words";if(1===y)var t="word";else t="words";$(".hint2").hide(),$(".hintheadline").hide(),$(".submittedword1").text(m),$(".submittednum1").text(b+" "+e),$(".submittedword2").text(g),$(".submittednum2").text(y+" "+t),$(".submitted").show(),U()})}),$(".closemessagebox").click(function(){U()}),$(".pagecover").click(function(){U()}),$(".messagebox").show(),$(".pagecover").show()}function U(){$(".messagebox").hide(),$(".pagecover").hide(),$(".messagetitle").html(""),$(".messageinfo").html(""),$(".messageaction").html(""),$(".messagesubtext").html("")}function h(){function e(e,t){$(".word").removeClass("guesser1show").removeClass("guesser2show").removeClass("guesser3show").removeClass("guesser4show").removeClass("guesser5show").removeClass("guesser6show");for(var a=0;a<t.length;a++)$('[data-guessword="'+t[a]+'"]').addClass("guesser"+e+"show")}for(var t=gon.allwords,a=gon.targetwords,o=[],s=12;s<18;s++)o.push(t[a[s]]);var n=t[gon.badword[8]],i=(gon.hintword1,gon.hintword2,gon.hintword3,gon.hintnum1,gon.hintnum2,gon.hintnum3,gon.g1words),r=gon.g2words,d=gon.g3words,l=gon.g4words,c=gon.g5words,u=gon.g6words;$(".word").each(function(){var e=$(this).attr("data-guessword");-1!==o.indexOf(e)?$(this).addClass("targetword"):n===e&&$(this).addClass("badword")}),$(".guesser1").click(function(){e(1,i)}),$(".guesser2").click(function(){e(2,r)}),$(".guesser3").click(function(){e(3,d)}),$(".guesser4").click(function(){e(4,l)}),$(".guesser5").click(function(){e(5,c)}),$(".guesser6").click(function(){e(6,u)})}window.performance&&2==window.performance.navigation.type&&window.location.reload(),$(document).off("click",".chatopenbutton"),$(document).off("click",".chatclosebutton"),$(document).off("click",".messageenter"),$(document).on("click",".chatclosebutton",function(){clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed"),$(".chatbox").slideToggle(200)}),$(".startguess").click(function(){$.ajax({url:"/games/startguesser",type:"POST"})}),$(".contstartguess").click(function(){$.ajax({url:"/games/startguessercont",type:"POST"})}),$(".contmainplay").click(function(){$.ajax({url:"/games/startgivercont",type:"POST"})}),$(".bigplaybutton").click(function(e){e.preventDefault(),$(".pagecover").show(),$(".mainmenubuttons").show()}),$(".gd").click(function(){$.ajax({url:"/games/delgame",type:"POST",dataType:"json",data:{game_id:z}}).always(function(){location.href="/main"})}),$(".menu").on("click",function(){$(".pagecover").show(),$(".menubox").show()}),$(".menuclose").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()}),$(".pagecover").on("click",function(){$(".pagecover").hide(),$(".menubox").hide(),$(".mainmenubuttons").hide(),$(".menudialogspoiler").hide(),$(".menudialogneutral").hide(),$(".menudialogwatch").hide()});var Y=gon.sound;e(Y),$(".soundon").on("click",function(){e(Y=1===Y?0:1),$.ajax({url:"/games/soundonoff",type:"POST",dataType:"json",data:{sound:Y}})}),0<$(".chatcontent").length&&t();var B=window.location.pathname;$(document).on("keypress",".chatenter",function(e){13==e.keyCode&&(e.preventDefault(),$(".messageenter").click())}),$(".allwords li").each(function(){-1!==$(this).find("span").text().indexOf("-")?(thetext=$(this).find("span").text().replace("-","-<br>"),$(this).find("span").html(thetext)):-1!==$(this).find("span").text().indexOf(" ")?(thetext=$(this).find("span").text().replace(" ","<br>"),$(this).find("span").html(thetext)):11===$(this).find("span").text().length?$(this).addClass("spaceword"):11<$(this).find("span").text().length&&$(this).addClass("longword")});var z=$(".gametop").data("gameid"),m="",g="",p="",K={0:0,1:10,2:15,3:25,4:40,5:50,6:60},V={0:"",1:"",2:"Two in a row!",3:"One, two, THREE!",4:"Four in a row!",5:"Five in a row!",6:"SIX in a row!!"},N=["Keep it up!","Great work!","Keep it going!","Very nice!","Superb vocabulary!","Happy dance!","Next up!","Fantastic work!","Superb effort!","No end in sight!","This is making the highlight reel!"],f=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];f=o(f);for(var w=120,v=0;v<f.length;v++)!function(){var e=w*(v+2);f[v];if(0!==$(".allwords").length){var t=v;setTimeout(function(){0===t?(wordshow0.on("play",s(t)),wordshow0.play()):1===t?(wordshow1.on("play",s(t)),wordshow1.play()):2===t?(wordshow2.on("play",s(t)),wordshow2.play()):3===t?(wordshow3.on("play",s(t)),wordshow3.play()):4===t?(wordshow4.on("play",s(t)),wordshow4.play()):5===t?(wordshow5.on("play",s(t)),wordshow5.play()):6===t?(wordshow6.on("play",s(t)),wordshow6.play()):7===t?(wordshow7.on("play",s(t)),wordshow7.play()):8===t?(wordshow8.on("play",s(t)),wordshow8.play()):9===t?(wordshow9.on("play",s(t)),wordshow9.play()):10===t?(wordshow10.on("play",s(t)),wordshow10.play()):11===t?(wordshow11.on("play",s(t)),wordshow11.play()):12===t?(wordshow12.on("play",s(t)),wordshow12.play()):13===t?(wordshow13.on("play",s(t)),wordshow13.play()):14===t&&(wordshow14.on("play",s(t)),wordshow14.play())},e)}}();var b=0,y=0,x=0;if($(".hint1number button").on("click",function(){$(".hint1number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),b=parseInt($(this).attr("value"))}),$(".hint2number button").on("click",function(){$(".hint2number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),y=parseInt($(this).attr("value"))}),$(".hint3number button").on("click",function(){$(".hint3number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),x=parseInt($(this).attr("value"))}),$(".submithint1").click(function(){var e=$(".hint1word").val();if(!1===n(e,b))return!1;d(m=e.toUpperCase(),b)}),$(".submithint2").click(function(){var e=$(".hint2word").val();if(!1===n(e,y))return!1;l(g=e.toUpperCase(),y)}),$(".submithint3").click(function(){var e=$(".hint3word").val();if(!1===n(e,x))return!1;c(p=e.toUpperCase(),x)}),$(".skiphint2").click(function(){u("false")}),$(".deletegame").click(function(){$(".messagetitle").text("Delete game?"),$(".messageinfo").html("No good hints coming to mind? You may delete this game. Note you can only delete at most one out of every 3 games. Once you've created another 2 games, you'll be able to delete another unfinished game."),$(".messageaction").html('<button class="button deleteunfinished">Delete the Game</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".deleteunfinished").click(function(){r(),U()}),$(".closemessagebox").click(function(){U()}),$(".pagecover").click(function(){U()}),$(".messagebox").show(),$(".pagecover").show()}),$(document).on("click",".returntomain",function(){window.location="/main"}),$(".hintenter").keyup(function(){$(this).val().length;$(this).val($(this).val().substring(0,28));$(this).val().length}),$(".hintenter").on("keypress",function(e){13===e.keyCode&&(e.preventDefault(),$(this).closest(".hints").find("button").first().click())}),$(".allwords").hasClass("givewordslist")&&$(".targetword").click(function(){$(this).hasClass("tracked")?($(this).removeClass("tracked"),$(this).find(".trackedimage").remove()):($(this).addClass("tracked"),$(this).append('<img class="trackedimage" src="/assets/obj_tick.png">'))}),$(".allwords").hasClass("guesswordslist"))(function(){function o(t,e,a){if($("body").css("pointer-events","none"),0<x.length)for(var o=0;o<x.length;o++)$("[data-guessword='"+x[o]+"']").addClass("guessedword");$(".guessedword").each(function(){var e=$(this).attr("data-guessword");-1!==u.indexOf(e)&&$(this).addClass("targetword"),m===e&&$(this).addClass("badword"),m!==e&&-1===u.indexOf(e)&&$(this).addClass("neutralword")}),H+=a;var s=j.length;if(1===_&&(s=H=0),$(".wordcount").text(s),$(".scorecount").text(H),$(".thehintword").text(P),$(".thehintnum").text(I),1===I)var n="word";else n="words";if($(".thewordword").text(n),P===p?($(".skip1").text("See final hint!"),$(".hintheadline").text("Second hint")):P===f&&($(".skip1").text("End game now!"),$(".hintheadline").text("Final hint")),$(".streakwarn").hide(),"bonus,hint2"===k&&($(".hintheadline").text("Bonus! Try one more?"),$(".guessword").hide(),$(".guessnum").text("The first two hints were "+g+"("+w+") and "+p+"("+v+")."),$(".streakwarn").show()),"bonus,hint3"===k&&($(".hintheadline").text("Bonus! Try one more?"),$(".guessword").hide(),$(".guessnum").text("All hints: "+g+"("+w+") and "+p+"("+v+") and "+f+"("+b+")"),$(".streakwarn").show()),"over,over"===k){$(".bighint").html("");var i=$(".scoreSection").html();$(".bighint").html(i),$(".scoreSection").remove(),$(".hintheadline").remove(),$(".hintlabel").remove(),$(".giveravatar").remove(),$(".skip1").remove(),$("[data-guessword]").addClass("guessedword").addClass("neutralword");for(o=0;o<u.length;o++)$("[data-guessword='"+u[o]+"']").removeClass("neutralword").addClass("targetword");$("[data-guessword='"+m+"']").removeClass("neutralword").addClass("badword"),1===_&&(H=0),$(".streakwarn").hide(),setTimeout(function(){$(".hintheading").remove(),$(".submitted").removeClass("hidden");for(var e=0;e<x.length;e++)$("[data-guessword='"+x[e]+"']").addClass("finalguessesshow");0===_&&0!==t&&gameovergoodsfx.play(),!0===gon.signedin&&$(".finalpoints"+y).text(H+"pts"),$(".allguesserinfo").addClass("underwayforgiver"),$(".playedgameover").show(),$(".pupspoilershow").fadeOut()},t)}"true"!==e&&!0===gon.signedin?$.ajax({url:"/games/updategame",type:"POST",dataType:"json",data:{game_id:parseInt(z),guessedwords:x,guessstatus:k,gamespoiled:_,gamescore:H,hint1words:R,hint2words:E,hint3words:D}}).done(function(){if($("body").css("pointer-events","all"),0===$(".chatcontent").length&&M(),"over,over"===k){console.log("game is over, should load stuff");var e=$(".allguesserinfo");setTimeout(function(){e.load(B+" .allguesserinfo",function(){e.children(".allguesserinfo").unwrap(),GuessFuncDuring.seeguessesafter()})},600)}}).fail(function(){G(),$("body").css("pointer-events","all")}):$("body").css("pointer-events","all")}function e(e){$(".guessword").show();var t=0,a="";x.push(e),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),-1!==u.indexOf(e)&&(j.push(e),P===g&&(R.push(e),t=K[R.length],a=V[R.length]),P===p&&(E.push(e),t=K[E.length],a=V[E.length]),P===f&&(D.push(e),t=K[D.length],a=V[D.length]),"bonus"===k.split(",")[0]&&(t=5,a=""),6===j.length?($(".gamenotify").html("You got all six words! Very difficult to do... Well done!"),resultscheersfx.play(),s(),t+=25,k="over,over"):P===g&&R.length===I?($(".gamenotify").html(""),s(),n(".raRound1toRound2"),P=p,I=v,k="hint2,word1"):P===p&&E.length===I&&R.length<w?($(".gamenotify").html(""),s("bonus"),n(".raBonusstart",1e3,"bonusstart"),k="bonus,hint2"):P===p&&E.length===I?($(".gamenotify").html(""),s(),n(".raRound2toRound3"),P=f,I=b,k="hint3,word1"):P===f&&D.length===I?($(".gamenotify").html(""),s("bonus"),n(".raBonusstart",1e3,"bonusstart"),k="bonus,hint3"):"bonus,hint2"===k?($(".gamenotify").html(""),s(),n(".raBonustoRound3"),P=f,I=b,k="hint3,word1"):"bonus,hint3"===k?($(".gamenotify").html("You picked up a bonus word. Great way to end the game!"),s(),k="over,over"):j.length<6&&($(".gamenotify").html(e+" is one of the six words you're looking for! "+N[Math.floor(Math.random()*N.length)]),s()),$('[data-guessword="'+e+'"]').find("div.anim_correct").text("+"+t),$('[data-guessword="'+e+'"]').find("div.anim_correct.inarow").text(a),$("[data-guessword='"+e+"'] .anim_correct").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+e+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+e+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+e+"'] div.animating").css("transform","translateY(-500%)").fadeOut(400,function(){$("[data-guessword='"+e+"'] div.animating").remove()})},3100),targetwordsfx.play(),o(4e3,"false",t)),m===e&&($(".gamenotify").html("Oh no! "+e+' was the "Spoiler". Game over and all points lost.'),s(),k="over,over",_=1,$("[data-guessword='"+e+"'] .anim_spoiler").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+e+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+e+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+e+"'] div.animating").css("transform","translateY(500%)").fadeOut(400,function(){$("[data-guessword='"+e+"'] div.animating").remove()})},3100),badwordsfx.play(),o(4e3)),-1===u.indexOf(e)&&m!==e&&(P===g?($(".gamenotify").html(""),s(),n(".raRound1toRound2"),P=p,I=v,k="hint2,word1"):"bonus,hint3"===k?($(".gamenotify").html(e+" was not one of the target words. Game over."),s(),k="over,over"):"bonus,hint2"===k?($(".gamenotify").html(""),s(),n(".raBonustoRound3"),P=f,I=b,k="hint3,word1"):P===p?($(".gamenotify").html(""),s(),n(".raRound2toRound3"),P=f,I=b,k="hint3,word1"):P===f&&($(".gamenotify").html(e+" was not one of the target words. Game over."),s(),k="over,over"),$("[data-guessword='"+e+"'] .anim_neutral").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+e+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+e+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+e+"'] div.animating").css("transform","translateY(200%)").fadeOut(400,function(){$("[data-guessword='"+e+"'] div.animating").remove()})},3100),neutralwordsfx.play(),o(4e3,"false",0))}function s(){$(".gamenotify").show(),A=setTimeout(function(){$(".gamenotify").hide()},4e3)}function n(e,t,a){$(".hintlabel").css("opacity","0"),t||(t=1e3),$(".bighint").css("visibility","hidden"),"bonusstart"!==a?$(".bighint").addClass("bh_initial"):setTimeout(function(){bonusstartsfx.play()},t+360),setTimeout(function(){$(".roundannounce").fadeIn(75,function(){$(e).find(".ra_anim1").removeClass("raa1_initial"),setTimeout(function(){$(e).find(".ra_anim1").addClass("raa1_final")},1500)})},t),$(e).removeClass("hidden"),setTimeout(function(){$(".roundannounce").fadeOut(75,function(){$(".bighint").css("visibility","visible").removeClass("bh_initial"),$(".hintlabel").css("opacity","1"),$(".roundannounce div").addClass("hidden"),$(".ra_anim1").removeClass("raa1_final").addClass("raa1_initial"),$(".ra_anim2").removeClass("raa2_final").addClass("raa2_initial")}),$(".roundannounce div").addClass("hidden")},t+1800)}function t(){$.ajax({url:"/games/guessingreportgame",type:"POST",dataType:"json",data:{game_id:parseInt(z)},statusCode:{666:function(){location.href="/main"},200:function(){var e=$(".cheatstatus");e.load(B+" .cheatstatus",function(){e.children(".cheatstatus").unwrap()})}}})}function i(e){var t=$(e);t.load(B+" "+e,function(){t.children(e).unwrap()})}function r(e){function a(e){var t=Math.floor(Math.random()*(e+1));-1===o.indexOf(t)?(o.push(t),o.length<2&&a(e)):a(e)}var o=[];return a(e),o}function a(){function e(e){e&&console.log("Applixir status: "+e),"ad-blocker"===e&&console.log("USER HAS AD-BLOCKER, ASK THEM TO DISABLE"),"ad-watched"===e&&($.ajax({url:"/games/increasepuptworemove",type:"POST",dataType:"json"}).done(function(){console.log("user pup increased"),i(".pupcontainer")}).fail(function(){console.log("sorry, attempt to add neutral remove powerups failed")}),console.log("MAKE CALL TO SERVER, ADD NEUTRAL POWERUPS!")),"sys-closing"===e&&$(".pagecover").hide()}var t=!1;1===Y&&(t=!0);var a={zoneId:2894,devId:3705,gameId:4932,muted:t,adStatusCb:e};$(".menudialogwatch").hide(),invokeApplixirVideoUnit(a),$(".pagecover").show()}function d(){function e(e){e&&console.log("Applixir status: "+e),"ad-blocker"===e&&console.log("USER HAS AD-BLOCKER, ASK THEM TO DISABLE"),"ad-watched"===e&&($.ajax({url:"/games/increasepupspoiler",type:"POST",dataType:"json"}).done(function(){console.log("user spoiler pup increased"),i(".pupcontainer")}).fail(function(){console.log("sorry, attempt to add spoiler remove powerups failed")}),console.log("MAKE CALL TO SERVER, ADD SPOILER POWERUPS!")),"sys-closing"===e&&$(".pagecover").hide()}var t=!1;1===Y&&(t=!0);var a={zoneId:2894,devId:3705,gameId:4932,muted:t,adStatusCb:e};$(".menudialogwatch").hide(),invokeApplixirVideoUnit(a),$(".pagecover").show()}for(var l=gon.allwords,c=gon.targetwords,u=[],h=12;h<18;h++)u.push(l[c[h]]);var m=l[gon.badword[8]],g=gon.hintword1,p=gon.hintword2,f=gon.hintword3,w=gon.hintnum1,v=gon.hintnum2,b=gon.hintnum3,y=gon.guessernum,x=[],k="hint1,word1",C=gon.pupspoiler,T=gon.pupneutrals,S=C.length,O=T.length;console.log(T),null===(x=gon.guessedwords)&&(x=[]),k=gon.guessstatus;var _=gon.spoiler,P=g,I=w;"hint2"===k.split(",")[0]?(P=p,I=v):"hint3"===k.split(",")[0]?(P=f,I=b):"bonus,hint2"==k?(P=p,I=v):"bonus,hint3"==k&&(P=f,I=b);var j=[],R=gon.wordsh1,E=gon.wordsh2,D=gon.wordsh3;for(h=0;h<x.length;h++)-1!==u.indexOf(x[h])&&j.push(x[h]);var A,H=gon.playerscore;1===gon.heartstatus&&($(".giveheart").hide(),$(".removeheart").css("display","inline-block")),1===C.length?setTimeout(function(){$(".pupspoilershow").fadeIn().addClass("show4").addClass("pos-"+C[0])},1500):2===C.length&&($(".pup_spoilerdetect").removeClass("pupactive").addClass("pupnotactive"),setTimeout(function(){$(".pupspoilershow").fadeIn().addClass("show2").addClass("pos-"+C[1])},1500)),$(document).on("click",".giveheart",function(){$.ajax({url:"/games/addheart",type:"POST",dataType:"json",data:{game_id:parseInt(z),heartgiven:1}}).done(function(){var e=$(".allguesserinfo");e.load(B+" .allguesserinfo",function(){e.children(".allguesserinfo").unwrap(),GuessFuncDuring.seeguessesafter(),$(".giveheart").hide(),$(".removeheartsuccess").css("display","none"),$(".giveheartsuccess").css("display","inline-block"),setTimeout(function(){$(".giveheartsuccess").fadeOut(function(){$(".removeheart").show()})},1500)})}).fail(function(){G()})}),$(document).on("click",".removeheart",function(){$.ajax({url:"/games/removeheart",type:"POST",dataType:"json",data:{game_id:parseInt(z),heartgiven:0}}).done(function(){var e=$(".allguesserinfo");e.load(B+" .allguesserinfo",function(){e.children(".allguesserinfo").unwrap(),GuessFuncDuring.seeguessesafter(),$(".giveheart").hide(),$(".removeheart").hide(),$(".giveheartsuccess").css("display","none"),$(".removeheartsuccess").css("display","inline-block"),setTimeout(function(){$(".removeheartsuccess").fadeOut(function(){$(".giveheart").show()})},1500)})}).fail(function(){G()})}),o(0,"true",0),$(document).on("click",".firstclick",function(){$(this).data("guessword");clearTimeout(A),$(".word").removeClass("unselected"),$(".word").addClass("firstclick"),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(this).find(".clickagain").addClass("wordsubmitanim"),$(this).addClass("reallysubmit").removeClass("firstclick"),$(".firstclick").addClass("unselected")}),$(document).on("click",".reallysubmit",function(){e($(this).data("guessword")),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(".word").removeClass("unselected")}),$(document).on("click",".gametop, .hintheading",function(){$(".word").addClass("firstclick"),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(".word").removeClass("unselected")}),$(".skip1").click(function(){function e(){$(".guessword").show(),P===g?(n(".raSkiphint",5),P=p,I=v,k="hint2,word1"):P===p?(n(".raSkiphint",5),P=f,I=b,k="hint3,word1"):k="over,over",o(0,"false",0)}$(".messagetitle").text("Skip hint?"),$(".messageinfo").html("Do you really want to skip this hint?"),$(".messageaction").html('<button class="button reallyskip">Skip</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".reallyskip").click(function(){e(),U()}),$(".closemessagebox").click(function(){return U(),!1}),$(".pagecover").click(function(){return U(),!1}),$(".messagebox").show(),$(".pagecover").show()}),$(".thumbdown").click(function(){$(".menubox").hide(),$(".messagetitle").text("Report game?"),$(".messageinfo").html("If this game uses hints you consider to be cheating or offensive, feel free to report it. If half of the players in the game (3) report the game, it will be deleted. <br>Current reports: "+gon.currentcheatnum),$(".messageaction").html('<button class="button reportacheat">Report the Game</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".reportacheat").click(function(){t(),U()}),$(".closemessagebox").click(function(){U()}),$(".pagecover").click(function(){U()}),$(".messagebox").show(),$(".pagecover").show()}),$(document).on("click",".pup_spoilerdetect.pupactive",function(){if(++S<=2){var e=$("[data-guessword='"+m+"']").index(".word"),t=e*e+11;$.ajax({url:"/games/decreasepupspoiler",type:"POST",dataType:"json",data:{game_id:parseInt(z),indbw:t}}).done(function(e){i(".pupcontainer"),"bothdone"===e.firstorsecond?($(".pagecover").show(),$(".menudialog").show()):($(".pupspoilershow").fadeIn().addClass(e.firstorsecond).addClass("pos-"+e.newloc),"show2"===e.firstorsecond&&$(".pup_spoilerdetect").removeClass("pupactive").addClass("pupnotactive"))})}else $(".pup_spoilerdetect").removeClass("pupactive").addClass("pupnotactive"),$(".pupnotactive").click()}),$(".watchforpupspoilers").click(function(){d()}),$(document).on("click",".pup_spoilerdetect.pupnotactive",function(){0<$(".spoilerzero").length?(console.log("DO THE VIDEO FOR SPOILERS HERE"),$(".watchforpupneutrals").hide(),$(".watchforpupspoilers").hide(),$(".pagecover").show(),$(".menudialogwatch").show(),$(".watchforpupspoilers").show()):($(".pagecover").show(),$(".menudialog.menudialogspoiler").show())});var F=[];(F=F.concat(u)).push(m);var L=l.filter(function(e){return-1===F.indexOf(e)});console.log("nwords: "+L),$(document).on("click",".pup_tworemove.pupactive",function(){if(O++,console.log(O),O<=2){var e=[],t=[];$(".word").not(".guessedword").each(function(){-1!==L.indexOf($(this).attr("data-guessword"))&&e.push($(this).attr("data-guessword"))}),console.log("possibles: "+e);var a=r(e.length-1);t.push(e[a[0]]),t.push(e[a[1]]),console.log("wordspicked: "+t),$.ajax({url:"/games/decreasepuptworemove",type:"POST",dataType:"json",data:{game_id:parseInt(z),neutralsshown:t}}).done(function(){$("[data-guessword='"+t[0]+"']").removeClass("firstclick").addClass("anim_puppneutral").addClass("pupelimword").addClass("guessedword"),setTimeout(function(){$("[data-guessword='"+t[1]+"']").removeClass("firstclick").addClass("anim_puppneutral").addClass("pupelimword").addClass("guessedword")},500),x=x.concat(t),console.log("user pup decreased"),i(".pupcontainer")}).fail(function(){console.log("sorry, internet connection required to use powerups")})}else $(".pup_tworemove").removeClass("pupactive").addClass("pupnotactive"),$(".pupnotactive").click()}),$(".watchforpupneutrals").click(function(){a()}),$(document).on("click",".pup_tworemove.pupnotactive",function(){0<$(".neutralzero").length?(console.log("DO THE VIDEO FOR NEUTRALS HERE"),$(".watchforpupneutrals").hide(),$(".watchforpupspoilers").hide(),$(".pagecover").show(),$(".menudialogwatch").show(),$(".watchforpupneutrals").show()):($(".pagecover").show(),$(".menudialog.menudialogneutral").show())})})();if($(".allguesserinfo").hasClass("underwayforgiver"))h();if(GuessFuncDuring={seeguessesafter:function(){function e(e,t){$(".finalguessesshow").removeClass("finalguessesshow"),$(".word").removeClass("guesser1show").removeClass("guesser2show").removeClass("guesser3show").removeClass("guesser4show").removeClass("guesser5show").removeClass("guesser6show");for(var a=0;a<t.length;a++)$('[data-guessword="'+t[a]+'"]').addClass("guesser"+e+"show")}$(".guesswordslist").addClass("guessednotdone");for(var t=gon.guessernum,a=gon.allwords,o=gon.targetwords,s=[],n=12;n<18;n++)s.push(a[o[n]]);a[gon.badword[8]],gon.hintword1,gon.hintword2,gon.hintword3,gon.hintnum1,gon.hintnum2,gon.hintnum3;pl1words=[],pl2words=[],pl3words=[],pl4words=[],pl5words=[],pl6words=[],pl1words=$(".guesser1").attr("data-gsrwords").split(","),pl2words=$(".guesser2").attr("data-gsrwords").split(","),pl3words=$(".guesser3").attr("data-gsrwords").split(","),pl4words=$(".guesser4").attr("data-gsrwords").split(","),pl5words=$(".guesser5").attr("data-gsrwords").split(","),pl6words=$(".guesser6").attr("data-gsrwords").split(","),$(".neutralword").removeClass("neutralword"),$(".guesser1").click(function(){e(1,pl1words)}),$(".guesser2").click(function(){e(2,pl2words)}),$(".guesser3").click(function(){e(3,pl3words)}),$(".guesser4").click(function(){e(4,pl4words)}),$(".guesser5").click(function(){e(5,pl5words)}),$(".guesser6").click(function(){e(6,pl6words)}),$(".guesser"+t).click()}},$(document).on("click",".titleavatar",function(){$(".avatarlink")[0].click()}),0<$(".avatar-customize").length){var k=$(".avatar-customize").data("usercomponents").split("-");for(v=0;v<k.length;v++)$("[data-avatarcomponent='"+k[v]+"']").addClass("avactive");$(".avactive").each(function(){var e=$(this).attr("data-avatarcomponent");$(this).closest(".avatarpart").attr("data-activepart",e)});var C=$(".avatar-customize").attr("data-featscore");$(".compitem").each(function(){var e=$(this).attr("data-pointsneeded");parseInt(e)>parseInt(C)&&$(this).addClass("avlocked")});var T="",S="";$(".partbuttons a").click(function(e){if(e.preventDefault(),$(".avatar_"+T+" .avactive").hasClass("avlocked")){$(".avatar_"+T+" .avactive").removeClass("avactive");var t=$(".avatar_"+T).attr("data-activepart");$("[data-avatarcomponent='"+t+"']").addClass("avactive")}$(".partbuttons a").removeClass("avpartactive"),$(this).addClass("avpartactive"),$(".avbutton-left").removeClass("hidden"),$(".avbutton-right").removeClass("hidden"),T=$(this).attr("class").split("-")[1].replace(" avpartactive",""),S=$(".avatar_"+T+" .avactive").attr("data-compindex"),$(".compindexshow").text(S),$(".partlockedshow").addClass("hidden"),$(".avbutton-save").removeClass("disabled")}),$(".avbutton-left").click(function(e){e.preventDefault();var t=$(".avatar_"+T+" .avactive").attr("data-avatarcomponent");if($(".avatar_"+T+" .compitem").removeClass("avactive"),0<$("[data-avatarcomponent='"+t+"']").prev(".compitem").length?$("[data-avatarcomponent='"+t+"']").prev(".compitem").addClass("avactive"):$(".avatar_"+T+" .compitem").last().addClass("avactive"),S=$(".avatar_"+T+" .avactive").attr("data-compindex"),$(".compindexshow").text(S),$(".avatar_"+T+" .avactive").hasClass("avlocked")){var a=$(".avatar_"+T+" .avactive").attr("data-pointsneeded");$(".partlockedshow").removeClass("hidden"),$(".partlockedshow span").html(a+" Feat Score<br><span class='youhavetext'>(You have "+C+")</span>"),$(".avbutton-save").addClass("disabled")}else $(".partlockedshow").addClass("hidden"),$(".avbutton-save").removeClass("disabled")}),$(".avbutton-right").click(function(e){
e.preventDefault();var t=$(".avatar_"+T+" .avactive").attr("data-avatarcomponent");if($(".avatar_"+T+" .compitem").removeClass("avactive"),0<$("[data-avatarcomponent='"+t+"']").next(".compitem").length?$("[data-avatarcomponent='"+t+"']").next(".compitem").addClass("avactive"):$(".avatar_"+T+" .compitem").first().addClass("avactive"),S=$(".avatar_"+T+" .avactive").attr("data-compindex"),$(".compindexshow").text(S),$(".avatar_"+T+" .avactive").hasClass("avlocked")){var a=$(".avatar_"+T+" .avactive").attr("data-pointsneeded");$(".partlockedshow").removeClass("hidden"),$(".partlockedshow span").html(a+" Feat Score<br><span class='youhavetext'>(You have "+C+")</span>"),$(".avbutton-save").addClass("disabled")}else $(".partlockedshow").addClass("hidden"),$(".avbutton-save").removeClass("disabled")}),$(".avbutton-save").click(function(e){e.preventDefault();var t=[];$(".avatarpart").each(function(){var e=$(this).find(".compitem.avactive").attr("data-avatarcomponent");t.push(e)});var a=t.join("-");$(".avatar-customize").attr("data-usercomponents",a),$.ajax({url:"/pages/updateavatar",type:"POST",dataType:"json",data:{avstring:a}}).done(function(){$(".compindexshow").text("Saved!")}).fail(function(){G()})}),$(".avbutton-random").click(function(e){e.preventDefault(),$(".partlockedshow").addClass("hidden"),$(".compindexshow").text(""),$(".compitem").removeClass("avactive"),$(".avatarpart").each(function(){var e=$(this).find(".compitem").not(".avlocked").length,t=Math.floor(Math.random()*e);$(this).find(".compitem").not(".avlocked").eq(t).addClass("avactive");var a=$(this).find(".compitem").not(".avlocked").eq(t).attr("data-avatarcomponent");$(this).attr("data-activepart",a)}),$(".avbutton-save").removeClass("disabled")})}};$(document).ready(ready);