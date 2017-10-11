var apividtitle;
var apividdec;
var apividviews;
var apividpubupdate;
var apividauthor;
var apividduration;

/* Get video info and display */
function vidinfo(){
	document.getElementById('ytdata').innerHTML = null;
	var scriptcontainer = document.getElementById('ytdata');
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://gdata.youtube.com/feeds/api/videos/'+document.getElementById('ytid').value+'?v=2&alt=json-in-script&format=5&callback=getytinfo';
	scriptcontainer.appendChild(script);
	getytinfo();
}
var getytinfo = function (info){
	apividtitle = info.entry.title.$t;
	apividdec = info.entry.media$group.media$description.$t;
	apividviews = info.entry.yt$statistics.viewCount;
	apividpubupdate = new Date(info.entry.published.$t).toLocaleDateString();
	apividauthor = info.entry.author[0].name.$t;
	apividduration = info.entry.media$group.yt$duration.seconds;
	document.getElementById('vidtitle').innerHTML = '<a href=\"http:\/\/www.youtube.com\/watch?v='+document.getElementById('ytid').value+'\" target=\"_blank\">'+apividtitle+'<\/a>';
	document.getElementById('viddesc').innerHTML = apividdec;
	document.getElementById('vidviews').innerHTML = numberWithCommas(apividviews);
	document.getElementById('vidpubdate').innerHTML = apividpubupdate;
	document.getElementById('vidauthor').innerHTML = '<a href=\"http:\/\/www.youtube.com\/user\/'+apividauthor+'\" target=\"_blank\">'+apividauthor+'<\/a>';
	document.getElementById('vidduration').innerHTML = Math.floor(apividduration/60)+'m '+(apividduration%60)+'s';
};

/* Adds commas to passed value */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* Parse the Youtube video id out of a pasted video URL */
function parseid(){
	document.getElementById('ytidmess').innerHTML = "";
	var url = document.getElementById('ytid').value;
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
	var match = url.match(regExp);
	if(document.getElementById('ytid').value.length !== 11){
		if(match&&match[2].length===11){
			document.getElementById('ytid').value = match[2];
		}
		else{
			document.getElementById('ytidmess').innerHTML = "The value you entered is not a valid YouTube URL";
		}
	}
	imgcheck();
	vidinfo();
}

/* Load the image first so the size can be calculated properly */
function imgcheck() {
	/* Run check on field value first, not the image */
	var img = new Image();
	img.src = document.getElementById('wmlocation').value;
	if(img.src !== ""){
		//If the img doesn't load properly (incorrect image address), kill the process, notify the user
		//img.onerror = alert("image fail!");
		img.onload = generate();
	}
	else{
		alert('no image specified!');
	}
}

