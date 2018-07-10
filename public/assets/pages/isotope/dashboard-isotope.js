"use strict";
$(document).ready(function() {
    $(window).on('load', function() {
        var $container = $('.masonery-box');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
    });
});
