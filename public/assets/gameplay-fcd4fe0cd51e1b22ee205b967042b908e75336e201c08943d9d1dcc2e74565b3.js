var ready=function(){function t(){$(document).on("click",".chatopenbutton",function(){e(),"open"===$(".chatbox").attr("data-chatopen")?(clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed")):(refreshingChat=setInterval(e,5e3),$(".chatbox").attr("data-chatopen","open")),$(".chatbox").slideToggle(200),$(".chatenter").focus(),$.ajax({url:"/games/resetchatnotify",type:"POST",dataType:"json",data:{game_id:g}}),$(".unreadchats").text("")}),$(document).on("click",".messageenter",function(){var t=$(".chatenter").val();""!==t&&$.ajax({url:"/games/entermessage",type:"POST",dataType:"json",data:{message:t,game_id:g}}),$(".chatenter").val(""),e()})}function e(){var t=$(".chatcontent");t.load(m+" .chatcontent",function(){t.children(".chatcontent").unwrap()})}function o(){$(document).off("click",".chatopenbutton"),$(document).off("click",".messageenter");var e=$(".chatarea");e.load(m+" .chatarea",function(){e.children(".chatarea").unwrap()}),t()}function n(t){console.log("soundonoff running"+t),0===t?($(".soundon").text("Turn Sound On"),Howler.mute(!0)):($(".soundon").text("Turn Sound Off"),Howler.mute(!1))}function a(t){for(var e=t.length-1;e>0;e--){var o=Math.floor(Math.random()*(e+1)),n=t[e];t[e]=t[o],t[o]=n}return t}function s(t){setTimeout(function(){$(".word").eq(v[t]).removeClass("shrunken")},y+110)}function i(t,e){var o=/^[a-zA-Z\s]+$/,n=t.trim().split(/\s+/).length;return 0===t.length?(r("Please enter a hint word."),!1):t.length>28?(r("Please keep hint shorter than 29 characters. Reminder: just give one word or two words if it's somebody's name."),!1):t.match(o)?n>1?(r("Please make sure your hint is one word only."),!1):0===e?(r("Please select a number of words this hint applies to."),!1):void 0:(r("Please make sure your hint contains letters only."),!1)}function r(t){$(".messagetitle").text("Oopies!"),$(".messageinfo").text(t),$(".messageaction").html('<button class="button closemessagebox">Return to game</button>'),$(".messagesubtext").text("Push button or click anywhere outside this box to continue."),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function d(t,e){if(1===e)var o="word";else o="words";$(".messagetitle").text("Submit Hint?"),$(".messageinfo").html('You have entered the hint "'+t+'" which applies to <bold>'+e+"</bold> "+o+". Submit this hint and move to the final hint?"),$(".messageaction").html('<button class="button submithint1final">Submit Hint 1</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint1final").click(function(){$(".hint1").hide(),$(".firstinfoword").text(t),$(".firstinfonum").text(e+" "+o),$(".hint2").show(),c()}),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function l(t,e){if(1===e)var n="word";else var n="words";$(".messagetitle").text("Submit Second Hint?"),$(".messageinfo").html('You have entered the hint "'+t+'" which applies to <bold>'+e+"</bold> "+n+". Submit final hint and let people play the game?"),$(".messageaction").html('<button class="button submithint2final">Submit - Ready for Players!</button><button class="button submitredo">Start Over</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submitredo").click(function(){$(".hint2").hide(),$(".hint1").show(),$(".hintenter").val(""),c()}),$(".submithint2final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(g),word1:w,word1num:k,word2:f,word2num:C}}).always(function(){if(1===k)var t="word";else var t="words";if(1===C)var e="word";else var e="words";$(".hint2").hide(),$(".hintheadline").hide(),$(".submittedword1").text(w),$(".submittednum1").text(k+" "+t),$(".submittedword2").text(f),$(".submittednum2").text(C+" "+e),$(".submitted").show(),c(),0===$(".chatcontent").length&&o()})}),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function u(t){"true"===t||($(".messagetitle").text("Skip Second Hint?"),$(".messageinfo").html("No second hint needed to get all six words? Confirm to skip the second hint."),$(".messageaction").html('<button class="button submithint2final">Submit - Ready for Players!</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.")),$(".submithint2final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(g),word1:w,word1num:k,word2:f,word2num:C}}).always(function(){if(1===k)var t="word";else var t="words";if(1===C)var e="word";else var e="words";$(".hint2").hide(),$(".hintheadline").hide(),$(".submittedword1").text(w),$(".submittednum1").text(k+" "+t),$(".submittedword2").text(f),$(".submittednum2").text(C+" "+e),$(".submitted").show(),c()})}),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function c(){$(".messagebox").hide(),$(".pagecover").hide(),$(".messagetitle").html(""),$(".messageinfo").html(""),$(".messageaction").html(""),$(".messagesubtext").html("")}window.performance&&2==window.performance.navigation.type&&window.location.reload(),$(document).off("click",".chatopenbutton"),$(document).off("click",".chatclosebutton"),$(document).off("click",".messageenter"),$(document).on("click",".chatclosebutton",function(){clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed"),$(".chatbox").slideToggle(200)}),$(".startguess").click(function(){$.ajax({url:"/games/startguesser",type:"POST"})}),$(".gd").click(function(){$.ajax({url:"/games/delgame",type:"POST",dataType:"json",data:{game_id:g}}).always(function(){location.href="/main"})}),$(".menu").on("click",function(){$(".pagecover").show(),$(".menubox").show()}),$(".menuclose").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()}),$(".pagecover").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()});var h=gon.sound;n(h),$(".soundon").on("click",function(){h=1===h?0:1,n(h),$.ajax({url:"/games/soundonoff",type:"POST",dataType:"json",data:{sound:h}})}),$(".chatcontent").length>0&&t();var m=window.location.pathname;$(document).on("keypress",".chatenter",function(t){13==t.keyCode&&(t.preventDefault(),$(".messageenter").click())});var g=$(".gametop").data("gameid"),w="",f="",b={0:0,1:10,2:20,3:35,4:50,5:70,6:100},p=["Keep it up!","Great work!","Keep it going!","Very nice!","Superb vocabulary!","Happy dance!","Next up!","Fantastic work!","Superb effort!","No end in sight!","This is making the highlight reel!"],v=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];v=a(v);for(var y=120,x=0;x<v.length;x++)!function(){var t=y*(x+2);v[x];if(0!==$(".allwords").length){var e=x;setTimeout(function(){0===e?(wordshow0.on("play",s(e)),wordshow0.play()):1===e?(wordshow1.on("play",s(e)),wordshow1.play()):2===e?(wordshow2.on("play",s(e)),wordshow2.play()):3===e?(wordshow3.on("play",s(e)),wordshow3.play()):4===e?(wordshow4.on("play",s(e)),wordshow4.play()):5===e?(wordshow5.on("play",s(e)),wordshow5.play()):6===e?(wordshow6.on("play",s(e)),wordshow6.play()):7===e?(wordshow7.on("play",s(e)),wordshow7.play()):8===e?(wordshow8.on("play",s(e)),wordshow8.play()):9===e?(wordshow9.on("play",s(e)),wordshow9.play()):10===e?(wordshow10.on("play",s(e)),wordshow10.play()):11===e?(wordshow11.on("play",s(e)),wordshow11.play()):12===e?(wordshow12.on("play",s(e)),wordshow12.play()):13===e?(wordshow13.on("play",s(e)),wordshow13.play()):14===e&&(wordshow14.on("play",s(e)),wordshow14.play())},t)}}();var k=0,C=0;if($(".hint1number button").on("click",function(){$(".hint1number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),k=parseInt($(this).attr("value"))}),$(".hint2number button").on("click",function(){$(".hint2number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),C=parseInt($(this).attr("value"))}),$(".submithint1").click(function(){var t=$(".hint1word").val();if(!1===i(t,k))return!1;w=t.toUpperCase(),d(w,k)}),$(".submithint2").click(function(){var t=$(".hint2word").val();if(!1===i(t,C))return!1;f=t.toUpperCase(),l(f,C)}),$(".skiphint2").click(function(){u("false")}),$(document).on("click",".returntomain",function(){window.location="/main"}),$(".hintenter").keyup(function(){$(this).val().length;$(this).val($(this).val().substring(0,28));$(this).val().length}),$(".hintenter").on("keypress",function(t){13===t.keyCode&&(t.preventDefault(),$(this).closest(".hints").find("button").first().click())}),$(".allwords").hasClass("guesswordslist")){(function(){function t(t,e){if(c.length>0)for(var n=0;n<c.length;n++)$("[data-guessword='"+c[n]+"']").addClass("guessedword");$(".guessedword").each(function(){var t=$(this).attr("data-guessword");-1!==a.indexOf(t)&&$(this).addClass("targetword"),s===t&&$(this).addClass("badword"),s!==t&&-1===a.indexOf(t)&&$(this).addClass("neutralword")}),T=b[y.length]-w;var p=y.length;if(1===m&&(T=0,p=0),$(".wordcount").text(p),$(".scorecount").text(T),$(".thehintword").text(f),$(".thehintnum").text(v),1===v)var x="word";else var x="words";if($(".thewordword").text(x),f===r&&($(".skip1").text("Too risky? End game now."),$(".hintheadline").text("Your final hint is...")),"bonus,bonus"===h&&($(".hintheadline").text("Extra try! Go for one more?"),$(".guessword").remove(),$(".guessnum").text("This game's hints were "+i+"("+d+") and "+r+"("+l+").")),"over,over"===h){$("[data-guessword]").addClass("guessedword").addClass("neutralword");for(var n=0;n<a.length;n++)$("[data-guessword='"+a[n]+"']").removeClass("neutralword").addClass("targetword");$("[data-guessword='"+s+"']").removeClass("neutralword").addClass("badword"),1===m&&(T=0),setTimeout(function(){$(".hintheading").remove(),$(".submitted").removeClass("hidden");for(var e=0;e<c.length;e++)$("[data-guessword='"+c[e]+"']").addClass("finalguessesshow");0===m&&0!==t&&gameovergoodsfx.play(),$(".finalpoints"+u).text(T+"pts")},t)}"true"!==e&&$.ajax({url:"/games/updategame",type:"POST",dataType:"json",data:{game_id:parseInt(g),guessedwords:c,guessstatus:h,gamespoiled:m,gamescore:T,bonuspenalty:w}}).always(function(){0===$(".chatcontent").length&&o()})}function e(e){c.push(e),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),-1!==a.indexOf(e)&&("bonus,bonus"===h&&(w=5),y.push(e),f===r&&x.push(e),f===i&&y.length===v?($(".gamenotify").html("You found all the words for the first hint! On to the second hint..."),n(),f=r,v=l,h="hint2,word1"):6===y.length?($(".gamenotify").html("You got all six words! Very difficult to do... Well done!"),resultscheersfx.play(),n(),h="over,over"):f===r&&"bonus,bonus"===h?($(".gamenotify").html("You picked up a bonus word. Nice way to end the game!"),n(),h="over,over"):f===r&&x.length===v?($(".gamenotify").html("You found all the words for the second hint! Try for one bonus word?"),n("bonus"),h="bonus,bonus"):f===r&&x.length===v+1?($(".gamenotify").html("You found all the words for the second hint!"),n(),h="over,over"):y.length<6&&($(".gamenotify").html(e+" is one of the six words you're looking for! "+p[Math.floor(Math.random()*p.length)]),n()),$("[data-guessword='"+e+"'] .anim_correct").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+e+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+e+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+e+"'] div.animating").css("transform","translateY(-500%)").fadeOut(400,function(){$("[data-guessword='"+e+"'] div.animating").remove()})},3100),targetwordsfx.play(),t(4e3)),s===e&&($(".gamenotify").html("Oh no! "+e+' was the "Spoiler". Game over and all points lost.'),n(),h="over,over",m=1,$("[data-guessword='"+e+"'] .anim_spoiler").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+e+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+e+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+e+"'] div.animating").css("transform","translateY(500%)").fadeOut(400,function(){$("[data-guessword='"+e+"'] div.animating").remove()})},3100),badwordsfx.play(),t(4e3)),-1===a.indexOf(e)&&s!==e&&(f===i?($(".gamenotify").html(e+" was not one of the target words. Moving on to the second hint..."),n(),f=r,v=l,h="hint2,word1"):f===r&&"bonus,bonus"===h?($(".gamenotify").html(e+" was not one of the target words. Game over."),n(),h="over,over"):f===r&&($(".gamenotify").html(e+" was not one of the target words. You may still try for an extra word."),n("bonus"),h="bonus,bonus"),$("[data-guessword='"+e+"'] .anim_neutral").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+e+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+e+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+e+"'] div.animating").css("transform","translateY(200%)").fadeOut(400,function(){$("[data-guessword='"+e+"'] div.animating").remove()})},3100),neutralwordsfx.play(),t(4e3))}function n(t){$(".hintheadline").fadeOut(125,function(){$(".gamenotify").fadeIn(125)}),C=setTimeout(function(){$(".gamenotify").fadeOut(125,function(){$(".hintheadline").fadeIn(125)}),"bonus"===t&&bonusstartsfx.play()},4e3)}var a=gon.targetwords,s=gon.badword,i=gon.hintword1,r=gon.hintword2,d=gon.hintnum1,l=gon.hintnum2,u=gon.guessernum,c=gon.guessedwords;null===c&&(c=[]);var h=gon.guessstatus,m=gon.spoiler,w=gon.bonuspenalty,f=i,v=d;"hint2"===h.split(",")[0]&&(f=r,v=l);for(var y=[],x=[],k=0;k<c.length;k++)-1!==a.indexOf(c[k])&&y.push(c[k]);var C,T=b[y.length]-w;t(0,"true"),$(document).on("click",".firstclick",function(){var t=$(this).find("span").text();clearTimeout(C),$(".word").removeClass("unselected"),$(".word").addClass("firstclick"),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").off("click").removeClass("reallysubmit"),$(this).find(".clickagain").addClass("wordsubmitanim"),$(this).addClass("reallysubmit").removeClass("firstclick"),$(".firstclick").addClass("unselected"),$(".reallysubmit").on("click",function(){e(t),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(".word").removeClass("unselected")})}),$(".skip1").click(function(){f===i?(f=r,v=l,h="hint2,word1"):h="over,over",t(4e3)})})()}};$(document).on("turbolinks:load",ready);