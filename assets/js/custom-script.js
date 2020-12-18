/********************************************************
 *
 * Custom Javascript code for AppStrap Bootstrap theme
 * Written by Themelize.me (http://themelize.me)
 *
 *******************************************************/
(function($) {
   $.extend($.fn, {

      // ===============================================================
      // AppStrap Javascript API
      // ===============================================================
      // @callbacks:
      // 1. themePreload: Before any AppStrap Javascript has run
      // 2. themePrePlugins: Before any AppStrap Javascript has run
      // 3. themeLoaded: After the theme has loaded everything
      //
      // arguments:
      // context = the dom in context
      // refresh = true if ajax content, false if default page load
      // ===============================================================
      themePreload: function(context, refresh) {
         //alert('themePreload');
      },
      themePrePlugins: function(context, refresh) {
         //alert('themePrePlugins');
      },
      themeLoaded: function(context, refresh) {
         //alert('themeLoaded');
         if (!refresh) {
            // Use any standard jQuery code to alter page:
            //$('.header-brand-text').html('test 1-2-3');
         }
      },

      // ===============================================================
      // @group: Override default plugins OR add new plugins
      // ===============================================================  
      themePluginsExtras: {
         // Plugin functions
         // name pattern themePluginPLUGINNAME
         // items: PLUGINNAMEs
         //
         // Used to override the themePlugins plugins list in script.js
         // To see all default plugin functions use:
         // var plugins = $.fn.themePluginsLoad(false);
         // console.log(plugins);
         //
         // OR to define your own plugins
         // ----------------------------------------------------------------
         //themePluginFakeLoader: function(context) {
         // override default themePluginFakeLoader function
         //},

         //themePluginMyPlugin: function(context) {
         // My custom plugin load
         //var $triggerElements = context.find('[data-toggle=SOMETHING]');
         //if ($triggerElements.length > 0) {
         //  var themePluginMyPluginInit = function() {
         //    // Init the plugin, called when Javascript & CSS are loaded
         //  };
         //  $document.themeLoadPlugin(["PLUGIN-JAVSCRIPT-COMMA-SEPARATED"], ["PLUGIN-CSS-COMMA-SEPARATED"], themePluginMyPluginInit);
         //}
         //}
      }, // end of themePluginsExtras object
   });
})(jQuery);

// handles form submission
(function() {
   'use strict';
   window.addEventListener('load', function() {
      var forms = document.getElementsByClassName('needs-validation');
      var validation = Array.prototype.filter.call(forms, function(form) {
         form.addEventListener('submit', function(event) {
            if (validateForm()) { //form.checkValidity() === false || 
               event.preventDefault();
               event.stopPropagation();
            } else {
               submitToAPI(event);
            }
            form.classList.add('was-validated');
         }, false);
      });
   }, false);
})();

// validates contact form
function validateForm() {
   var Namere = /[A-Za-z]{1}[A-Za-z]/;
   if (!Namere.test($("#name-input").val())) {
      return true;
   }

   if ($("#email-input").val() == "") {
      return true;
   }

   var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
   if (!reeamil.test($("#email-input").val())) {
      $("#email-input").addClass('is-invalid');
      return true;
   }

   var Messagere = /[A-Za-z]{1}[A-Za-z]/;
   if (!Messagere.test($("#description-input").val())) {
      return true;
   }

   if (grecaptcha.getResponse() == "") {
      return true;
   }
   return false;
}

// data-callback on form
function verifyRecaptchaCallback(response) {
   $('input[data-recaptcha]').val(response).trigger('change')
}

function submitToAPI(e) {
   e.preventDefault();
   var URL = "https://u7zqjrkm0e.execute-api.us-east-1.amazonaws.com/prod/submit";

   var name = $("#name-input").val();
   var phone = $("#phone-input").val();
   var email = $("#email-input").val();
   var desc = $("#description-input").val();
   var data = {
      name: name,
      phone: phone,
      email: email,
      desc: desc,
      captcha: grecaptcha.getResponse()
   };

   $.ajax({
      type: "POST",
      url: URL,
      dataType: "json",
      crossDomain: "true",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),

      success: function() {
         $("#contact-form").addClass('d-none');
         $("#success-msg").removeClass('d-none');
      },
      error: function() {
         $("#fail-msg").removeClass('d-none');
      }
   });
}
