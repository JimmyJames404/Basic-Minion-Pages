
$(document).ready(function() {
  /******************************
      BOTTOM SCROLL TOP BUTTON
   ******************************/

  // declare variable
  var scrollTop = $(".scrollTop");

  $(window).scroll(function() {
    // declare variable
    var topPos = $(this).scrollTop();

    // if user scrolls down - show scroll to top button
    if (topPos > 100) {
      $(scrollTop).css("opacity", "1");

    } else {
      $(scrollTop).css("opacity", "0");
    }

  }); // scroll END

  //Click event to scroll to top
  $(scrollTop).click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
    return false;

  }); // click() scroll top EMD

  /*************************************
    LEFT MENU SMOOTH SCROLL ANIMATION
   *************************************/
  // declare variable
  var h1 = $("#h1").position();
  var h2 = $("#h2").position();
  var h3 = $("#h3").position();

  $('.link1').click(function() {
    $('html, body').animate({
      scrollTop: h1.top
    }, 500);
    return false;

  }); // left menu link2 click() scroll END

  $('.link2').click(function() {
    $('html, body').animate({
      scrollTop: h2.top
    }, 500);
    return false;

  }); // left menu link2 click() scroll END

  $('.link3').click(function() {
    $('html, body').animate({
      scrollTop: h3.top
    }, 500);
    return false;

  }); // left menu link3 click() scroll END

}); // ready() END

/*-----------------------Galeria---------------------------------*/
(function($) {
    var defaultStuckWithItemFunc = function(wrapper, opts) {
        var selector = [opts.itemsSelector, ":"];
        if (opts.stuckWithItem == 'first' || opts.stuckWithItem == 'last') {
            selector.push(opts.stuckWithItem);
        } else {
            selector.push("eq(", opts.stuckWithItem, ")");
        }
        return $(selector.join(""), wrapper)
    };
    
    $.fn.elementStacks = function(options) {
        var opts = $.extend({}, $.fn.elementStacks.defaults, options);

        return this.each(function() {
            var pos, collapsed = false, stackItems = $(opts.itemsSelector, this).css({'z-index': 10});

            var $that = this;
            stackItems
                .each(function(index, img) {
                    $(img)
                        .attr('coords', this.offsetTop + ':' + this.offsetLeft)
                        .css({'top' : this.offsetTop, 'left' : this.offsetLeft });
                })
                .css({'position': 'absolute'})
                .click(function(e) {
                    var $this = $(this);
                    
                    if (!$this.attr('coords')) {
                        return;
                    };
                    
                    collapsed = !collapsed;
                    var target = (collapsed) ?
                        (
                            (opts.stuckWithItem != null) ?
                                $((jQuery.isFunction(opts.stuckWithItem) ?
                                     opts.stuckWithItem : defaultStuckWithItemFunc
                                ).call(this, $that, opts)) : $this
                        ).css({'z-index': 100}) : null;
                    $this.one('stackfinished', function() {
                        if (!target) {
                            stackItems.css({'z-index': 10});
                        }
                    });
                    stackItems.each(function(index, stackItem) {
                        setTimeout(function() {
                            $.fn.elementStacks.reStack.call($this, $(stackItem), collapsed, opts, target, index, index == stackItems.length -1);
                        }, opts.delay * index);
                    });
                });
            
            if (opts.initialCollapse) {
                $(opts.itemsSelector + ":eq(0)", $that).click();
            }
        });
    };
    
    $.fn.elementStacks.defaults = {
        'itemsSelector': 'img',
        'rotationDeg': 20,
        'delay': 40,
        'duration': 900,
        'transaction': 'swing',
        'stuckWithItem': null, //null, 'first', last', function or index of the stuck element (0-based)
        'initialCollapse': false //true if you want the initial state to be collapsed
    };
    
    $.fn.elementStacks.random = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    
    $.fn.elementStacks.reStack = function(stackItem, collapsing, options, target, index, last) {
        var coords = (target ? target : stackItem).attr('coords').split(':');
        var rand = (collapsing ? $.fn.elementStacks.random(-options.rotationDeg, options.rotationDeg) : 0);
    
        var $that = this;
        stackItem.css({
            '-webkit-transform': 'rotate(' + rand + 'deg)',
            '-moz-transform': 'rotate(' + rand + 'deg)'
        }).animate({
                top: parseInt(coords[0]) + rand,
                left: parseInt(coords[1]) + rand
            }, options.duration,
            options.transaction,
           function() {
               if (last) {
                   $that.trigger('stackfinished');
               }
           }
        );
    };
})(jQuery);
//END PLUGIN


/*
 *    Easing Plugin (https://gsgd.co.uk/sandbox/jquery/easing/)
 *    NOT required but recommended.
*/
jQuery.extend(jQuery.easing, {
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    }
});


//Usage
$('#wrapper').elementStacks({
    'transaction': 'easeOutBack',
    'initialCollapse': true
});
