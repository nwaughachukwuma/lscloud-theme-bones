//
// Theme scripts
//

(function ($) {

  $(document).ready(function() {
    //
    // Adds unslider to carousel
    // Waits for images to finish loading (window).load for correct height values
    //
    $(window).load(function() {
      $('#featured-carousel').unslider({
        speed: 500,
        delay: 3000,
        keys: true,
        dots: true,
        fluid: true 
      });
      // Resizes unslider banner for initial height
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
    // Star Rating
    $('.rating > span').click(function() {
        var currentId = $(this).attr('id');
        if ( currentId === 'hate' ) {
            $('#hate').addClass('select');
            $( '#dont-like, #ok, #like, #love' ).removeClass('select');
            $('.rating > p').text( 'I hate it' );
            $("#item_rating").val('1');
        }
        if ( currentId === 'dont-like' ) {
            $( '#hate, #dont-like' ).addClass('select');
            $( '#ok, #like, #love' ).removeClass('select');
            $('.rating > p').text( 'I don\'t like it' );
            $("#item_rating").val('2');
        }
        if ( currentId === 'ok' ) {
            $( '#hate, #dont-like, #ok' ).addClass('select');
            $( '#like, #love' ).removeClass('select');
            $('.rating > p').text( 'It\'s ok' );
            $("#item_rating").val('3');
        }
        if ( currentId === 'like' ) {
            $( '#hate, #dont-like, #ok, #like' ).addClass('select');
            $( '#love' ).removeClass('select');
            $('.rating > p').text( 'I like it' );
            $("#item_rating").val('4');
        }
        if ( currentId === 'love' ) {
            $( '#hate, #dont-like, #ok, #like, #love' ).addClass('select');
            $('.rating > p').text( 'I love it' );
            $("#item_rating").val('5');
        }
        console.log($('#item_rating').val());
    }); // END
    // Review Modal
    $(function() {
      $("#modal-1").on("change", function() {
        if ($(this).is(":checked")) {
          $("body").addClass("modal-open");
        } else {
          $("body").removeClass("modal-open");
        }
      });

      $(".modal-fade-screen, .modal-close").on("click", function() {
        $(".modal-state:checked").prop("checked", false).change();
      });

      $(".modal-inner").on("click", function(e) {
        e.stopPropagation();
      });
    });

  });
})(jQuery);