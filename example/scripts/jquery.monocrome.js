(function( $ ) {
	  $.fn.monocrome = function(options) {
		
		var settings = {
		  'isImage'         : false,
		  'hideOriginal' : false
		};
		
	  function grayImages(img, canvas, width, height) {  
		var ctx = canvas.getContext('2d'),  
			imageData, px, length, i = 0, gray;  
		
			$(img).load(function(){
				ctx.drawImage(img, 0, 0);  
				
				imageData = ctx.getImageData(0, 0, width, height);  
				px = imageData.data;  
				length = px.length;  
				
	  
				for ( ; i < length; i+= 4 ) {  
					gray = px[i] * .3 + px[i+1] * .59 + px[i+2] * .11;  
					px[i] = px[i+1] = px[i+2] = gray;  
				}  
	  
				ctx.putImageData(imageData, 0, 0);  
			});
		} 
		
		return this.each(function(index,wrap){
			
			
				if ( options ) { 
					settings = $.extend( settings, options );
				}
				
				var pic, picWidth, picHeight, currCanvas;
				
				var noWrap = settings.isImage, hide = settings.hideOriginal;
			
				
				if(noWrap == true){
					pic = this;
					picWidth  = $(pic).prop('width');
					picHeight = $(pic).prop('height');
					if(picWidth == 0){
						picWidth  = $(this).width();
					}
					if(picHeight == 0){
						picHeight = $(this).height();
					}
					$('<canvas width="' + picWidth + '" height="' +picHeight + '"></canvas>').insertAfter(pic);
					currCanvas = $(this).next('canvas');
				} else {
					pic = $(wrap).find('img');
					$.each(pic, function(){
						picWidth  = $(this).prop('width');
						picHeight = $(this).prop('height');
						if(picWidth == 0){
							picWidth  = $(this).width();
						}
						if(picHeight == 0){
							picHeight = $(this).height();
						}
						
						//console.log(picWidth);
						//console.log(picHeight);
						
						$('<canvas width="' + picWidth + '" height="' +picHeight + '"></canvas>').appendTo(wrap);
						if(hide){
							$(this).remove();
						}
					});
					currCanvas = $(wrap).find('canvas');
				}
				if(!picHeight || !picWidth){
					alert('There has been an error...');
				}
				
				//adding the canvas
				if(noWrap != true){
					for(var a = 0; a < pic.length; a++){
						grayImages(pic[a],currCanvas[a],picWidth,picHeight);
					}
				} else {
					grayImages(pic,currCanvas[0],picWidth,picHeight);
				}
			
		});
	
	  }; //$.fn.monocrome
	})( jQuery );