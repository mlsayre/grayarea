var ready=function(){function t(){$(document).on("click",".chatopenbutton",function(){a(),"open"===$(".chatbox").attr("data-chatopen")?(clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed")):(refreshingChat=setInterval(a,5e3),$(".chatbox").attr("data-chatopen","open")),$(".chatbox").slideToggle(200),$(".chatenter").focus(),$.ajax({url:"/games/resetchatnotify",type:"POST",dataType:"json",data:{game_id:D}}),$(".unreadchats").text("")}),$(document).on("click",".messageenter",function(){var e=$(".chatenter").val();""!==e&&$.ajax({url:"/games/entermessage",type:"POST",dataType:"json",data:{message:e,game_id:D}}),$(".chatenter").val(""),a()})}function a(){var e=$(".chatcontent");e.load(R+" .chatcontent",function(){e.children(".chatcontent").unwrap()})}function P(){$(document).off("click",".chatopenbutton"),$(document).off("click",".messageenter");var e=$(".chatarea");e.load(R+" .chatarea",function(){e.children(".chatarea").unwrap()}),t()}function e(e){0===e?($(".soundon").text("Turn Sound On"),Howler.mute(!0)):($(".soundon").text("Turn Sound Off"),Howler.mute(!1))}function o(e){for(var t=e.length-1;0<t;t--){var a=Math.floor(Math.random()*(t+1)),o=e[t];e[t]=e[a],e[a]=o}return e}function s(e){setTimeout(function(){$(".word").eq(w[e]).removeClass("shrunken")},p+110)}function n(e,t){var a=/^[a-zA-Z\s]+$/,o=e.trim().split(/\s+/).length;return 0===e.length?(i("Please enter a hint word."),!1):28<e.length?(i("Please keep hint shorter than 29 characters. Reminder: just give one word or two words if it's somebody's name."),!1):e.match(a)?1<o?(i("Please make sure your hint is one word only."),!1):0===t?(i("Please select a number of words this hint applies to."),!1):void 0:(i("Please make sure your hint contains letters only."),!1)}function i(e){$(".messagetitle").text("Oopies!"),$(".messageinfo").text(e),$(".messageaction").html('<button class="button closemessagebox">Return to game</button>'),$(".messagesubtext").text("Push button or click anywhere outside this box to continue."),$(".closemessagebox").click(function(){I()}),$(".pagecover").click(function(){I()}),$(".messagebox").show(),$(".pagecover").show()}function r(){$.ajax({url:"/games/givingdeletegame",type:"POST",dataType:"json",data:{game_id:parseInt(D)}}).done(function(){location.href="/main"}).fail(function(){j()})}function d(e,t){if(1===t)var a="word";else a="words";$(".messagetitle").text("Submit Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+a+". Submit this hint and move to the next hint?"),$(".messageaction").html('<button class="button submithint1final">Submit Hint 1</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint1final").click(function(){$(".hint1").hide(),$(".firstinfoword").text(e),$(".firstinfonum").text(t+" "+a),$(".hint2").show(),I()}),$(".closemessagebox").click(function(){I()}),$(".pagecover").click(function(){I()}),$(".messagebox").show(),$(".pagecover").show()}function l(e,t){if(1===t)var a="word";else a="words";$(".messagetitle").text("Submit Second Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+a+". Submit this hint and move to the final hint?"),$(".messageaction").html('<button class="button submithint2final">Submit Hint 2</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint2final").click(function(){$(".hint2").hide(),$(".secondinfoword").text(e),$(".secondinfonum").text(t+" "+a),$(".hint3").show(),I()}),$(".closemessagebox").click(function(){I()}),$(".pagecover").click(function(){I()}),$(".messagebox").show(),$(".pagecover").show()}function c(e,t){if(1===t)var a="word";else a="words";$(".messagetitle").text("Submit Final Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+a+". Submit final hint and let people play the game?"),$(".messageaction").html('<button class="button submithint3final">Submit - Ready for Players!</button><button class="button submitredo">Start Over</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submitredo").click(function(){$(".hint3").hide(),$(".hint1").show(),$(".hintenter").val(""),I()}),$(".submithint3final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(D),word1:g,word1num:y,word2:f,word2num:x,word3:v,word3num:k}}).always(function(){if(1===y)var e="word";else e="words";if(1===x)var t="word";else t="words";if(1===k)var a="word";else a="words";$(".hint3").hide(),$(".hintheadline").hide(),$(".submittedword1").text(g),$(".submittednum1").text(y+" "+e),$(".submittedword2").text(f),$(".submittednum2").text(x+" "+t),$(".submittedword3").text(v),$(".submittednum3").text(k+" "+a),$(".submitted").show(),$(".buttons-middle").removeClass("hidden"),I(),0===$(".chatcontent").length&&P()})}),$(".closemessagebox").click(function(){I()}),$(".pagecover").click(function(){I()}),$(".messagebox").show(),$(".pagecover").show()}function j(){$("body").html("Please check your connection. Please reload game when you have reconnected to the internet.")}function u(e){"true"===e||($(".messagetitle").text("Skip Second Hint?"),$(".messageinfo").html("No second hint needed to get all six words? Confirm to skip the second hint."),$(".messageaction").html('<button class="button submithint2final">Submit - Ready for Players!</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.")),$(".submithint2final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(D),word1:g,word1num:y,word2:f,word2num:x}}).always(function(){if(1===y)var e="word";else e="words";if(1===x)var t="word";else t="words";$(".hint2").hide(),$(".hintheadline").hide(),$(".submittedword1").text(g),$(".submittednum1").text(y+" "+e),$(".submittedword2").text(f),$(".submittednum2").text(x+" "+t),$(".submitted").show(),I()})}),$(".closemessagebox").click(function(){I()}),$(".pagecover").click(function(){I()}),$(".messagebox").show(),$(".pagecover").show()}function I(){$(".messagebox").hide(),$(".pagecover").hide(),$(".messagetitle").html(""),$(".messageinfo").html(""),$(".messageaction").html(""),$(".messagesubtext").html("")}function h(){function e(e,t){$(".word").removeClass("guesser1show").removeClass("guesser2show").removeClass("guesser3show").removeClass("guesser4show").removeClass("guesser5show").removeClass("guesser6show");for(var a=0;a<t.length;a++)$('[data-guessword="'+t[a]+'"]').addClass("guesser"+e+"show")}for(var t=gon.allwords,a=gon.targetwords,o=[],s=12;s<18;s++)o.push(t[a[s]]);var n=t[gon.badword[8]],i=(gon.hintword1,gon.hintword2,gon.hintword3,gon.hintnum1,gon.hintnum2,gon.hintnum3,gon.g1words),r=gon.g2words,d=gon.g3words,l=gon.g4words,c=gon.g5words,u=gon.g6words;$(".word").each(function(){var e=$(this).attr("data-guessword");-1!==o.indexOf(e)?$(this).addClass("targetword"):n===e&&$(this).addClass("badword")}),$(".guesser1").click(function(){e(1,i)}),$(".guesser2").click(function(){e(2,r)}),$(".guesser3").click(function(){e(3,d)}),$(".guesser4").click(function(){e(4,l)}),$(".guesser5").click(function(){e(5,c)}),$(".guesser6").click(function(){e(6,u)})}window.performance&&2==window.performance.navigation.type&&window.location.reload(),$(document).off("click",".chatopenbutton"),$(document).off("click",".chatclosebutton"),$(document).off("click",".messageenter"),$(document).on("click",".chatclosebutton",function(){clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed"),$(".chatbox").slideToggle(200)}),$(".startguess").click(function(){$.ajax({url:"/games/startguesser",type:"POST"})}),$(".contstartguess").click(function(){$.ajax({url:"/games/startguessercont",type:"POST"})}),$(".contmainplay").click(function(){$.ajax({url:"/games/startgivercont",type:"POST"})}),$(".bigplaybutton").click(function(e){e.preventDefault(),$(".pagecover").show(),$(".mainmenubuttons").show()}),$(".gd").click(function(){$.ajax({url:"/games/delgame",type:"POST",dataType:"json",data:{game_id:D}}).always(function(){location.href="/main"})}),$(".menu").on("click",function(){$(".pagecover").show(),$(".menubox").show()}),$(".menuclose").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()}),$(".pagecover").on("click",function(){$(".pagecover").hide(),$(".menubox").hide(),$(".mainmenubuttons").hide()});var m=gon.sound;e(m),$(".soundon").on("click",function(){e(m=1===m?0:1),$.ajax({url:"/games/soundonoff",type:"POST",dataType:"json",data:{sound:m}})}),0<$(".chatcontent").length&&t();var R=window.location.pathname;$(document).on("keypress",".chatenter",function(e){13==e.keyCode&&(e.preventDefault(),$(".messageenter").click())}),$(".allwords li").each(function(){-1!==$(this).find("span").text().indexOf("-")?(thetext=$(this).find("span").text().replace("-","-<br>"),$(this).find("span").html(thetext)):-1!==$(this).find("span").text().indexOf(" ")?(thetext=$(this).find("span").text().replace(" ","<br>"),$(this).find("span").html(thetext)):11===$(this).find("span").text().length?$(this).addClass("spaceword"):11<$(this).find("span").text().length&&$(this).addClass("longword")});var D=$(".gametop").data("gameid"),g="",f="",v="",F={0:0,1:10,2:15,3:25,4:40,5:50,6:60},G={0:"",1:"",2:"Two in a row!",3:"One, two, THREE!",4:"Four in a row!",5:"Five in a row!",6:"SIX in a row!!"},Y=["Keep it up!","Great work!","Keep it going!","Very nice!","Superb vocabulary!","Happy dance!","Next up!","Fantastic work!","Superb effort!","No end in sight!","This is making the highlight reel!"],w=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];w=o(w);for(var p=120,b=0;b<w.length;b++)!function(){var e=p*(b+2);w[b];if(0!==$(".allwords").length){var t=b;setTimeout(function(){0===t?(wordshow0.on("play",s(t)),wordshow0.play()):1===t?(wordshow1.on("play",s(t)),wordshow1.play()):2===t?(wordshow2.on("play",s(t)),wordshow2.play()):3===t?(wordshow3.on("play",s(t)),wordshow3.play()):4===t?(wordshow4.on("play",s(t)),wordshow4.play()):5===t?(wordshow5.on("play",s(t)),wordshow5.play()):6===t?(wordshow6.on("play",s(t)),wordshow6.play()):7===t?(wordshow7.on("play",s(t)),wordshow7.play()):8===t?(wordshow8.on("play",s(t)),wordshow8.play()):9===t?(wordshow9.on("play",s(t)),wordshow9.play()):10===t?(wordshow10.on("play",s(t)),wordshow10.play()):11===t?(wordshow11.on("play",s(t)),wordshow11.play()):12===t?(wordshow12.on("play",s(t)),wordshow12.play()):13===t?(wordshow13.on("play",s(t)),wordshow13.play()):14===t&&(wordshow14.on("play",s(t)),wordshow14.play())},e)}}();var y=0,x=0,k=0;if($(".hint1number button").on("click",function(){$(".hint1number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),y=parseInt($(this).attr("value"))}),$(".hint2number button").on("click",function(){$(".hint2number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),x=parseInt($(this).attr("value"))}),$(".hint3number button").on("click",function(){$(".hint3number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),k=parseInt($(this).attr("value"))}),$(".submithint1").click(function(){var e=$(".hint1word").val();if(!1===n(e,y))return!1;d(g=e.toUpperCase(),y)}),$(".submithint2").click(function(){var e=$(".hint2word").val();if(!1===n(e,x))return!1;l(f=e.toUpperCase(),x)}),$(".submithint3").click(function(){var e=$(".hint3word").val();if(!1===n(e,k))return!1;c(v=e.toUpperCase(),k)}),$(".skiphint2").click(function(){u("false")}),$(".deletegame").click(function(){$(".messagetitle").text("Delete game?"),$(".messageinfo").html("No good hints coming to mind? You may delete this game. Note you can only delete at most one out of every 3 games. Once you've created another 2 games, you'll be able to delete another unfinished game."),$(".messageaction").html('<button class="button deleteunfinished">Delete the Game</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".deleteunfinished").click(function(){r(),I()}),$(".closemessagebox").click(function(){I()}),$(".pagecover").click(function(){I()}),$(".messagebox").show(),$(".pagecover").show()}),$(document).on("click",".returntomain",function(){window.location="/main"}),$(".hintenter").keyup(function(){$(this).val().length;$(this).val($(this).val().substring(0,28));$(this).val().length}),$(".hintenter").on("keypress",function(e){13===e.keyCode&&(e.preventDefault(),$(this).closest(".hints").find("button").first().click())}),$(".allwords").hasClass("givewordslist")&&$(".targetword").click(function(){$(this).hasClass("tracked")?($(this).removeClass("tracked"),$(this).find(".trackedimage").remove()):($(this).addClass("tracked"),$(this).append('<img class="trackedimage" src="/assets/obj_tick.png">'))}),$(".allwords").hasClass("guesswordslist"))(function(){function o(t,e,a){if($("body").css("pointer-events","none"),0<w.length)for(var o=0;o<w.length;o++)$("[data-guessword='"+w[o]+"']").addClass("guessedword");$(".guessedword").each(function(){var e=$(this).attr("data-guessword");-1!==r.indexOf(e)&&$(this).addClass("targetword"),l===e&&$(this).addClass("badword"),l!==e&&-1===r.indexOf(e)&&$(this).addClass("neutralword")}),O+=a;var s=k.length;if(1===b&&(s=O=0),$(".wordcount").text(s),$(".scorecount").text(O),$(".thehintword").text(y),$(".thehintnum").text(x),1===x)var n="word";else n="words";if($(".thewordword").text(n),y===u?($(".skip1").text("See final hint!"),$(".hintheadline").text("Second hint")):y===h&&($(".skip1").text("End game now!"),$(".hintheadline").text("Final hint")),$(".streakwarn").hide(),"bonus,hint2"===p&&($(".hintheadline").text("Bonus! Try one more?"),$(".guessword").hide(),$(".guessnum").text("The first two hints were "+c+"("+m+") and "+u+"("+g+")."),$(".streakwarn").show()),"bonus,hint3"===p&&($(".hintheadline").text("Bonus! Try one more?"),$(".guessword").hide(),$(".guessnum").text("All hints: "+c+"("+m+") and "+u+"("+g+") and "+h+"("+f+")"),$(".streakwarn").show()),"over,over"===p){$(".bighint").html("");var i=$(".scoreSection").html();$(".bighint").html(i),$(".scoreSection").remove(),$(".hintheadline").remove(),$(".hintlabel").remove(),$(".giveravatar").remove(),$(".skip1").remove(),$("[data-guessword]").addClass("guessedword").addClass("neutralword");for(o=0;o<r.length;o++)$("[data-guessword='"+r[o]+"']").removeClass("neutralword").addClass("targetword");$("[data-guessword='"+l+"']").removeClass("neutralword").addClass("badword"),1===b&&(O=0),$(".streakwarn").hide(),setTimeout(function(){$(".hintheading").remove(),$(".submitted").removeClass("hidden");for(var e=0;e<w.length;e++)$("[data-guessword='"+w[e]+"']").addClass("finalguessesshow");0===b&&0!==t&&gameovergoodsfx.play(),!0===gon.signedin&&$(".finalpoints"+v).text(O+"pts"),$(".allguesserinfo").addClass("underwayforgiver"),$(".playedgameover").show()},t)}"true"!==e&&!0===gon.signedin?$.ajax({url:"/games/updategame",type:"POST",dataType:"json",data:{game_id:parseInt(D),guessedwords:w,guessstatus:p,gamespoiled:b,gamescore:O,hint1words:C,hint2words:T,hint3words:S}}).done(function(){if($("body").css("pointer-events","all"),0===$(".chatcontent").length&&P(),"over,over"===p){console.log("game is over, should load stuff");var e=$(".allguesserinfo");setTimeout(function(){e.load(R+" .allguesserinfo",function(){e.children(".allguesserinfo").unwrap(),GuessFuncDuring.seeguessesafter()})},600)}}).fail(function(){j(),$("body").css("pointer-events","all")}):$("body").css("pointer-events","all")}function e(e){$(".guessword").show();var t=0,a="";w.push(e),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),-1!==r.indexOf(e)&&(k.push(e),y===c&&(C.push(e),t=F[C.length],a=G[C.length]),y===u&&(T.push(e),t=F[T.length],a=G[T.length]),y===h&&(S.push(e),t=F[S.length],a=G[S.length]),"bonus"===p.split(",")[0]&&(t=5,a=""),6===k.length?($(".gamenotify").html("You got all six words! Very difficult to do... Well done!"),resultscheersfx.play(),s(),t+=25,p="over,over"):y===c&&C.length===x?($(".gamenotify").html(""),s(),n(".raRound1toRound2"),y=u,x=g,p="hint2,word1"):y===u&&T.length===x&&C.length<m?($(".gamenotify").html(""),s("bonus"),n(".raBonusstart",1e3,"bonusstart"),p="bonus,hint2"):y===u&&T.length===x?($(".gamenotify").html(""),s(),n(".raRound2toRound3"),y=h,x=f,p="hint3,word1"):y===h&&S.length===x?($(".gamenotify").html(""),s("bonus"),n(".raBonusstart",1e3,"bonusstart"),p="bonus,hint3"):"bonus,hint2"===p?($(".gamenotify").html(""),s(),n(".raBonustoRound3"),y=h,x=f,p="hint3,word1"):"bonus,hint3"===p?($(".gamenotify").html("You picked up a bonus word. Great way to end the game!"),s(),p="over,over"):k.length<6&&($(".gamenotify").html(e+" is one of the six words you're looking for! "+Y[Math.floor(Math.random()*Y.length)]),s()),$('[data-guessword="'+e+'"]').find("div.anim_correct").text("+"+t),$('[data-guessword="'+e+'"]').find("div.anim_correct.inarow").text(a),$("[data-guessword='"+e+"'] .anim_correct").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+e+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+e+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+e+"'] div.animating").css("transform","translateY(-500%)").fadeOut(400,function(){$("[data-guessword='"+e+"'] div.animating").remove()})},3100),targetwordsfx.play(),o(4e3,"false",t)),l===e&&($(".gamenotify").html("Oh no! "+e+' was the "Spoiler". Game over and all points lost.'),s(),p="over,over",b=1,$("[data-guessword='"+e+"'] .anim_spoiler").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+e+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+e+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+e+"'] div.animating").css("transform","translateY(500%)").fadeOut(400,function(){$("[data-guessword='"+e+"'] div.animating").remove()})},3100),badwordsfx.play(),o(4e3)),-1===r.indexOf(e)&&l!==e&&(y===c?($(".gamenotify").html(""),s(),n(".raRound1toRound2"),y=u,x=g,p="hint2,word1"):"bonus,hint3"===p?($(".gamenotify").html(e+" was not one of the target words. Game over."),s(),p="over,over"):"bonus,hint2"===p?($(".gamenotify").html(""),s(),n(".raBonustoRound3"),y=h,x=f,p="hint3,word1"):y===u?($(".gamenotify").html(""),s(),n(".raRound2toRound3"),y=h,x=f,p="hint3,word1"):y===h&&($(".gamenotify").html(e+" was not one of the target words. Game over."),s(),p="over,over"),$("[data-guessword='"+e+"'] .anim_neutral").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+e+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+e+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+e+"'] div.animating").css("transform","translateY(200%)").fadeOut(400,function(){$("[data-guessword='"+e+"'] div.animating").remove()})},3100),neutralwordsfx.play(),o(4e3,"false",0))}function s(){$(".gamenotify").show(),_=setTimeout(function(){$(".gamenotify").hide()},4e3)}function n(e,t,a){$(".hintlabel").css("opacity","0"),t||(t=1e3),$(".bighint").css("visibility","hidden"),"bonusstart"!==a?$(".bighint").addClass("bh_initial"):setTimeout(function(){bonusstartsfx.play()},t+360),setTimeout(function(){$(".roundannounce").fadeIn(75,function(){$(e).find(".ra_anim1").removeClass("raa1_initial"),setTimeout(function(){$(e).find(".ra_anim1").addClass("raa1_final")},1500)})},t),$(e).removeClass("hidden"),setTimeout(function(){$(".roundannounce").fadeOut(75,function(){$(".bighint").css("visibility","visible").removeClass("bh_initial"),$(".hintlabel").css("opacity","1"),$(".roundannounce div").addClass("hidden"),$(".ra_anim1").removeClass("raa1_final").addClass("raa1_initial"),$(".ra_anim2").removeClass("raa2_final").addClass("raa2_initial")}),$(".roundannounce div").addClass("hidden")},t+1800)}function t(){$.ajax({url:"/games/guessingreportgame",type:"POST",dataType:"json",data:{game_id:parseInt(D)},statusCode:{666:function(){location.href="/main"},200:function(){var e=$(".cheatstatus");e.load(R+" .cheatstatus",function(){e.children(".cheatstatus").unwrap()})}}})}for(var a=gon.allwords,i=gon.targetwords,r=[],d=12;d<18;d++)r.push(a[i[d]]);var l=a[gon.badword[8]],c=gon.hintword1,u=gon.hintword2,h=gon.hintword3,m=gon.hintnum1,g=gon.hintnum2,f=gon.hintnum3,v=gon.guessernum,w=[],p="hint1,word1";null===(w=gon.guessedwords)&&(w=[]),p=gon.guessstatus;var b=gon.spoiler,y=c,x=m;"hint2"===p.split(",")[0]?(y=u,x=g):"hint3"===p.split(",")[0]?(y=h,x=f):"bonus,hint2"==p?(y=u,x=g):"bonus,hint3"==p&&(y=h,x=f);var k=[],C=gon.wordsh1,T=gon.wordsh2,S=gon.wordsh3;for(d=0;d<w.length;d++)-1!==r.indexOf(w[d])&&k.push(w[d]);var _,O=gon.playerscore;1===gon.heartstatus&&($(".giveheart").hide(),$(".removeheart").css("display","inline-block")),$(document).on("click",".giveheart",function(){$.ajax({url:"/games/addheart",type:"POST",dataType:"json",data:{game_id:parseInt(D),heartgiven:1}}).done(function(){var e=$(".allguesserinfo");e.load(R+" .allguesserinfo",function(){e.children(".allguesserinfo").unwrap(),GuessFuncDuring.seeguessesafter(),$(".giveheart").hide(),$(".removeheartsuccess").css("display","none"),$(".giveheartsuccess").css("display","inline-block"),setTimeout(function(){$(".giveheartsuccess").fadeOut(function(){$(".removeheart").show()})},1500)})}).fail(function(){j()})}),$(document).on("click",".removeheart",function(){$.ajax({url:"/games/removeheart",type:"POST",dataType:"json",data:{game_id:parseInt(D),heartgiven:0}}).done(function(){var e=$(".allguesserinfo");e.load(R+" .allguesserinfo",function(){e.children(".allguesserinfo").unwrap(),GuessFuncDuring.seeguessesafter(),$(".giveheart").hide(),$(".removeheart").hide(),$(".giveheartsuccess").css("display","none"),$(".removeheartsuccess").css("display","inline-block"),setTimeout(function(){$(".removeheartsuccess").fadeOut(function(){$(".giveheart").show()})},1500)})}).fail(function(){j()})}),o(0,"true",0),$(document).on("click",".firstclick",function(){$(this).data("guessword");clearTimeout(_),$(".word").removeClass("unselected"),$(".word").addClass("firstclick"),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(this).find(".clickagain").addClass("wordsubmitanim"),$(this).addClass("reallysubmit").removeClass("firstclick"),$(".firstclick").addClass("unselected")}),$(document).on("click",".reallysubmit",function(){e($(this).data("guessword")),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(".word").removeClass("unselected")}),$(document).on("click",".gametop, .hintheading",function(){$(".word").addClass("firstclick"),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(".word").removeClass("unselected")}),$(".skip1").click(function(){function e(){$(".guessword").show(),y===c?(n(".raSkiphint",5),y=u,x=g,p="hint2,word1"):y===u?(n(".raSkiphint",5),y=h,x=f,p="hint3,word1"):p="over,over",o(0,"false",0)}$(".messagetitle").text("Skip hint?"),$(".messageinfo").html("Do you really want to skip this hint?"),$(".messageaction").html('<button class="button reallyskip">Skip</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".reallyskip").click(function(){e(),I()}),$(".closemessagebox").click(function(){return I(),!1}),$(".pagecover").click(function(){return I(),!1}),$(".messagebox").show(),$(".pagecover").show()}),$(".thumbdown").click(function(){$(".menubox").hide(),$(".messagetitle").text("Report game?"),$(".messageinfo").html("If this game uses hints you consider to be cheating or offensive, feel free to report it. If half of the players in the game (3) report the game, it will be deleted. <br>Current reports: "+gon.currentcheatnum),$(".messageaction").html('<button class="button reportacheat">Report the Game</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".reportacheat").click(function(){t(),I()}),$(".closemessagebox").click(function(){I()}),$(".pagecover").click(function(){I()}),$(".messagebox").show(),$(".pagecover").show()})})();if($(".allguesserinfo").hasClass("underwayforgiver"))h();if(GuessFuncDuring={seeguessesafter:function(){function e(e,t){$(".finalguessesshow").removeClass("finalguessesshow"),$(".word").removeClass("guesser1show").removeClass("guesser2show").removeClass("guesser3show").removeClass("guesser4show").removeClass("guesser5show").removeClass("guesser6show");for(var a=0;a<t.length;a++)$('[data-guessword="'+t[a]+'"]').addClass("guesser"+e+"show")}$(".guesswordslist").addClass("guessednotdone");for(var t=gon.guessernum,a=gon.allwords,o=gon.targetwords,s=[],n=12;n<18;n++)s.push(a[o[n]]);a[gon.badword[8]],gon.hintword1,gon.hintword2,gon.hintword3,gon.hintnum1,gon.hintnum2,gon.hintnum3;pl1words=[],pl2words=[],pl3words=[],pl4words=[],pl5words=[],pl6words=[],pl1words=$(".guesser1").attr("data-gsrwords").split(","),pl2words=$(".guesser2").attr("data-gsrwords").split(","),pl3words=$(".guesser3").attr("data-gsrwords").split(","),pl4words=$(".guesser4").attr("data-gsrwords").split(","),pl5words=$(".guesser5").attr("data-gsrwords").split(","),pl6words=$(".guesser6").attr("data-gsrwords").split(","),$(".neutralword").removeClass("neutralword"),$(".guesser1").click(function(){e(1,pl1words)}),$(".guesser2").click(function(){e(2,pl2words)}),$(".guesser3").click(function(){e(3,pl3words)}),$(".guesser4").click(function(){e(4,pl4words)}),$(".guesser5").click(function(){e(5,pl5words)}),$(".guesser6").click(function(){e(6,pl6words)}),$(".guesser"+t).click()}},$(document).on("click",".titleavatar",function(){$(".avatarlink")[0].click()}),0<$(".avatar-customize").length){var C=$(".avatar-customize").data("usercomponents").split("-");for(b=0;b<C.length;b++)$("[data-avatarcomponent='"+C[b]+"']").addClass("avactive");$(".avactive").each(function(){var e=$(this).attr("data-avatarcomponent");$(this).closest(".avatarpart").attr("data-activepart",e)});var T=$(".avatar-customize").attr("data-featscore");$(".compitem").each(function(){var e=$(this).attr("data-pointsneeded");parseInt(e)>parseInt(T)&&$(this).addClass("avlocked")});var S="",_="";$(".partbuttons a").click(function(e){if(e.preventDefault(),$(".avatar_"+S+" .avactive").hasClass("avlocked")){$(".avatar_"+S+" .avactive").removeClass("avactive");var t=$(".avatar_"+S).attr("data-activepart");$("[data-avatarcomponent='"+t+"']").addClass("avactive")}$(".partbuttons a").removeClass("avpartactive"),$(this).addClass("avpartactive"),$(".avbutton-left").removeClass("hidden"),$(".avbutton-right").removeClass("hidden"),S=$(this).attr("class").split("-")[1].replace(" avpartactive",""),_=$(".avatar_"+S+" .avactive").attr("data-compindex"),$(".compindexshow").text(_),$(".partlockedshow").addClass("hidden"),$(".avbutton-save").removeClass("disabled")}),$(".avbutton-left").click(function(e){e.preventDefault();var t=$(".avatar_"+S+" .avactive").attr("data-avatarcomponent");if($(".avatar_"+S+" .compitem").removeClass("avactive"),0<$("[data-avatarcomponent='"+t+"']").prev(".compitem").length?$("[data-avatarcomponent='"+t+"']").prev(".compitem").addClass("avactive"):$(".avatar_"+S+" .compitem").last().addClass("avactive"),_=$(".avatar_"+S+" .avactive").attr("data-compindex"),$(".compindexshow").text(_),$(".avatar_"+S+" .avactive").hasClass("avlocked")){var a=$(".avatar_"+S+" .avactive").attr("data-pointsneeded");$(".partlockedshow").removeClass("hidden"),$(".partlockedshow span").html(a+" Feat Score<br><span class='youhavetext'>(You have "+T+")</span>"),$(".avbutton-save").addClass("disabled")}else $(".partlockedshow").addClass("hidden"),$(".avbutton-save").removeClass("disabled")}),$(".avbutton-right").click(function(e){e.preventDefault();var t=$(".avatar_"+S+" .avactive").attr("data-avatarcomponent");if($(".avatar_"+S+" .compitem").removeClass("avactive"),0<$("[data-avatarcomponent='"+t+"']").next(".compitem").length?$("[data-avatarcomponent='"+t+"']").next(".compitem").addClass("avactive"):$(".avatar_"+S+" .compitem").first().addClass("avactive"),_=$(".avatar_"+S+" .avactive").attr("data-compindex"),$(".compindexshow").text(_),$(".avatar_"+S+" .avactive").hasClass("avlocked")){var a=$(".avatar_"+S+" .avactive").attr("data-pointsneeded");$(".partlockedshow").removeClass("hidden"),$(".partlockedshow span").html(a+" Feat Score<br><span class='youhavetext'>(You have "+T+")</span>"),$(".avbutton-save").addClass("disabled")}else $(".partlockedshow").addClass("hidden"),$(".avbutton-save").removeClass("disabled")}),$(".avbutton-save").click(function(e){e.preventDefault();var t=[];$(".avatarpart").each(function(){var e=$(this).find(".compitem.avactive").attr("data-avatarcomponent");t.push(e)});var a=t.join("-");$(".avatar-customize").attr("data-usercomponents",a),$.ajax({url:"/pages/updateavatar",type:"POST",dataType:"json",data:{avstring:a}}).done(function(){$(".compindexshow").text("Saved!")}).fail(function(){j()})}),$(".avbutton-random").click(function(e){e.preventDefault(),$(".partlockedshow").addClass("hidden"),$(".compindexshow").text(""),$(".compitem").removeClass("avactive"),$(".avatarpart").each(function(){var e=$(this).find(".compitem").not(".avlocked").length,t=Math.floor(Math.random()*e);$(this).find(".compitem").not(".avlocked").eq(t).addClass("avactive");var a=$(this).find(".compitem").not(".avlocked").eq(t).attr("data-avatarcomponent");$(this).attr("data-activepart",a)}),$(".avbutton-save").removeClass("disabled")})}};$(document).ready(ready);