jQuery(document).ready(function(){ 
	
	/* ---------------------------------------------------------------------- */
	/*	Custom Functions
	/* ---------------------------------------------------------------------- */
	
	// Needed variables
	var $logo 	= $('#logo');
		
	// Show logo 
	$('.tab-resume,.tab-portfolio,.tab-contact,tab-games,tab-flights').click(function() {
	  $logo.fadeIn('slow');
	});
	// Hide logo
	$('.tab-profile').click(function() {
	  $logo.fadeOut('slow');
	});	
	
	/* ---------------------------------------------------------------------- */
	/*	Menu
	/* ---------------------------------------------------------------------- */
	
	// Needed variables
	var $content 		= $("#content");
	
	// Run easytabs
  	$content.easytabs({
	  animate			: true,
	  updateHash		: false,
	  transitionIn		:'slideDown',
	  transitionOut		:'slideUp',
	  animationSpeed	:600,
	  tabs				:"> .menu > ul > li",
	  tabActiveClass	:'active'
	});
	
	if($('#li-letsbat3d').is(':visible'))
  		$content.easytabs('select', '#profile');


	// Hover menu effect
	$content.find('.tabs li a').hover(
		function() {
			$(this).stop().animate({ marginTop: "-7px" }, 200);
		},function(){
			$(this).stop().animate({ marginTop: "0px" }, 300);
		}
	);

	
	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */
	
	
	// Needed variables
	var $contactform 	= $('#contactform'),
		$success		= 'Your message has been sent. Thank you!';
		
	$contactform.submit(function(){
		$.ajax({
		   type: "POST",
		   url: "/ContactForm",
		   data: $(this).serialize(),
		   success: function(msg)
		   {
				if(msg == 'SEND'){
					response = '<div class="success">'+ $success +'</div>';
				}
				else{
					response = '<div class="error">'+ msg +'</div>';
				}
				// Hide any previous response text
				$(".error,.success").remove();
				// Show response message
				$contactform.prepend(response);
			}
		 });
		return false;
	});
	
	
	/* ---------------------------------------------------------------------- */
	/*	Google Maps
	/* ---------------------------------------------------------------------- */
	
	// Needed variables
	var $map 				= $('#map'),
		$tabContactClass 	= ('tab-contact'),
		$tabPortfolioClass 	= ('tab-portfolio'),
		$tabFlightClass 	= ('tab-flight'),

		$address 			= 'Mahaveer Coral Apartments, JP Nagar 5th Phase, Bangalore, India 560078',
	    $invoked = false;

	$content.bind('easytabs:after', function(evt,tab,panel) {
		if ( tab.hasClass($tabFlightClass) )
		{
//            $.getScript( "js/flights.js", function( data, textStatus, jqxhr ) {
//              console.log( data ); // Data returned
//              console.log( textStatus ); // Success
//              console.log( jqxhr.status ); // 200
//              console.log( "Load was performed." );
//            });
		}
		if ( tab.hasClass($tabPortfolioClass) )
        		{
        		            $(".folio").click(function(evt) {
                                evt.preventDefault();
                              $("#imgModal").attr('src', $(this).attr("href"));
                              $("#captionModal").innerHTML = $(this).attr("title");
                              $("#myModal").show();
                            });

                            $(".close").click(function(evt) {
                               $("#myModal").hide();
                            });
                            $("#myModal").click(function(evt) {
                                                                        $("#myModal").hide();
                                                                     });
        		}

  	});



});	