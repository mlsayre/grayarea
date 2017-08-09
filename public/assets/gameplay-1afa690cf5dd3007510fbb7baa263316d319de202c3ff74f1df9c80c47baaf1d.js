var ready=function(){function e(){$(document).on("click",".chatopenbutton",function(){t(),"open"===$(".chatbox").attr("data-chatopen")?(clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed")):(refreshingChat=setInterval(t,5e3),$(".chatbox").attr("data-chatopen","open")),$(".chatbox").slideToggle(200),$(".chatenter").focus()})}function t(){var e=$(".chatcontent");e.load(m+" .chatcontent",function(){e.children(".chatcontent").unwrap()})}function o(){$(document).off("click",".chatopenbutton");var t=$(".chatarea");t.load(m+" .chatarea",function(){t.children(".chatarea").unwrap()}),e()}function n(e){console.log("soundonoff running"+e),0===e?($(".soundon").text("Turn Sound On"),Howler.mute(!0)):($(".soundon").text("Turn Sound Off"),Howler.mute(!1))}function a(e){for(var t=e.length-1;t>0;t--){var o=Math.floor(Math.random()*(t+1)),n=e[t];e[t]=e[o],e[o]=n}return e}function s(e){setTimeout(function(){$(".word").eq(x[e]).removeClass("shrunken")},k+110)}function i(e){var t=/^[a-zA-Z\s]+$/,o=e.trim().split(/\s+/).length;return 0===e.length?(r("Please enter a hint word."),!1):e.length>28?(r("Please keep hint shorter than 29 characters. Reminder: just give one word or two words if it's somebody's name."),!1):e.match(t)?o>1?(r("Please make sure your hint is one word only."),!1):void 0:(r("Please make sure your hint contains letters only."),!1)}function r(e){$(".messagetitle").text("Oopies!"),$(".messageinfo").text(e),$(".messageaction").html('<button class="button closemessagebox">Return to game</button>'),$(".messagesubtext").text("Push button or click anywhere outside this box to continue."),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function d(e,t){if(1===t)var o="word";else o="words";$(".messagetitle").text("Submit Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+o+". Submit this hint and move to the final hint?"),$(".messageaction").html('<button class="button submithint1final">Submit Hint 1</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint1final").click(function(){$(".hint1").hide(),$(".firstinfoword").text(e),$(".firstinfonum").text(t+" "+o),$(".hint2").show(),c()}),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function l(e,t){if(1===t)var o="word";else var o="words";$(".messagetitle").text("Submit Second Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+o+". Submit final hint and let people play the game?"),$(".messageaction").html('<button class="button submithint2final">Submit - Ready for Players!</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint2final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(w),word1:g,word1num:f,word2:p,word2num:b}}).always(function(){if(1===f)var e="word";else var e="words";if(1===b)var t="word";else var t="words";$(".hint2").hide(),$(".hintheadline").hide(),$(".submittedword1").text(g),$(".submittednum1").text(f+" "+e),$(".submittedword2").text(p),$(".submittednum2").text(b+" "+t),$(".submitted").show(),c()})}),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function u(e){"true"===e||($(".messagetitle").text("Skip Second Hint?"),$(".messageinfo").html("No second hint needed to get all six words? Confirm to skip the second hint."),$(".messageaction").html('<button class="button submithint2final">Submit - Ready for Players!</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.")),$(".submithint2final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(w),word1:g,word1num:f,word2:p,word2num:b}}).always(function(){if(1===f)var e="word";else var e="words";if(1===b)var t="word";else var t="words";$(".hint2").hide(),$(".hintheadline").hide(),$(".submittedword1").text(g),$(".submittednum1").text(f+" "+e),$(".submittedword2").text(p),$(".submittednum2").text(b+" "+t),$(".submitted").show(),c()})}),$(".closemessagebox").click(function(){c()}),$(".pagecover").click(function(){c()}),$(".messagebox").show(),$(".pagecover").show()}function c(){$(".messagebox").hide(),$(".pagecover").hide(),$(".messagetitle").html(""),$(".messageinfo").html(""),$(".messageaction").html(""),$(".messagesubtext").html("")}window.performance&&2==window.performance.navigation.type&&window.location.reload(),$(".menu").on("click",function(){$(".pagecover").show(),$(".menubox").show()}),$(".menuclose").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()}),$(".pagecover").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()});var h=gon.sound;n(h),$(".soundon").on("click",function(){h=1===h?0:1,n(h),$.ajax({url:"/games/soundonoff",type:"POST",dataType:"json",data:{sound:h}})}),e();var m=window.location.pathname;$(document).on("click",".messageenter",function(){var e=$(".chatenter").val();""!==e&&$.ajax({url:"/games/entermessage",type:"POST",dataType:"json",data:{message:e,game_id:w}}),t()}),$(document).on("keypress",".chatenter",function(e){13==e.keyCode&&(e.preventDefault(),$(".messageenter").click(),$(".chatenter").val(""))});var w=$(".gametop").data("gameid"),g="",f=0,p="",b=0,v={0:0,1:10,2:20,3:35,4:50,5:70,6:100},y=["Keep it up!","Great work!","Keep it going!","Very nice!","Superb vocabulary!","Happy dance!","Next up!","Fantastic work!","Superb effort!","No end in sight!","This is making the highlight reel!"],x=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];x=a(x);for(var k=120,C=0;C<x.length;C++)!function(){var e=k*(C+2);x[C];if(0!==$(".allwords").length){var t=C;setTimeout(function(){0===t?(wordshow0.on("play",s(t)),wordshow0.play()):1===t?(wordshow1.on("play",s(t)),wordshow1.play()):2===t?(wordshow2.on("play",s(t)),wordshow2.play()):3===t?(wordshow3.on("play",s(t)),wordshow3.play()):4===t?(wordshow4.on("play",s(t)),wordshow4.play()):5===t?(wordshow5.on("play",s(t)),wordshow5.play()):6===t?(wordshow6.on("play",s(t)),wordshow6.play()):7===t?(wordshow7.on("play",s(t)),wordshow7.play()):8===t?(wordshow8.on("play",s(t)),wordshow8.play()):9===t?(wordshow9.on("play",s(t)),wordshow9.play()):10===t?(wordshow10.on("play",s(t)),wordshow10.play()):11===t?(wordshow11.on("play",s(t)),wordshow11.play()):12===t?(wordshow12.on("play",s(t)),wordshow12.play()):13===t?(wordshow13.on("play",s(t)),wordshow13.play()):14===t&&(wordshow14.on("play",s(t)),wordshow14.play())},e)}}();if($(".submithint1").click(function(){var e=$(".hint1word").val();if(!1===i(e))return!1;g=e.toUpperCase(),f=parseInt($(".hint1number").val()),d(g,f)}),$(".submithint2").click(function(){var e=$(".hint2word").val();if(!1===i(e))return!1;p=e.toUpperCase(),b=parseInt($(".hint2number").val()),l(p,b)}),$(".skiphint2").click(function(){u("false")}),$(document).on("click",".returntomain",function(){window.location="/main"}),$(".hintenter").keyup(function(){$(this).val().length;$(this).val($(this).val().substring(0,28));$(this).val().length}),$(".hintenter").on("keypress",function(e){13===e.keyCode&&(e.preventDefault(),$(this).closest(".hints").find("button").first().click())}),$(".allwords").hasClass("guesswordslist")){(function(){function e(e,t){if(c.length>0)for(var n=0;n<c.length;n++)$("[data-guessword='"+c[n]+"']").addClass("guessedword");$(".guessedword").each(function(){var e=$(this).attr("data-guessword");-1!==a.indexOf(e)&&$(this).addClass("targetword"),s===e&&$(this).addClass("badword"),s!==e&&-1===a.indexOf(e)&&$(this).addClass("neutralword")}),C=v[p.length];var d=p.length;if(1===m&&(C=0,d=0),$(".wordcount").text(d),$(".scorecount").text(C),$(".thehintword").text(g),$(".thehintnum").text(f),1===f)var l="word";else var l="words";if($(".thewordword").text(l),g===r&&($(".skip1").text("Too risky? End game now."),$(".hintheadline").text("Your final hint is...")),"bonus,bonus"===h&&($(".hintheadline").text("Bonus! Go for one more?"),$(".guessword").remove(),$(".guessnum").text("This game's hints were "+i+" and "+r+".")),"over,over"===h){$("[data-guessword]").addClass("guessedword").addClass("neutralword");for(var n=0;n<a.length;n++)$("[data-guessword='"+a[n]+"']").removeClass("neutralword").addClass("targetword");$("[data-guessword='"+s+"']").removeClass("neutralword").addClass("badword"),1===m&&(C=0),setTimeout(function(){$(".hintheading").remove(),$(".submitted").removeClass("hidden");for(var t=0;t<c.length;t++)$("[data-guessword='"+c[t]+"']").addClass("finalguessesshow");0===m&&0!==e&&gameovergoodsfx.play(),$(".finalpoints"+u).text(C+"pts")},e)}"true"!==t&&$.ajax({url:"/games/updategame",type:"POST",dataType:"json",data:{game_id:parseInt(w),guessedwords:c,guessstatus:h,gamespoiled:m,gamescore:C}}).always(function(){o()})}function t(t){c.push(t),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),-1!==a.indexOf(t)&&(p.push(t),g===r&&b.push(t),g===i&&p.length===f?($(".gamenotify").html("You found all the words for the first hint! On to the second hint..."),n(),g=r,f=l,h="hint2,word1"):6===p.length?($(".gamenotify").html("You got all six words! Very difficult to do... Well done!"),resultscheersfx.play(),n(),h="over,over"):g===r&&b.length===f?($(".gamenotify").html("You found all the words for the second hint! Try for one bonus word?"),n("bonus"),h="bonus,bonus"):g===r&&b.length===f+1?($(".gamenotify").html("You found all the words for the second hint!"),n(),h="over,over"):p.length<6&&($(".gamenotify").html(t+" is one of the six words you're looking for! "+y[Math.floor(Math.random()*y.length)]),n()),$("[data-guessword='"+t+"'] .anim_correct").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(-500%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),targetwordsfx.play(),e(4e3)),s===t&&($(".gamenotify").html("Oh no! "+t+' was the "Spoiler". Game over and all points lost.'),n(),h="over,over",m=1,$("[data-guessword='"+t+"'] .anim_spoiler").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(500%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),badwordsfx.play(),e(4e3)),-1===a.indexOf(t)&&s!==t&&(g===i?($(".gamenotify").html(t+" was not one of the target words. Moving on to the second hint..."),n(),g=r,f=l,h="hint2,word1"):g===r&&($(".gamenotify").html(t+" was not one of the target words. The game is now over."),n(),h="over,over"),$("[data-guessword='"+t+"'] .anim_neutral").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(200%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),neutralwordsfx.play(),e(4e3))}function n(e){$(".hintheadline").fadeOut(125,function(){$(".gamenotify").fadeIn(125)}),k=setTimeout(function(){$(".gamenotify").fadeOut(125,function(){$(".hintheadline").fadeIn(125)}),"bonus"===e&&bonusstartsfx.play()},4e3)}var a=gon.targetwords,s=gon.badword,i=gon.hintword1,r=gon.hintword2,d=gon.hintnum1,l=gon.hintnum2,u=gon.guessernum,c=gon.guessedwords;null===c&&(c=[]);var h=gon.guessstatus,m=gon.spoiler,g=i,f=d;"hint2"===h.split(",")[0]&&(g=r,f=l);for(var p=[],b=[],x=0;x<c.length;x++)-1!==a.indexOf(c[x])&&p.push(c[x]);var k,C=v[p.length];e(0,"true"),$(document).on("click",".firstclick",function(){var e=$(this).find("span").text();clearTimeout(k),$(".word").removeClass("unselected"),$(".word").addClass("firstclick"),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").off("click").removeClass("reallysubmit"),$(this).find(".clickagain").addClass("wordsubmitanim"),$(this).addClass("reallysubmit").removeClass("firstclick"),$(".firstclick").addClass("unselected"),$(".reallysubmit").on("click",function(){t(e),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(".word").removeClass("unselected")})}),$(".skip1").click(function(){g===i?(g=r,f=l,h="hint2,word1"):h="over,over",e(4e3)})})()}};$(document).on("turbolinks:load",ready);