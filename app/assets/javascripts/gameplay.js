$(document).ready(function() {

	var hint1 = "";
	$(".submithint1").click(function() {
		var enteredtext = $(".hint1word").val();
		validate(enteredtext);
	})

	function validate(word) {
		if (word.length === 0) {
			errorbox("Please enter a hint word.")
		} else if (word.length > 22) {
			errorbox("Please keep hint shorter than 23 characters. Reminder: just give one word or two words if it's somebody's name.")
		}
	}

	function errorbox(message) {
		$(".messagetitle").text("Oopies!")
		$(".messageinfo").text(message);
		$(".messageaction").html('<button class="button closemessagebox">Return to game</button>');
		$(".messagesubtext").text("Push button or click anywhere outside this box to continue.");
		$(".closemessagebox").click(function() { closemessagebox(); });
		$(".pagecover").click(function() { closemessagebox(); });
		$(".messagebox").show();
		$(".pagecover").show();
	}

	function closemessagebox() {
		$(".messagebox").hide();
		$(".pagecover").hide();
		$(".messagetitle").html("");
		$(".messageinfo").html("");
		$(".messageaction").html("");
		$(".messagesubtext").html("");
	}

	$('.hintenter').keyup(function() {
    var tlength = $(this).val().length;
    $(this).val($(this).val().substring(0,22));
    var tlength = $(this).val().length;
    // remain = parseInt(tlength);
    // $('#remain').text(remain);
  }); 

});