$(document).ready(function(){

	var api_key = "api_key=d6567c81b3f90902e0886a226056f0d6";
	var base_url = "https://api.themoviedb.org/3";
	var method = "/movie/top_rated?";

	var url = base_url + method + "&" + api_key;
	//console.log(url);

	$.getJSON(url, mainContent);

	//------------------------------ KADA SE UCITA STRANA -------------------------------

	function mainContent(data, status){
		//console.log(data);
		var $posters = $(".posters");
		$posters.empty();

		$.each(data.results, function(index, value){

			if (index % 4 == 0){
				$row = $("<br/><div class='row'></div>");
				$posters.append($row);
			}
			
			var $div = $("<div class='col-md-3'></div>");
			var $img = $("<img></img>");

			$img.attr ({
				src: "http://image.tmdb.org/t/p/w300" + value.poster_path,
				class: "img-thumbnail",
				title: value.title,
				id: value.id
			});
			
			$div.append($img);
			$row.append($div);
		});
	}

	//------------------------------ TOP RATED CLICK -------------------------------


	$("#topRated").click(function(){
		$(this).parent().attr("class","active");
		$(this).parent().siblings().removeClass("active");	

		$(".naslov").text("Top Rated Movies");


		var url = base_url + method + "&" + api_key;
		$.getJSON(url, mainContent);

	});


	//------------------------------ UPCOMING CLICK --------------------------------

	$("#upcoming").click(function(){
		$(this).parent().attr("class","active");
		$(this).parent().siblings().removeClass("active");

		$(".naslov").text("Upcoming Movies");

		var method = "/movie/upcoming?";
		var url = base_url + method + "&" + api_key;
		$.getJSON(url, mainContent);


	});

	//------------------------------ TOP RATED CLICK -------------------------------

	$("#nowplaying").click(function(){
		$(this).parent().attr("class","active");
		$(this).parent().siblings().removeClass("active");

		$(".naslov").text("Now Playing");


		var method = "/movie/now_playing?";
		var url = base_url + method + "&" + api_key;
		$.getJSON(url, mainContent);

	});

	$(".posters").on("click", "img", function(){
		var method = "/movie/"+ $(this).attr("id") + "?"
		var url = base_url + method + "&" + api_key;
		//console.log(url);

		$.getJSON(url, function(data, status){
			console.log(data);

			var $box = $(".movie");
			var $img = $box.find("img");
			$img.attr("src", "http://image.tmdb.org/t/p/w185"+data.poster_path);

		















		if($box.css("display") == "none"){
			$box.slideDown("slow");
		} else{
			$box.fadeIn();
		}

		$("button.simmilar").show(10).attr({
					id: data.id,
					title: $("a.title").text() 
				});

		});



	});




/*<div class="col-md-2">
			<img class="img-thumbnail" src="http://image.tmdb.org/t/p/w185/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg"></img>
		</div>
		<div class="col-md-10">
			<h1><a class="title" href="http://www.imdb.com/title/tt0111161/">The Shawshank Redemption (1994) </a> </h1>
			<ul class="list-inline">
				<li> 2h 22min </li>
				<li>|</li>
				<li>Crime,</li>
				<li>Drama</li>
				<li>|</li>
				<li> 10.09.1994. </li>
				<li>|</li>
				<li>Rating: 8.33 <span class="glyphicon glyphicon-star" style="color:#ffcc00"> </span> - 5321 votes</li>
			</ul>
			<p class="text-justify" id="description">Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins 
			a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his
			long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red
			-- for his integrity and unquenchable sense of hope.</p>
			<span id="production"> Production companies: Castle Rock Entertainment </span> <br/>
			<span id="budget">Budget: 25 000 000 </span> <br/>
			<span id="revenue"> Revenue: 28 341 469</span> <br/>
			<span id="tagline"> Tagline: Fear can hold you prisoner. Hope can set you free.</span> <br/>
		</div>*/





















	//------------------------------ FADE EFFECT -----------------------------------


	$(".posters").on("mouseenter", "img", function(){
		$(this).fadeTo(50, 0.7);
	});

	$(".posters").on("mouseleave", "img", function(){
		$(this).fadeTo(50, 1);
	});


}); //-------------------------------------------------------------------------- .ready	