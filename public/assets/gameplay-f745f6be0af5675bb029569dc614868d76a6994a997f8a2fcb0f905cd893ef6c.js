var ready=function(){function e(){$(document).on("click",".chatopenbutton",function(){t(),"open"===$(".chatbox").attr("data-chatopen")?(clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed")):(refreshingChat=setInterval(t,5e3),$(".chatbox").attr("data-chatopen","open")),$(".chatbox").slideToggle(200),$(".chatenter").focus(),$.ajax({url:"/games/resetchatnotify",type:"POST",dataType:"json",data:{game_id:g}}),$(".unreadchats").text("")}),$(document).on("click",".messageenter",function(){var e=$(".chatenter").val();""!==e&&$.ajax({url:"/games/entermessage",type:"POST",dataType:"json",data:{message:e,game_id:g}}),$(".chatenter").val(""),t()})}function t(){var e=$(".chatcontent");e.load(m+" .chatcontent",function(){e.children(".chatcontent").unwrap()})}function o(){$(document).off("click",".chatopenbutton"),$(document).off("click",".messageenter");var t=$(".chatarea");t.load(m+" .chatarea",function(){t.children(".chatarea").unwrap()}),e()}function n(e){console.log("soundonoff running"+e),0===e?($(".soundon").text("Turn Sound On"),Howler.mute(!0)):($(".soundon").text("Turn Sound Off"),Howler.mute(!1))}function s(e){for(var t=e.length-1;t>0;t--){var o=Math.floor(Math.random()*(t+1)),n=e[t];e[t]=e[o],e[o]=n}return e}function a(e){setTimeout(function(){$(".word").eq(v[e]).removeClass("shrunken")},y+110)}function i(e,t){var o=/^[a-zA-Z\s]+$/,n=e.trim().split(/\s+/).length;return 0===e.length?(r("Please enter a hint word."),!1):e.length>28?(r("Please keep hint shorter than 29 characters. Reminder: just give one word or two words if it's somebody's name."),!1):e.match(o)?n>1?(r("Please make sure your hint is one word only."),!1):0===t?(r("Please select a number of words this hint applies to."),!1):void 0:(r("Please make sure your hint contains letters only."),!1)}function r(e){$(".messagetitle").text("Oopies!"),$(".messageinfo").text(e),$(".messageaction").html('<button class="button closemessagebox">Return to game</button>'),$(".messagesubtext").text("Push button or click anywhere outside this box to continue."),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function d(e,t){if(1===t)var o="word";else o="words";$(".messagetitle").text("Submit Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+o+". Submit this hint and move to the final hint?"),$(".messageaction").html('<button class="button submithint1final">Submit Hint 1</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint1final").click(function(){$(".hint1").hide(),$(".firstinfoword").text(e),$(".firstinfonum").text(t+" "+o),$(".hint2").show(),c()}),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function u(e,t){if(1===t)var n="word";else var n="words";$(".messagetitle").text("Submit Second Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+n+". Submit final hint and let people play the game?"),$(".messageaction").html('<button class="button submithint2final">Submit - Ready for Players!</button><button class="button submitredo">Start Over</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submitredo").click(function(){$(".hint2").hide(),$(".hint1").show(),$(".hintenter").val(""),c()}),$(".submithint2final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(g),word1:w,word1num:k,word2:f,word2num:C}}).always(function(){if(1===k)var e="word";else var e="words";if(1===C)var t="word";else var t="words";$(".hint2").hide(),$(".hintheadline").hide(),$(".submittedword1").text(w),$(".submittednum1").text(k+" "+e),$(".submittedword2").text(f),$(".submittednum2").text(C+" "+t),$(".submitted").show(),c(),0===$(".chatcontent").length&&o()})}),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function l(e){"true"===e||($(".messagetitle").text("Skip Second Hint?"),$(".messageinfo").html("No second hint needed to get all six words? Confirm to skip the second hint."),$(".messageaction").html('<button class="button submithint2final">Submit - Ready for Players!</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.")),$(".submithint2final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(g),word1:w,word1num:k,word2:f,word2num:C}}).always(function(){if(1===k)var e="word";else var e="words";if(1===C)var t="word";else var t="words";$(".hint2").hide(),$(".hintheadline").hide(),$(".submittedword1").text(w),$(".submittednum1").text(k+" "+e),$(".submittedword2").text(f),$(".submittednum2").text(C+" "+t),$(".submitted").show(),c()})}),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function c(){$(".messagebox").hide(),$(".pagecover").hide(),$(".messagetitle").html(""),$(".messageinfo").html(""),$(".messageaction").html(""),$(".messagesubtext").html("")}window.performance&&2==window.performance.navigation.type&&window.location.reload(),$(document).off("click",".chatopenbutton"),$(document).off("click",".chatclosebutton"),$(document).off("click",".messageenter"),$(document).on("click",".chatclosebutton",function(){clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed"),$(".chatbox").slideToggle(200)}),$(".startguess").click(function(){$.ajax({url:"/games/startguesser",type:"POST"})}),$(".gd").click(function(){$.ajax({url:"/games/delgame",type:"POST",dataType:"json",data:{game_id:g}}).always(function(){location.href="/main"})}),$(".menu").on("click",function(){$(".pagecover").show(),$(".menubox").show()}),$(".menuclose").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()}),$(".pagecover").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()});var h=gon.sound;n(h),$(".soundon").on("click",function(){h=1===h?0:1,n(h),$.ajax({url:"/games/soundonoff",type:"POST",dataType:"json",data:{sound:h}})}),$(".chatcontent").length>0&&e();var m=window.location.pathname;$(document).on("keypress",".chatenter",function(e){13==e.keyCode&&(e.preventDefault(),$(".messageenter").click())});var g=$(".gametop").data("gameid"),w="",f="",b={0:0,1:10,2:20,3:35,4:50,5:70,6:100},p=["Keep it up!","Great work!","Keep it going!","Very nice!","Superb vocabulary!","Happy dance!","Next up!","Fantastic work!","Superb effort!","No end in sight!","This is making the highlight reel!"],v=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];v=s(v);for(var y=120,x=0;x<v.length;x++)!function(){var e=y*(x+2);v[x];if(0!==$(".allwords").length){var t=x;setTimeout(function(){0===t?(wordshow0.on("play",a(t)),wordshow0.play()):1===t?(wordshow1.on("play",a(t)),wordshow1.play()):2===t?(wordshow2.on("play",a(t)),wordshow2.play()):3===t?(wordshow3.on("play",a(t)),wordshow3.play()):4===t?(wordshow4.on("play",a(t)),wordshow4.play()):5===t?(wordshow5.on("play",a(t)),wordshow5.play()):6===t?(wordshow6.on("play",a(t)),wordshow6.play()):7===t?(wordshow7.on("play",a(t)),wordshow7.play()):8===t?(wordshow8.on("play",a(t)),wordshow8.play()):9===t?(wordshow9.on("play",a(t)),wordshow9.play()):10===t?(wordshow10.on("play",a(t)),wordshow10.play()):11===t?(wordshow11.on("play",a(t)),wordshow11.play()):12===t?(wordshow12.on("play",a(t)),wordshow12.play()):13===t?(wordshow13.on("play",a(t)),wordshow13.play()):14===t&&(wordshow14.on("play",a(t)),wordshow14.play())},e)}}();var k=0,C=0;if($(".hint1number button").on("click",function(){$(".hint1number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),k=parseInt($(this).attr("value"))}),$(".hint2number button").on("click",function(){$(".hint2number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),C=parseInt($(this).attr("value"))}),$(".submithint1").click(function(){var e=$(".hint1word").val();if(!1===i(e,k))return!1;w=e.toUpperCase(),d(w,k)}),$(".submithint2").click(function(){var e=$(".hint2word").val();if(!1===i(e,C))return!1;f=e.toUpperCase(),u(f,C)}),$(".skiphint2").click(function(){l("false")}),$(document).on("click",".returntomain",function(){window.location="/main"}),$(".hintenter").keyup(function(){$(this).val().length;$(this).val($(this).val().substring(0,28));$(this).val().length}),$(".hintenter").on("keypress",function(e){13===e.keyCode&&(e.preventDefault(),$(this).closest(".hints").find("button").first().click())}),$(".allwords").hasClass("guesswordslist")){(function(){function e(e,t){if(c.length>0)for(var n=0;n<c.length;n++)$("[data-guessword='"+c[n]+"']").addClass("guessedword");$(".guessedword").each(function(){var e=$(this).attr("data-guessword");-1!==s.indexOf(e)&&$(this).addClass("targetword"),a===e&&$(this).addClass("badword"),a!==e&&-1===s.indexOf(e)&&$(this).addClass("neutralword")}),T=b[y.length]-w;var p=y.length;if(1===m&&(T=0,p=0),$(".wordcount").text(p),$(".scorecount").text(T),$(".thehintword").text(f),$(".thehintnum").text(v),1===v)var x="word";else var x="words";if($(".thewordword").text(x),f===r&&($(".skip1").text("Too risky? End game now."),$(".hintheadline").text("Your final hint is...")),"bonus,bonus"===h&&($(".hintheadline").text("Extra try! Go for one more?"),$(".guessword").remove(),$(".guessnum").text("This game's hints were "+i+"("+d+") and "+r+"("+u+").")),"over,over"===h){$("[data-guessword]").addClass("guessedword").addClass("neutralword");for(var n=0;n<s.length;n++)$("[data-guessword='"+s[n]+"']").removeClass("neutralword").addClass("targetword");$("[data-guessword='"+a+"']").removeClass("neutralword").addClass("badword"),1===m&&(T=0),setTimeout(function(){$(".hintheading").remove(),$(".submitted").removeClass("hidden");for(var t=0;t<c.length;t++)$("[data-guessword='"+c[t]+"']").addClass("finalguessesshow");0===m&&0!==e&&gameovergoodsfx.play(),$(".finalpoints"+l).text(T+"pts")},e)}"true"!==t&&$.ajax({url:"/games/updategame",type:"POST",dataType:"json",data:{game_id:parseInt(g),guessedwords:c,guessstatus:h,gamespoiled:m,gamescore:T,bonuspenalty:w}}).always(function(){0===$(".chatcontent").length&&o()})}function t(t){c.push(t),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),-1!==s.indexOf(t)&&("bonus,bonus"===h&&(w=5),y.push(t),f===r&&x.push(t),f===i&&y.length===v?($(".gamenotify").html("You found all the words for the first hint! On to the second hint..."),n(),f=r,v=u,h="hint2,word1"):6===y.length?($(".gamenotify").html("You got all six words! Very difficult to do... Well done!"),resultscheersfx.play(),n(),h="over,over"):f===r&&"bonus,bonus"===h?($(".gamenotify").html("You picked up a bonus word. Nice way to end the game!"),n(),h="over,over"):f===r&&x.length===v?($(".gamenotify").html("You found all the words for the second hint! Try for one bonus word?"),n("bonus"),h="bonus,bonus"):f===r&&x.length===v+1?($(".gamenotify").html("You found all the words for the second hint!"),n(),h="over,over"):y.length<6&&($(".gamenotify").html(t+" is one of the six words you're looking for! "+p[Math.floor(Math.random()*p.length)]),n()),$("[data-guessword='"+t+"'] .anim_correct").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(-500%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),targetwordsfx.play(),e(4e3)),a===t&&($(".gamenotify").html("Oh no! "+t+' was the "Spoiler". Game over and all points lost.'),n(),h="over,over",m=1,$("[data-guessword='"+t+"'] .anim_spoiler").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(500%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),badwordsfx.play(),e(4e3)),-1===s.indexOf(t)&&a!==t&&(f===i?($(".gamenotify").html(t+" was not one of the target words. Moving on to the second hint..."),n(),f=r,v=u,h="hint2,word1"):f===r&&"bonus,bonus"===h?($(".gamenotify").html(t+" was not one of the target words. Game over."),n(),h="over,over"):f===r&&($(".gamenotify").html(t+" was not one of the target words. You may still try for an extra word."),n("bonus"),h="bonus,bonus"),$("[data-guessword='"+t+"'] .anim_neutral").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(200%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),neutralwordsfx.play(),e(4e3))}function n(e){$(".hintheadline").fadeOut(125,function(){$(".gamenotify").fadeIn(125)}),C=setTimeout(function(){$(".gamenotify").fadeOut(125,function(){$(".hintheadline").fadeIn(125)}),"bonus"===e&&bonusstartsfx.play()},4e3)}var s=gon.targetwords,a=gon.badword,i=gon.hintword1,r=gon.hintword2,d=gon.hintnum1,u=gon.hintnum2,l=gon.guessernum,c=gon.guessedwords;null===c&&(c=[]);var h=gon.guessstatus,m=gon.spoiler,w=gon.bonuspenalty,f=i,v=d;"hint2"===h.split(",")[0]&&(f=r,v=u);for(var y=[],x=[],k=0;k<c.length;k++)-1!==s.indexOf(c[k])&&y.push(c[k]);var C,T=b[y.length]-w;e(0,"true"),$(document).on("click",".firstclick",function(){var e=$(this).find("span").text();clearTimeout(C),$(".word").removeClass("unselected"),$(".word").addClass("firstclick"),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").off("click").removeClass("reallysubmit"),$(this).find(".clickagain").addClass("wordsubmitanim"),$(this).addClass("reallysubmit").removeClass("firstclick"),$(".firstclick").addClass("unselected"),$(".reallysubmit").on("click",function(){t(e),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(".word").removeClass("unselected")})}),$(".skip1").click(function(){f===i?(f=r,v=u,h="hint2,word1"):h="over,over",e(0)})})()}if($(".allguesserinfo").hasClass("underwayforgiver")){(function(){function e(e,t){$(".word").removeClass("guesser1show").removeClass("guesser2show").removeClass("guesser3show").removeClass("guesser4show").removeClass("guesser5show").removeClass("guesser6show");for(var o=0;o<t.length;o++)$('[data-guessword="'+t[o]+'"]').addClass("guesser"+e+"show")}var t=gon.targetwords,o=gon.badword,n=(gon.hintword1,gon.hintword2,gon.hintnum1,gon.hintnum2,gon.g1words),s=gon.g2words,a=gon.g3words,i=gon.g4words,r=gon.g5words,d=gon.g6words;$(".word").each(function(){var e=$(this).attr("data-guessword");-1!==t.indexOf(e)?$(this).addClass("targetword"):o===e&&$(this).addClass("badword")}),$(".guesser1").click(function(){e(1,n)}),$(".guesser2").click(function(){e(2,s)}),$(".guesser3").click(function(){e(3,a)}),$(".guesser4").click(function(){e(4,i)}),$(".guesser5").click(function(){e(5,r)}),$(".guesser6").click(function(){e(6,d)})})()}};$(document).on("turbolinks:load",ready);