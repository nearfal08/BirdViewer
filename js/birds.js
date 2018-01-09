$(function() {
    var birdCardHTML = '',
        birdDetailsHTML = '',
        birdContainer = $('.birds'),
        birdDetailsContainer = $('.bird_details .container'),
        counter = 0,
        startingSlide = 0;
        
    console.log(birdDetailsContainer);
    // Get JSON.
    $.getJSON('json/birds.json', function(data) {
        // Loop through array and build HTML.
        $.each(data, function(key, val) {  
            // Build the card HTML
            birdCardHTML += '<div class="bird_card">';
            birdCardHTML += '<img class="" src="images/' + val.bird_image + '" alt="' + key + '">';
            birdCardHTML += '<h5 class="bird_name">' + key + '</h5>';
            birdCardHTML += '<p class="sci_bird_name"><i>' + val.scientific_name + '</i></p>';
            birdCardHTML += '</div>';
            
            // Build the details HTML
            birdDetailsHTML += '<div class="bird_detail row" data-id="' + counter + '">';  
            birdDetailsHTML += '<div class="detail_col">'; 
            birdDetailsHTML += '<p style="color: white">' + val.description + '</p>';
            birdDetailsHTML += '<p style="color: white">' + val.behavior + '</p>';
            birdDetailsHTML += '<p style="color: white">' + val.habitat + '</p>'; 
            birdDetailsHTML += '</div>';  
            birdDetailsHTML += '</div>';
            
            counter++;
        });
        // Append HTML to areas.
        birdContainer.append(birdCardHTML);
        birdDetailsContainer.append(birdDetailsHTML);
        
        // Add the Slick carousel
        $('.birds').slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          variableWidth: true, 
          centerPadding: '60px'
        });
        
        // Center vertically.
        var boxTop = ($(window).height()) / 2.5 - (birdContainer.height() / 2.5);
        birdContainer.css({ 
            top: boxTop
        });
        
        // All details are display none. Turn the first one on.
        var details = $('.bird_detail[data-id=' + startingSlide + ']');
        details.show();
    });
    
    // On before slide change update the birds details.
    birdContainer.on('beforeChange', function(event, slick, currentSlide, nextSlide){ 
        if (nextSlide != currentSlide) {
            var newDetails = $('.bird_detail[data-id=' + nextSlide + ']'),
                oldDetails = $('.bird_detail[data-id=' + currentSlide + ']');
            oldDetails.hide();
            newDetails.show();
            currentSlickSlide = nextSlide;
        }
    }); 
});