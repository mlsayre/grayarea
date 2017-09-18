var ready=function(){function e(){$(document).on("click",".chatopenbutton",function(){t(),"open"===$(".chatbox").attr("data-chatopen")?(clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed")):(refreshingChat=setInterval(t,5e3),$(".chatbox").attr("data-chatopen","open")),$(".chatbox").slideToggle(200),$(".chatenter").focus(),$.ajax({url:"/games/resetchatnotify",type:"POST",dataType:"json",data:{game_id:b}}),$(".unreadchats").text("")}),$(document).on("click",".messageenter",function(){var e=$(".chatenter").val();""!==e&&$.ajax({url:"/games/entermessage",type:"POST",dataType:"json",data:{message:e,game_id:b}}),$(".chatenter").val(""),t()})}function t(){var e=$(".chatcontent");e.load(p+" .chatcontent",function(){e.children(".chatcontent").unwrap()})}function o(){$(document).off("click",".chatopenbutton"),$(document).off("click",".messageenter");var t=$(".chatarea");t.load(p+" .chatarea",function(){t.children(".chatarea").unwrap()}),e()}function n(e){0===e?($(".soundon").text("Turn Sound On"),Howler.mute(!0)):($(".soundon").text("Turn Sound Off"),Howler.mute(!1))}function s(e){for(var t=e.length-1;t>0;t--){var o=Math.floor(Math.random()*(t+1)),n=e[t];e[t]=e[o],e[o]=n}return e}function a(e){setTimeout(function(){$(".word").eq(O[e]).removeClass("shrunken")},S+110)}function i(e,t){var o=/^[a-zA-Z\s]+$/,n=e.trim().split(/\s+/).length;return 0===e.length?(r("Please enter a hint word."),!1):e.length>28?(r("Please keep hint shorter than 29 characters. Reminder: just give one word or two words if it's somebody's name."),!1):e.match(o)?n>1?(r("Please make sure your hint is one word only."),!1):0===t?(r("Please select a number of words this hint applies to."),!1):void 0:(r("Please make sure your hint contains letters only."),!1)}function r(e){$(".messagetitle").text("Oopies!"),$(".messageinfo").text(e),$(".messageaction").html('<button class="button closemessagebox">Return to game</button>'),$(".messagesubtext").text("Push button or click anywhere outside this box to continue."),$(".closemessagebox").click(function(){m()}),$(".pagecover").click(function(){m()}),$(".messagebox").show(),$(".pagecover").show()}function l(){$.ajax({url:"/games/givingdeletegame",type:"POST",dataType:"json",data:{game_id:parseInt(b)}}).done(function(){location.href="/main"}).fail(function(){h()})}function d(e,t){if(1===t)var o="word";else o="words";$(".messagetitle").text("Submit Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+o+". Submit this hint and move to the next hint?"),$(".messageaction").html('<button class="button submithint1final">Submit Hint 1</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint1final").click(function(){$(".hint1").hide(),$(".firstinfoword").text(e),$(".firstinfonum").text(t+" "+o),$(".hint2").show(),m()}),$(".closemessagebox").click(function(){m()}),$(".pagecover").click(function(){m()}),$(".messagebox").show(),$(".pagecover").show()}function u(e,t){if(1===t)var o="word";else o="words";$(".messagetitle").text("Submit Second Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+o+". Submit this hint and move to the final hint?"),$(".messageaction").html('<button class="button submithint2final">Submit Hint 2</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint2final").click(function(){$(".hint2").hide(),$(".secondinfoword").text(e),$(".secondinfonum").text(t+" "+o),$(".hint3").show(),m()}),$(".closemessagebox").click(function(){m()}),$(".pagecover").click(function(){m()}),$(".messagebox").show(),$(".pagecover").show()}function c(e,t){if(1===t)var n="word";else var n="words";$(".messagetitle").text("Submit Final Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+n+". Submit final hint and let people play the game?"),$(".messageaction").html('<button class="button submithint3final">Submit - Ready for Players!</button><button class="button submitredo">Start Over</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submitredo").click(function(){$(".hint3").hide(),$(".hint1").show(),$(".hintenter").val(""),m()}),$(".submithint3final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(b),word1:v,word1num:j,word2:y,word2num:I,word3:x,word3num:Y}}).always(function(){if(1===j)var e="word";else var e="words";if(1===I)var t="word";else var t="words";if(1===Y)var n="word";else var n="words";$(".hint3").hide(),$(".hintheadline").hide(),$(".submittedword1").text(v),$(".submittednum1").text(j+" "+e),$(".submittedword2").text(y),$(".submittednum2").text(I+" "+t),$(".submittedword3").text(x),$(".submittednum3").text(Y+" "+n),$(".submitted").show(),m(),0===$(".chatcontent").length&&o()})}),$(".closemessagebox").click(function(){m()}),$(".pagecover").click(function(){m()}),$(".messagebox").show(),$(".pagecover").show()}function h(){$("body").html("Please check your connection. Please reload game when you have reconnected to the internet.")}function g(e){"true"===e||($(".messagetitle").text("Skip Second Hint?"),$(".messageinfo").html("No second hint needed to get all six words? Confirm to skip the second hint."),$(".messageaction").html('<button class="button submithint2final">Submit - Ready for Players!</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.")),$(".submithint2final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(b),word1:v,word1num:j,word2:y,word2num:I}}).always(function(){if(1===j)var e="word";else var e="words";if(1===I)var t="word";else var t="words";$(".hint2").hide(),$(".hintheadline").hide(),$(".submittedword1").text(v),$(".submittednum1").text(j+" "+e),$(".submittedword2").text(y),$(".submittednum2").text(I+" "+t),$(".submitted").show(),m()})}),$(".closemessagebox").click(function(){m()}),$(".pagecover").click(function(){m()}),$(".messagebox").show(),$(".pagecover").show()}function m(){$(".messagebox").hide(),$(".pagecover").hide(),$(".messagetitle").html(""),$(".messageinfo").html(""),$(".messageaction").html(""),$(".messagesubtext").html("")}function w(){function e(e,t){$(".word").removeClass("guesser1show").removeClass("guesser2show").removeClass("guesser3show").removeClass("guesser4show").removeClass("guesser5show").removeClass("guesser6show");for(var o=0;o<t.length;o++)$('[data-guessword="'+t[o]+'"]').addClass("guesser"+e+"show")}for(var t=gon.allwords,o=gon.targetwords,n=[],s=12;s<18;s++)n.push(t[o[s]]);var a=gon.badword,i=t[a[8]],r=(gon.hintword1,gon.hintword2,gon.hintword3,gon.hintnum1,gon.hintnum2,gon.hintnum3,gon.g1words),l=gon.g2words,d=gon.g3words,u=gon.g4words,c=gon.g5words,h=gon.g6words;$(".word").each(function(){var e=$(this).attr("data-guessword");-1!==n.indexOf(e)?$(this).addClass("targetword"):i===e&&$(this).addClass("badword")}),$(".guesser1").click(function(){e(1,r)}),$(".guesser2").click(function(){e(2,l)}),$(".guesser3").click(function(){e(3,d)}),$(".guesser4").click(function(){e(4,u)}),$(".guesser5").click(function(){e(5,c)}),$(".guesser6").click(function(){e(6,h)})}window.performance&&2==window.performance.navigation.type&&window.location.reload(),$(document).off("click",".chatopenbutton"),$(document).off("click",".chatclosebutton"),$(document).off("click",".messageenter"),$(document).on("click",".chatclosebutton",function(){clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed"),$(".chatbox").slideToggle(200)}),$(".startguess").click(function(){$.ajax({url:"/games/startguesser",type:"POST"})}),$(".gd").click(function(){$.ajax({url:"/games/delgame",type:"POST",dataType:"json",data:{game_id:b}}).always(function(){location.href="/main"})}),$(".menu").on("click",function(){$(".pagecover").show(),$(".menubox").show()}),$(".menuclose").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()}),$(".pagecover").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()}),$(".opensettings").click(function(e){e.preventDefault(),$(".settingsbox").addClass("boxin")}),$(".settingsclosebutton").click(function(){$(".settingsbox").removeClass("boxin")});var f=gon.sound;n(f),$(".soundon").on("click",function(){f=1===f?0:1,n(f),$.ajax({url:"/games/soundonoff",type:"POST",dataType:"json",data:{sound:f}})}),$(".chatcontent").length>0&&e();var p=window.location.pathname;$(document).on("keypress",".chatenter",function(e){13==e.keyCode&&(e.preventDefault(),$(".messageenter").click())}),function(){$(".allwords li").each(function(){-1!==$(this).find("span").text().indexOf("-")?(thetext=$(this).find("span").text().replace("-","-<br>"),$(this).find("span").html(thetext)):-1!==$(this).find("span").text().indexOf(" ")?$(this).addClass("spaceword"):11===$(this).find("span").text().length?$(this).addClass("spaceword"):$(this).find("span").text().length>11&&$(this).addClass("longword")})}();var b=$(".gametop").data("gameid"),v="",y="",x="",k={0:0,1:10,2:15,3:25,4:40,5:50,6:60},C={0:"",1:"",2:"Two in a row!",3:"One, two, THREE!",4:"Four in a row!",5:"Five in a row!",6:"SIX in a row!!"},T=["Keep it up!","Great work!","Keep it going!","Very nice!","Superb vocabulary!","Happy dance!","Next up!","Fantastic work!","Superb effort!","No end in sight!","This is making the highlight reel!"],O=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];O=s(O);for(var S=120,P=0;P<O.length;P++)!function(){var e=S*(P+2);O[P];if(0!==$(".allwords").length){var t=P;setTimeout(function(){0===t?(wordshow0.on("play",a(t)),wordshow0.play()):1===t?(wordshow1.on("play",a(t)),wordshow1.play()):2===t?(wordshow2.on("play",a(t)),wordshow2.play()):3===t?(wordshow3.on("play",a(t)),wordshow3.play()):4===t?(wordshow4.on("play",a(t)),wordshow4.play()):5===t?(wordshow5.on("play",a(t)),wordshow5.play()):6===t?(wordshow6.on("play",a(t)),wordshow6.play()):7===t?(wordshow7.on("play",a(t)),wordshow7.play()):8===t?(wordshow8.on("play",a(t)),wordshow8.play()):9===t?(wordshow9.on("play",a(t)),wordshow9.play()):10===t?(wordshow10.on("play",a(t)),wordshow10.play()):11===t?(wordshow11.on("play",a(t)),wordshow11.play()):12===t?(wordshow12.on("play",a(t)),wordshow12.play()):13===t?(wordshow13.on("play",a(t)),wordshow13.play()):14===t&&(wordshow14.on("play",a(t)),wordshow14.play())},e)}}();var j=0,I=0,Y=0;if($(".hint1number button").on("click",function(){$(".hint1number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),j=parseInt($(this).attr("value"))}),$(".hint2number button").on("click",function(){$(".hint2number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),I=parseInt($(this).attr("value"))}),$(".hint3number button").on("click",function(){$(".hint3number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),Y=parseInt($(this).attr("value"))}),$(".submithint1").click(function(){var e=$(".hint1word").val();if(!1===i(e,j))return!1;v=e.toUpperCase(),d(v,j)}),$(".submithint2").click(function(){var e=$(".hint2word").val();if(!1===i(e,I))return!1;y=e.toUpperCase(),u(y,I)}),$(".submithint3").click(function(){var e=$(".hint3word").val();if(!1===i(e,Y))return!1;x=e.toUpperCase(),c(x,Y)}),$(".skiphint2").click(function(){g("false")}),$(".deletegame").click(function(){$(".messagetitle").text("Delete game?"),$(".messageinfo").html("No good hints coming to mind? You may delete this game. Note you can only delete at most one out of every 4 games. Once you've created another 3 games, you'll be able to delete another unfinished game."),$(".messageaction").html('<button class="button deleteunfinished">Delete the Game</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".deleteunfinished").click(function(){l(),m()}),$(".closemessagebox").click(function(){m()}),$(".pagecover").click(function(){m()}),$(".messagebox").show(),$(".pagecover").show()}),$(document).on("click",".returntomain",function(){window.location="/main"}),$(".hintenter").keyup(function(){$(this).val().length;$(this).val($(this).val().substring(0,28));$(this).val().length}),$(".hintenter").on("keypress",function(e){13===e.keyCode&&(e.preventDefault(),$(this).closest(".hints").find("button").first().click())}),$(".allwords").hasClass("guesswordslist")){(function(){function e(e,t,n){if(O.length>0)for(var s=0;s<O.length;s++)$("[data-guessword='"+O[s]+"']").addClass("guessedword");$(".guessedword").each(function(){var e=$(this).attr("data-guessword");-1!==r.indexOf(e)&&$(this).addClass("targetword"),u===e&&$(this).addClass("badword"),u!==e&&-1===r.indexOf(e)&&$(this).addClass("neutralword")}),F+=n;var a=Y.length;if(1===P&&(F=0,a=0),$(".wordcount").text(a),$(".scorecount").text(F),$(".thehintword").text(j),$(".thehintnum").text(I),1===I)var i="word";else var i="words";if($(".thewordword").text(i),j===g?($(".skip1").text("Too risky? See final hint."),$(".hintheadline").text("Your second hint is...")):j===w&&($(".skip1").text("Too risky? End game now."),$(".hintheadline").text("Your final hint is...")),"bonus,hint2"===S&&($(".hintheadline").text("Bonus! Go for one more?"),$(".guessword").hide(),$(".guessnum").text("This first two hints were "+c+"("+f+") and "+g+"("+v+").")),"bonus,hint3"===S&&($(".hintheadline").text("Bonus! Go for one more?"),$(".guessword").hide(),$(".guessnum").text("All hints: "+c+"("+f+") and "+g+"("+v+") and "+w+"("+y+")")),"over,over"===S){$(".skip1").remove(),$("[data-guessword]").addClass("guessedword").addClass("neutralword");for(var s=0;s<r.length;s++)$("[data-guessword='"+r[s]+"']").removeClass("neutralword").addClass("targetword");$("[data-guessword='"+u+"']").removeClass("neutralword").addClass("badword"),1===P&&(F=0),setTimeout(function(){$(".hintheading").remove(),$(".submitted").removeClass("hidden");for(var t=0;t<O.length;t++)$("[data-guessword='"+O[t]+"']").addClass("finalguessesshow");0===P&&0!==e&&gameovergoodsfx.play(),!0===gon.signedin&&$(".finalpoints"+x).text(F+"pts"),$(".allguesserinfo").addClass("underwayforgiver")},e)}"true"!==t&&!0===gon.signedin&&$.ajax({url:"/games/updategame",type:"POST",dataType:"json",data:{game_id:parseInt(b),guessedwords:O,guessstatus:S,gamespoiled:P,gamescore:F,hint1words:_,hint2words:G,hint3words:H}}).always(function(){if(0===$(".chatcontent").length&&o(),"over,over"===S){console.log("game is over, should load stuff");var e=$(".allguesserinfo");e.load(p+" .allguesserinfo",function(){e.children(".allguesserinfo").unwrap(),GuessFuncDuring.seeguessesafter()})}})}function t(t){$(".guessword").show();var o=0,s="";O.push(t),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),-1!==r.indexOf(t)&&(Y.push(t),j===c&&(_.push(t),o=k[_.length],s=C[_.length]),j===g&&(G.push(t),o=k[G.length],s=C[G.length]),j===w&&(H.push(t),o=k[H.length],s=C[H.length]),"bonus"===S.split(",")[0]&&(o=5,s=""),6===Y.length?($(".gamenotify").html("You got all six words! Very difficult to do... Well done!"),resultscheersfx.play(),n(),S="over,over"):j===c&&_.length===I?($(".gamenotify").html("You found all the words for the first hint! On to the second hint..."),n(),j=g,I=v,S="hint2,word1"):j===g&&G.length===I&&_.length<f?($(".gamenotify").html("You found all the words for the second hint! Try for one bonus word?"),n("bonus"),S="bonus,hint2"):j===g&&G.length===I?($(".gamenotify").html("You found all the words for the first two hints! On to the final hint..."),n(),j=w,I=y,S="hint3,word1"):j===w&&H.length===I?($(".gamenotify").html("You found all the words for the last hint! Try for one bonus word?"),n("bonus"),S="bonus,hint3"):j===w&&H.length===I?($(".gamenotify").html("You found all the words for the last hint! Try for one bonus word?"),n("bonus"),S="bonus,hint3"):"bonus,hint2"===S?($(".gamenotify").html("You picked up a bonus word. On to the third hint..."),n(),j=w,I=y,S="hint3,word1"):"bonus,hint3"===S?($(".gamenotify").html("You picked up a bonus word. Great way to end the game!"),n(),S="over,over"):Y.length<6&&($(".gamenotify").html(t+" is one of the six words you're looking for! "+T[Math.floor(Math.random()*T.length)]),n()),$('[data-guessword="'+t+'"]').find("div.anim_correct").text("+"+o),$('[data-guessword="'+t+'"]').find("div.anim_correct.inarow").text(s),$("[data-guessword='"+t+"'] .anim_correct").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(-500%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),targetwordsfx.play(),e(4e3,"false",o)),u===t&&($(".gamenotify").html("Oh no! "+t+' was the "Spoiler". Game over and all points lost.'),n(),S="over,over",P=1,$("[data-guessword='"+t+"'] .anim_spoiler").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(500%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),badwordsfx.play(),e(4e3)),-1===r.indexOf(t)&&u!==t&&(j===c?($(".gamenotify").html(t+" was not one of the target words. Moving on to the second hint..."),n(),j=g,I=v,S="hint2,word1"):"bonus,hint3"===S?($(".gamenotify").html(t+" was not one of the target words. Game over."),n(),S="over,over"):"bonus,hint2"===S?($(".gamenotify").html(t+" was not one of the target words. Moving on to the final hint..."),n(),j=w,I=y,S="hint3,word1"):j===g?($(".gamenotify").html(t+" was not one of the target words. Moving on to the final hint..."),n(),j=w,I=y,S="hint3,word1"):j===w&&($(".gamenotify").html(t+" was not one of the target words. Game over."),n(),S="over,over"),$("[data-guessword='"+t+"'] .anim_neutral").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(200%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),neutralwordsfx.play(),e(4e3,"false",0))}function n(e){$(".hintheadline").fadeOut(125,function(){$(".gamenotify").fadeIn(125)}),D=setTimeout(function(){$(".gamenotify").fadeOut(125,function(){$(".hintheadline").fadeIn(125)}),"bonus"===e&&bonusstartsfx.play()},4e3)}function s(){$.ajax({url:"/games/guessingreportgame",type:"POST",dataType:"json",data:{game_id:parseInt(b)},statusCode:{666:function(){location.href="/main"},200:function(){var e=$(".cheatstatus");e.load(p+" .cheatstatus",function(){e.children(".cheatstatus").unwrap()})}}})}for(var a=gon.allwords,i=gon.targetwords,r=[],l=12;l<18;l++)r.push(a[i[l]]);var d=gon.badword,u=a[d[8]],c=gon.hintword1,g=gon.hintword2,w=gon.hintword3,f=gon.hintnum1,v=gon.hintnum2,y=gon.hintnum3,x=gon.guessernum,O=gon.guessedwords;null===O&&(O=[]);var S=gon.guessstatus,P=gon.spoiler,j=c,I=f;"hint2"===S.split(",")[0]?(j=g,I=v):"hint3"===S.split(",")[0]?(j=w,I=y):"bonus,hint2"==S?(j=g,I=v):"bonus,hint3"==S&&(j=w,I=y);for(var Y=[],_=gon.wordsh1,G=gon.wordsh2,H=gon.wordsh3,l=0;l<O.length;l++)-1!==r.indexOf(O[l])&&Y.push(O[l]);var D,F=gon.playerscore;1===gon.heartstatus&&$(".giveheart").remove(),$(".giveheart").click(function(){$.ajax({url:"/games/addheart",type:"POST",dataType:"json",data:{game_id:parseInt(b),heartgiven:1}}).done(function(){$(".giveheart").remove(),$(".giveheartsuccess").css("display","block");var e=$(".allguesserinfo");e.load(p+" .allguesserinfo",function(){e.children(".allguesserinfo").unwrap(),GuessFuncDuring.seeguessesafter()}),setTimeout(function(){$(".giveheartsuccess").fadeOut()},3500)}).fail(function(){h()})}),e(0,"true",0),$(document).on("click",".firstclick",function(){var e=$(this).find("span").text();clearTimeout(D),$(".word").removeClass("unselected"),$(".word").addClass("firstclick"),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").off("click").removeClass("reallysubmit"),$(this).find(".clickagain").addClass("wordsubmitanim"),$(this).addClass("reallysubmit").removeClass("firstclick"),$(".firstclick").addClass("unselected"),$(".reallysubmit").on("click",function(){t(e),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(".word").removeClass("unselected")})}),$(".skip1").click(function(){$(".guessword").show(),j===c?(j=g,I=v,S="hint2,word1"):j===g?(j=w,I=y,S="hint3,word1"):S="over,over",e(0,"false",0)}),$(".thumbdown").click(function(){$(".messagetitle").text("Report game?"),$(".messageinfo").html("If this game uses hints you consider to be cheating or offensive, feel free to report it. If half of the players in the game (3) report the game, it will be deleted. <br>Current reports: "+gon.currentcheatnum),$(".messageaction").html('<button class="button reportacheat">Report the Game</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".reportacheat").click(function(){s(),m()}),$(".closemessagebox").click(function(){m()}),$(".pagecover").click(function(){m()}),$(".messagebox").show(),$(".pagecover").show()})})()}if($(".allguesserinfo").hasClass("underwayforgiver")){(function(){w()})()}GuessFuncDuring={seeguessesafter:function(){function e(e,t){$(".finalguessesshow").removeClass("finalguessesshow"),$(".word").removeClass("guesser1show").removeClass("guesser2show").removeClass("guesser3show").removeClass("guesser4show").removeClass("guesser5show").removeClass("guesser6show");for(var o=0;o<t.length;o++)$('[data-guessword="'+t[o]+'"]').addClass("guesser"+e+"show")}$(".guesswordslist").addClass("guessednotdone");for(var t=gon.guessernum,o=gon.allwords,n=gon.targetwords,s=[],a=12;a<18;a++)s.push(o[n[a]]);var i=gon.badword;o[i[8]],gon.hintword1,gon.hintword2,gon.hintword3,gon.hintnum1,gon.hintnum2,gon.hintnum3;pl1words=[],pl2words=[],pl3words=[],pl4words=[],pl5words=[],pl6words=[],pl1words=$(".guesser1").attr("data-gsrwords").split(","),pl2words=$(".guesser2").attr("data-gsrwords").split(","),pl3words=$(".guesser3").attr("data-gsrwords").split(","),pl4words=$(".guesser4").attr("data-gsrwords").split(","),pl5words=$(".guesser5").attr("data-gsrwords").split(","),pl6words=$(".guesser6").attr("data-gsrwords").split(","),$(".neutralword").removeClass("neutralword"),$(".guesser1").click(function(){e(1,pl1words)}),$(".guesser2").click(function(){e(2,pl2words)}),$(".guesser3").click(function(){e(3,pl3words)}),$(".guesser4").click(function(){e(4,pl4words)}),$(".guesser5").click(function(){e(5,pl5words)}),$(".guesser6").click(function(){e(6,pl6words)}),$(".guesser"+t).click()}}};$(document).on("turbolinks:load",ready);