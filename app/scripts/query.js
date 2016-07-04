(function() {

  /*Код для форм на страницах*/

        // подгрузка опций к селектам

        $('.autoParth-step-tabNav__link').on('click', function() {
          if ( !$(this).prev().is(':checked') ) {
          	resetOption();
            // resetDetail();
            validateAll();


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
              //console.log(key + ": " + ajaxObj[key]);
              if (!ajaxObj[key]) {
                return true
              }else {
                return false;
              }
            }
          }
          
          console.log(ajaxObj);
          if ( $this.val() && isObjEmpty() ) {

           $this.next().removeAttr("disabled");
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

        /**
         * resetOption() - функция сброса подгружаемого контента options
         */
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

          /* сброс региона и города 
            ========================================
            */
          // $('.contact-inputBox__line .autoParth-step-tabCont__select').each(function(i) {
          //   if( i === 0 ) {
          //     $(this).children(':first').prop('selected', true);
          //   }
          //   if ( i !== 0 ) {
          //     $(this).attr('disabled', '').children().not(':first').remove();
          //   }
          // });

          /*  ========================================
              сброс региона и города 
              */

              $('.selectContain').children().removeClass('form__validate-elem_success').addClass('form__validate-elem');
          // $('.contact-inputBox__line').children().removeClass('form__validate-elem_success').addClass('form__validate-elem');
          $('.autoParth-step-tabCont__line').children('.autoParth-step-tabCont__engine').removeClass('form__validate-elem_success').addClass('form__validate-elem');
        }
        // resetOption()
        
        //ивент для левого блока
        $('.selectContain').on('change', $('.autoParth-step-tabCont__select'), function( e ){
          var $this = $(e.target);
          var path = $this.next().data('path');
          loadOption( $this, true );
          validateAll();
        })
        //ивент для правого блока
        $('.contact-inputBox__line').on('change', $('.autoParth-step-tabCont__select'), function( e ){
          var $this = $(e.target);
          var path = $this.next().data('path');
          loadOption( $this, false );
          validateAll();
        });
        $('.detail-block').on('change click keyup input', function(event) {
          validateAll();
        });

        // добавление новой детали 
        
        var detailBlock = $('.detail-block'); 
        var number = 20; // не бльше 20 деталей

        function addDetail($this) {
          var detailContainer = $('.detail-input');

          for ( var i = detailContainer.length; i < number; i++) {
            var newDetail = $('.detail-input:first').clone();
            $this.parent().before(newDetail);
            newDetail.find('input').val('').removeClass('form__validate-elem form__validate-elem_success').attr('id', '');
            return false;
          }

        }

        function resetDetail() {
          var detail= $('.detail-input');
          detail.each(function(i) {
            console.log(i);
            if(i == 0) {
              $(this).find('input').val('');
            }else {
              detail[i].remove();
            }
          })
        }

        $('.autoParth-step__addDetail'). on('click', function(e) {
          addDetail($(this));
          e.preventDefault();
        })

        /**
         * Инициализация параметров и объектов формы
         */
         var allLength = 1,
         allLength = allLength + $('.form__validate-elem, .form__validate-elem-mail').length,
         requestForm__caunter = 1,
         forEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
         requestForm__caunter__ratio = 100/allLength,
         requestForm__sendArray = [],
         requestForm__objects = {
          object__carYearVal : {name: 'Год выпуска', object: $('#request-form__car-year'), validStatus: false},
          object__carBrandVal : {name: 'Марка', object: $('#request-form__car-brand'), validStatus: false},
          object__carModelVal : {name: 'Модель', object: $('#request-form__car-model'), validStatus: false},
          object__carLWEngine : {name: 'Объём двигателя', object: $('#request-form__l-w-engine'), validStatus: false},
          object__spacePartName : {name: 'Название запчасти', object: $('#request-form__space-part-name'), validStatus : false},
          object__regionName : {name: 'Регион', object: $('#request-form__region-name'), validStatus: false},
          object__cityName : {name: 'Город', object: $('#request-form__city-name'), validStatus: false},
          object__email : {name: 'Ваш E-mail', object: $('#request-form__email'), validStatus: false}
        };
        // Инициализация параметров и объектов формы

        /**
         * updateProgressBar() - функция обновления ширины прогрессБара
         * @return {[type]} [description]
         */

         function updateProgressBar() {
          var form__calculatedWidth = requestForm__caunter * requestForm__caunter__ratio + '%';
          $('.progress-bar').css('width', form__calculatedWidth);
        }
        updateProgressBar();
        // updateProgressBar()

        function isMailValid(value) {
          
        }

        /**
         * validateRequestForm() - функция валидации формы
         * @param  {Object} elemObj - объект формы
         * @param  {Boolean} isEmail - флаг элемента формы Email
         */
         function validateRequestForm(elemObj, isEmail) {

          if (!elemObj.object.val() && elemObj.validStatus && !isEmail) {
            elemObj.object.removeClass('form__validate-elem_success');
            elemObj.object.addClass('form__validate-elem');
            elemObj.validStatus = false;
            requestForm__caunter--;
          } else if (elemObj.object.val() && !elemObj.validStatus && !isEmail){
            elemObj.object.removeClass('form__validate-elem');
            elemObj.object.addClass('form__validate-elem_success');
            elemObj.validStatus = true;
            requestForm__caunter++;
          } else if (forEmail.test(elemObj.object.val()) && !elemObj.validStatus &isEmail) {
            elemObj.object.removeClass('form__validate-elem');
            elemObj.object.addClass('form__validate-elem_success');
            elemObj.validStatus = true;
            requestForm__caunter++;
          } else if (!forEmail.test(elemObj.object.val()) && elemObj.validStatus && isEmail) {
            elemObj.object.removeClass('form__validate-elem_success');
            elemObj.object.addClass('form__validate-elem');
            elemObj.validStatus = false;
            requestForm__caunter--;
          }
          updateProgressBar();
        }
        // validateRequestForm()

        /**
         * validationobject__spacePartName() - функция валидации первого элемента формы Запчасти
         * @return {[type]} [description]
         */
         function validationFrom__spacePartName() {
           if (!requestForm__objects.object__spacePartName.object.first().val() && requestForm__objects.object__spacePartName.validStatus) {
            requestForm__objects.object__spacePartName.object.first().removeClass('form__validate-elem_success');
            requestForm__objects.object__spacePartName.object.first().addClass('form__validate-elem');
            requestForm__objects. object__spacePartName.validStatus = false;
            requestForm__caunter--;
          } else if (requestForm__objects.object__spacePartName.object.first().val() && !requestForm__objects.object__spacePartName.validStatus){
            requestForm__objects.object__spacePartName.object.first().removeClass('form__validate-elem');
            requestForm__objects.object__spacePartName.object.first().addClass('form__validate-elem_success');
            requestForm__objects.object__spacePartName.validStatus = true;
            requestForm__caunter++;
          }
          updateProgressBar();
        }
        // validationobject__spacePartName()

        /**
         * validateAll() - функция, запускающая валидацию элементов формы запроса деталей
         */
         function validateAll() {

          validateRequestForm(requestForm__objects.object__carYearVal);
          validateRequestForm(requestForm__objects.object__carBrandVal);
          validateRequestForm(requestForm__objects.object__carModelVal);
          validateRequestForm(requestForm__objects.object__carLWEngine);

          validationFrom__spacePartName();
          validateRequestForm(requestForm__objects.object__regionName);
          validateRequestForm(requestForm__objects.object__cityName);
          validateRequestForm(requestForm__objects.object__email, true);
        }
        // validateAll()

        /**
         * cutCommaFromArray() - функция замены символа ',' на '.' последнего элемента массива названий форм
         * @param  {Array} array - массив названий форм
         */
         function cutCommaFromArray(array) {
          var array_temp = array[array.length - 1].substring(0, array[array.length-1].length - 2);
          array.splice(array.length - 1, 1);
          array.push(array_temp + '.');
        }
        // cutCommaFromArray()

        /**
         * checkValidStatus() - функция проверки валидности элемента формы и записи невалидного в массив
         * @param  {Object} elem - объект формы
         * @param  {Array} array - массив названий форм
         */
         function checkValidStatus(elem, array) {
          if (!elem.validStatus) {
            array.push(elem.name + ', ');  
          }
        }
        // checkValidStatus()

        /**
         * sendRequestForm() - функция проверки валидности и отправки формы
         * @param  {Object} event - объект события
         */
         
         function sendRequestForm(event) {
          if (requestForm__caunter === allLength ) {
            console.info('Ушло!');
            $('.alert').hide();
            requestForm__sendArray = [];
          } else {
            event.preventDefault();
            console.info('Шабаш!');

            $('.alert-text').empty();

            checkValidStatus(requestForm__objects.object__carYearVal, requestForm__sendArray);
            checkValidStatus(requestForm__objects.object__carBrandVal, requestForm__sendArray);
            checkValidStatus(requestForm__objects.object__carModelVal, requestForm__sendArray);
            checkValidStatus(requestForm__objects.object__carLWEngine, requestForm__sendArray);

            checkValidStatus(requestForm__objects.object__spacePartName, requestForm__sendArray);
            checkValidStatus(requestForm__objects.object__regionName, requestForm__sendArray);
            checkValidStatus(requestForm__objects.object__cityName, requestForm__sendArray);
            checkValidStatus(requestForm__objects.object__email, requestForm__sendArray);

            cutCommaFromArray(requestForm__sendArray);

            $('.alert-text').append(requestForm__sendArray);
            $('.alert').show();
            requestForm__sendArray = [];
          }
        }
        // sendRequestForm()

        /**
         * onChange - событие изменения в блоке .autoParth-box
         * @param  {Object} event - объект события
         */
         $('.autoParth-box').on('change', function(event) {
          if (event.target.id === 'request-form__car-year') {
            validateRequestForm(requestForm__objects.object__carYearVal);
          } else if (event.target.id === 'request-form__car-brand') {
            validateRequestForm(requestForm__objects.object__carBrandVal);
          } else if (event.target.id === 'request-form__car-model') {
            validateRequestForm(requestForm__objects.object__carModelVal);
          } else if (event.target.id === 'request-form__l-w-engine') {
            validateRequestForm(requestForm__objects.object__carLWEngine);
          }
          if (event.target.id === 'request-form__space-part-name') {
            validationFrom__spacePartName();
          } else if (event.target.id === 'request-form__region-name') {
            validateRequestForm(requestForm__objects.object__regionName);
          } else if (event.target.id === 'request-form__city-name') {
            validateRequestForm(requestForm__objects.object__cityName);
          } else if (event.target.id === 'request-form__email') {
            validateRequestForm(requestForm__objects.object__email, true);
          }
        });
        // onChange
        
        /**
         * onClick - событие проверки и отправки формы
         * @param  {Object} event - объект события
         */
         $('.contact-submit').on('click', function(event) {
          sendRequestForm(event);
        });
        // onClick

  // onClick






})();