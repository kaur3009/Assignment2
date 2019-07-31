var planetArray = new Array();

var planetRec;


class Planet {
	constructor (planet_name, planet_color,planet_radius,planet_dist_from_sun,planet_dist_from_earth,planet_image){		
		this.planet_name=planet_name;
		this.planet_color = planet_color;
		this.planet_radius=planet_radius;
		this.planet_dist_from_sun=planet_dist_from_sun;
		this.planet_dist_from_earth=planet_dist_from_earth; 
		this.planet_image=planet_image;
	}
} 


$(document).ready(function() {	
	$.ajax({
        type: 'GET',
        url: 'JsonFile/planets.json',
        dataType: 'json',
        success: function(data) {
		begin = data.solarSystem.planets;
		for (let x=0; x < begin.length; x++) {
			planetRec = new Planet(				
				begin[x].planetName,
				begin[x].planetColor,
				begin[x].planetRadiusKM,
				begin[x].distInMillionsKM.fromSun,
				begin[x].distInMillionsKM.fromEarth,
				begin[x].image);						
			planetArray.push(planetRec);
		}
		console.log(planetArray);

		loadPlanetData(); 
		}
	});

	
function loadPlanetData() {
	var k=1;
	for(let x of planetArray) {
		$("ul").append(`<li> <a href="individual.html"  onclick="userSeletion(${k});">
							<img src="images/${x.planet_image}"/></a>
						</li>`);
		k++;
	}
	
	
}
});

function userSeletion(a){
	localStorage.setItem(`userSelectionNo`,`${a}`);
		console.log(localStorage.getItem(`userSelectionNo`));
}

function loadSecondPage(){
	
	let select=parseInt(localStorage.getItem(`userSelectionNo`));
	console.log(select);
	var b=1;
	for(let x of planetArray){
				console.log(x.planet_name);
		if(b==select){
			document.getElementById("planet_name").innerHTML += `${x.planet_name}`;
			document.getElementById("planet_color").innerHTML += `${x.planet_color}`;
			document.getElementById("planet_radius").innerHTML += `${x.planet_radius}`;
			document.getElementById("planet_dist_from_sun").innerHTML += `${x.planet_dist_from_sun}`;
			document.getElementById("planet_dist_from_earth").innerHTML += `${x.planet_dist_from_earth}`;
			document.body.style.backgroundImage ="url(images/" + `${x.planet_image}` + ")";
	        document.body.style.backgroundRepeat="no-repeat";
	        document.body.style.backgroundSize="cover";
			           
			console.log(x.planet_name);
		}
		b++;
	}
	
}