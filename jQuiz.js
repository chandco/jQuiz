// JavaScript Document

jQuery(document).ready(function($) {
    
	var userScore = 0;
	
	// initialise, what's the max score?
	var totalScore = $("#quiz-wrapper section.question").length;
	$("div#final-score span.totalscore").html(totalScore);
	function updateUserScore(score)
	{
		userScore = userScore + score;
		$("#score span").html(userScore);
		$("#final-score span.yourscore").html( $("#score span").html());
	}
	
	$("button.jq-begin").click( function(e) {
		$(this).fadeOut(function(e) { 
		
			$("#quiz-wrapper section").first().fadeIn( );
			$("#score").fadeIn();
		
		 });
		
		
	});
	
	
	$("ul.answers.ready li").click(function(e) {
        
		if ($(this).hasClass("right"))
		{
			$(this).addClass("correct");
			updateUserScore(1);
		} else {
			$(this).addClass("incorrect");
			updateUserScore(0);
		}
		$(this).parent("ul").addClass("reveal").removeClass("ready");
		
		$(this).parent("ul").next("div.explanation").fadeIn();
    });
	
	$("div.explanation").click(function(e) {
		
		$(this).parent("section").fadeOut(function(e) 
		{
			if ($(this).next("section").hasClass("theend"))
				{
					// we're at the end so display final stuffs
					nextSection = $(this).next("section");
					// now work out a range.  
					// count the options
					rankings = {}
					rankings.divisions = nextSection.find("ul.rankings li").length;
					
					rankings.percentiles = 100 / rankings.divisions;
					
					rankings.scorepercent = (userScore / totalScore) * 100;
					
					//eg 68% and we have 16.7%
					
					// so 
					rankings.ranking = Math.floor( rankings.scorepercent / rankings.percentiles ) -1;
					
					rankings.rankingexp = nextSection.find("ul li:eq(" + rankings.ranking +")").html();
					
					console.log(rankings);
					$('#explainranking').html( rankings.rankingexp );
					
				}
			
			$(this).next("section").fadeIn();
			$(this).remove();
		});
		
	});
	
	
	
});