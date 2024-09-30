(function($){$('html').addClass('js');if(!Date.now){Date.now=function(){return new Date().getTime();}}
function currentTime(){return Math.floor(Date.now()/1000);}
$.fn.bgVideo=function(options){function iOSversion(){if(/iP(hone|od|ad)/.test(navigator.platform)){var v=(navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);return[parseInt(v[1],10),parseInt(v[2],10),parseInt(v[3]||0,10)];}}
var iOSVersion=iOSversion();var old_iOS=false;if(iOSVersion&&(iOSVersion[0]<10)){old_iOS=true;}
var settings=$.extend({},$.fn.bgVideo.defaults,options);return this.each(function(){var $video=$(this);var video=$video[0];var poster=$video.attr('poster')||'';var $container=$video.parent();var $pauseplay=$('<button class="jquery-background-video-pauseplay pause"><span>Pause</span></button>');var start_time;var el_settings=$.extend({},settings);var data_attrs=$video.data();$.each(data_attrs,function(data_name,data_val){if(data_name.indexOf('bgvideo')===0){data_name=data_name.replace('bgvideo','');data_name=data_name.charAt(0).toLowerCase()+data_name.slice(1);el_settings[data_name]=data_val;}});$video.on('playing',function(){if(start_time==null){start_time=currentTime();}
$video.addClass('is-playing is-visible');$pauseplay.removeClass('play').addClass('pause').find('span').text('Pause');$.fn.bgVideo.fitVideo($video);});if(video.currentTime>0){$video.addClass('is-playing is-visible');}
$video.on('pause',function(){$video.removeClass('is-playing');$pauseplay.removeClass('pause').addClass('play').find('span').text('Play');if(el_settings.fadeOnPause){$video.removeClass('is-visible');}});$container.css({'position':'relative','overflow':'hidden','background-size':'cover','background-position':'center center','background-repeat':'no-repeat','background-image':'url('+poster+')'});$video.css({'min-width':'auto','min-height':'auto','width':'100%','height':'auto','position':'absolute','left':'50%','top':'50%','transform':'translate(-50%,-50%)'});if(el_settings.fullScreen){$container.css({'position':'fixed','top':'0','bottom':'0','left':'0','right':'0','height':'auto','margin':'0','z-index':'-1'});}
$video.css('transition-duration',el_settings.fadeIn+'ms');if(old_iOS){$video.attr('src','');$video.find('source').attr('src','');$video.remove();}
$.fn.bgVideo.fitVideo($video);$(window).resize(function(){$.fn.bgVideo.fitVideo($video);});el_settings.pauseAfter=parseInt(el_settings.pauseAfter,10);if(el_settings.pauseAfter>0){$video.on('timeupdate',function(){var now=currentTime();if(now>start_time+el_settings.pauseAfter){video.pause();if(el_settings.fadeOnEnd){$video.removeClass('is-visible');}}});}
if(el_settings.showPausePlay&&!old_iOS){$container.append($pauseplay);$pauseplay.css({'left':'auto','right':'auto','top':'auto','bottom':'auto'});$pauseplay.css(el_settings.pausePlayXPos,el_settings.pausePlayXOffset);$pauseplay.css(el_settings.pausePlayYPos,el_settings.pausePlayYOffset);if(el_settings.pausePlayXPos==='center'){$pauseplay.css({'left':'50%','margin-left':'-10px'});}
if(el_settings.pausePlayYPos==='center'){$pauseplay.css({'top':'50%','margin-top':'-10px'});}
$pauseplay.on('click',function(){if(video.paused){video.play();start_time=currentTime();}else{video.pause();}});}});};$.fn.bgVideo.defaults={fullScreen:false,fadeIn:500,pauseAfter:120,fadeOnPause:false,fadeOnEnd:true,showPausePlay:true,pausePlayXPos:'right',pausePlayYPos:'top',pausePlayXOffset:'15px',pausePlayYOffset:'15px'};$.fn.bgVideo.fitVideo=function($video){var $container=$video.parent(),container_height=$container.outerHeight(),container_width=$container.outerWidth();$video.css({'height':'auto','width':container_width+'px'});var video_height=$video.height();if(container_height>video_height){$video.css({'height':container_height+'px','width':'auto'});}};$(document).ready(function(){$('[data-bgvideo]').bgVideo();});}(jQuery));