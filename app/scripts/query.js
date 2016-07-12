(function() {

  /*Код для форм на страницах*/

        // подгрузка опций к селектам

        $('.autoParth-step-tabNav__link').on('click', function() {
          if ( !$(this).prev().is(':checked') ) {
          	resetOption();
            // resetDetail();
            MORISAR.facade.publish('Change in form', {validationClass: '.form__validate-elem'});
          }
        });

        function loadOption( $this, flag ) {
          if ( $this.index() === 0 ) {
            $this.parent().children().each(function(i) {
              if ( i !== 0 ) {
                $(this).attr('disabled', '').children().not(':first').remove();
              }
            });
          }

          if ( $this.index() === 1 ) {
            $this.next().attr('disabled', '').children().not(':first').remove();
          }
          var ajaxObj;
          if ( flag ) {
            ajaxObj = {
              model: (function() {
                return $this.parent().find('.car-model').val();
              })(),
              brand: (function() {
                return $this.parent().find('.car-brand').val();
              })(),
              wheel: (function() {
                return $('.autoParth-step-tabNav__radio:checked').val();
              })(),
              year: (function() {
                return $this.parent().find('.select-year').val();
              }()),
              type: (function(){
                return $this.attr('id');
              })(),
              sessid: (function() {
                return $('#sessid').val();
              })(),
              actionFrom: (function() {
                return $('#actionFrom').val();
              })()
            };
          } else {
            ajaxObj = {
              city: (function() {
                return $this.parent().find('.select-city').val();
              })(),
              region: (function() {
                return $this.parent().find('.select-region').val();
              })(),
              type: (function(){
                return $this.attr('id');
              })(),
              sessid: (function() {
                return $('#sessid').val();
              })(),
              actionFrom: (function() {
                return $('#actionFrom').val();
              })()
            };
          }
          function isObjEmpty() {
            for (var key in ajaxObj) {
              if (!ajaxObj[key]) {
                return true
              }else {
                return false;
              }
            }
          }

          if ( $this.val() && isObjEmpty() ) {

           $this.next().removeAttr('disabled');
           $.ajax({
            url:  'php/request-to-server.php',
            data: ( ajaxObj ),
            cache: false,
            success: function(html) {
              $this.next().append(html);
            }
          });
         }

         ajaxObj = {};

       }   

       function resetOption() {
        $('.autoParth-step-tabCont .autoParth-step-tabCont__engine').children(':first').prop('selected', true)
        $('.autoParth-step-tabCont .autoParth-step-tabCont__select').each(function(i) {
          if( i === 0 ) {
            $(this).children(':first').prop('selected', true);
          }
          if ( i !== 0 ) {
            $(this).attr('disabled', '').children().not(':first').remove();
          }
        });


          /*  ========================================
              сброс региона и города 
              */

              $('.selectContain').children().removeClass('form__validate-elem_success').addClass('form__validate-elem');

              $('.autoParth-step-tabCont__line').children('.autoParth-step-tabCont__engine').removeClass('form__validate-elem_success').addClass('form__validate-elem');
            }


        //ивент для левого блока
        $('.selectContain').on('change', $('.autoParth-step-tabCont__select'), function( e ){
          var $this = $(e.target);
          var path = $this.next().data('path');
          loadOption( $this, true );

        })
        //ивент для правого блока
        $('.contact-inputBox__line').on('change', $('.autoParth-step-tabCont__select'), function( e ){
          var $this = $(e.target);
          var path = $this.next().data('path');
          loadOption( $this, false );
          // All();
        });
        $('.detail-block').on('change click keyup input', function(event) {

        });

        // добавление новой детали 

        var number = 20; // не бльше 20 деталей

        function addDetail($this) {
          var detailContainer = $('.detail-input');

          for ( var i = detailContainer.length; i < number; i++) {
            var newDetail = $('.detail-input:first').clone();
            $this.parent().before(newDetail);
            newDetail.find('input').val('').removeClass('form__validate-elem form__validate-elem_invalid form__validate-elem_valid').attr('id', '');
            return false;
          }

        }


        $('.autoParth-step__addDetail'). on('click', function(e) {
          addDetail($(this));
          e.preventDefault();
        })

      })();