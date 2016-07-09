$(function() {
     // aвтокомплит
     function autocompleteBtn() {
      var autocomplObj = {
        session: (function() {
          return $('#sessid').val();
        })(),
        type: 'autocomplete'
      }
      $('.autoParth-step__nameDetails').autocomplete({
        serviceUrl: 'php/countries.json',
        minChars: 3,
        type: 'get',
        params: autocomplObj,
        onSelect: function (suggestions) {
             // alert('You selected: ' + suggestions.value + ', ' + suggestions.data);
          }
        });
    }
    autocompleteBtn();

    $('.autoParth-step__addDetail'). on('click', function(e) {
      e.preventDefault();
      autocompleteBtn();
    })
  })