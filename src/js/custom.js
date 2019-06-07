/*
Template Name: Material Pro Admin
Author: Themedesigner
Email: niravjoshi87@gmail.com
File: js
*/
import $ from 'jquery';
import jQuery from 'jquery';
$(document).ready(function(){
    $('body').scrollspy({
        target:".nav-side",
        offset:80
    });

    setTimeout(()=>{
        updateOwl();

    function rescaleCaptcha(){
        var width = $('#g-recaptcha').parent().width();
        var scale;
        if (width < 302) {
          scale = width / 302;
        } else{
          scale = 1.0; 
        }
    
        $('#g-recaptcha').css('transform', 'scale(' + scale + ')');
        $('#g-recaptcha').css('-webkit-transform', 'scale(' + scale + ')');
        $('#g-recaptcha').css('transform-origin', '0 0');
        $('#g-recaptcha').css('-webkit-transform-origin', '0 0');
      }
    
      rescaleCaptcha();
      $( window ).resize(function() { rescaleCaptcha()});

    },2000)

    var current = window.location.pathname;  
    $('.listMenu li a').each(function(){
        var $this = $(this);
        if($this.attr('href') == window.location.pathname){
            $this.addClass('active');
        }
    });
    // $('.dropdown-menu').click(function(e) {
    //     e.preventDefault();
    // });
    $(document).on('click', '.dropdown-item.report,.reportDD', function (e) {
        e.stopPropagation();
    });
    

  
});

    function openNav() {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }

    function closeNav() {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    }

 function updateOwl(){
    $(".owl-carousel").each(function() {
      $(this).data('owl.carousel').onResize();
    });
  };

