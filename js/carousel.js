/*
//plugin call
 $("#carousel").carousel
 ({
        activate: function(){},
        timerAnimSlide:400,
        itensDisplay: 4,
        breakPoint:[{width:800,itensDisplay:3},{width:580,itensDisplay:1},{width:700,itensDisplay:2}],
        spaceBetweenItens: 10,
        itensMove:1,
        responsive:true
    });

    //plugin html structure
	 <div class="carousel" id="carousel">
		 <div class="carousel__navigation">
			 <a class="carousel__nav carousel__nav--right" href="#"><div class="arrow-right"></div></a>
			 <a class="carousel__nav carousel__nav--left" href="#"><div class="arrow-left"></div></a>
		 </div>
		 <div class="carousel__wrapper">
			 <div class="carousel__container">
				 <div class="carousel__content">
					 <div class="carousel__slider" id="carousel__slider" >
						 <a href="#" class="carousel__item">
						 <img src="thumb.jpg" data-width="194" data-height="109">
						 </a>
						 <a href="#" class="carousel__item">
						 <img src="thumb.jpg" data-width="194" data-height="109">
						 </a>
						 <a href="#" class="carousel__item" >
						 <img src="thumb.jpg" data-width="194" data-height="109" >
						 </a>
					 </div>
				 </div>
			 </div>
		 </div>
	 </div>

	 //css structure
		.carousel{ width:100%;}
		.carousel__wrapper{}
		.carousel__container{}
		.carousel__content{ overflow:hidden; height:auto; width:100%; position:relative;}
		.carousel__slider{ position:absolute;}
		.carousel__item{ position:absolute;}
		carousel__item img{}
		.carousel__navigation{}
		.carousel__nav{}
		.carousel__nav--left{}
		.carousel__nav--right{}

		#carousel .carousel__nav{ float:right;}
		#carousel .carousel__nav--left{ display:inline-block;}
		#carousel .carousel__nav--right{ display:inline-block;}
		#carousel .carousel__wrapper{ margin-top:20px;}
		#carousel .arrow-right{margin-left:10px;}

		.arrow-right {
			width: 0;
			height: 0;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			border-left: 10px solid #bbbbbb;
		}

		.arrow-left {
			width: 0;
			height: 0;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			border-right:10px solid #bbbbbb;
		}
 */

