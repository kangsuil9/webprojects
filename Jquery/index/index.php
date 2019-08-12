<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Jquery Code Excution</title>
	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script>
		$(document).ready( function() {
			msg1();
			$('#id1').click( function() {
				msg2();
			});
		});

		function msg1() {
			alert('msg1(): After loading document, alert automatically');
		}
		function msg2() {
			$('#id2').css('background', 'silver');
			$('#id2').text('msg2(): HTML Document Changed');
		}
	</script>
</head>
<body>
	<button id="id1">Click to change text</button><br><br>
	<div id="id2">Message : </div>
</body>
</html>