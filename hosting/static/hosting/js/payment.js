var cardBrandToPfClass = {
   'visa': 'pf-visa',
  'mastercard': 'pf-mastercard',
  'amex': 'pf-american-express',
  'discover': 'pf-discover',
  'diners': 'pf-diners',
  'jcb': 'pf-jcb',
  'unknown': 'pf-credit-card',
}

function setBrandIcon(brand) {
    var brandIconElement = document.getElementById('brand-icon');
    var pfClass = 'pf-credit-card';
    if (brand in cardBrandToPfClass) {
        pfClass = cardBrandToPfClass[brand];
    }
    for (var i = brandIconElement.classList.length - 1; i >= 0; i--) {
         brandIconElement.classList.remove(brandIconElement.classList[i]);
    }
    brandIconElement.classList.add('pf');
    brandIconElement.classList.add(pfClass);
}



$( document ).ready(function() {




    $.ajaxSetup({ 
         beforeSend: function(xhr, settings) {
             function getCookie(name) {
                 var cookieValue = null;
                 if (document.cookie && document.cookie != '') {
                     var cookies = document.cookie.split(';');
                     for (var i = 0; i < cookies.length; i++) {
                         var cookie = jQuery.trim(cookies[i]);
                         // Does this cookie string begin with the name we want?
                         if (cookie.substring(0, name.length + 1) == (name + '=')) {
                             cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                             break;
                         }
                     }
                 }
                 return cookieValue;
             }
             if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                 // Only send the token to relative URLs i.e. locally.
                 xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
             }
         } 
    });


    var hasCreditcard = window.hasCreditcard || false;
    if (!hasCreditcard){
        var stripe = Stripe(window.stripeKey);
        var elements = stripe.elements({locale: window.current_lan});
        //var card = elements.create('card', options={hidePostalCode: true});
        //card.mount('#card-element');
        /* new card */
        var server_url = "https://datacenterlight.ch";
        var element_style = {
            fonts: [{
                    family: 'lato-light',
                    src: 'url(https://cdn.jsdelivr.net/font-lato/2.0/Lato/Lato-Light.woff) format("woff2")',
                }, {
                    family: 'lato-regular',
					src: 'url(https://cdn.jsdelivr.net/font-lato/2.0/Lato/Lato-Regular.woff) format("woff2")',
				},
            ]
        }        
        var elements = stripe.elements(element_style);
        
        var style = {
          base: {
            iconColor: '#666EE8',
            color: '#31325F',
            lineHeight: '40px',
            fontWeight: 300,
            fontFamily: "'Lato', sans-serif",
            fontSize: '14px',
        
            '::placeholder': {
              color: '#333',
            },
          },
        };
        
var credit_card_text_style = {
  base: {
    iconColor: '#666EE8',
    color: '#31325F',
    lineHeight: '40px',
    fontWeight: 300,
    fontFamily: "'lato-light', sans-serif",
    fontSize: '14px',
    '::placeholder': {
      color: '#777',
    },
  },
};        
var credit_card_cvv_style = {
  base: {
    iconColor: '#666EE8',
    color: '#31325F',
    lineHeight: '40px',
    fontWeight: 300,
    fontFamily: "'lato-regular', sans-serif",
    fontSize: '14px',
    '::placeholder': {
      color: '#555',
    },
  },
};        
        
        var cardNumberElement = elements.create('cardNumber', {
          style: credit_card_text_style,
          placeholder : "____ ____ ____ ____",
        });
        cardNumberElement.mount('#card-number-element');
        
        var cardExpiryElement = elements.create('cardExpiry', {
          style: credit_card_cvv_style
        });
        cardExpiryElement.mount('#card-expiry-element');
        
        var cardCvcElement = elements.create('cardCvc', {
          style: credit_card_cvv_style
        });
        cardCvcElement.mount('#card-cvc-element');
        cardNumberElement.on('change', function(event) {
            // Switch brand logo
            if (event.brand) {
                setBrandIcon(event.brand);
            }
            setOutcome(event);
        });
        $('#payment-form').submit(function(e) {
            e.preventDefault();
            stripe.createToken(cardNumberElement).then(setOutcome);
       });
        /* new card end */
    }
    console.log("has creditcard", hasCreditcard);
    // hasCreditcard= true;

    var submit_form_btn = $('#payment_button_with_creditcard');
    submit_form_btn.on('click', submit_payment);


    function submit_payment(e){ 
      e.preventDefault();
      console.log("creditcard sdasd");
      // if (hasCreditcard) {
         $('#billing-form').submit();
      // }
     
    }



    //var $form = $('#payment-form');
    //$form.submit(payWithStripe);

    /* If you're using Stripe for payments */
    function payWithStripe(e) {
        e.preventDefault();

        function stripeTokenHandler(token) {
          // Insert the token ID into the form so it gets submitted to the server
          var form = document.getElementById('payment-form');
          var hiddenInput = document.createElement('input');
          $('#id_token').val(token.id);

          $('#billing-form').submit();
        }


        stripe.createToken(card).then(function(result) {
            if (result.error) {
              // Inform the user if there was an error
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {
                $form.find('[type=submit]').html('Processing <i class="fa fa-spinner fa-pulse"></i>');
                // Send the token to your server
                stripeTokenHandler(result.token);
            }
        });

        // /* Visual feedback */
        // $form.find('[type=submit]').html('Validating <i class="fa fa-spinner fa-pulse"></i>');

        // var PublishableKey = window.stripeKey;
        // Stripe.setPublishableKey(PublishableKey);
        // Stripe.card.createToken($form, function stripeResponseHandler(status, response) {
        //     if (response.error) {
        //         /* Visual feedback */
        //         $form.find('[type=submit]').html('Try again');
        //         /* Show Stripe errors on the form */
        //         $form.find('.payment-errors').text(response.error.message);
        //         $form.find('.payment-errors').closest('.row').show();
        //     } else {
        //         /* Visual feedback */
        //         $form.find('[type=submit]').html('Processing <i class="fa fa-spinner fa-pulse"></i>');
        //         /* Hide Stripe errors on the form */
        //         $form.find('.payment-errors').closest('.row').hide();
        //         $form.find('.payment-errors').text("");
        //         // response contains id and card, which contains additional card details
        //         var token = response.id;
        //         // AJAX

        //         //set token  on a hidden input
        //         $('#id_token').val(token);
        //         $('#billing-form').submit();
        //     }
        // });
    }

    /* Form validation */
    $.validator.addMethod("month", function(value, element) {
      return this.optional(element) || /^(01|02|03|04|05|06|07|08|09|10|11|12)$/.test(value);
    }, "Please specify a valid 2-digit month.");

    $.validator.addMethod("year", function(value, element) {
      return this.optional(element) || /^[0-9]{2}$/.test(value);
    }, "Please specify a valid 2-digit year.");

    /*validator = $form.validate({
        rules: {
            cardNumber: {
                required: true,
                creditcard: true,
                digits: true
            },
            expMonth: {
                required: true,
                month: true
            },
            expYear: {
                required: true,
                year: true
            },
            cvCode: {
                required: true,
                digits: true
            }
        },
        highlight: function(element) {
            $(element).closest('.form-control').removeClass('success').addClass('error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-control').removeClass('error').addClass('success');
        },
        errorPlacement: function(error, element) {
            $(element).closest('.form-group').append(error);
        }
    });*/

    paymentFormReady = function() {
        if ($form.find('[name=cardNumber]').hasClass("success") &&
            $form.find('[name=expMonth]').hasClass("success") &&
            $form.find('[name=expYear]').hasClass("success") &&
            $form.find('[name=cvCode]').val().length > 1) {
            return true;
        } else {
            return false;
        }
    };

    // $form.find('[type=submit]').prop('disabled', true);
    // var readyInterval = setInterval(function() {
    //     if (paymentFormReady()) {
    //         $form.find('[type=submit]').prop('disabled', false);
    //         clearInterval(readyInterval);
    //     }
    // }, 250);

});

