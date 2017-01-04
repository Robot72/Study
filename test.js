;(function () {

    var clickBtnSearch = function () {
        if( $('#adv-search-tab1').parent().hasClass('active') ) {
			var request = {};
            request.typeRenty = $('[name="typeRenty1"]').val();
            request.locality = $('[name="locality1"]').val();
            request.newbuilding = $('[name="newbuilding1"]').val();
            request.price = $('#slider-range-price1-value').val();
            request.priceMin = price.split(' - ')[0];
            request.priceMax = price.split(' - ')[1];
            request.areaTotal = $('#slider-range-area-total1-value').val();
            request.areaTotalMin = areaTotal.split(' - ')[0];
            request.areaTotalMax = areaTotal.split(' - ')[1];
            request.roomsAll = $('#slider-range-rooms1-value').val();
            request.roomsAllMin = roomsAll.split(' - ')[0];
            request.roomsAllMax = roomsAll.split(' - ')[1];
            request.storey = $('#slider-range-storey1-value').val();
            request.storeyMin = storey.split(' - ')[0];
            request.storeyMax = styrey.split(' - ')[1];
            
            if(request.newbuilding === null) {
                request.newbuilding = '';
            }
            
            if(request.locality === null) {
                request.locality = '';
            }
            
            if(request.typeRenty === null) {
                request.typeRenty = '';
            }
            
            window.location.path = '/search/' + $.param(request);
            
        } else if( $('#adv-search-tab2').parent().hasClass('active') ) {
			


        } else if( $('#adv-search-tab3').parent().hasClass('active') ) {
            
        } else if( $('#adv-search-tab4').parent().hasClass('active') ) {
            
        }
        
        return false;
    };
    
    var handlerReady = function () {
        $(document).on('click', '#btn-search', clickBtnSearch); }; 
	}
}());