$(function () {
   
    "use strict";
    $(function () {
        $(".preloader").fadeOut();
    });
    jQuery(document).on('click', '.mega-dropdown', function (e) {
        e.stopPropagation()
    });



    var currentFocus;

    // $("#globalSearch").keydown(function(e){
       
    //     currentFocus = -1;
    //     var x = document.getElementById("autoComplete");
    //     if (x) x = x.getElementsByTagName("div");

    //     console.log(x)
    //     if (e.keyCode == 40) {
    //       /*If the arrow DOWN key is pressed,
    //       increase the currentFocus variable:*/
    //       currentFocus+1;
    //       console.log(currentFocus)
    //       /*and and make the current item more visible:*/
    //       addActive(x);
    //     } else if (e.keyCode == 38) { //up
    //       /*If the arrow UP key is pressed,
    //       decrease the currentFocus variable:*/
    //       currentFocus--;
    //       /*and and make the current item more visible:*/
    //       addActive(x);
    //     } else if (e.keyCode == 13) {
    //       /*If the ENTER key is pressed, prevent the form from being submitted,*/
    //       e.preventDefault();
    //       if (currentFocus > -1) {
    //         /*and simulate a click on the "active" item:*/
    //         if (x) x[currentFocus].click();
    //       }
    //     }
    // })

  

    function nullCheck(item){	
        if(item == null || item == undefined || item == 'undefined' || item == '' || item == 'null' ){
            return null
        }	
        return item;
    }
    // ============================================================== 
    // This is for the top header part and sidebar part
    // ==============================================================  
    var set = function () {
            var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            var topOffset = 70;
            if (width < 1170) {
                $("body").addClass("mini-sidebar");
                $('.navbar-brand span').hide();
                $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
                $(".sidebartoggler i").addClass("ti-menu");
            }
            else {
                $("body").removeClass("mini-sidebar");
                $('.navbar-brand span').show();
                //$(".sidebartoggler i").removeClass("ti-menu");
            }
            
            var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $(".page-wrapper").css("min-height", (height) + "px");
            }
       
    };
    $(window).ready(set);
    $(window).on("resize", set);
    // ============================================================== 
    // Theme options
    // ==============================================================     
    $(".sidebartoggler").on('click', function () {
        if ($("body").hasClass("mini-sidebar")) {
            $("body").trigger("resize");
            $(".scroll-sidebar, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible");
            $("body").removeClass("mini-sidebar");
            $('.navbar-brand span').show();
            //$(".sidebartoggler i").addClass("ti-menu");
        }
        else {
            $("body").trigger("resize");
            $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
            $("body").addClass("mini-sidebar");
            $('.navbar-brand span').hide();
            //$(".sidebartoggler i").removeClass("ti-menu");
        }
    });
    // topbar stickey on scroll
    
    //$(".fix-header .topbar").stick_in_parent({});
    
    
    // this is for close icon when navigation open in mobile view
    $(".nav-toggler").click(function () {
        $("body").toggleClass("show-sidebar");
        $(".nav-toggler i").toggleClass("ti-menu");
        $(".nav-toggler i").addClass("ti-close");
    });
    $(".sidebartoggler").on('click', function () {
        //$(".sidebartoggler i").toggleClass("ti-menu");
    }); 
    $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
        $(".app-search").toggle(200);
    });
    // ============================================================== 
    // Right sidebar options
    // ============================================================== 
    $(".right-side-toggle").click(function () {
        $(".right-sidebar").slideDown(50);
        $(".right-sidebar").toggleClass("shw-rside");
    });

    $('.floating-labels .form-control').on('focus blur', function (e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    function addActive(x) {
  
      /*a function to classify an item as 
      "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }

    // ============================================================== 
    // Auto select left navbar
    // ============================================================== 
    $(function () {
    
        // if(nullCheck($('.left-sidebar')) != null){
        //     var fixmeTop = $('.left-sidebar').offset().top;
        //     $(window).scroll(function() {
        //         var currentScroll = $(window).scrollTop();
        //         if (currentScroll >= fixmeTop) {
        //             $('.left-sidebar').css({
        //                 position: 'fixed',
        //                 top: '80px',
        //                 left: '0'
        //             });
        //         } else {
        //             $('.left-sidebar').css({
        //                 position: 'absolute',
        //                 top: '0px',
        //                 left: '0'
        //             });
        //         }
        //     });
        // }

  
    //    $('.nav-side li a').click(() => { 
    //        console.log(this,'==========')
    //        $('.nav-side li a').removeClass('active');
    //        $(this).addClass("active");

    //    })
       
        
    });
    // ============================================================== 
    //tooltip
    // ============================================================== 
    $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    // ============================================================== 
    //Popover
    // ============================================================== 
    $(function () {
                $('[data-toggle="popover"]').popover()

                // var offset = 80;
                // var $root = $('html, body');

                // $('.nav-side li a').click(function(event) {
                //     event.preventDefault();
                //     var href = $.attr(this, 'href');
                //     $('.nav-side li a').removeClass('active')
                //     $(this).addClass('active')
                //     if(nullCheck($(href).offset()) != null){
                //         $root.animate({
                //             scrollTop: $(href).offset().top - (offset)
                //         }, 500, function () {
                //            // window.location.hash = href;
                //         });
                //     }
                   
                // });
                $('.sideAnchor li a').click(function(event) {
                    $('.sideAnchor li a').removeClass('active')
                    $(this).addClass('active')
                });

                // setTimeout(()=>{
                //     if ($.fn.DataTable.isDataTable('.dataTable') === false){
                //         $('.dataTable').DataTable({searching: false, info: false, });
                //     }
                // },1500)

                
               
        })
    // ============================================================== 
    // Sidebarmenu
    // ============================================================== 
    $(function () {
        // $('#sidebarnav').metisMenu();
    });
    // ============================================================== 
    // Slimscrollbars
    // ============================================================== 
    // $('.scroll-sidebar').slimScroll({
    //     position: 'left'
    //     , size: "5px"
    //     , height: '100%'
    //     , color: '#dcdcdc'
    //  }); 
    // $('.message-center').slimScroll({
    //     position: 'right'
    //     , size: "5px"
        
    //     , color: '#dcdcdc'
    //  });
    
    
    // $('.aboutscroll').slimScroll({
    //     position: 'right'
    //     , size: "5px"
    //     , height: '80'
    //     , color: '#dcdcdc'
    //  });
    // $('.message-scroll').slimScroll({
    //     position: 'right'
    //     , size: "5px"
    //     , height: '570'
    //     , color: '#dcdcdc'
    //  });
    // $('.chat-box').slimScroll({
    //     position: 'right'
    //     , size: "5px"
    //     , height: '470'
    //     , color: '#dcdcdc'
    //  });
    
    // $('.slimscrollright').slimScroll({
    //     height: '100%'
    //     , position: 'right'
    //     , size: "5px"
    //     , color: '#dcdcdc'
    //  });

    // ============================================================== 
    // Resize all elements
    // ============================================================== 
    $("body").trigger("resize");
    // ============================================================== 
    // To do list
    // ============================================================== 
    $(".list-task li label").click(function () {
        $(this).toggleClass("task-done");
    });
    
    // ============================================================== 
    // Login and Recover Password 
    // ============================================================== 
    $('#to-recover').on("click", function () {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
    });

    // ============================================================== 
    // Collapsable cards
    // ==============================================================
        $('a[data-action="collapse"]').on('click',function(e){
            e.preventDefault();
            $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ti-minus ti-plus');
            $(this).closest('.card').children('.card-body').collapse('toggle');
           
        }); 
        // Toggle fullscreen
        $('a[data-action="expand"]').on('click',function(e){
            e.preventDefault();
            $(this).closest('.card').find('[data-action="expand"] i').toggleClass('mdi-arrow-expand mdi-arrow-compress');
            $(this).closest('.card').toggleClass('card-fullscreen');
        });

        // Close Card
        $('a[data-action="close"]').on('click',function(){
            $(this).closest('.card').removeClass().slideUp('fast');
        });
    // ============================================================== 
    // This is for the sparkline charts which is coming in the bradcrumb section
    // ==============================================================
    // $('#monthchart').sparkline([5, 6, 2, 9, 4, 7, 10, 12], {
    //         type: 'bar',
    //         height: '35',
    //         barWidth: '4',
    //         resize: true,
    //         barSpacing: '4',
    //         barColor: '#1e88e5'
    //     });
    // $('#lastmonthchart').sparkline([5, 6, 2, 9, 4, 7, 10, 12], {
    //         type: 'bar',
    //         height: '35',
    //         barWidth: '4',
    //         resize: true,
    //         barSpacing: '4',
    //         barColor: '#7460ee'
    //     });
    var sparkResize;
 
        
    
});
