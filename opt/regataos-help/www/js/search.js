// Fix search
var form = document.getElementById('form');
var field = document.getElementById('field');

form.addEventListener('submit', function(e) {
	// Capture the search
	var data = field.value
	$('#field').val("");

	// Go search page
	var load = "https://suporte.regataos.com.br/search?q=" + data;
	window.location.href = load;

	// Take the page to the top
	window.scrollTo(0,0);

	// Prevent form submission
	e.preventDefault();
});
