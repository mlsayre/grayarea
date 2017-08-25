var ready=function(){function t(){$(document).on("click",".chatopenbutton",function(){e(),"open"===$(".chatbox").attr("data-chatopen")?(clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed")):(refreshingChat=setInterval(e,5e3),$(".chatbox").attr("data-chatopen","open")),$(".chatbox").slideToggle(200),$(".chatenter").focus(),$.ajax({url:"/games/resetchatnotify",type:"POST",dataType:"json",data:{game_id:w}}),$(".unreadchats").text("")}),$(document).on("click",".messageenter",function(){var t=$(".chatenter").val();""!==t&&$.ajax({url:"/games/entermessage",type:"POST",dataType:"json",data:{message:t,game_id:w}}),$(".chatenter").val(""),e()})}function e(){var t=$(".chatcontent");t.load(g+" .chatcontent",function(){t.children(".chatcontent").unwrap()})}function o(){$(document).off("click",".chatopenbutton"),$(document).off("click",".messageenter");var e=$(".chatarea");e.load(g+" .chatarea",function(){e.children(".chatarea").unwrap()}),t()}function n(t){console.log("soundonoff running"+t),0===t?($(".soundon").text("Turn Sound On"),Howler.mute(!0)):($(".soundon").text("Turn Sound Off"),Howler.mute(!1))}function s(t){for(var e=t.length-1;e>0;e--){var o=Math.floor(Math.random()*(e+1)),n=t[e];t[e]=t[o],t[o]=n}return t}function a(t){setTimeout(function(){$(".word").eq(x[t]).removeClass("shrunken")},k+110)}function i(t,e){var o=/^[a-zA-Z\s]+$/,n=t.trim().split(/\s+/).length;return 0===t.length?(r("Please enter a hint word."),!1):t.length>28?(r("Please keep hint shorter than 29 characters. Reminder: just give one word or two words if it's somebody's name."),!1):t.match(o)?n>1?(r("Please make sure your hint is one word only."),!1):0===e?(r("Please select a number of words this hint applies to."),!1):void 0:(r("Please make sure your hint contains letters only."),!1)}function r(t){$(".messagetitle").text("Oopies!"),$(".messageinfo").text(t),$(".messageaction").html('<button class="button closemessagebox">Return to game</button>'),$(".messagesubtext").text("Push button or click anywhere outside this box to continue."),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function d(t,e){if(1===e)var o="word";else o="words";$(".messagetitle").text("Submit Hint?"),$(".messageinfo").html('You have entered the hint "'+t+'" which applies to <bold>'+e+"</bold> "+o+". Submit this hint and move to the next hint?"),$(".messageaction").html('<button class="button submithint1final">Submit Hint 1</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint1final").click(function(){$(".hint1").hide(),$(".firstinfoword").text(t),$(".firstinfonum").text(e+" "+o),$(".hint2").show(),c()}),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function u(t,e){if(1===e)var o="word";else o="words";$(".messagetitle").text("Submit Second Hint?"),$(".messageinfo").html('You have entered the hint "'+t+'" which applies to <bold>'+e+"</bold> "+o+". Submit this hint and move to the final hint?"),$(".messageaction").html('<button class="button submithint2final">Submit Hint 2</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint2final").click(function(){$(".hint2").hide(),$(".secondinfoword").text(t),$(".secondinfonum").text(e+" "+o),$(".hint3").show(),c()}),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function l(t,e){if(1===e)var n="word";else var n="words";$(".messagetitle").text("Submit Final Hint?"),$(".messageinfo").html('You have entered the hint "'+t+'" which applies to <bold>'+e+"</bold> "+n+". Submit final hint and let people play the game?"),$(".messageaction").html('<button class="button submithint3final">Submit - Ready for Players!</button><button class="button submitredo">Start Over</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submitredo").click(function(){$(".hint3").hide(),$(".hint1").show(),$(".hintenter").val(""),c()}),$(".submithint3final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(w),word1:f,word1num:T,word2:b,word2num:O,word3:p,word3num:S}}).always(function(){if(1===T)var t="word";else var t="words";if(1===O)var e="word";else var e="words";if(1===S)var n="word";else var n="words";$(".hint3").hide(),$(".hintheadline").hide(),$(".submittedword1").text(f),$(".submittednum1").text(T+" "+t),$(".submittedword2").text(b),$(".submittednum2").text(O+" "+e),$(".submittedword3").text(p),$(".submittednum3").text(S+" "+n),$(".submitted").show(),c(),0===$(".chatcontent").length&&o()})}),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function h(t){"true"===t||($(".messagetitle").text("Skip Second Hint?"),$(".messageinfo").html("No second hint needed to get all six words? Confirm to skip the second hint."),$(".messageaction").html('<button class="button submithint2final">Submit - Ready for Players!</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.")),$(".submithint2final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(w),word1:f,word1num:T,word2:b,word2num:O}}).always(function(){if(1===T)var t="word";else var t="words";if(1===O)var e="word";else var e="words";$(".hint2").hide(),$(".hintheadline").hide(),$(".submittedword1").text(f),$(".submittednum1").text(T+" "+t),$(".submittedword2").text(b),$(".submittednum2").text(O+" "+e),$(".submitted").show(),c()})}),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function c(){$(".messagebox").hide(),$(".pagecover").hide(),$(".messagetitle").html(""),$(".messageinfo").html(""),$(".messageaction").html(""),$(".messagesubtext").html("")}window.performance&&2==window.performance.navigation.type&&window.location.reload(),$(document).off("click",".chatopenbutton"),$(document).off("click",".chatclosebutton"),$(document).off("click",".messageenter"),$(document).on("click",".chatclosebutton",function(){clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed"),$(".chatbox").slideToggle(200)}),$(".startguess").click(function(){$.ajax({url:"/games/startguesser",type:"POST"})}),$(".gd").click(function(){$.ajax({url:"/games/delgame",type:"POST",dataType:"json",data:{game_id:w}}).always(function(){location.href="/main"})}),$(".menu").on("click",function(){$(".pagecover").show(),$(".menubox").show()}),$(".menuclose").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()}),$(".pagecover").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()});var m=gon.sound;n(m),$(".soundon").on("click",function(){m=1===m?0:1,n(m),$.ajax({url:"/games/soundonoff",type:"POST",dataType:"json",data:{sound:m}})}),$(".chatcontent").length>0&&t();var g=window.location.pathname;$(document).on("keypress",".chatenter",function(t){13==t.keyCode&&(t.preventDefault(),$(".messageenter").click())});var w=$(".gametop").data("gameid"),f="",b="",p="",v={0:0,1:10,2:15,3:25,4:40,5:50,6:60},y=["Keep it up!","Great work!","Keep it going!","Very nice!","Superb vocabulary!","Happy dance!","Next up!","Fantastic work!","Superb effort!","No end in sight!","This is making the highlight reel!"],x=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];x=s(x);for(var k=120,C=0;C<x.length;C++)!function(){var t=k*(C+2);x[C];if(0!==$(".allwords").length){var e=C;setTimeout(function(){0===e?(wordshow0.on("play",a(e)),wordshow0.play()):1===e?(wordshow1.on("play",a(e)),wordshow1.play()):2===e?(wordshow2.on("play",a(e)),wordshow2.play()):3===e?(wordshow3.on("play",a(e)),wordshow3.play()):4===e?(wordshow4.on("play",a(e)),wordshow4.play()):5===e?(wordshow5.on("play",a(e)),wordshow5.play()):6===e?(wordshow6.on("play",a(e)),wordshow6.play()):7===e?(wordshow7.on("play",a(e)),wordshow7.play()):8===e?(wordshow8.on("play",a(e)),wordshow8.play()):9===e?(wordshow9.on("play",a(e)),wordshow9.play()):10===e?(wordshow10.on("play",a(e)),wordshow10.play()):11===e?(wordshow11.on("play",a(e)),wordshow11.play()):12===e?(wordshow12.on("play",a(e)),wordshow12.play()):13===e?(wordshow13.on("play",a(e)),wordshow13.play()):14===e&&(wordshow14.on("play",a(e)),wordshow14.play())},t)}}();var T=0,O=0,S=0;if($(".hint1number button").on("click",function(){$(".hint1number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),T=parseInt($(this).attr("value"))}),$(".hint2number button").on("click",function(){$(".hint2number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),O=parseInt($(this).attr("value"))}),$(".hint3number button").on("click",function(){$(".hint3number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),S=parseInt($(this).attr("value"))}),$(".submithint1").click(function(){var t=$(".hint1word").val();if(!1===i(t,T))return!1;f=t.toUpperCase(),d(f,T)}),$(".submithint2").click(function(){var t=$(".hint2word").val();if(!1===i(t,O))return!1;b=t.toUpperCase(),u(b,O)}),$(".submithint3").click(function(){var t=$(".hint3word").val();if(!1===i(t,S))return!1;p=t.toUpperCase(),l(p,S)}),$(".skiphint2").click(function(){h("false")}),$(document).on("click",".returntomain",function(){window.location="/main"}),$(".hintenter").keyup(function(){$(this).val().length;$(this).val($(this).val().substring(0,28));$(this).val().length}),$(".hintenter").on("keypress",function(t){13===t.keyCode&&(t.preventDefault(),$(this).closest(".hints").find("button").first().click())}),$(".allwords").hasClass("guesswordslist")){(function(){function t(t,e,n){if(m.length>0)for(var v=0;v<m.length;v++)$("[data-guessword='"+m[v]+"']").addClass("guessedword");$(".guessedword").each(function(){var t=$(this).attr("data-guessword");-1!==s.indexOf(t)&&$(this).addClass("targetword"),a===t&&$(this).addClass("badword"),a!==t&&-1===s.indexOf(t)&&$(this).addClass("neutralword")}),P+=n;var y=x.length;if(1===f&&(P=0,y=0),$(".wordcount").text(y),$(".scorecount").text(P),$(".thehintword").text(b),$(".thehintnum").text(p),1===p)var O="word";else var O="words";if($(".thewordword").text(O),b===r?($(".skip1").text("Too risky? See final hint."),$(".hintheadline").text("Your second hint is...")):b===d&&($(".skip1").text("Too risky? End game now."),$(".hintheadline").text("Your final hint is...")),"bonus,hint2"===g&&($(".hintheadline").text("Bonus! Go for one more?"),$(".guessword").remove(),$(".guessnum").text("This first two hints were "+i+"("+u+") and "+r+"("+l+").")),"bonus,hint3"===g&&($(".hintheadline").text("Bonus! Go for one more?"),$(".guessword").remove(),$(".guessnum").text("All hints: "+i+"("+u+") and "+r+"("+l+") and "+d+"("+h+")")),"over,over"===g){$("[data-guessword]").addClass("guessedword").addClass("neutralword");for(var v=0;v<s.length;v++)$("[data-guessword='"+s[v]+"']").removeClass("neutralword").addClass("targetword");$("[data-guessword='"+a+"']").removeClass("neutralword").addClass("badword"),1===f&&(P=0),setTimeout(function(){$(".hintheading").remove(),$(".submitted").removeClass("hidden");for(var e=0;e<m.length;e++)$("[data-guessword='"+m[e]+"']").addClass("finalguessesshow");0===f&&0!==t&&gameovergoodsfx.play(),$(".finalpoints"+c).text(P+"pts")},t)}"true"!==e&&$.ajax({url:"/games/updategame",type:"POST",dataType:"json",data:{game_id:parseInt(w),guessedwords:m,guessstatus:g,gamespoiled:f,gamescore:P,hint1words:k,hint2words:C,hint3words:T}}).always(function(){0===$(".chatcontent").length&&o()})}function e(e){var o=0;m.push(e),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),-1!==s.indexOf(e)&&(x.push(e),b===i&&(k.push(e),o=v[k.length]),b===r&&(C.push(e),o=v[C.length]),b===d&&(T.push(e),o=v[T.length]),"bonus"===g.split(",")[0]&&(o=15),6===x.length?($(".gamenotify").html("You got all six words! Very difficult to do... Well done!"),resultscheersfx.play(),n(),g="over,over"):b===i&&k.length===p?($(".gamenotify").html("You found all the words for the first hint! On to the second hint..."),n(),b=r,p=l,g="hint2,word1"):b===r&&C.length===p&&k.length<u?($(".gamenotify").html("You found all the words for the first two hints! On to the final hint..."),n(),b=d,p=h,g="hint3,word1"):b===r&&C.length===p?($(".gamenotify").html("You found all the words for the second hint! Try for one bonus word?"),n("bonus"),g="bonus,hint2"):b===d&&T.length===p?($(".gamenotify").html("You found all the words for the last hint! Try for one bonus word?"),n("bonus"),g="bonus,hint3"):b===d&&T.length===p?($(".gamenotify").html("You found all the words for the last hint! Try for one bonus word?"),n("bonus"),g="bonus,hint3"):"bonus,hint2"===g?($(".gamenotify").html("You picked up a bonus word. On to the third hint..."),n(),b=d,p=h,g="hint3,word1"):"bonus,hint3"===g?($(".gamenotify").html("You picked up a bonus word. Great way to end the game!"),n(),g="over,over"):x.length<6&&($(".gamenotify").html(e+" is one of the six words you're looking for! "+y[Math.floor(Math.random()*y.length)]),n()),$("div.anim_correct").text("+"+o),$("[data-guessword='"+e+"'] .anim_correct").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+e+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+e+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+e+"'] div.animating").css("transform","translateY(-500%)").fadeOut(400,function(){$("[data-guessword='"+e+"'] div.animating").remove()})},3100),targetwordsfx.play(),t(4e3,"false",o)),a===e&&($(".gamenotify").html("Oh no! "+e+' was the "Spoiler". Game over and all points lost.'),n(),g="over,over",f=1,$("[data-guessword='"+e+"'] .anim_spoiler").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+e+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+e+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+e+"'] div.animating").css("transform","translateY(500%)").fadeOut(400,function(){$("[data-guessword='"+e+"'] div.animating").remove()})},3100),badwordsfx.play(),t(4e3)),-1===s.indexOf(e)&&a!==e&&(b===i?($(".gamenotify").html(e+" was not one of the target words. Moving on to the second hint..."),n(),b=r,p=l,g="hint2,word1"):"bonus,hint3"===g?($(".gamenotify").html(e+" was not one of the target words. Game over."),n(),g="over,over"):"bonus,hint2"===g?($(".gamenotify").html(e+" was not one of the target words. Moving on to the final hint..."),n(),b=d,p=h,g="hint3,word1"):b===r?($(".gamenotify").html(e+" was not one of the target words. Moving on to the final hint..."),n(),b=d,p=h,g="hint3,word1"):b===d&&($(".gamenotify").html(e+" was not one of the target words. Game over."),n(),g="over,over"),$("[data-guessword='"+e+"'] .anim_neutral").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+e+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+e+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+e+"'] div.animating").css("transform","translateY(200%)").fadeOut(400,function(){$("[data-guessword='"+e+"'] div.animating").remove()})},3100),neutralwordsfx.play(),t(4e3,"false",0))}function n(t){$(".hintheadline").fadeOut(125,function(){$(".gamenotify").fadeIn(125)}),S=setTimeout(function(){$(".gamenotify").fadeOut(125,function(){$(".hintheadline").fadeIn(125)}),"bonus"===t&&bonusstartsfx.play()},4e3)}var s=gon.targetwords,a=gon.badword,i=gon.hintword1,r=gon.hintword2,d=gon.hintword3,u=gon.hintnum1,l=gon.hintnum2,h=gon.hintnum3,c=gon.guessernum,m=gon.guessedwords;null===m&&(m=[]);var g=gon.guessstatus,f=gon.spoiler,b=i,p=u;"hint2"===g.split(",")[0]?(b=r,p=l):"hint3"===g.split(",")[0]&&(b=d,p=h);for(var x=[],k=gon.wordsh1,C=gon.wordsh2,T=gon.wordsh3,O=0;O<m.length;O++)-1!==s.indexOf(m[O])&&x.push(m[O]);var S,P=gon.playerscore;t(0,"true",0),$(document).on("click",".firstclick",function(){var t=$(this).find("span").text();clearTimeout(S),$(".word").removeClass("unselected"),$(".word").addClass("firstclick"),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").off("click").removeClass("reallysubmit"),$(this).find(".clickagain").addClass("wordsubmitanim"),$(this).addClass("reallysubmit").removeClass("firstclick"),$(".firstclick").addClass("unselected"),$(".reallysubmit").on("click",function(){e(t),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(".word").removeClass("unselected")})}),$(".skip1").click(function(){b===i?(b=r,p=l,g="hint2,word1"):b===r?(b=d,p=h,g="hint3,word1"):g="over,over",t(0,"false",0)})})()}if($(".allguesserinfo").hasClass("underwayforgiver")){(function(){function t(t,e){$(".word").removeClass("guesser1show").removeClass("guesser2show").removeClass("guesser3show").removeClass("guesser4show").removeClass("guesser5show").removeClass("guesser6show");for(var o=0;o<e.length;o++)$('[data-guessword="'+e[o]+'"]').addClass("guesser"+t+"show")}var e=gon.targetwords,o=gon.badword,n=(gon.hintword1,gon.hintword2,gon.hintword3,gon.hintnum1,gon.hintnum2,gon.hintnum3,gon.g1words),s=gon.g2words,a=gon.g3words,i=gon.g4words,r=gon.g5words,d=gon.g6words;$(".word").each(function(){var t=$(this).attr("data-guessword");-1!==e.indexOf(t)?$(this).addClass("targetword"):o===t&&$(this).addClass("badword")}),$(".guesser1").click(function(){t(1,n)}),$(".guesser2").click(function(){t(2,s)}),$(".guesser3").click(function(){t(3,a)}),$(".guesser4").click(function(){t(4,i)}),$(".guesser5").click(function(){t(5,r)}),$(".guesser6").click(function(){t(6,d)})})()}};$(document).on("turbolinks:load",ready);