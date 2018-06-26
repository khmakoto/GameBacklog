$(document).ready(function() {
	var expandedMenu = false;

	$("#toggleNav").on("click", function() {
		if (!expandedMenu) {
			$("#navbarMobile").height("175px");
			$("#toggleNav").html("&#9776; Hide Menu");
		}
		else {
			$("#navbarMobile").height("40px");
			$("#toggleNav").html("&#9776; Show Menu");
		}

		expandedMenu = !expandedMenu;
	});

	$(window).resize(function() {
		if ($(window).width() > 768) {
			$("#navbarMobile").height("40px");
			$("#toggleNav").html("&#9776; Show Menu");
			expandedMenu = false;
		}
	});
});