(function($){
	//
	$.fn.carousel = function( method )
	{
		var methods =
		{
			init :										function( options ){ 			return this.each(function(){	_init(this, options);});},//plugin iniciado
			destroy :									function( options ){ 			return this.each(function(){	_destroy(this,options);});}//plugin removido
		};

		//----------------------------------------------------------------------
		//----------------------------------------------------------------------
		var defaults =
		{
			breakPoint						: [],//array contendo os breakpoints para redimensionamento dos itens
			centerThumbs					: false,
			itensDisplay					: 1,
			responsive						: false,//um objeto {} que considera a responsividade ou não - minWidth( tamanho minimo da tela para que a responsividade comece a checar)
			timerAnimSlide					: 300,//tempo para animação do slider ao clicar na seta
			activate						: function() {}//plugin ativado
		};

		var plugin_element;
		var plugin_settings;
		var carousel;
		var carousel__nav__left;
		var carousel__nav__right;
		var carousel__slider;
		var carousel__content;
		var carousel__container;
		var carousel__wrapper;
		var carousel__item;
		var spaceBetweenItens;
		var itensDisplay;

		var statusSlideAnim;
		var widthItem;
		
		//-------------------------------------
		//----------------------------------------------------------------------
		//----------------------------------------------------------------------

		// Method calling logic
		if ( methods[method] )//caso exista um método, esse método é chamado
		{
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else if ( typeof method === 'object' || ! method )//caso não exista um método ou seja apenas passado o objeto
		{
			return methods.init.apply( this, arguments );
		}
		else//caso o método não exista
		{
			$.error( 'Method ' +  method + ' does not exist on jQuery.plugin' );
		}

		function _init($this, options)
		{
			plugin_element 						= $($this);
			plugin_settings 					= $.extend(defaults, options);
			_initialize();
			
			plugin_settings.activate.call(this, {});
		}
		
		function _initialize ()
		{
			carousel = plugin_element;
			carousel__nav__left = $('.carousel__nav--left',carousel);
			carousel__nav__right = $('.carousel__nav--right',carousel);
			carousel__slider = $('.carousel__slider',carousel);
			carousel__content = $('.carousel__content',carousel);
			carousel__container = $('.carousel__container',carousel);
			carousel__wrapper = $('.carousel__wrapper',carousel);
			carousel__item = $('.carousel__item',carousel);
			spaceBetweenItens = plugin_settings.spaceBetweenItens;
			itensDisplay = plugin_settings.itensDisplay;
			statusSlideAnim = false;
			
			carousel__nav__left.click(function(){	moveSlider("left"); return false;});
			carousel__nav__right.click(function(){	moveSlider("right"); return false;});
			
			if(plugin_settings.responsive==true)
			{
				_setResponsive ();
			}
			
			_posImages();
						
			if(plugin_settings.centerThumbs)
			{
				if(carousel__slider.width() < carousel__content.width())
				{
					carousel__slider.css({marginLeft:(carousel__content.width()-carousel__slider.width())/2});
				}
			}

			_checkArrows ();
			_initMobile();

			$("img",carousel).one("load", function() {
				_posImages();
			});
			
		}

		function _initMobile ()
		{

			var startX,
			    startY,
			    tap,
			    currentPos,
			    posMove;
			 
			function getCoord(e, c) {
			    return parseInt(/touch/.test(e.type) ? (e.originalEvent || e).changedTouches[0]['client' + c] : e['client' + c]);
			}

			carousel__slider.on('touchstart', function (ev) {
			    startX = getCoord(ev, 'X');
			    startY = getCoord(ev, 'Y');
			    currentPos = _getSize(carousel__slider,"marginLeft");
			}).on('touchend', function (ev) {
			    // If movement is less than 20px, execute the handler
			    if (Math.abs(getCoord(ev, 'X') - startX) > 100) {
			        
					//statusdiv.innerHTML = closest();
					var _p = closest();

					//statusdiv.innerHTML = _p.pos+" / "+posMove+"<br>";

					carousel__slider.stop(true,true).animate({marginLeft:-_p.pos},200,function(){
						statusSlideAnim = false;
					});
					
			        // Prevent emulated mouse events
			        ev.preventDefault();
			    }
			    else
			    {
			    	carousel__slider.stop(true,true).animate({marginLeft:currentPos},200,function(){
						statusSlideAnim = false;
					});
			    }
			  
			}).on('touchmove', function (ev) {

				var _moveY = getCoord(ev, 'Y');
				var _distY = _moveY - startY;
				var _pos = getCoord(ev, 'X');
				var dist = _pos - startX;

				posMove = currentPos+dist;

				if(posMove < 0)
                {
                	var _check = carousel__slider.width()-carousel__content.width();

                   if(Math.abs(_check) <= Math.abs(posMove))
                   {
                   		posMove = -_check;
                   }
                }
                else
                {
                    posMove = 0;
                }

                carousel__slider.css({marginLeft:posMove});

			    //statusdiv.innerHTML = 'pos x: ' + Math.abs(dist) + '<br> pos y : '+Math.abs(_distY);

    			if(Math.abs(_distY) > Math.abs(dist))
    			{
    				//do nothing
    			}
    			else
    			{
    				return false;
    			}
			});

			function closest(){
				var closestTo = Math.abs(_getSize(carousel__slider,"marginLeft"));
				var arr = [];//arr with all slider itens
				var _arrPos = [];//array with all positions
				
				$.each(carousel__item, function( index, value ) {
				  var _obj = {item:$(this),pos:_getSize($(this),"left")};
				  arr.push(_obj);
				  _arrPos.push(_getSize($(this),"left"));
				});

				var closest = Math.max.apply(null, _arrPos); //Get the highest number in arr in case it match nothing.
				var _item;

				$.each(arr, function(k, v) {//loop in all itens to get te closest
					var diff = (widthItem/2);
					var _p = v.pos+diff;
					
				    if(_p >= closestTo && _p < closest)
			        {
			        	closest = v.pos; //Check if it's higher than your number, but lower than your closest value	
			        	_item = v;
			        } 
				});

				//if no closest we take the last item
				if(!_item)
				{
					_item = arr[arr.length-1];
				}
				
 				return _item; // return the value
			}
        
		}

		function _checkArrows ()
		{
			if(carousel__item.size()==1)
			{
				$('.carousel__nav',carousel).hide();
				carousel.addClass('single-item-carousel');
				carousel.addClass('hide-arrows');
			}

			if(carousel__slider.width() > carousel__content.width() )
			{
				$('.carousel__nav',carousel).show();
				carousel.removeClass('hide-arrows');
			}
			else
			{
				$('.carousel__nav',carousel).hide();
				carousel.addClass('hide-arrows');
			}

		}
		
		function _setResponsive ()
		{
			$(window).resize(_resizeHandlerCarousel);
			_resizeHandlerCarousel();
		}
		
		function _resizeHandlerCarousel ()
		{
			_posImages ();
		}

		function closest (num, arr) {
			var curr = arr[0];
			var diff = Math.abs (num - curr.width);

			for (var val = 0; val < arr.length; val++) {
				var newdiff = Math.abs (num - arr[val].width);

				if (newdiff < diff && arr[val].width>num) {
					diff = newdiff;
					curr = arr[val];
				}
			}
			return curr;
		}
		
		function _posImages ()
		{
			//breakPoint
			var _itensDisplay = itensDisplay;

			if((plugin_settings.breakPoint.length>0) && plugin_settings.responsive==true)
			{
				//array contendo os breakpoints
				var array = plugin_settings.breakPoint;//[{width:700,intesDisplay:2},{width:580,intesDisplay:1},{width:300,intesDisplay:1}];
				var maxValue = $(window).width();
				var closestNumber = closest (maxValue, array);

				_itensDisplay = (maxValue >= closestNumber.width) ? itensDisplay : closestNumber.itensDisplay;

			}

			var _timeOut;

			carousel__item.each(function(){
				var _carousel__content_width = carousel__content.width();
				var _width_item = Math.ceil((_carousel__content_width - ((spaceBetweenItens * (_itensDisplay-1)))) / _itensDisplay);
				var _index = $(this).index();
				var _pos = ((_width_item + spaceBetweenItens) * _index) ;

				widthItem = _width_item;
				
				$(this).css({width:_width_item, left:_pos});


				if($("img", $(this)).size()>0)
				{
					var _w = $("img", $(this)).data('width');
					var _h = $("img", $(this)).data('height');
					var _scale = (_width_item*100) / _w;
					var _wProp = (_w*_scale)/100;
					var _hProp = (_h*_scale)/100;

					$("img", $(this)).css({width:_wProp, height:_hProp});

					var _t = $(this);

					if(!_timeOut){
						_timeOut = setTimeout(function(){

							var _arrHeight = [];
							carousel__item.each(function(){
								_arrHeight.push($(this).height());
							});

							var _max = Math.max.apply(null, _arrHeight);
							var _hItem = Math.round(_max)+10;

							carousel__content.height(_hItem);
							carousel__slider.height(_hItem);

						},300);
					}

				}
						
			});
			
			var _itens_size = carousel__item.size();
			var _width_slider = (_itens_size * widthItem) + ((_itens_size-1) * spaceBetweenItens);
			
			carousel__slider.width(_width_slider);
			
			carousel__slider.css({marginLeft:0});

			_checkArrows ();
			
		}
		
		function moveSlider (__arg__)
		{
			if(!statusSlideAnim)
			{
				var _xMove;
				var _check;
								
				var _posAtual = _getSize(carousel__slider,"marginLeft");//retorna a posição atual do /content/
				
				if( __arg__ == 'left' )
				{
					_xMove = (_posAtual + widthItem + spaceBetweenItens);
					_xMove = (_xMove > 0) ? 0 : _xMove;

					if(_posAtual < 0)
					{
						statusSlideAnim = true;	
						carousel__slider.stop(true,true).animate({marginLeft:_xMove},plugin_settings.timerAnimSlide,function(){
							statusSlideAnim = false;
						});
					}
				}
				else
				{

					_xMove = -(widthItem - _posAtual + spaceBetweenItens);

					var _check = carousel__slider.width() - carousel__content.width();

					if(Math.abs(_check) >= Math.abs(_xMove))
					{
						statusSlideAnim = true;	
						carousel__slider.stop(true,true).animate({marginLeft:_xMove},plugin_settings.timerAnimSlide,function(){
							statusSlideAnim = false;
						});
					}				
				}
			}
		}
		
		function _getSize(_obj,_css)
		{
			if(_obj.size()>0)
			{
				var _regExp = new RegExp("[a-z][A-Z]","g");
				return parseFloat(_obj.css(_css).replace(_regExp, ""));
			}
		}
		
	
		
	};//-------------------------------
})(jQuery);