/* After imgcheck function, check selected options and build embed code */
function generate() {
	/* If the embed size is set to less than 200x200, warn the user */
	if((parseInt(document.getElementById('height').value,10) < 200) || (parseInt(document.getElementById('width').value,10) < 200)){
		alert('Warning: YouTube does not support video embed sizes smaller than 200x200.');
	}
	/* Set preview values to empty so the contents refresh rather than stack */
	document.getElementById('embedcode').value = "";
	document.getElementById('linkpreview').innerHTML = "";
	document.getElementById('linkpreview2').innerHTML = "";
	document.getElementById('linkpreview3').innerHTML = "";
	document.getElementById('tbpreview').innerHTML = "";
	document.getElementById('tbactive').innerHTML = "";
	/*document.getElementById('vidwrap').innerHTML = "";*/
	document.getElementById('wmcontainer').innerHTML = "";
	var finalstring = "";
	var width = 'width=\"'+document.getElementById('width').value+'\" ';
	var height = 'height=\"'+document.getElementById('height').value+'\" ';
	var ytid = document.getElementById('ytid').value;
	var custompara = document.getElementById('custompara').value;
	var playlist = document.getElementById('playlist').value;
	var searchplaylist = document.getElementById('searchplaylist').value;
	var start = document.getElementById('start').value;
	var end = document.getElementById('end').value;
	/* Social media buttons variables */
	var socialurl='http://youtu.be/'+document.getElementById('ytid').value;
	var socialdescription=apividtitle;
	var socialstring = "";
	var twittervia = document.getElementById('twittervia').value;
	var FacebookVal = "";
	var TwitterVal = "";
	var GoogleplusVal= "";
	var LinkedInVal = "";
	var PinterestVal = "";
	var CommentsVal = "";
	/*Watermark variables*/
	var wmlocation = document.getElementById('wmlocation').value;
	var wmlink = document.getElementById('wmlink').value;
	var wmxcontrol = parseInt(document.getElementById('wmxcontrol').value,10);
	var wmycontrol = parseInt(document.getElementById('wmycontrol').value,10);
	/*Custom thumbnail variables*/
	var prevthumblink = document.getElementById('prevthumblink').value;
	/*CTA variables*/
	var ctaimg = document.getElementById('ctathumbimg').value;
	var ctalink = document.getElementById('ctathumblink').value;
	/*Set HTTP value based on set security*/
	var protocol = "";
	if(document.getElementById('security').checked){
		protocol = "https://";
	}
	else{
		protocol = "http://";
	}
	/*GETTING IMAGE SIZE START*/
	document.getElementById('wmcontainer').innerHTML = '<img id="wmprev" style=\"width: expression( document.body.clientWidth > 149 ? \'150px\' : \'auto\' );height: expression( this.scrollHeight > 74 ? \'75px\' : \'auto\' );max-width:150px;max-height:75px;\" src=\"'+wmlocation+'\"\/>';
	var imgheight = document.querySelector("#wmprev").height;
	var imgwidth = document.querySelector("#wmprev").width;
	/*Position watermark with percentage of window values*/
	var wmhpos = ((wmxcontrol/100)*(parseInt(document.getElementById('width').value,10)))-(imgwidth/2);
	var wmvpos = (wmycontrol/100)*(parseInt(document.getElementById('height').value,10))+(imgheight/2);
	/*Style Custom UI*/
	var customuistyle = '';
	if(document.getElementById('theme').checked === true){
		customuistyle = 'border: 1px solid lightgray;padding:15px 15px 0px 15px;background:#cbcbcb;border-radius:15px;-moz-box-shadow:3px 3px 3px black;-webkit-box-shadow:3px 3px 3px black;box-shadow:3px 3px 3px black;';
	}
	else{
		customuistyle = 'padding:15px 15px 0px 15px;background:#1a1a1a;border-radius:15px;-moz-box-shadow:3px 3px 3px black;-webkit-box-shadow:3px 3px 3px black;box-shadow:3px 3px 3px black;';
	}
	var ytstring = 'http:\/\/www.youtube.com\/watch?v='+document.getElementById('ytid').value;
	var ytstring2 = 'http:\/\/youtu.be\/'+document.getElementById('ytid').value;
	var ytstring3 = 'http:\/\/www.youtube.com\/v\/'+document.getElementById('ytid').value;
	var tbstring = '<a href=\"http:\/\/www.youtube.com\/my_videos_edit?video_id='+document.getElementById('ytid').value+'#form-pane\" target=\"_blank\"><img border=\"none\" style=\"padding:8px 4px;\" src=\"\/\/img.youtube.com\/vi\/'+document.getElementById('ytid').value+'\/1.jpg\" \/><\/a><a href=\"http:\/\/www.youtube.com\/my_videos_edit?video_id='+document.getElementById('ytid').value+'#form-pane\" target=\"_blank\"><img border=\"none\" style=\"padding:8px 4px;\" src=\"\/\/img.youtube.com\/vi\/'+document.getElementById('ytid').value+'\/2.jpg\" \/><\/a><a href=\"http:\/\/www.youtube.com\/my_videos_edit?video_id='+document.getElementById('ytid').value+'#form-pane\" target=\"_blank\"><img border=\"none\" style=\"padding:8px 4px;\" src=\"\/\/img.youtube.com\/vi\/'+document.getElementById('ytid').value+'\/3.jpg\" \/><\/a>';
	var tbactive = '<a href=\"http:\/\/www.youtube.com\/my_videos_edit?video_id='+document.getElementById('ytid').value+'#form-pane\" target=\"_blank\"><img border=\"none\" style=\"background-color: #FEFCB3;border: 1px solid #FFE158;padding: 8px;\" src=\"\/\/img.youtube.com\/vi\/'+document.getElementById('ytid').value+'\/default.jpg\" \/><\/a><br\/><a style=\"font-family:arial,sans-serif;font-color:blue;\" href=\"http:\/\/img.youtube.com\/vi\/'+document.getElementById('ytid').value+'\/maxresdefault.jpg\" target=\"_blank\">Click for HD Version<\/a>';
	if((wmlocation !== "") && (document.getElementById('watermark').checked)){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?wmode=opaque';
		}
		else{
			ytid += '&wmode=opaque';
		}
	}
	if(document.getElementById('720hd').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?vq=hd720';
		}
		else{
			ytid += '&vq=hd720';
		}
	}
	if(document.getElementById('1080hd').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?vq=hd1080';
		}
		else{
			ytid += '&vq=hd1080';
		}
	}
	if(document.getElementById('modestbranding').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?modestbranding=1';
		}
		else{
			ytid += '&modestbranding=1';
		}
	}
	if(document.getElementById('autoplay').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?autoplay=1';
		}
		else{
			ytid += '&autoplay=1';
		}
	}
	if(document.getElementById('ccload').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?cc_load_policy=1';
		}
		else{
			ytid += '&cc_load_policy=1';
		}
	}
	if(document.getElementById('controls').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?controls=0';
		}
		else{
			ytid += '&controls=0';
		}
	}
	if(document.getElementById('fullscreenbutton').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?fs=0';
		}
		else{
			ytid += '&fs=0';
		}
	}
	if(document.getElementById('annotations').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?iv_load_policy=3';
		}
		else{
			ytid += '&iv_load_policy=3';
		}
	}
	if(document.getElementById('loop').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?loop=1';
		}
		else{
			ytid += '&loop=1';
		}
	}
	if(document.getElementById('related').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?rel=0';
		}
		else{
			ytid += '&rel=0';
		}
	}
	if(document.getElementById('showinfo').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?showinfo=0';
		}
		else{
			ytid += '&showinfo=0';
		}
	}
	if(document.getElementById('theme').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?theme=light';
		}
		else{
			ytid += '&theme=light';
		}
	}
	if(document.getElementById('playbarcolor').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?color=white';
		}
		else{
			ytid += '&color=white';
		}
	}
	if(document.getElementById('autohide').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?autohide=0';
		}
		else{
			ytid += '&autohide=0';
		}
	}
	if(document.getElementById('kbcontrols').checked){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?disablekb=1';
		}
		else{
			ytid += '&disablekb=1';
		}
	}
	if(custompara !== ""){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?'+custompara;
		}
		else{
			ytid += '&'+custompara;
		}
	}
	if(searchplaylist !== ""){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?q='+searchplaylist;
		}
		else{
			ytid += '&q='+searchplaylist;
		}
	}
	if(playlist !== ""){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?playlist='+playlist;
		}
		else{
			ytid += '&playlist='+playlist;
		}
	}
	if(start !== ""){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?start='+start;
		}
		else{
			ytid += '&start='+start;
		}
	}
	if(end !== ""){
		if(ytid === document.getElementById('ytid').value){
			ytid += '?end='+end;
		}
		else{
			ytid += '&end='+end;
		}
	}
	/* Social media buttons check */
	if(twittervia === "Twitter Handle (optional)"){
		twittervia = "";
	}
	if(document.getElementById('Facebook').checked){
		FacebookVal='<iframe src=\"\/\/www.facebook.com\/plugins\/like.php?href='+socialurl+'&send=false&layout=button_count&width=100&show_faces=false&action=like&colorscheme=light&font=arial&height=21&\" scrolling=\"no\" frameborder=\"0\" style=\"border:none; overflow:hidden; width:100px; height:21px;\" allowTransparency=\"true\"><\/iframe>';
	}
	if(document.getElementById('Googleplus').checked){
		TwitterVal='<script type=\"text\/javascript\" src=\"https:\/\/apis.google.com\/js\/plusone.js\"><\/script><div class=\"g-plusone\" data-size=\"medium\" data-href=\"'+socialurl+'\"><\/div>';
	}
	if(document.getElementById('Twitter').checked){
		GoogleplusVal='<a href=\"https:\/\/twitter.com\/share\" class=\"twitter-share-button\" data-url=\"'+socialurl+'\" data-text=\"'+socialdescription+': \" data-via=\"'+twittervia+'\">Tweet<\/a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=\"\/\/platform.twitter.com\/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");<\/script>';
	}
	if(document.getElementById('Linkedin').checked){
		LinkedInVal='<script src=\"\/\/platform.linkedin.com\/in.js\" type=\"text\/javascript\"><\/script><script type=\"IN\/Share\" data-url=\"'+socialurl+'\" data-counter=\"right\"><\/script>';
	}
	if(document.getElementById('Pinterest').checked){
		PinterestVal='<a href=\"\/\/pinterest.com\/pin\/create\/button\/?media=http%3A%2F%2Fimg.youtube.com%2Fvi%2F'+document.getElementById('ytid').value+'%2F0.jpg&url='+socialurl+'&title='+socialdescription+'&is_video=true&description='+socialdescription+'\" class=\"pin-it-button\" count-layout=\"horizontal\">Pin It<\/a><script type=\"text\/javascript\" src=\"\/\/assets.pinterest.com\/js\/pinit.js\"><\/script>';
	}
	if(document.getElementById('Comments').checked){
		CommentsVal='<a style=\"font-size: 11px;font-weight: bold;font-family: Helvetica, Arial, sans-serif;border: 2px solid #DD3224;padding: 1px;border-radius: 3px;color: white;text-decoration:none;background-color: #DD3224;margin-left: 25px;vertical-align:6px;\" href=\"https:\/\/www.youtube.com\/all_comments?v='+document.getElementById('ytid').value+'\" target=\"_blank\">Comments >><\/a>';
	}
	socialstring = FacebookVal+TwitterVal+GoogleplusVal+LinkedInVal+PinterestVal+CommentsVal;
	if(socialstring !== ''){
		if(document.getElementById('customUI').checked === false){
			socialstring = '<div style=\"width:'+parseInt(document.getElementById('width').value,10)+'px;\">'+socialstring+'<\/div>';
		}
		else{
			var modsocwidth = parseInt(document.getElementById('width').value,10)+30;
			socialstring = '<div style=\"width:'+modsocwidth+'px;\">'+socialstring+'<\/div>';
		}
		socialstring = '<br\/>'+socialstring;
	}
	/* Social media buttons check END */
	var modheight = parseInt(document.getElementById('height').value,10);
	var modwidth = parseInt(document.getElementById('width').value,10);
	var wmintro = '<div style=\"overflow: hidden;width:'+modwidth+'px;height:'+modheight+'px;\"><style type=\"text\/css\">.watermark{border:0;position:relative;bottom:'+wmvpos+'px;left:'+wmhpos+'px;max-width:150px;max-height:75px;opacity:0.25;z-index:5;-o-transition:opacity 0.5s ease-in-out;-moz-transition:opacity 0.5s ease-in-out;-webkit-transition:opacity 0.5s ease-in-out;transition:opacity 0.5s ease-in-out;}.watermark:hover{opacity:1;}<\/style>';
	var wmoutro = '<a href=\"'+wmlink+'\" target=\"_blank\"><img class=\"watermark\" src=\"'+wmlocation+'\" \/><\/a></div>';
	/* If customUI is enabled and watermark is disabled */
	if((document.getElementById('customUI').checked === true) && (document.getElementById('watermark').checked === false)){
		finalstring = '<iframe '+width+height+'src=\"'+protocol+'www.youtube.com\/embed\/'+ytid+'\" style=\"'+customuistyle+'\" frameborder=\"0\"><\/iframe>';
	}
	/* If customUI is enabled and watermark is enabled */
	else if((document.getElementById('customUI').checked === true) && (document.getElementById('watermark').checked === true)){
		wmhpos += 0;
		wmvpos += 0;
		wmintro = '<div style=\"overflow: hidden;width:'+modwidth+'px;height:'+modheight+'px;'+customuistyle+'\"><style type=\"text\/css\">.watermark{border:0;position:relative;bottom:'+wmvpos+'px;left:'+wmhpos+'px;max-width:150px;max-height:75px;opacity:0.25;z-index:5;-o-transition:opacity 0.5s ease-in-out;-moz-transition:opacity 0.5s ease-in-out;-webkit-transition:opacity 0.5s ease-in-out;transition:opacity 0.5s ease-in-out;}.watermark:hover{opacity:1;}<\/style>';
		finalstring = wmintro+'<iframe '+width+height+'src=\"'+protocol+'www.youtube.com\/embed\/'+ytid+'\" frameborder=\"0\"><\/iframe>'+wmoutro;
	}
	/* If customUI is disabled and watermark is enabled */
	else if((document.getElementById('customUI').checked === false) && (document.getElementById('watermark').checked === true)){
		finalstring = wmintro+'<iframe '+width+height+'src=\"'+protocol+'www.youtube.com\/embed\/'+ytid+'\" frameborder=\"0\"><\/iframe>'+wmoutro;
	}
	/* If CustomUI is disabled and watermark is disabled */
	else{
		finalstring = '<iframe '+width+height+'src=\"'+protocol+'www.youtube.com\/embed\/'+ytid+'\" frameborder=\"0\"><\/iframe>';
	}
	/* Check if the image is being placed outside the viewable range and notify user */
	if(((parseInt(document.getElementById('wmxcontrol').value,10) > 100) || (parseInt(document.getElementById('wmycontrol').value,10) > 100)) && (document.getElementById('watermark').checked)){
		finalstring = "Alert: you've positioned the watermark outside of the video window.";
	}
	/* If Custom Preview Image is Enabled */
	if(document.getElementById('prevthumb').checked){
		finalstring = '<div onclick=\"play();\" id=\"vidwrap\" style=\"height:'+document.getElementById('height').value+'px;width:'+document.getElementById('width').value+'px;background: black url(\''+prevthumblink+'\') no-repeat center;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;overflow:hidden;cursor:pointer;\"><\/div><script type=\"text\/javascript\">function play(){document.getElementById(\'vidwrap\').innerHTML = \'<iframe '+width+height+'src=\"http:\/\/www.youtube.com\/embed\/'+ytid+'\" frameborder=\"0\"><\/iframe>\';}<\/script>';
		/* If customUI is also Enabled */
		/*if((document.getElementById('customUI').checked === true) && (document.getElementById('watermark').checked === false)){
			wmintro = '<div style=\"overflow: hidden;width:'+modwidth+'px;height:'+modheight+'px;'+customuistyle+'\"><style type=\"text\/css\">.watermark{border:0;position:relative;bottom:'+wmvpos+'px;left:'+wmhpos+'px;max-width:150px;max-height:75px;opacity:0.25;z-index:5;-o-transition:opacity 0.5s ease-in-out;-moz-transition:opacity 0.5s ease-in-out;-webkit-transition:opacity 0.5s ease-in-out;transition:opacity 0.5s ease-in-out;}.watermark:hover{opacity:1;}<\/style>';
			finalstring = '<div onclick=\"play();\" id=\"vidwrap\" style=\"height:'+document.getElementById('height').value+'px;width:'+document.getElementById('width').value+'px;background: black url(\''+prevthumblink+'\') no-repeat center;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;overflow:hidden;cursor:pointer;\"><\/div><script type=\"text\/javascript\">function play(){document.getElementById(\'vidwrap\').innerHTML = \'<iframe '+width+height+'src=\"http:\/\/www.youtube.com\/embed\/'+ytid+'\" frameborder=\"0\"><\/iframe>\';}<\/script>';
		}*/
		/* If Watermark is also Enabled */
		if((document.getElementById('watermark').checked === true) && (document.getElementById('customUI').checked === false)){
			finalstring = '<div onclick=\"play();\" id=\"vidwrap\" style=\"height:'+document.getElementById('height').value+'px;width:'+document.getElementById('width').value+'px;background: black url(\''+prevthumblink+'\') no-repeat center;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;overflow:hidden;cursor:pointer;\"><\/div><script type=\"text\/javascript\">function play(){document.getElementById(\'vidwrap\').innerHTML = \''+wmintro+'<iframe '+width+height+'src=\"http:\/\/www.youtube.com\/embed\/'+ytid+'\" frameborder=\"0\"><\/iframe>'+wmoutro+'\';}<\/script>';
		}
		/* If Watermark and customUI are both also Enabled */
		/*if((document.getElementById('watermark').checked === true) && (document.getElementById('customUI').checked === true)){
			wmintro = '<div style=\"overflow: hidden;width:'+modwidth+'px;height:'+modheight+'px;'+customuistyle+'\"><style type=\"text\/css\">.watermark{border:0;position:relative;bottom:'+wmvpos+'px;left:'+wmhpos+'px;max-width:150px;max-height:75px;opacity:0.25;z-index:5;-o-transition:opacity 0.5s ease-in-out;-moz-transition:opacity 0.5s ease-in-out;-webkit-transition:opacity 0.5s ease-in-out;transition:opacity 0.5s ease-in-out;}.watermark:hover{opacity:1;}<\/style>';
		}*/
	}
	/* If CTA Image is Enabled */
	if(document.getElementById('ctathumb').checked){
		finalstring = '<div id=\"vidwrap\"><iframe id=\"player\" '+width+height+'src=\"http:\/\/www.youtube.com\/embed\/'+ytid+'\" frameborder=\"0\"><\/iframe><\/div> <script> var tag = document.createElement(\'script\'); tag.src = \"\/\/www.youtube.com\/iframe_api\"; var firstScriptTag = document.getElementsByTagName(\'script\')[0]; firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); var player; function onYouTubeIframeAPIReady() { player = new YT.Player(\'player\', { events: { \'onStateChange\': onPlayerStateChange } }); } function onPlayerStateChange(event) { if(event.data === YT.PlayerState.ENDED) { document.getElementById(\'vidwrap\').innerHTML = \'<a href=\"'+ctalink+'\" target=\"_blank\"><img '+width+height+'src=\"'+ctaimg+'\"\/><\/a>\'; } } <\/script>';
		/*If Custom Preview Image is Also Enabled*/
		// TBD
	}
	document.getElementById('embedcode').value = finalstring+socialstring;
	document.getElementById('linkpreview').innerHTML = '<a style=\"font-family:arial,sans-serif;font-color:blue;\" href=\"'+ytstring+'\" target=\"_blank\">'+ytstring+'<\/a>';
	document.getElementById('linkpreview2').innerHTML = '<a style=\"font-family:arial,sans-serif;font-color:blue;\" href=\"'+ytstring2+'\" target=\"_blank\">'+ytstring2+'<\/a>';
	document.getElementById('linkpreview3').innerHTML = '<a style=\"font-family:arial,sans-serif;font-color:blue;\" href=\"'+ytstring3+'\" target=\"_blank\">'+ytstring3+'<\/a>';
	document.getElementById('tbpreview').innerHTML = tbstring;
	document.getElementById('tbactive').innerHTML = tbactive;
	/*document.getElementById('vidwrap').innerHTML = finalstring;*/
	var window = document.getElementById('vidwrap');
	window.contentWindow.document.write('<html><head><style type="text/css">body{margin:0;}</style></head><body>'+finalstring+socialstring+'</body></html>');
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
function watermarkcheck(){
	if(document.getElementById('watermark').checked === true){
		document.getElementById('ctathumb').checked = false;
		document.getElementById('ctaimgsub').style.display = "none";
	}
}
function prevthumbcheck(){
	if(document.getElementById('prevthumb').checked === true){
		document.getElementById('autoplay').checked = true;
		document.getElementById('customUI').checked = false;
		document.getElementById('ctathumb').checked = false;
		document.getElementById('ctaimgsub').style.display = "none";
	}
}
function ctathumbcheck(){
	if(document.getElementById('ctathumb').checked === true){
		document.getElementById('customUI').checked = false;
		document.getElementById('prevthumb').checked = false;
		document.getElementById('previmgsub').style.display = "none";
		document.getElementById('watermark').checked = false;
		document.getElementById('watermarksub').style.display = "none";

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
	document.getElementById('annotations').checked = false;
	document.getElementById('loop').checked = false;
	document.getElementById('related').checked = false;
	document.getElementById('showinfo').checked = false;
	document.getElementById('theme').checked = false;
	document.getElementById('playbarcolor').checked = false;
	document.getElementById('autohide').checked = false;
	document.getElementById('kbcontrols').checked = false;
	document.getElementById('customUI').checked = false;
	document.getElementById('socialmedia').checked = false;
	document.getElementById('watermark').checked = false;
	document.getElementById('prevthumb').checked = false;
	document.getElementById('ctathumb').checked = false;
	document.getElementById('width').value = 560;
	document.getElementById('height').value = 315;
	document.getElementById('start').value = "";
	document.getElementById('end').value = "";
	document.getElementById('custompara').value = "";
	document.getElementById('searchplaylist').value = "";
	document.getElementById('playlist').value = "";
	document.getElementById('socialsharesub').style.display = "none";
	document.getElementById('watermarksub').style.display = "none";
	document.getElementById('previmgsub').style.display = "none";
	document.getElementById('ctaimgsub').style.display = "none";
	document.getElementById('wmxcontrol').value = 85;
	document.getElementById('wmycontrol').value = 25;
	document.getElementById('wmlocation').value = "http://s.ytimg.com/yt/img/logos/youtube_logo_onecolor_againstblack-vflAZNyvx.png";
	document.getElementById('wmlink').value = "http://www.youtube.com";
	document.getElementById('prevthumblink').value = "http://img.youtube.com/vi/ueP-sPcgooI/maxresdefault.jpg";
	document.getElementById('ctathumbimg').value = "http://img.youtube.com/vi/Z3ZAGBL6UBA/default.jpg";
	document.getElementById('ctathumblink').value = "http://www.knowyourmeme.com";
	document.getElementById('twittervia').value = "Twitter Handle (optional)";
}
