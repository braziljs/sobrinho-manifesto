// TripleFlap, <http://floern.com/software/tripleflap>, a flying twitter bird. Copyright (c) 2010 Florian Buenzli, <http://floern.com/>, GNU/GPL.
if(typeof(twitterAccount)!="string")var twitterAccount="";
if(typeof(tweetThisText)!="string"||tweetThisText=="")var tweetThisText=document.title+" "+document.URL;
if(typeof(showTweet)!="boolean")var showTweet=false;
var tweetthislink=null;
if(typeof(otherPageOrFeed)!="string"||otherPageOrFeed=="")var otherPageOrFeed=false;
var birdSprite="birdsprite.png";/*Pfad zur Sprite-Grafik*/
var twitterfeedreader="twitterfeedreader.php";/*Pfad zur PHP-Datei*/
var hyperlinkStyle="color:#27b;text-decoration:none;";
var birdSpeed=12;
var birdSpaceVertical=16;
var birdSetUp=2;
var spriteWidth=64;
var spriteHeight=64;
var spriteAniSpeed=72;
var spriteAniSpeedSlow=Math.round(spriteAniSpeed*1.75);
var targetElems=new Array("td");
var neededElems4random=10;
var minElemWidth=Math.round(spriteWidth/3);
var scareTheBirdMouseOverTimes=4;
var scareTheBirdTime=1000;
var showOnMobile=false;
var birdIsFlying=false;
var scrollPos=0;
var windowHeight=getWindowHeight();
var windowWidth=getWindowWidth();
if(windowHeight<=spriteHeight+2*birdSpaceVertical)windowHeight=spriteHeight+2*birdSpaceVertical+1;
if(windowWidth<=spriteWidth)windowWidth=spriteWidth+1;
var birdPosX=Math.round(Math.random()*(windowWidth-spriteWidth+200)-200);
var birdPosY=-2*spriteHeight;
var timeoutAnimation=false;
var timeoutFlight=false;
var showButtonsTimeout=null;
var hideButtonsTimeout=null;
var scareTheBirdLastTime=0;
var scareTheBirdCount=0;
function tripleflapInit(reallystart){
if(typeof(reallystart)=="undefined"){window.setTimeout("tripleflapInit(1)",250);return;}
if(!showOnMobile&&typeof(navigator.userAgent)=="string"&&is_mobile(navigator.userAgent)){return;}
if(!is_utf8(tweetThisText)) tweetThisText=utf8_encode(tweetThisText);
var tweetthislink="http://twitter.com/home?status="+escape(tweetThisText);
if(twitterAccount=="") showTweet=false;
var accountURL=(twitterAccount!="")?"http://twitter.com/"+twitterAccount:((otherPageOrFeed!=false)?otherPageOrFeed:"http://twitter.com/");
var tBird=document.createElement("a");
tBird.setAttribute("id","tBird");
tBird.setAttribute("href",accountURL);
tBird.setAttribute("target","_blank");
tBird.style.display="block";
tBird.style.position="absolute";
tBird.style.left=birdPosX+"px";
tBird.style.top=birdPosY+"px";
tBird.style.width=spriteWidth+"px";
tBird.style.height=spriteHeight+"px";
tBird.style.background="url('"+birdSprite+"') no-repeat transparent";
tBird.style.backgroundPosition="-0px -0px";
tBird.style.zIndex="947";
tBird.onmouseover=function(){
scareTheBird();
showButtonsTimeout=window.setTimeout("showButtons(0,"+windowWidth+","+windowHeight+")",400);
window.clearTimeout(hideButtonsTimeout);
};
tBird.onmouseout=function(){hideButtonsTimeout=window.setTimeout("hideButtons()",50);};
document.body.appendChild(tBird);
var tBirdLtweet=document.createElement("a");
tBirdLtweet.setAttribute("id","tBirdLtweet");
tBirdLtweet.setAttribute("href",tweetthislink);
tBirdLtweet.setAttribute("target","_blank");
tBirdLtweet.setAttribute("title","tweet this");
tBirdLtweet.style.display="none";
tBirdLtweet.style.position="absolute";
tBirdLtweet.style.left="0px";
tBirdLtweet.style.top="-100px";
tBirdLtweet.style.background="url('"+birdSprite+"') no-repeat transparent";
tBirdLtweet.style.opacity="0";
tBirdLtweet.style.filter="alpha(opacity=0)";
tBirdLtweet.style.backgroundPosition="-64px -0px";
tBirdLtweet.style.width="58px";
tBirdLtweet.style.height="30px";
tBirdLtweet.style.zIndex="951";
tBirdLtweet.onmouseover=function(){window.clearTimeout(hideButtonsTimeout);};
tBirdLtweet.onmouseout=function(){hideButtonsTimeout=window.setTimeout("hideButtons()",50);};
document.body.appendChild(tBirdLtweet);
var tBirdLfollow=tBirdLtweet.cloneNode(false);
tBirdLfollow.setAttribute("id","tBirdLfollow");
tBirdLfollow.setAttribute("href",accountURL);
tBirdLfollow.setAttribute("title","follow "+(twitterAccount?"@"+twitterAccount:"me"));
tBirdLfollow.style.backgroundPosition="-64px -30px";
tBirdLfollow.style.width="58px";
tBirdLfollow.style.height="20px";
tBirdLfollow.style.zIndex="952";
tBirdLfollow.onmouseover=function(){window.clearTimeout(hideButtonsTimeout);};
tBirdLfollow.onmouseout=function(){hideButtonsTimeout=window.setTimeout("hideButtons()",50);};
document.body.appendChild(tBirdLfollow);
if(showTweet==true){
var tBirdStatxLow=document.createElement("div");
tBirdStatxLow.setAttribute("id","tBirdStatxLow");
tBirdStatxLow.style.display="none";
tBirdStatxLow.style.position="absolute";
tBirdStatxLow.style.left="0px";
tBirdStatxLow.style.top="-100px";
tBirdStatxLow.style.background="transparent";
tBirdStatxLow.style.opacity="0";
tBirdStatxLow.style.filter="alpha(opacity=0)";
tBirdStatxLow.style.width="192px";
tBirdStatxLow.style.zIndex="955";
tBirdStatxLow.onmouseover=function(){window.clearTimeout(hideButtonsTimeout);};
tBirdStatxLow.onmouseout=function(){hideButtonsTimeout=window.setTimeout("hideButtons()",50);};
var tBirdStatxUpr=tBirdStatxLow.cloneNode(false);
tBirdStatxUpr.setAttribute("id","tBirdStatxUpr");
tBirdStatxUpr.onmouseover=function(){window.clearTimeout(hideButtonsTimeout);};
tBirdStatxUpr.onmouseout=function(){hideButtonsTimeout=window.setTimeout("hideButtons()",50);};
var tBirdStatxArrLow=document.createElement("div");
tBirdStatxArrLow.setAttribute("id","tBirdStatxArrLow");
tBirdStatxArrLow.style.background="url('"+birdSprite+"') no-repeat transparent";
tBirdStatxArrLow.style.backgroundPosition="-64px -50px";
tBirdStatxArrLow.style.width="32px";
tBirdStatxArrLow.style.height="9px";
tBirdStatxArrLow.style.margin="0 0 -1px 56px";
tBirdStatxArrLow.style.position="relative";
tBirdStatxArrLow.style.zIndex="957";
var tBirdStatxArrUpr=tBirdStatxArrLow.cloneNode(false);
tBirdStatxArrUpr.setAttribute("id","tBirdStatxArrUpr");
tBirdStatxArrUpr.style.backgroundPosition="-96px -50px";
tBirdStatxArrUpr.style.margin="-1px 0 0 60px";
var tBirdStatxInLow=document.createElement("div");
tBirdStatxInLow.setAttribute("id","tBirdStatxInLow");
tBirdStatxInLow.style.background="#fbfcfc";
tBirdStatxInLow.style.border="1px solid #555";
tBirdStatxInLow.style.MozBorderRadius="6px";
tBirdStatxInLow.style.borderRadius="6px";
tBirdStatxInLow.style.padding="3px 5px";
tBirdStatxInLow.style.fontSize="11px";
tBirdStatxInLow.style.fontFamily="Arial";
tBirdStatxInLow.style.textAlign="left";
tBirdStatxInLow.style.position="relative";
tBirdStatxInLow.style.zIndex="956";
tBirdStatxInLow.innerHTML="loading...";
var tBirdStatxInUpr=tBirdStatxInLow.cloneNode(false);
tBirdStatxInUpr.setAttribute("id","tBirdStatxInUpr");
tBirdStatxInUpr.innerHTML="loading...";
tBirdStatxLow.appendChild(tBirdStatxArrLow);
tBirdStatxLow.appendChild(tBirdStatxInLow);
tBirdStatxUpr.appendChild(tBirdStatxInUpr);
tBirdStatxUpr.appendChild(tBirdStatxArrUpr);
document.body.appendChild(tBirdStatxLow);
document.body.appendChild(tBirdStatxUpr);
}
var timeoutAnimation=window.setTimeout("animateSprite(0,0,0,0,null,true)",spriteAniSpeed);
window.onscroll=recheckposition;
if(showTweet==true)
loadStatusText();
recheckposition();
}
function animateSprite(row,posStart,posEnd,count,speed,onlySet){
if(typeof(count)!="number"||count>posEnd-posStart) count=0;
document.getElementById("tBird").style.backgroundPosition="-"+Math.round((posStart+count)*spriteWidth)+"px -"+(spriteHeight*row)+"px";
if(onlySet==true) return;
if(typeof(speed)!="number") speed=spriteAniSpeed;
timeoutAnimation=window.setTimeout("animateSprite("+row+","+posStart+","+posEnd+","+(count+1)+","+speed+")",speed);
}
function animateSpriteAbort(){
window.clearTimeout(timeoutAnimation);
}
function recheckposition(force){
if(force!=true) force=false;
if(birdIsFlying)
return false;
windowHeight=getWindowHeight();
windowWidth=getWindowWidth();
if(windowHeight<=spriteHeight+2*birdSpaceVertical)
windowHeight=spriteHeight+2*birdSpaceVertical+1;
if(windowWidth<=spriteWidth)
windowWidth=spriteWidth+1;
if(typeof(window.pageYOffset)=="number") scrollPos=window.pageYOffset;
else if(document.body&&document.body.scrollTop) scrollPos=document.body.scrollTop;
else if(document.documentElement&&document.documentElement.scrollTop) scrollPos=document.documentElement.scrollTop;
birdPosY=parseInt(document.getElementById("tBird").style.top);
birdPosX=parseInt(document.getElementById("tBird").style.left);
if(scrollPos+birdSpaceVertical>=birdPosY||scrollPos+windowHeight-spriteHeight<birdPosY||force){
hideButtons();
elemPosis=chooseNewTarget();
if(elemPosis.length<1){
elemType=null;
elemNr=null;
elemTop=scrollPos+Math.round(Math.random()*(windowHeight-spriteHeight));
elemLeft=Math.round(Math.random()*(windowWidth-spriteWidth));
elemWidth=0;
}
else{
newTarget=elemPosis[Math.round(Math.random()*(elemPosis.length-1))];
elemType=newTarget[0];
elemNr=newTarget[1];
elemTop=newTarget[2];
elemLeft=newTarget[3];
elemWidth=newTarget[4];
}
targetTop=elemTop-spriteHeight;
targetLeft=Math.round(elemLeft-spriteWidth/2+Math.random()*elemWidth);
if(targetLeft>windowWidth-spriteWidth-24)
targetLeft=windowWidth-spriteWidth-24;
else if(targetLeft<0)
targetLeft=0;
birdIsFlying=true;
flyFromTo(birdPosX,birdPosY,targetLeft,targetTop,0);
}
}
function chooseNewTarget(){
var elemPosis=new Array();
var obergrenze=scrollPos+spriteHeight+birdSpaceVertical;
var untergrenze=scrollPos+windowHeight-birdSpaceVertical;
for(var ce=0;ce<targetElems.length;ce++){
var elemType=targetElems[ce];
var sumElem=document.getElementsByTagName(elemType).length;
for(var cu=0;cu<sumElem;cu++){
var top=document.getElementsByTagName(elemType)[cu].offsetTop;
var left=document.getElementsByTagName(elemType)[cu].offsetLeft;
var width=document.getElementsByTagName(elemType)[cu].offsetWidth;
if(top<=obergrenze||top>=untergrenze||width<minElemWidth||left<0){
continue;
}
elemPosis[elemPosis.length]=new Array(elemType,cu,top,left,width);
if(elemPosis.length>=neededElems4random)
return elemPosis;
}
}
return elemPosis;
}
function flyFromTo(startX,startY,targetX,targetY,solved,direction){
justStarted=(solved==0);
solved+=(solved>birdSpeed/2)?birdSpeed:Math.round( (solved==0)?birdSpeed/4:birdSpeed/2 );
solvedFuture=solved+( (solved>birdSpeed/2)?birdSpeed:Math.round(birdSpeed/2) );
distanceX=targetX-startX;
distanceY=targetY-startY;
distance=Math.sqrt(distanceX*distanceX+distanceY*distanceY);
solvPerc=Math.abs(1/distance*solved);
solvDistX=Math.round(distanceX*solvPerc);
solvDistY=Math.round(distanceY*solvPerc);
solvPercFuture=Math.abs(1/distance*solvedFuture);
solvDistXFuture=Math.round(distanceX*solvPercFuture);
solvDistYFuture=Math.round(distanceY*solvPercFuture);
if(typeof(direction)!="string"){
direction=null;
angle=( (distanceX!=0)?Math.atan((-distanceY)/distanceX)/Math.PI*180:90 )+((distanceX<0)?180:0);
if(angle<0) angle+=360;
if(angle<45) direction='o';
else if(angle<135) direction='n';
else if(angle<202.5) direction='w';
else if(angle<247.5) direction='sw';
else if(angle<292.5) direction='s';
else if(angle<337.5) direction='so';
else direction='o';
}
if(Math.abs(solvDistXFuture)>=Math.abs(distanceX)&&Math.abs(solvDistYFuture)>=Math.abs(distanceY)){
animateSpriteAbort();
switch(direction){
case 'so':animateSprite(1,0,0,0,null,true);break;
case 'sw':animateSprite(1,2,2,0,null,true);break;
case 's':animateSprite(0,2,2,0,null,true);break;
case 'n':animateSprite(4,0,0,0,null,true);break;
case 'o':animateSprite(1,0,0,0,null,true);break;
case 'w':animateSprite(1,2,2,0,null,true);break;
default:animateSprite(0,0,0,0,null,true);
}
timeoutAnimation=window.setTimeout("animateSprite(0,0,0,0,null,true)",spriteAniSpeed);
}
if(Math.abs(solvDistX)>=Math.abs(distanceX)&&Math.abs(solvDistY)>=Math.abs(distanceY)){
solvDistX=distanceX;
solvDistY=distanceY;
birdIsFlying=false;
window.setTimeout("recheckposition()",500);
}
else{
if(justStarted){
animateSpriteAbort();
switch(direction){
case 'so':animateSprite(1,0,0,0,null,true);timeoutAnimation=window.setTimeout("animateSprite(1,1,1,0,null,true)",spriteAniSpeed);break;
case 'sw':animateSprite(1,2,2,0,null,true);timeoutAnimation=window.setTimeout("animateSprite(1,3,3,0,null,true)",spriteAniSpeed);break;
case 's':animateSprite(0,2,2,0,null,true);timeoutAnimation=window.setTimeout("animateSprite(0,3,3,0,null,true)",spriteAniSpeed);break;
case 'n':timeoutAnimation=window.setTimeout("animateSprite(4,0,3,0,"+spriteAniSpeedSlow+")",1);break;
case 'o':animateSprite(1,0,0,0,null,true);timeoutAnimation=window.setTimeout("animateSprite(2,0,3,0,"+spriteAniSpeedSlow+")",spriteAniSpeed);break;
case 'w':animateSprite(1,2,2,0,null,true);timeoutAnimation=window.setTimeout("animateSprite(3,0,3,0,"+spriteAniSpeedSlow+")",spriteAniSpeed);break;
default:animateSprite(0,0,0,0,null,true);
}
}
timeoutFlight=window.setTimeout("flyFromTo("+startX+","+startY+","+targetX+","+targetY+","+solved+",'"+direction+"')",50);
}
hideButtons();
document.getElementById("tBird").style.left=(startX+solvDistX)+"px";
document.getElementById("tBird").style.top=(startY+solvDistY+birdSetUp)+"px";
}
function scareTheBird(nul){
newTS=new Date().getTime();
if(scareTheBirdLastTime<newTS-scareTheBirdTime){
scareTheBirdCount=1;
scareTheBirdLastTime=newTS;
}
else{
scareTheBirdCount++;
if(scareTheBirdCount>=scareTheBirdMouseOverTimes){
scareTheBirdCount=0;
scareTheBirdLastTime=0;
recheckposition(true);
}
}
}
function showButtons(step,winWidth,winHeight){
birdPosY=parseInt(document.getElementById("tBird").style.top);
birdPosX=parseInt(document.getElementById("tBird").style.left);
if(step==0&&document.getElementById("tBirdLtweet").style.display=="block")
step=100;
if(birdIsFlying)
step=0;
opacity=Math.round(step*15);
if(opacity<0) opacity=0;
if(opacity>100) opacity=100;
if(birdPosX<winWidth-300||birdPosX<winWidth/2){
buttonPosX1=birdPosX+spriteWidth-15;
buttonPosX2=birdPosX+spriteWidth-10;
}
else{
buttonPosX1=birdPosX+16-parseInt(document.getElementById("tBirdLtweet").style.width);
buttonPosX2=birdPosX+11-parseInt(document.getElementById("tBirdLfollow").style.width);
}
buttonPosY1=birdPosY-0;
buttonPosY2=birdPosY-0+parseInt(document.getElementById("tBirdLtweet").style.height);
document.getElementById("tBirdLtweet").style.left=buttonPosX1+"px";
document.getElementById("tBirdLtweet").style.top=buttonPosY1+"px";
document.getElementById("tBirdLtweet").style.display="block";
document.getElementById("tBirdLtweet").style.opacity=opacity/100;
document.getElementById("tBirdLtweet").style.filter="alpha(opacity="+opacity+")";
document.getElementById("tBirdLfollow").style.left=buttonPosX2+"px";
document.getElementById("tBirdLfollow").style.top=buttonPosY2+"px";
document.getElementById("tBirdLfollow").style.display="block";
document.getElementById("tBirdLfollow").style.opacity=opacity/100;
document.getElementById("tBirdLfollow").style.filter="alpha(opacity="+opacity+")";
if(showTweet==true){
if(typeof(window.pageYOffset)=="number") scrollPos=window.pageYOffset;
else if(document.body&&document.body.scrollTop) scrollPos=document.body.scrollTop;
else if(document.documentElement&&document.documentElement.scrollTop) scrollPos=document.documentElement.scrollTop;
if(birdPosX<64) boxMoveX=64-birdPosX;
else if(birdPosX>winWidth-64) boxMoveX=winWidth-birdPosX-64;
else boxMoveX=0;
txtBoxPosX=Math.round(birdPosX+spriteWidth/2 - parseInt(document.getElementById("tBirdStatxLow").style.width)/2+boxMoveX);
if(birdPosY<winHeight/2+scrollPos){
txtBoxPosY=birdPosY+spriteHeight;
document.getElementById("tBirdStatxLow").style.left=txtBoxPosX+"px";
document.getElementById("tBirdStatxLow").style.top=txtBoxPosY+"px";
document.getElementById("tBirdStatxLow").style.display="block";
document.getElementById("tBirdStatxLow").style.opacity=opacity/100;
document.getElementById("tBirdStatxLow").style.filter="alpha(opacity="+opacity+")";
}
else{
txtBoxPosY=birdPosY-document.getElementById("tBirdStatxUpr").offsetHeight;
document.getElementById("tBirdStatxUpr").style.left=txtBoxPosX+"px";
document.getElementById("tBirdStatxUpr").style.top=txtBoxPosY+"px";
document.getElementById("tBirdStatxUpr").style.display="block";
document.getElementById("tBirdStatxUpr").style.opacity=opacity/100;
document.getElementById("tBirdStatxUpr").style.filter="alpha(opacity="+opacity+")";
}
}
if(opacity>=100) return;
step++;
showButtonsTimeout=window.setTimeout("showButtons("+step+","+winWidth+","+winHeight+")",60);
}
function hideButtons(){
window.clearTimeout(showButtonsTimeout);
document.getElementById("tBirdLtweet").style.display="none";
document.getElementById("tBirdLtweet").style.opacity="0";
document.getElementById("tBirdLtweet").style.filter="alpha(opacity=0)";
document.getElementById("tBirdLfollow").style.display="none";
document.getElementById("tBirdLfollow").style.opacity="0";
document.getElementById("tBirdLfollow").style.filter="alpha(opacity=0)";
if(showTweet==true){
document.getElementById("tBirdStatxLow").style.display="none";
document.getElementById("tBirdStatxLow").style.opacity="0";
document.getElementById("tBirdStatxLow").style.filter="alpha(opacity=0)";
document.getElementById("tBirdStatxUpr").style.display="none";
document.getElementById("tBirdStatxUpr").style.opacity="0";
document.getElementById("tBirdStatxUpr").style.filter="alpha(opacity=0)";
}
}
function loadStatusText(){
param="tuac="+twitterAccount;
var req=(window.XMLHttpRequest)?new XMLHttpRequest():((window.ActiveXObject)?new ActiveXObject("Microsoft.XMLHTTP"):false);
if(!req){document.getElementById("tBirdStatxInLow").innerHTML="Error: could not create Ajax-request";}
req.open("POST",twitterfeedreader,true);
req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
req.setRequestHeader("Content-Length",param.length);
req.setRequestHeader("Connection","close");
req.onreadystatechange=function(){
if(req.readyState==4){
resp=(req.status==200)?req.responseText:"Error: Ajax-request failed,HTTP-Code "+req.status;
resp=resp.replace(/<a /g,'<a style="'+hyperlinkStyle+'" ');
document.getElementById("tBirdStatxInLow").innerHTML=resp;
document.getElementById("tBirdStatxInUpr").innerHTML=resp;
}
}
req.send(param);
}
function getWindowWidth(){
if(typeof(window.innerWidth)=="number") ww=window.innerWidth;
else if(document.documentElement&&document.documentElement.clientWidth) ww=document.documentElement.clientWidth;
else if(document.body&&document.body.clientWidth) ww=document.body.clientWidth;
else ww=800;
return ww;
}
function getWindowHeight(){
if(typeof(window.innerHeight)=="number") wh=window.innerHeight;
else if(document.documentElement&&document.documentElement.clientHeight) wh=document.documentElement.clientHeight;
else if(document.body&&document.body.clientHeight) wh=document.body.clientHeight;
else wh=450;
return wh;
}
function is_mobile(is_mobile_ua){
return (is_mobile_ua.toLowerCase().search(/(iphone|ipod|opera mini|windows ce|windows phone|palm|blackberry|android|symbian|series60|samsung|nokia|playstation portable|htc[\-_]|up\.browser|profile\/midp|[1-4][0-9]{2}x[1-4][0-9]{2})/)>-1)
}
function utf8_encode(str) {
str=str.replace(/\r\n/g,"\n");
utf8str="";
for(n=0;n<str.length;n++){
c=str.charCodeAt(n);
if(c<128){
utf8str+=String.fromCharCode(c);
}
else if(c>127&&c<2048){
utf8str+=String.fromCharCode((c>>6)|192);
utf8str+=String.fromCharCode((c&63)|128);
}
else{
utf8str+=String.fromCharCode((c>>12)|224);
utf8str+=String.fromCharCode(((c>>6)&63)|128);
utf8str+=String.fromCharCode((c&63)|128);
}
}
return utf8str;
}
function is_utf8(str){
strlen=str.length;
for(i=0;i<strlen;i++){
ord=str.charCodeAt(i);
if(ord<0x80) continue;
else if((ord&0xE0)===0xC0&&ord>0xC1) n=1;
else if((ord&0xF0)===0xE0) n=2;
else if((ord&0xF8)===0xF0&&ord<0xF5) n=3;
else return false;
for(c=0;c<n;c++)
if(++i===strlen||(str.charCodeAt(i)&0xC0)!==0x80)
return false;
}
return true;
}