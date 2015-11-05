//
// Theme scripts
//

(function ($) {

  $(document).ready(function() {
    //
    // Adds unslider to carousel
    //
    $('#featured-carousel').unslider({
      speed: 500,
      delay: 33500,
      keys: true,
      dots: true,
      fluid: true 
    });
    // Resizes unslider banner on window.load
    $(window).load(function() {
      var bannerHeight = $('#featured-carousel').find('li').first().css('height');
      $('#featured-carousel').css('height', bannerHeight);
    });
    // 
    // Handle thumbnail clicks on the Product page
    //
    $('#product-page').on('click', 'div.item-images ul a', function(){
      $('div.big-image img', $(this).closest('.item-images')).attr('src', this.href);

      return false;
    })

    //
    // Handle the Enter key in the Coupon field
    //
    $('#cart-content').on('keydown', 'input#coupon', function(ev) {
      if (ev.keyCode == 13) {
        $(this).sendRequest('shop:cart', {
          update: {'#cart-content': 'shop-cart-content', '#mini-cart': 'shop-minicart'},
          extraFields: {'set_coupon_code': 1}
        });
      }
    }) 

    //
    // Handle the Enter key in the Quantity field
    //
    $('#cart-content').on('keydown', 'input.quantity', function(ev) {
      if (ev.keyCode == 13) {
        $(this).sendRequest('shop:cart', {
          update: {'#cart-content': 'shop-cart-content', '#mini-cart': 'shop-minicart'}
        });
      }
    });

    $(document).on('change', '#payment_method', function() {
      $(this).sendRequest('shop:onUpdatePaymentMethod', {
        update: {'#payment_form' : 'partial-paymentform'},
      });
    })

    //
    // Handle the shipping option radio button clicks
    //
    $('#checkout-page').on('change', '#shipping-methods input', function(){
      // When the shipping method is shipping we want to update the 
      // order totals area on the Checkout page. The native Checkout 
      // action does all the calculations.
      //
      $(this).sendRequest('shop:onCheckoutShippingMethod', {
        update: {'#checkout-totals': 'shop-checkout-totals', '#mini-cart':'shop-minicart'},
      })

    });

    $(document).on('click', '#copy_billing_to_shipping', function (){
      //data-ajax-handler="shop:onCopyBillingToShipping" data-ajax-update="#checkout-page=shop-checkoutaddress"
      if($(this).is(':checked')) {
        $("#shipping-form").hide();

        $(this).sendRequest('shop:onCheckoutBillingInfo', {
          onAfterUpdate: function() {
            $(this).sendRequest('shop:onCopyBillingToShipping', {
              update: {'#checkout-page' : 'partial-checkout-address', '#mini-cart':'shop-minicart'}
            });
          }
        });

      } else {
        $("#shipping-form").show();
      }

    });

    $( document ).ajaxSuccess(function( event, request, settings ) { 
      if ( $( '#copy_billing_to_shipping' ).length ) { 
        $("#copy_billing_to_shipping").prop('checked', true);
      } 
    });

$('.pChk').click(function() {
    if( $(this).is(':checked')) {
        $("#ProjectListButton").show();
    } else {
        $("#ProjectListButton").hide();
    }
}); 
    
  });
})(jQuery);