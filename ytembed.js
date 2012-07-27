/*Parse the Youtube video id out of a pasted video URL*/
function parseid(){
	var url = document.getElementById('ytid').value;
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match&&match[2].length==11){
		document.getElementById('ytid').value = match[2];
	}else{
		document.getElementById('ytidmess').innerHTML = "The value you entered is not a valid YouTube URL";
	}
	imgcheck();
}
/*Load the image first so the size can be calculated properly*/
function imgcheck() {
	/*run check on field value first, not the image*/
	var img = new Image();
	img.src = document.getElementById('wmlocation').value;
	if(img.src !== ""){
		/*If the img doesn't load properly (incorrect image address), kill the process, notify the user*/
		/*img.onerror{
			alert("image fail!");
		}*/
		//img.onerror = alert("image fail!");
		img.onload = generate();
	}
	else{
		alert('no image specified!');
	}
	/*else{
		generate();
	}*/
}
function generate() {
	/* If the embed size is set to less than 200x200, warn the user*/
	if((parseInt(document.getElementById('height').value) < 200) || (parseInt(document.getElementById('width').value) < 200)){
		alert('Warning: YouTube does not support video embed sizes smaller than 200x200.');
	}
	/*Set preview values to null so the contents refresh rather than stack*/
	document.getElementById('embedcode').value = "";
	document.getElementById('linkpreview').innerHTML = "";
	document.getElementById('linkpreview2').innerHTML = "";
	document.getElementById('linkpreview3').innerHTML = "";
	document.getElementById('tbpreview').innerHTML = "";
	document.getElementById('tbactive').innerHTML = "";
	/*document.getElementById('preview').innerHTML = "";*/
	document.getElementById('wmcontainer').innerHTML = "";
	var finalstring = "";
	var width = 'width=\"'+document.getElementById('width').value+'\" ';
	var height = 'height=\"'+document.getElementById('height').value+'\" ';
	var ytid = document.getElementById('ytid').value;
	var color1 = document.getElementById('bordercolor1').value;
	var color2 = document.getElementById('bordercolor2').value;
	var custompara = document.getElementById('custompara').value;
	var playlist = document.getElementById('playlist').value;
	var searchplaylist = document.getElementById('searchplaylist').value;
	var start = document.getElementById('start').value;
	var end = document.getElementById('end').value;
	var wmlocation = document.getElementById('wmlocation').value;
	var wmlink = document.getElementById('wmlink').value;
	var prevthumblink = document.getElementById('prevthumblink').value;
	var wmxcontrol = parseInt(document.getElementById('wmxcontrol').value);
	var wmycontrol = parseInt(document.getElementById('wmycontrol').value);
	/*Set HTTP value based on set security*/
	var protocol = "";
	if (document.getElementById('security').checked){
		protocol = "https://";
	}
	else{
		protocol = "http://";
	}
	/*GETTING IMAGE SIZE START*/
	document.getElementById('wmcontainer').innerHTML = '<img id="wmprev" style=\"width: expression( document.body.clientWidth > 149 ? \'150px\' : \'auto\' );height: expression( this.scrollHeight > 74 ? \'75px\' : \'auto\' );max-width:150px;max-height:75px;\" src=\"'+wmlocation+'\"\/>';
	var imgheight = document.querySelector("#wmprev").height;
	var imgwidth = document.querySelector("#wmprev").width;
	/*DEBUG: Confirm proper image size*/
	/*alert("images is "+imgwidth+"x"+imgheight);*/
	/*Position watermark with percentage of window values*/
	var wmhpos = ((wmxcontrol/100)*(parseInt(document.getElementById('width').value)))-(imgwidth/2);
	var wmvpos = (wmycontrol/100)*(parseInt(document.getElementById('height').value))+(imgheight/2);
	/*Position watermark with pixel coordinates*/
	/*var wmhpos = document.getElementById('width').value-155;
	var wmvpos = (wmycontrol*-1)+parseInt(document.getElementById('height').value);*/
	/*Style Custom UI*/
	var customuistyle = '';
	if(document.getElementById('theme').checked === true){
		customuistyle = 'border: 1px solid lightgray;padding:15px 15px 0px 15px;background:#EEEEEE url(\'http:\/\/www.classynemesis.com\/projects\/ytembed\/yt-nav-gr-light.png\') bottom left repeat-x;border-radius:15px;-moz-box-shadow:3px 3px 3px black;-webkit-box-shadow:3px 3px 3px black;box-shadow:3px 3px 3px black;';
	}
	else{
		customuistyle = 'padding:15px 15px 0px 15px;background:#161616 url(\'http:\/\/www.classynemesis.com\/projects\/ytembed\/yt-nav-gr-dark.png\') bottom left repeat-x;border-radius:15px;-moz-box-shadow:3px 3px 3px black;-webkit-box-shadow:3px 3px 3px black;box-shadow:3px 3px 3px black;';
	}
	var ytstring = 'http:\/\/www.youtube.com\/watch?v='+document.getElementById('ytid').value;
	var ytstring2 = 'http:\/\/youtu.be\/'+document.getElementById('ytid').value;
	var ytstring3 = 'http:\/\/www.youtube.com\/v\/'+document.getElementById('ytid').value;
	var tbstring = '<a href=\"http:\/\/www.youtube.com\/my_videos_edit?video_id='+document.getElementById('ytid').value+'#form-pane\" target=\"_blank\"><img border=\"none\" style=\"padding:8px 4px;\" src=\"http:\/\/img.youtube.com\/vi\/'+document.getElementById('ytid').value+'\/1.jpg\" \/><\/a><a href=\"http:\/\/www.youtube.com\/my_videos_edit?video_id='+document.getElementById('ytid').value+'#form-pane\" target=\"_blank\"><img border=\"none\" style=\"padding:8px 4px;\" src=\"http:\/\/img.youtube.com\/vi\/'+document.getElementById('ytid').value+'\/2.jpg\" \/><\/a><a href=\"http:\/\/www.youtube.com\/my_videos_edit?video_id='+document.getElementById('ytid').value+'#form-pane\" target=\"_blank\"><img border=\"none\" style=\"padding:8px 4px;\" src=\"http:\/\/img.youtube.com\/vi\/'+document.getElementById('ytid').value+'\/3.jpg\" \/><\/a>';
	var tbactive = '<a href=\"http:\/\/www.youtube.com\/my_videos_edit?video_id='+document.getElementById('ytid').value+'#form-pane\" target=\"_blank\"><img border=\"none\" style=\"background-color: #FEFCB3;border: 1px solid #FFE158;padding: 8px;\" src=\"http:\/\/img.youtube.com\/vi\/'+document.getElementById('ytid').value+'\/default.jpg\" \/><\/a>';
	if ((wmlocation !== "") && (document.getElementById('watermark').checked)){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?wmode=opaque';
		}
		else{
			ytid += '&wmode=opaque';
		}
	}
	if (document.getElementById('720hd').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?vq=hd720';
		}
		else{
			ytid += '&vq=hd720';
		}
	}
	if (document.getElementById('1080hd').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?vq=hd1080';
		}
		else{
			ytid += '&vq=hd1080';
		}
	}
	if (document.getElementById('modestbranding').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?modestbranding=1';
		}
		else{
			ytid += '&modestbranding=1';
		}
	}
	if (document.getElementById('autoplay').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?autoplay=1';
		}
		else{
			ytid += '&autoplay=1';
		}
	}
	if (document.getElementById('ccload').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?cc_load_policy=1';
		}
		else{
			ytid += '&cc_load_policy=1';
		}
	}
	if (document.getElementById('controls').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?controls=0';
		}
		else{
			ytid += '&controls=0';
		}
	}
	if (document.getElementById('fullscreenbutton').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?fs=0';
		}
		else{
			ytid += '&fs=0';
		}
	}
	if (document.getElementById('hd').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?hd=1';
		}
		else{
			ytid += '&hd=1';
		}
	}
	if (document.getElementById('annotations').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?iv_load_policy=3';
		}
		else{
			ytid += '&iv_load_policy=3';
		}
	}
	if (document.getElementById('loop').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?loop=1';
		}
		else{
			ytid += '&loop=1';
		}
	}
	if (document.getElementById('related').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?rel=0';
		}
		else{
			ytid += '&rel=0';
		}
	}
	if (document.getElementById('showinfo').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?showinfo=0';
		}
		else{
			ytid += '&showinfo=0';
		}
	}
	if (document.getElementById('showsearch').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?showsearch=0';
		}
		else{
			ytid += '&showsearch=0';
		}
	}
	if (document.getElementById('theme').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?theme=light';
		}
		else{
			ytid += '&theme=light';
		}
	}
	if (document.getElementById('playbarcolor').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?color=white';
		}
		else{
			ytid += '&color=white';
		}
	}
	if (document.getElementById('autohide').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?autohide=0';
		}
		else{
			ytid += '&autohide=0';
		}
	}
	if (document.getElementById('kbcontrols').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?disablekb=1';
		}
		else{
			ytid += '&disablekb=1';
		}
	}
	if (document.getElementById('egm').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?egm=1';
		}
		else{
			ytid += '&egm=1';
		}
	}
	if (document.getElementById('videoborder').checked){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?border=1';
		}
		else{
			ytid += '&border=1';
		}
	}
	if (color1 !== ""){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?color1='+color1;
		}
		else{
			ytid += '&color1='+color1;
		}
	}
	if (color2 !== ""){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?color2='+color2;
		}
		else{
			ytid += '&color2='+color2;
		}
	}
	if (custompara !== ""){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?'+custompara;
		}
		else{
			ytid += '&'+custompara;
		}
	}
	if (searchplaylist !== ""){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?q='+searchplaylist;
		}
		else{
			ytid += '&q='+searchplaylist;
		}
	}
	if (playlist !== ""){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?playlist='+playlist;
		}
		else{
			ytid += '&playlist='+playlist;
		}
	}
	if (start !== ""){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?start='+start;
		}
		else{
			ytid += '&start='+start;
		}
	}
	if (end !== ""){
		if(ytid == document.getElementById('ytid').value){
			ytid += '?end='+end;
		}
		else{
			ytid += '&end='+end;
		}
	}
	var modheight = parseInt(document.getElementById('height').value);
	var modwidth = parseInt(document.getElementById('width').value);
	var wmintro = '<div style=\"overflow: hidden;width:'+modwidth+'px;height:'+modheight+'px;\"><style type=\"text\/css\">.watermark{border:0;position:relative;bottom:'+wmvpos+'px;left:'+wmhpos+'px;max-width:150px;max-height:75px;opacity:0.25;z-index:5;-o-transition:opacity 0.5s ease-in-out;-moz-transition:opacity 0.5s ease-in-out;-webkit-transition:opacity 0.5s ease-in-out;transition:opacity 0.5s ease-in-out;}.watermark:hover{opacity:1;}<\/style>';
	var wmoutro = '<a href=\"'+wmlink+'\" target=\"_blank\"><img class=\"watermark\" src=\"'+wmlocation+'\" \/><\/a></div>';
	/*If customUI is enabled and watermark is disabled*/
	if  ((document.getElementById('customUI').checked === true) && (document.getElementById('watermark').checked === false)){
		finalstring = '<iframe '+width+height+'src=\"'+protocol+'www.youtube.com\/embed\/'+ytid+'\" style=\"'+customuistyle+'\" frameborder=\"0\"><\/iframe>';
	}
	/*If customUI is enabled and watermark is enabled*/
	else if  ((document.getElementById('customUI').checked === true) && (document.getElementById('watermark').checked === true)){
		wmhpos += 0;
		wmvpos += 0;
		var wmintro = '<div style=\"overflow: hidden;width:'+modwidth+'px;height:'+modheight+'px;'+customuistyle+'\"><style type=\"text\/css\">.watermark{border:0;position:relative;bottom:'+wmvpos+'px;left:'+wmhpos+'px;max-width:150px;max-height:75px;opacity:0.25;z-index:5;-o-transition:opacity 0.5s ease-in-out;-moz-transition:opacity 0.5s ease-in-out;-webkit-transition:opacity 0.5s ease-in-out;transition:opacity 0.5s ease-in-out;}.watermark:hover{opacity:1;}<\/style>';
		finalstring = wmintro+'<iframe '+width+height+'src=\"'+protocol+'www.youtube.com\/embed\/'+ytid+'\" frameborder=\"0\"><\/iframe>'+wmoutro;
	}
	/*If customUI is disabled and watermark is enabled*/
	else if  ((document.getElementById('customUI').checked === false) && (document.getElementById('watermark').checked === true)){
		finalstring = wmintro+'<iframe '+width+height+'src=\"'+protocol+'www.youtube.com\/embed\/'+ytid+'\"><\/iframe>'+wmoutro;
	}
	/*If CustomUI is disabled and watermark is disabled*/
	else{
		finalstring = '<iframe '+width+height+'src=\"'+protocol+'www.youtube.com\/embed\/'+ytid+'\"><\/iframe>';
	}				
	/*Check if the image is being placed outside the viewable range and notify user*/
	if (((parseInt(document.getElementById('wmxcontrol').value) > 100) || (parseInt(document.getElementById('wmycontrol').value) > 100)) && (document.getElementById('watermark').checked)){
		finalstring = "Alert: you've positioned the watermark outside of the video window.";
	}
	/*If Custom Preview Image is Enabled*/
	if (document.getElementById('prevthumb').checked){
		/*Calculate position of play button*/
		var playv = (parseInt(document.getElementById('height').value) / 2)-25;
		var playh = (parseInt(document.getElementById('width').value) / 2)-35;
		finalstring = '<div id=\"player\" style=\"height:'+document.getElementById('height').value+'px;width:'+document.getElementById('width').value+'px;background: black url(\''+prevthumblink+'\') no-repeat center;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;overflow:hidden;\"><img onclick=\"play();\" style=\"margin: '+playv+'px '+playh+'px;cursor:pointer;\" src=\"http:\/\/www.classynemesis.com\/projects\/ytembed\/yt-playbtn.png\"\/><\/div><script type=\"text\/javascript\">function play(){document.getElementById(\'player\').innerHTML = \'<iframe '+width+height+'src=\"http:\/\/www.youtube.com\/embed\/'+ytid+'\"><\/iframe>\';}<\/script>';
		/*If customUI is also Enabled*/
		/*if ((document.getElementById('customUI').checked === true) && (document.getElementById('watermark').checked === false)){
			wmintro = '<div style=\"overflow: hidden;width:'+modwidth+'px;height:'+modheight+'px;'+customuistyle+'\"><style type=\"text\/css\">.watermark{border:0;position:relative;bottom:'+wmvpos+'px;left:'+wmhpos+'px;max-width:150px;max-height:75px;opacity:0.25;z-index:5;-o-transition:opacity 0.5s ease-in-out;-moz-transition:opacity 0.5s ease-in-out;-webkit-transition:opacity 0.5s ease-in-out;transition:opacity 0.5s ease-in-out;}.watermark:hover{opacity:1;}<\/style>';
			finalstring = '<div id=\"player\" style=\"height:'+document.getElementById('height').value+'px;width:'+document.getElementById('width').value+'px;background: black url(\''+prevthumblink+'\') no-repeat center;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;overflow:hidden;\"><img onclick=\"play();\" style=\"margin: '+playv+'px '+playh+'px;cursor:pointer;\" src=\"http:\/\/www.classynemesis.com\/projects\/ytembed\/yt-playbtn.png\"\/><\/div><script type=\"text\/javascript\">function play(){document.getElementById(\'player\').innerHTML = \'<iframe '+width+height+'src=\"http:\/\/www.youtube.com\/embed\/'+ytid+'\"><\/iframe>\';}<\/script>';
		}*/
		/*If Watermark is also Enabled*/
		if ((document.getElementById('watermark').checked === true) && (document.getElementById('customUI').checked === false)){
			finalstring = '<div id=\"player\" style=\"height:'+document.getElementById('height').value+'px;width:'+document.getElementById('width').value+'px;background: black url(\''+prevthumblink+'\') no-repeat center;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;overflow:hidden;\"><img onclick=\"play();\" style=\"margin: '+playv+'px '+playh+'px;cursor:pointer;\" src=\"http:\/\/www.classynemesis.com\/projects\/ytembed\/yt-playbtn.png\"\/><\/div><script type=\"text\/javascript\">function play(){document.getElementById(\'player\').innerHTML = \''+wmintro+'<iframe '+width+height+'src=\"http:\/\/www.youtube.com\/embed\/'+ytid+'\"><\/iframe>'+wmoutro+'\';}<\/script>';
		}
		/*If Watermark and customUI are both also Enabled*/
		/*if ((document.getElementById('watermark').checked === true) && (document.getElementById('customUI').checked === true)){
			wmintro = '<div style=\"overflow: hidden;width:'+modwidth+'px;height:'+modheight+'px;'+customuistyle+'\"><style type=\"text\/css\">.watermark{border:0;position:relative;bottom:'+wmvpos+'px;left:'+wmhpos+'px;max-width:150px;max-height:75px;opacity:0.25;z-index:5;-o-transition:opacity 0.5s ease-in-out;-moz-transition:opacity 0.5s ease-in-out;-webkit-transition:opacity 0.5s ease-in-out;transition:opacity 0.5s ease-in-out;}.watermark:hover{opacity:1;}<\/style>';
		}*/
	}
	document.getElementById('embedcode').value = finalstring;
	document.getElementById('linkpreview').innerHTML = '<a style=\"font-family:arial,sans-serif;font-color:blue;\" href=\"'+ytstring+'\" target=\"_blank\">'+ytstring+'<\/a>';
	document.getElementById('linkpreview2').innerHTML = '<a style=\"font-family:arial,sans-serif;font-color:blue;\" href=\"'+ytstring2+'\" target=\"_blank\">'+ytstring2+'<\/a>';
	document.getElementById('linkpreview3').innerHTML = '<a style=\"font-family:arial,sans-serif;font-color:blue;\" href=\"'+ytstring3+'\" target=\"_blank\">'+ytstring3+'<\/a>';
	document.getElementById('tbpreview').innerHTML = tbstring;
	document.getElementById('tbactive').innerHTML = tbactive;
	/*document.getElementById('preview').innerHTML = finalstring;*/
	var window = document.getElementById('preview');
	window.contentWindow.document.write('<html><head><style type="text/css">body{margin:0;}</style></head><body>'+finalstring+'</body></html>');
	window.contentWindow.document.close();
}
function hdcheck720(){
	if(document.getElementById('720hd').checked === true){
		document.getElementById('1080hd').checked = false;
	}
}
function hdcheck1080(){
	if(document.getElementById('1080hd').checked === true){
		document.getElementById('720hd').checked = false;
	}
}
function autohidecheck(){
	if(document.getElementById('customUI').checked === true){
		document.getElementById('autohide').checked = true;
		document.getElementById('controls').checked = false;
		document.getElementById('prevthumb').checked = false;
		document.getElementById('previmgsub').style.display = "none";
	}
}
function customuicheck(){
	if((document.getElementById('autohide').checked === false) || (document.getElementById('controls').checked === true)){
		document.getElementById('customUI').checked = false;
	}
}
function prevthumbcheck(){
	if(document.getElementById('prevthumb').checked === true){
		document.getElementById('autoplay').checked = true;
		document.getElementById('customUI').checked = false;
	}
}
function clearall(){
	document.getElementById('security').checked = false;
	document.getElementById('modestbranding').checked = false;
	document.getElementById('autoplay').checked = false;
	document.getElementById('ccload').checked = false;
	document.getElementById('controls').checked = false;
	document.getElementById('fullscreenbutton').checked = false;
	document.getElementById('720hd').checked = false;
	document.getElementById('1080hd').checked = false;
	document.getElementById('hd').checked = false;
	document.getElementById('annotations').checked = false;
	document.getElementById('loop').checked = false;
	document.getElementById('related').checked = false;
	document.getElementById('showinfo').checked = false;
	document.getElementById('showsearch').checked = false;
	document.getElementById('theme').checked = false;
	document.getElementById('playbarcolor').checked = false;
	document.getElementById('autohide').checked = false;
	document.getElementById('kbcontrols').checked = false;
	document.getElementById('egm').checked = false;
	document.getElementById('videoborder').checked = false;
	document.getElementById('customUI').checked = false;
	document.getElementById('watermark').checked = false;
	document.getElementById('prevthumb').checked = false;
	document.getElementById('width').value = 560;
	document.getElementById('height').value = 315;
	document.getElementById('start').value = "";
	document.getElementById('end').value = "";
	document.getElementById('custompara').value = "";
	document.getElementById('searchplaylist').value = "";
	document.getElementById('playlist').value = "";
	document.getElementById('bordercolor1').value = "";
	document.getElementById('bordercolor2').value = "";
	document.getElementById('watermarksub').style.display = "none";
	document.getElementById('previmgsub').style.display = "none";
}