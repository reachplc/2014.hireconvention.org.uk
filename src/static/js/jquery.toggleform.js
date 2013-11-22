/* Toggle Form (jQuery)
 *
 * Show/Hide multiple forms via a checkbox
 *
 */

(function( $ ){

  var toggleForm = toggleForm || {};

  //  Default config settings

  toggleForm.config = {
    checkbox: '#register_options',  //  Parent element of checkbox
    forms: ['register_paypal', 'register_standard']
  };

  toggleForm.init = function(config) {

    // provide for custom configuration via init()
    if (config && typeof(config) === 'object') {
      $.extend(toggleForm.config, config);
    }

    var eventListener = $(toggleForm.config.checkbox).children('input').on('click', function(e) {

      var $_this = $(this).attr('value');

      toggleForm.toggle($_this);

    });


  };

  toggleForm.toggle = function(element) {

    var allForms = $(toggleForm.config.forms);

    $.each( allForms, function( key, value ) {

      switch (element === value) {
        case true:
          //  Open List
          $('#'+value).removeClass('hidden');
          break;

        case false:
          //  Close list
          $('#'+value).addClass('hidden');
          break;
      }


    });

  };

  //  Initialise and extend on page load

  $(document).ready(function() {

    // To extend the default config settings
    // pass a object as an argument for the init function
    // eg. toggleForm.init({ wrapper: '#js-wrapper'});

    toggleForm.init();

  });

})( jQuery );