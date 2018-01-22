$(document).ready(function(){
	var sessiontime = 1500;
	var breaktime = 300;
	var currSession = sessiontime;
	var currBreak = breaktime;
	var active = 0;
	var isPaused = 0;
	var countdown;
	$("#mbr").on("click", function(){
		if (breaktime == 60){return;}
		breaktime -= 60;
		$("#break").text(breaktime / 60);
		$("#sessionname").text("Session");
		clearIntervals();
	});
	$("#pbr").on("click", function(){
		breaktime += 60;
		$("#break").text(breaktime / 60);
		$("#sessionname").text("Session");
		clearIntervals();
	});
	$("#mpm").on("click", function(){
		if (sessiontime == 60){return;}
		sessiontime -= 60;
		$("#pomotime").text(sessiontime / 60);
		$("#pomodorotime").text(sessiontime / 60 + ":00");
		$("#sessionname").text("Session");
		clearIntervals();
	});
	$("#ppm").on("click", function(){
		sessiontime += 60;
		$("#pomotime").text(sessiontime / 60);
		$("#pomodorotime").text(sessiontime / 60 + ":00");
		$("#sessionname").text("Session");
		clearIntervals();
		
	});

	$("#bottimer").on("click", function(){
		if (active == 0){ countdown = setInterval(pomodoroCountdown, 1000); active++; return;}
		if (isPaused == 0){
			isPaused++;
		} else {
			isPaused--;
		}
	});
	function pomodoroCountdown(){
		if (isPaused == 1){ return; }
		if (currSession == 0){
			clearInterval(countdown);
			countdown = setInterval(breakCountdown, 1000);
			currSession = sessiontime;
		} else{
			$("#sessionname").text("Work!");
			currSession--;
			$("#pomodorotime").text(checkLength(Math.floor(currSession / 60)) + ":" + checkLength((currSession % 60)));
			$("#bottimer").css("border", "3px solid #edaa58");
			updateFill(sessiontime, currSession, "session");
		}
	}
	function breakCountdown(){
		if (isPaused == 1){ return; }
		if (currBreak == 0){
			clearInterval(countdown);
			countdown = setInterval(pomodoroCountdown, 1000);
			currBreak = breaktime;
		} else {
			$("#sessionname").text("Break!");
			currBreak--;
			$("#pomodorotime").text(checkLength(Math.floor(currBreak / 60)) + ":" + checkLength(currBreak % 60));
			$("#bottimer").css("border", "3px solid #52be7f");
			updateFill(breaktime, currBreak, "break");
		}
	}
	function clearIntervals(){
		clearInterval(countdown);
		active = 0;
		isPaused = 0;
		currBreak = breaktime;
		currSession = sessiontime;
		updateFill(1, 100, "break");
		$("#pomodorotime").text(checkLength(sessiontime / 60) + ":" + checkLength(sessiontime % 60));
		$("#bottimer").css("border", "3px solid #edaa58");
	}
	function checkLength(num){
		if (num < 10){
			return "0" + String(num);
		}
		return num;
	}
	function updateFill(fulltime, currtime, session){
		
		var lol = 100 - (currtime / fulltime) * 100;
		if (session == "break"){
			$("#bottimer").css("background", "linear-gradient(0deg, #52be7f " + lol + "%, #4D4D4D 0%)");
		} else {
			$("#bottimer").css("background", "linear-gradient(0deg, #edaa58 " + lol + "%, #4D4D4D 0%)");
		}
	}
	});