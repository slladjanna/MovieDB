$(document).ready(function(){

	var api_key = "api_key=d6567c81b3f90902e0886a226056f0d6";
	var base_url = "https://api.themoviedb.org/3";
	var method = "/movie/top_rated?"
	var url = base_url + method + "&" + api_key;
	$movieDiv = $(".movie");

	//console.log(url);

	$.getJSON(url, ucitajFilmove);

	function ucitajFilmove(data, status){
		//console.log(data);

		$row = $(".posters");
		$row.empty();

		$.each(data.results, function(index, value){

			if (index % 4 == 0){
				$rowPosteri = $('<br/><div class="row"></div>');
				$row.append($rowPosteri);
			}

			var $div = $('<div class="col-md-3"></div>');
			var $img = $('<img></img>');
			$img.attr({
				class: "img-thumbnail",
				src: "http://image.tmdb.org/t/p/w300" + value.poster_path,
				id: value.id
			});

			$div.append($img);
			$rowPosteri.append($div);

		});
	}
//-------------------------------------- MENU ------------------------------------------


	$("#topRated").click(function(){
		$(this).parent().addClass("active");
		$(this).parent().siblings().removeClass("active");

		$(".naslov").text("Top Rated Movies");

		var url = base_url + method + "&" + api_key;
		$.getJSON(url, ucitajFilmove);

	});

	$("#upcoming").click(function(){
		$(this).parent().addClass("active");
		$(this).parent().siblings().removeClass("active");

		$(".naslov").text("Upcoming Movies");

		var method = "/movie/upcoming?"
		var url = base_url + method + "&" + api_key;
		$.getJSON(url, ucitajFilmove);


	});

	$("#nowplaying").click(function(){
		$(this).parent().addClass("active");
		$(this).parent().siblings().removeClass("active");

		$(".naslov").text("Now Playing");

		var method = "/movie/now_playing?"
		var url = base_url + method + "&" + api_key;
		$.getJSON(url, ucitajFilmove);


	});

//-------------------------------------- IMG CLICK ----------------------------------


	$(".container").on("click", "img", function(){
		var method = "/movie/" + $(this).attr("id") + "?";
		var url = base_url + method + "&" + api_key;
		//console.log(url);

		$.getJSON(url, function(data, status){
			console.log(data);

			var $img = $movieDiv.find("img");
			$img.attr({
				class: "img-thumbnail",
				src: "http://image.tmdb.org/t/p/w185" + data.poster_path
			});

			$movieDiv.find("a.title").text(data.title + " (" + data.release_date.split("-")[0] + ")")
									.attr("href", "http://www.imdb.com/title/" + data.imdb_id);


			var $ul = $movieDiv.find("ul");
			$ul.empty();
			var $livreme = $("<li>"+ parseInt(data.runtime/60)+ "h " + (data.runtime)%60 +"min</li><li>|</li>");

			var zanr = "";
			$.each(data.genres, function(index, value){
				zanr += value.name;
				if (index != data.genres.length-1){
					zanr += "  ,  ";
				}
			});
			var $genres = $("<li>"+zanr+"</li>");

			var formatter1 = new Intl.DateTimeFormat("sr");
			var $release = $("<li>|</li><li>" + formatter1.format(new Date(data.release_date)) + "</li><li>|</li>");
			var $rating = $('<li>Rating: ' + data.vote_average + '<span class="glyphicon glyphicon-star" style="color:#ffcc00"> </span> - '+data.vote_count+' votes</li>');

			$ul.append($livreme, $genres, $release, $rating);





			





			//--------------------------- Description ---------------------------------


			$movieDiv.find("#description").text(data.overview);

			var productionCompanies = "";
			$.each(data.production_companies, function(index, value){
				productionCompanies += value.name;
				if(index != data.production_companies.length-1){
					productionCompanies += ", ";
				}

			});
			$movieDiv.find("#production").text("Production companies: "+ productionCompanies);
			
			var formatterUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });		
			$movieDiv.find("#budget").text("Budget: " + formatterUSD.format(data.budget));
			$movieDiv.find("#revenue").text("Revenue: " + formatterUSD.format(data.revenue));

			$movieDiv.find("#tagline").text("Tagline: " + data.tagline);


//-------------------------------------- BOX SHOW unutar img click ------------------
	
			if($movieDiv.css("display") == "none"){
				$movieDiv.slideDown("slow");
			} else $movieDiv.fadeIn();

			$("button.simmilar").show(10).attr({
					id: data.id,
					title: $("a.title").text() 
				});
				
			});

	}); // CLICK IMG KRAJ


		$("button.search").click(function(){
		var $inputValue = $("#tbInput").val();
		var method = "/search/movie?";
		var query = "query="+$inputValue;

		var url = base_url+method+"&"+api_key+"&"+query;

		$("h2.naslov").text("Results for: "+$inputValue);

		$.getJSON(url, ucitajFilmove);
	});


//-------------------------------------- FADE EFFECT --------------------------------


	$(".posters").on("mouseover", "img", function(){
		$(this).fadeTo(50, 0.7);
	});

	$(".posters").on("mouseleave", "img", function(){
		$(this).fadeTo(50, 1);
	});


});

//-------------------------------------- KRAJ ---------------------------------------
