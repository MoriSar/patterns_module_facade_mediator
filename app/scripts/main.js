$(function() {

	(function() {

	 	// Код для блока «Знакомьтесь, это Carpis!» (мобильная версия)
	 	var acquaintance__title = $('.acquaintance__title');
	 	function showBlock() {
	 		if( $(window).width() <= 767 ) {
	 			$('.acquaintance-container, .proprietor, .advantage').slideToggle();
	 		}
	 	}

	 	acquaintance__title.on('click', showBlock);

	 	// Код для "search-autoParth" (hide/show)

	 	function hideShow($this, elem) {
	 		if( $this.text() == 'Скрыть' ) {
	 			$this.text('Открыть');
	 			$this.removeClass('search-autoParth__btn_hide');
	 			$this.addClass('search-autoParth__btn_show');
	 			elem.css('display', 'none');
	 			$('')
	 		} else if( $this.text() == 'Открыть' ) {
	 			$this.text('Скрыть');
	 			$this.removeClass('search-autoParth__btn_show');
	 			$this.addClass('search-autoParth__btn_hide');
	 			elem.css('display', 'block');
	 		}
	 	}

	 	$('.search-autoParth__btn').on('click', function(e) {
	 		hideShow($(this), $('.autoParth-dropDown'));
	 		e.stopPropagation();
	 	}); 

	 	$('.search-autoParth__title').on('click', function(e) {
	 		hideShow($('.search-autoParth__btn'), $('.autoParth-dropDown'));
	 		e.stopPropagation();
	 	});

	 	
	 	$('body').on('hidden.bs.modal', '.modal', function () {
	 		$(this).removeData('bs.modal');
	 	});

    // отмена перехода по ссылке (пагинация)
    $('.pagination-main .disabled').on('click', function(e) {
    	e.preventDefault();
    })

    // выпадаюший список для блока с запросом (моб.версия)
    $('.search-autoParth-mobile__link').on('click', function(e) {

    	if( $(this).parent().hasClass('dropdown') ) {
    		$(this).toggleClass('active');
    		$(this).parent().find('.dropmenu').toggleClass('open');
    	}

    	e.preventDefault();

    })


    /* Начало страницы ZWR */
    // код для изменения заголовка на странице (мобильная версия)

    if ($(window).width() < 767 ) {
    	$('.ZWR-page .search-autoParth__title').off('click');
    }
    /* Конец страницы ZWR */
  })();

  (function() {

		// Код для меню в телефонной версии

		var link = $('.head-nav__title.dropdown .head-nav__link');
		var title = $('.head-nav__title');
		function addArrow() {
			title
			.find('.dropdown-menu')
			.parent()
			.find(link)
			.addClass('arrow');
		}
		addArrow();

		function navMenu($this) {
			$this.toggleClass('openDrop');
			$this.parent()
			.find('.dropdown-menu')
			.toggleClass('active');
			var drop = $this.parent().find('.dropdown-menu');
			$('.dropdown-menu').not(drop).removeClass('active').parent().find('.head-nav__link').removeClass('openDrop');
		}

		link.on('click', function(e) {
			e.preventDefault();
			var $this = $(this);
			if ( $(window).width() <= 767 ) {
				navMenu($this);
			}
		})

		function pullOpen() {
			if( $('.head-menu').is(':visible') ) {
				$('.head-menu').css('display', 'none');
			} else {
				$('.head-menu').css('display', 'block');
			}
			
		}

		function resetStyle() {
			$('.head-menu .dropdown-menu').css('display', '');
			$('.head-nav__link').removeClass('openDrop');
		}

		$('#nav-pull').on('click', function(e) {
			if ( !$('body').hasClass('home-page') ) {
				pullOpen();
			}
			e.preventDefault();
		});


		$(window).on('resize', function() {
			if ( $(window).width() >= 767 ) {
				resetStyle();
			}
			paddingFooter();
		});

		// учитывает высоту футера (для мобильной верии) - футер прижат
		function paddingFooter() {
			if( $(window).width() <= 767 ) {
				var footerH = $('.footer').outerHeight();
				$('body').css('paddingBottom', footerH);
			}else {
				$('body').css('paddingBottom', '');
			}
		}
		paddingFooter();
	})();
	
	

})