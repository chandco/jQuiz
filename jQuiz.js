// JavaScript Document

function scrollToElement(selector, time, verticalOffset) {
    time = typeof(time) != 'undefined' ? time : 1000;
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $(selector);
    offset = element.offset();
    offsetTop = offset.top + verticalOffset;
    $('html, body').animate({
        scrollTop: offsetTop
    }, time);
}


jQuery(document).ready(function($) {
    


/* sharing */





/*
<a href="http://www.facebook.com/sharer.php?s=%20100&amp;p[title]=ITA+City+Tour+Quiz&amp;p[url]=http%3A%2F%2Fitastaging.co.uk.gridhosted.co.uk%2Fquiz%2F&amp;p[images][0]=http://www.itavenues.co.uk/wp-content/themes/ita-child/images/ita.png&amp;p[summary]=I+scored+{count}+on+the+ITA+city+tour+quiz.++What+will+you+score%3F" target="_blank"><img alt="" src="http://expertvideoempire.com/wp-content/plugins/fb_share_code/facebook-share1.png" /></a>
*/

$("#qz-share-button").click( function(e) {
	
	//rankings.divisions = nextSection.find("ul.rankings li").length;
					
	
					
	scorepercent = (userScore / totalScore) * 100;
	var nicePercent = Math.floor(scorepercent) + "%25"
	
	var href = "https://www.facebook.com/sharer.php?s=100&p%5Burl%5D=http%3A%2F%2Fwww.itavenues.co.uk%2Fblog%2Flondon-city-tour-quiz%2F&p%5Bimages%5D%5B0%5D=http%3A%2F%2Fwww.itavenues.co.uk%2Ffbpng.png&p%5Btitle%5D=ITA%20City%20Tour%20Quiz&p%5Bsummary%5D=Game%20On!..%20I%20scored%20%7Bcount%7D%20on%20the%20ITA%20city%20tour%20quiz.%20What%20will%20you%20score%3F";
	newURL = href.replace("%7Bcount%7D",nicePercent);
	console.log(newURL);
	//var shareframe = $(this).after("<iframe id='share' src='" + newURL + "' />");
	window.open(newURL, "popupWindow", "width=600,height=400,scrollbars=yes");
	
});

	
	/*
	<div class="fb-share-button" data-href="http://developers.facebook.com/docs/plugins/" data-width="600" data-type="button"></div>
	*/
	
	$(".fb-share-button").attr("data-href",location.href);
	
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
		
		$("#quiz-intro").fadeOut( function(e) {
			
			scrollToElement("div.blog-summary", 400, -50);
			$("#quiz-wrapper section").first().fadeIn( );
			//$("#score").fadeIn();
			
		 });
		
		
	});
	
	
	var revealhandler = function(e) {
        
		if ($(this).hasClass("right"))
		{
			$(this).addClass("correct");
			updateUserScore(1);
		} else {
			$(this).addClass("incorrect");
			updateUserScore(0);
		}
		$(this).parent("ul").addClass("reveal").removeClass("ready");
		$(this).parent("ul").children("li").unbind("click",revealhandler);
		
		$(this).parent("ul").next("div.explanation").fadeIn();
    };
	
	$("ul.answers.ready li").bind("click",revealhandler); 
	
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
					var nicePercent = Math.floor(rankings.scorepercent) + "%25"
					if (rankings.scorepercent == 100)
					{
						rankings.scorepercent = 99;
					}
					// so 
					rankings.ranking = Math.floor( rankings.scorepercent / rankings.percentiles );
					
					rankings.rankingexp = nextSection.find("ul li:eq(" + rankings.ranking +")").html();
					
					console.log(rankings);
					$("#qs-quiz-twitter").attr("data-text", "I got " + Math.floor(rankings.scorepercent) + "% on ITA's City Quiz");	
					$.getScript('http://platform.twitter.com/widgets.js');		
					
					$('#explainranking').html( rankings.rankingexp );
					
				}
			
			$(this).next("section").fadeIn();
			scrollToElement("div.blog-summary", 400, -50);
			$(this).remove();
		});
		
	});
	
	
	
});