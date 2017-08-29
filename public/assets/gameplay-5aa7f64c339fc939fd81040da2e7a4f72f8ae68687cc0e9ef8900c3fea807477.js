var ready=function(){function e(){$(document).on("click",".chatopenbutton",function(){t(),"open"===$(".chatbox").attr("data-chatopen")?(clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed")):(refreshingChat=setInterval(t,5e3),$(".chatbox").attr("data-chatopen","open")),$(".chatbox").slideToggle(200),$(".chatenter").focus(),$.ajax({url:"/games/resetchatnotify",type:"POST",dataType:"json",data:{game_id:p}}),$(".unreadchats").text("")}),$(document).on("click",".messageenter",function(){var e=$(".chatenter").val();""!==e&&$.ajax({url:"/games/entermessage",type:"POST",dataType:"json",data:{message:e,game_id:p}}),$(".chatenter").val(""),t()})}function t(){var e=$(".chatcontent");e.load(f+" .chatcontent",function(){e.children(".chatcontent").unwrap()})}function o(){$(document).off("click",".chatopenbutton"),$(document).off("click",".messageenter");var t=$(".chatarea");t.load(f+" .chatarea",function(){t.children(".chatarea").unwrap()}),e()}function n(e){0===e?($(".soundon").text("Turn Sound On"),Howler.mute(!0)):($(".soundon").text("Turn Sound Off"),Howler.mute(!1))}function s(e){for(var t=e.length-1;t>0;t--){var o=Math.floor(Math.random()*(t+1)),n=e[t];e[t]=e[o],e[o]=n}return e}function a(e){setTimeout(function(){$(".word").eq(T[e]).removeClass("shrunken")},O+110)}function i(e,t){var o=/^[a-zA-Z\s]+$/,n=e.trim().split(/\s+/).length;return 0===e.length?(r("Please enter a hint word."),!1):e.length>28?(r("Please keep hint shorter than 29 characters. Reminder: just give one word or two words if it's somebody's name."),!1):e.match(o)?n>1?(r("Please make sure your hint is one word only."),!1):0===t?(r("Please select a number of words this hint applies to."),!1):void 0:(r("Please make sure your hint contains letters only."),!1)}function r(e){$(".messagetitle").text("Oopies!"),$(".messageinfo").text(e),$(".messageaction").html('<button class="button closemessagebox">Return to game</button>'),$(".messagesubtext").text("Push button or click anywhere outside this box to continue."),$(".closemessagebox").click(function(){g()}),$(".pagecover").click(function(){g()}),$(".messagebox").show(),$(".pagecover").show()}function d(e,t){if(1===t)var o="word";else o="words";$(".messagetitle").text("Submit Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+o+". Submit this hint and move to the next hint?"),$(".messageaction").html('<button class="button submithint1final">Submit Hint 1</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint1final").click(function(){$(".hint1").hide(),$(".firstinfoword").text(e),$(".firstinfonum").text(t+" "+o),$(".hint2").show(),g()}),$(".closemessagebox").click(function(){g()}),$(".pagecover").click(function(){g()}),$(".messagebox").show(),$(".pagecover").show()}function u(e,t){if(1===t)var o="word";else o="words";$(".messagetitle").text("Submit Second Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+o+". Submit this hint and move to the final hint?"),$(".messageaction").html('<button class="button submithint2final">Submit Hint 2</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submithint2final").click(function(){$(".hint2").hide(),$(".secondinfoword").text(e),$(".secondinfonum").text(t+" "+o),$(".hint3").show(),g()}),$(".closemessagebox").click(function(){g()}),$(".pagecover").click(function(){g()}),$(".messagebox").show(),$(".pagecover").show()}function l(e,t){if(1===t)var n="word";else var n="words";$(".messagetitle").text("Submit Final Hint?"),$(".messageinfo").html('You have entered the hint "'+e+'" which applies to <bold>'+t+"</bold> "+n+". Submit final hint and let people play the game?"),$(".messageaction").html('<button class="button submithint3final">Submit - Ready for Players!</button><button class="button submitredo">Start Over</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel."),$(".submitredo").click(function(){$(".hint3").hide(),$(".hint1").show(),$(".hintenter").val(""),g()}),$(".submithint3final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(p),word1:b,word1num:P,word2:v,word2num:j,word3:y,word3num:I}}).always(function(){if(1===P)var e="word";else var e="words";if(1===j)var t="word";else var t="words";if(1===I)var n="word";else var n="words";$(".hint3").hide(),$(".hintheadline").hide(),$(".submittedword1").text(b),$(".submittednum1").text(P+" "+e),$(".submittedword2").text(v),$(".submittednum2").text(j+" "+t),$(".submittedword3").text(y),$(".submittednum3").text(I+" "+n),$(".submitted").show(),g(),0===$(".chatcontent").length&&o()})}),$(".closemessagebox").click(function(){g()}),$(".pagecover").click(function(){g()}),$(".messagebox").show(),$(".pagecover").show()}function c(){$("body").html("Please check your connection. Please reload game when you have reconnected to the internet.")}function h(e){"true"===e||($(".messagetitle").text("Skip Second Hint?"),$(".messageinfo").html("No second hint needed to get all six words? Confirm to skip the second hint."),$(".messageaction").html('<button class="button submithint2final">Submit - Ready for Players!</button><button class="button closemessagebox">Cancel</button>'),$(".messagesubtext").text("Push cancel or click anywhere outside this box to cancel.")),$(".submithint2final").click(function(){$.ajax({url:"/games/submithints",type:"POST",dataType:"json",data:{game_id:parseInt(p),word1:b,word1num:P,word2:v,word2num:j}}).always(function(){if(1===P)var e="word";else var e="words";if(1===j)var t="word";else var t="words";$(".hint2").hide(),$(".hintheadline").hide(),$(".submittedword1").text(b),$(".submittednum1").text(P+" "+e),$(".submittedword2").text(v),$(".submittednum2").text(j+" "+t),$(".submitted").show(),g()})}),$(".closemessagebox").click(function(){g()}),$(".pagecover").click(function(){g()}),$(".messagebox").show(),$(".pagecover").show()}function g(){$(".messagebox").hide(),$(".pagecover").hide(),$(".messagetitle").html(""),$(".messageinfo").html(""),$(".messageaction").html(""),$(".messagesubtext").html("")}function w(){function e(e,t){$(".word").removeClass("guesser1show").removeClass("guesser2show").removeClass("guesser3show").removeClass("guesser4show").removeClass("guesser5show").removeClass("guesser6show");for(var o=0;o<t.length;o++)$('[data-guessword="'+t[o]+'"]').addClass("guesser"+e+"show")}var t=gon.targetwords,o=gon.badword,n=(gon.hintword1,gon.hintword2,gon.hintword3,gon.hintnum1,gon.hintnum2,gon.hintnum3,gon.g1words),s=gon.g2words,a=gon.g3words,i=gon.g4words,r=gon.g5words,d=gon.g6words;$(".word").each(function(){var e=$(this).attr("data-guessword");-1!==t.indexOf(e)?$(this).addClass("targetword"):o===e&&$(this).addClass("badword")}),$(".guesser1").click(function(){e(1,n)}),$(".guesser2").click(function(){e(2,s)}),$(".guesser3").click(function(){e(3,a)}),$(".guesser4").click(function(){e(4,i)}),$(".guesser5").click(function(){e(5,r)}),$(".guesser6").click(function(){e(6,d)})}window.performance&&2==window.performance.navigation.type&&window.location.reload(),$(document).off("click",".chatopenbutton"),$(document).off("click",".chatclosebutton"),$(document).off("click",".messageenter"),$(document).on("click",".chatclosebutton",function(){clearInterval(refreshingChat),$(".chatbox").attr("data-chatopen","closed"),$(".chatbox").slideToggle(200)}),$(".startguess").click(function(){$.ajax({url:"/games/startguesser",type:"POST"})}),$(".gd").click(function(){$.ajax({url:"/games/delgame",type:"POST",dataType:"json",data:{game_id:p}}).always(function(){location.href="/main"})}),$(".menu").on("click",function(){$(".pagecover").show(),$(".menubox").show()}),$(".menuclose").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()}),$(".pagecover").on("click",function(){$(".pagecover").hide(),$(".menubox").hide()});var m=gon.sound;n(m),$(".soundon").on("click",function(){m=1===m?0:1,n(m),$.ajax({url:"/games/soundonoff",type:"POST",dataType:"json",data:{sound:m}})}),$(".chatcontent").length>0&&e();var f=window.location.pathname;$(document).on("keypress",".chatenter",function(e){13==e.keyCode&&(e.preventDefault(),$(".messageenter").click())});var p=$(".gametop").data("gameid"),b="",v="",y="",x={0:0,1:10,2:15,3:25,4:40,5:50,6:60},k={0:"",1:"",2:"Two in a row!",3:"One, two, THREE!",4:"Four in a row!",5:"Five in a row!",6:"SIX in a row!!"},C=["Keep it up!","Great work!","Keep it going!","Very nice!","Superb vocabulary!","Happy dance!","Next up!","Fantastic work!","Superb effort!","No end in sight!","This is making the highlight reel!"],T=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];T=s(T);for(var O=120,S=0;S<T.length;S++)!function(){var e=O*(S+2);T[S];if(0!==$(".allwords").length){var t=S;setTimeout(function(){0===t?(wordshow0.on("play",a(t)),wordshow0.play()):1===t?(wordshow1.on("play",a(t)),wordshow1.play()):2===t?(wordshow2.on("play",a(t)),wordshow2.play()):3===t?(wordshow3.on("play",a(t)),wordshow3.play()):4===t?(wordshow4.on("play",a(t)),wordshow4.play()):5===t?(wordshow5.on("play",a(t)),wordshow5.play()):6===t?(wordshow6.on("play",a(t)),wordshow6.play()):7===t?(wordshow7.on("play",a(t)),wordshow7.play()):8===t?(wordshow8.on("play",a(t)),wordshow8.play()):9===t?(wordshow9.on("play",a(t)),wordshow9.play()):10===t?(wordshow10.on("play",a(t)),wordshow10.play()):11===t?(wordshow11.on("play",a(t)),wordshow11.play()):12===t?(wordshow12.on("play",a(t)),wordshow12.play()):13===t?(wordshow13.on("play",a(t)),wordshow13.play()):14===t&&(wordshow14.on("play",a(t)),wordshow14.play())},e)}}();var P=0,j=0,I=0;if($(".hint1number button").on("click",function(){$(".hint1number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),P=parseInt($(this).attr("value"))}),$(".hint2number button").on("click",function(){$(".hint2number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),j=parseInt($(this).attr("value"))}),$(".hint3number button").on("click",function(){$(".hint3number button").removeClass("wordnumselected"),$(this).addClass("wordnumselected"),I=parseInt($(this).attr("value"))}),$(".submithint1").click(function(){var e=$(".hint1word").val();if(!1===i(e,P))return!1;b=e.toUpperCase(),d(b,P)}),$(".submithint2").click(function(){var e=$(".hint2word").val();if(!1===i(e,j))return!1;v=e.toUpperCase(),u(v,j)}),$(".submithint3").click(function(){var e=$(".hint3word").val();if(!1===i(e,I))return!1;y=e.toUpperCase(),l(y,I)}),$(".skiphint2").click(function(){h("false")}),$(document).on("click",".returntomain",function(){window.location="/main"}),$(".hintenter").keyup(function(){$(this).val().length;$(this).val($(this).val().substring(0,28));$(this).val().length}),$(".hintenter").on("keypress",function(e){13===e.keyCode&&(e.preventDefault(),$(this).closest(".hints").find("button").first().click())}),$(".allwords").hasClass("guesswordslist")){(function(){function e(e,t,n){if(w.length>0)for(var c=0;c<w.length;c++)$("[data-guessword='"+w[c]+"']").addClass("guessedword");$(".guessedword").each(function(){var e=$(this).attr("data-guessword");-1!==s.indexOf(e)&&$(this).addClass("targetword"),a===e&&$(this).addClass("badword"),a!==e&&-1===s.indexOf(e)&&$(this).addClass("neutralword")}),Y+=n;var x=T.length;if(1===b&&(Y=0,x=0),$(".wordcount").text(x),$(".scorecount").text(Y),$(".thehintword").text(v),$(".thehintnum").text(y),1===y)var k="word";else var k="words";if($(".thewordword").text(k),v===r?($(".skip1").text("Too risky? See final hint."),$(".hintheadline").text("Your second hint is...")):v===d&&($(".skip1").text("Too risky? End game now."),$(".hintheadline").text("Your final hint is...")),"bonus,hint2"===m&&($(".hintheadline").text("Bonus! Go for one more?"),$(".guessword").hide(),$(".guessnum").text("This first two hints were "+i+"("+u+") and "+r+"("+l+").")),"bonus,hint3"===m&&($(".hintheadline").text("Bonus! Go for one more?"),$(".guessword").hide(),$(".guessnum").text("All hints: "+i+"("+u+") and "+r+"("+l+") and "+d+"("+h+")")),"over,over"===m){Y<50&&$(".giveheart").remove(),$("[data-guessword]").addClass("guessedword").addClass("neutralword");for(var c=0;c<s.length;c++)$("[data-guessword='"+s[c]+"']").removeClass("neutralword").addClass("targetword");$("[data-guessword='"+a+"']").removeClass("neutralword").addClass("badword"),1===b&&(Y=0),setTimeout(function(){$(".hintheading").remove(),$(".submitted").removeClass("hidden");for(var t=0;t<w.length;t++)$("[data-guessword='"+w[t]+"']").addClass("finalguessesshow");0===b&&0!==e&&gameovergoodsfx.play(),$(".finalpoints"+g).text(Y+"pts"),$(".allguesserinfo").addClass("underwayforgiver")},e)}"true"!==t&&$.ajax({url:"/games/updategame",type:"POST",dataType:"json",data:{game_id:parseInt(p),guessedwords:w,guessstatus:m,gamespoiled:b,gamescore:Y,hint1words:O,hint2words:S,hint3words:P}}).always(function(){if(0===$(".chatcontent").length&&o(),"over,over"===m){console.log("game is over, should load stuff");var e=$(".allguesserinfo");e.load(f+" .allguesserinfo",function(){e.children(".allguesserinfo").unwrap(),GuessFuncDuring.seeguessesafter()})}})}function t(t){$(".guessword").show();var o=0,c="";w.push(t),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),-1!==s.indexOf(t)&&(T.push(t),v===i&&(O.push(t),o=x[O.length],c=k[O.length]),v===r&&(S.push(t),o=x[S.length],c=k[S.length]),v===d&&(P.push(t),o=x[P.length],c=k[P.length]),"bonus"===m.split(",")[0]&&(o=5,c=""),6===T.length?($(".gamenotify").html("You got all six words! Very difficult to do... Well done!"),resultscheersfx.play(),n(),m="over,over"):v===i&&O.length===y?($(".gamenotify").html("You found all the words for the first hint! On to the second hint..."),n(),v=r,y=l,m="hint2,word1"):v===r&&S.length===y&&O.length<u?($(".gamenotify").html("You found all the words for the second hint! Try for one bonus word?"),n("bonus"),m="bonus,hint2"):v===r&&S.length===y?($(".gamenotify").html("You found all the words for the first two hints! On to the final hint..."),n(),v=d,y=h,m="hint3,word1"):v===d&&P.length===y?($(".gamenotify").html("You found all the words for the last hint! Try for one bonus word?"),n("bonus"),m="bonus,hint3"):v===d&&P.length===y?($(".gamenotify").html("You found all the words for the last hint! Try for one bonus word?"),n("bonus"),m="bonus,hint3"):"bonus,hint2"===m?($(".gamenotify").html("You picked up a bonus word. On to the third hint..."),n(),v=d,y=h,m="hint3,word1"):"bonus,hint3"===m?($(".gamenotify").html("You picked up a bonus word. Great way to end the game!"),n(),m="over,over"):T.length<6&&($(".gamenotify").html(t+" is one of the six words you're looking for! "+C[Math.floor(Math.random()*C.length)]),n()),$("div.anim_correct").text("+"+o),$("div.anim_correct.inarow").text(c),$("[data-guessword='"+t+"'] .anim_correct").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(-500%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),targetwordsfx.play(),e(4e3,"false",o)),a===t&&($(".gamenotify").html("Oh no! "+t+' was the "Spoiler". Game over and all points lost.'),n(),m="over,over",b=1,$("[data-guessword='"+t+"'] .anim_spoiler").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(500%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),badwordsfx.play(),e(4e3)),-1===s.indexOf(t)&&a!==t&&(v===i?($(".gamenotify").html(t+" was not one of the target words. Moving on to the second hint..."),n(),v=r,y=l,m="hint2,word1"):"bonus,hint3"===m?($(".gamenotify").html(t+" was not one of the target words. Game over."),n(),m="over,over"):"bonus,hint2"===m?($(".gamenotify").html(t+" was not one of the target words. Moving on to the final hint..."),n(),v=d,y=h,m="hint3,word1"):v===r?($(".gamenotify").html(t+" was not one of the target words. Moving on to the final hint..."),n(),v=d,y=h,m="hint3,word1"):v===d&&($(".gamenotify").html(t+" was not one of the target words. Game over."),n(),m="over,over"),$("[data-guessword='"+t+"'] .anim_neutral").fadeIn(200).addClass("animating"),setTimeout(function(){$("[data-guessword='"+t+"'] img.animating").fadeOut(1200,function(){$("[data-guessword='"+t+"'] img.animating").remove()})},1100),setTimeout(function(){$("[data-guessword='"+t+"'] div.animating").css("transform","translateY(200%)").fadeOut(400,function(){$("[data-guessword='"+t+"'] div.animating").remove()})},3100),neutralwordsfx.play(),e(4e3,"false",0))}function n(e){$(".hintheadline").fadeOut(125,function(){$(".gamenotify").fadeIn(125)}),I=setTimeout(function(){$(".gamenotify").fadeOut(125,function(){$(".hintheadline").fadeIn(125)}),"bonus"===e&&bonusstartsfx.play()},4e3)}var s=gon.targetwords,a=gon.badword,i=gon.hintword1,r=gon.hintword2,d=gon.hintword3,u=gon.hintnum1,l=gon.hintnum2,h=gon.hintnum3,g=gon.guessernum,w=gon.guessedwords;null===w&&(w=[]);var m=gon.guessstatus,b=gon.spoiler,v=i,y=u;"hint2"===m.split(",")[0]?(v=r,y=l):"hint3"===m.split(",")[0]&&(v=d,y=h);for(var T=[],O=gon.wordsh1,S=gon.wordsh2,P=gon.wordsh3,j=0;j<w.length;j++)-1!==s.indexOf(w[j])&&T.push(w[j]);var I,Y=gon.playerscore;1===gon.heartstatus&&$(".giveheart").remove(),$(".giveheart").click(function(){$.ajax({url:"/games/addheart",type:"POST",dataType:"json",data:{game_id:parseInt(p),heartgiven:1}}).done(function(){$(".giveheart").remove(),$(".giveheartsuccess").css("display","block");var e=$(".allguesserinfo");e.load(f+" .allguesserinfo",function(){e.children(".allguesserinfo").unwrap(),GuessFuncDuring.seeguessesafter()}),setTimeout(function(){$(".giveheartsuccess").fadeOut()},3500)}).fail(function(){c()})}),e(0,"true",0),$(document).on("click",".firstclick",function(){var e=$(this).find("span").text();clearTimeout(I),$(".word").removeClass("unselected"),$(".word").addClass("firstclick"),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").off("click").removeClass("reallysubmit"),$(this).find(".clickagain").addClass("wordsubmitanim"),$(this).addClass("reallysubmit").removeClass("firstclick"),$(".firstclick").addClass("unselected"),$(".reallysubmit").on("click",function(){t(e),$(".clickagain").removeClass("wordsubmitanim"),$(".reallysubmit").removeClass("reallysubmit"),$(".word").removeClass("unselected")})}),$(".skip1").click(function(){$(".guessword").show(),v===i?(v=r,y=l,m="hint2,word1"):v===r?(v=d,y=h,m="hint3,word1"):m="over,over",e(0,"false",0)})})()}if($(".allguesserinfo").hasClass("underwayforgiver")){(function(){w()})()}GuessFuncDuring={seeguessesafter:function(){function e(e,t){$(".finalguessesshow").removeClass("finalguessesshow"),$(".word").removeClass("guesser1show").removeClass("guesser2show").removeClass("guesser3show").removeClass("guesser4show").removeClass("guesser5show").removeClass("guesser6show");for(var o=0;o<t.length;o++)$('[data-guessword="'+t[o]+'"]').addClass("guesser"+e+"show")}console.log("loading seeguessesafter"),$(".guesswordslist").addClass("guessednotdone");var t=gon.guessernum;gon.targetwords,gon.badword,gon.hintword1,gon.hintword2,gon.hintword3,gon.hintnum1,gon.hintnum2,gon.hintnum3;pl1words=[],pl2words=[],pl3words=[],pl4words=[],pl5words=[],pl6words=[],pl1words=$(".guesser1").attr("data-gsrwords").split(","),pl2words=$(".guesser2").attr("data-gsrwords").split(","),pl3words=$(".guesser3").attr("data-gsrwords").split(","),pl4words=$(".guesser4").attr("data-gsrwords").split(","),pl5words=$(".guesser5").attr("data-gsrwords").split(","),pl6words=$(".guesser6").attr("data-gsrwords").split(","),$(".neutralword").removeClass("neutralword"),$(".guesser1").click(function(){e(1,pl1words)}),$(".guesser2").click(function(){e(2,pl2words)}),$(".guesser3").click(function(){e(3,pl3words)}),$(".guesser4").click(function(){e(4,pl4words)}),$(".guesser5").click(function(){e(5,pl5words)}),$(".guesser6").click(function(){e(6,pl6words)}),$(".guesser"+t).click()}}};$(document).on("turbolinks:load",ready);