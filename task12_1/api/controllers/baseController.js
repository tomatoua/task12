var base = require('../../base/base');
var responseMsg = '';
var responseTemplate = '<head> <meta charset="utf-8"> </head>\
                            REST API \
                            <p>1. создать страну POST (restapi/country) postdata = [countryname]</p>\
                            <p>2. создать отель POST (restapi/country/[countryname]/hotel) postdata = [hotelname] </p> \
                            <p>3. список стран GET (restapi/country) </p> \
                            <p>4. список отелей GET (restapi/country/[countryname]/hotel) </p> \
                            <p>5. получить инфомрацию об отеле GET (restapi/country/[countryname]/hotel/[hotelname]) </p> \
                            <p>6. удалить страну DELETE (restapi/country/[countryname]) </p> \
                            <p>7. удалить отель DELETE (restapi/cntry/[countryname]/hotel/[hotelname]) </p> \
                            <p>8. обновить информацию об отеле PUT (restapi/country/[countryname]/hotel/[hotelname]) postdata = [information] </p> \
                            <form name="form1" method="post" actin="submit"> \
                                Enter the text:<br /> \
                                <textarea name="text" cols="10" rows="1"></textarea> \
                                <input name="" type="submit" value="send"/> \
                            </form>';

module.exports = {

	badRequest : function(req,res){
		res.status(400);
		res.send('Bad request');
	},


	sendTemplate : function(req,res){
		res.send(responseTemplate);
	},
	getCountrys : function(req,res){
		responseMsg = getCountrys();
		res.send(responseTemplate + responseMsg);
	},
	getHotels : function(req,res){
		responseMsg = getHotels(req.params['countryname']);
		if(responseMsg.indexOf('ERROR') + 1) {
			res.status(404);
			res.send(responseMsg);
		}
		else res.send(responseTemplate + responseMsg);
	},
	getHotelInfo : function(req,res){
		responseMsg = getHotelInfo(req.params['countryname'], req.params['hotelname']);
		if(responseMsg.indexOf('ERROR') + 1) {
			res.status(404);
			res.send(responseMsg);
		}
		else res.send(responseTemplate + responseMsg);
	},
	addCountry : function(req,res){
		var reqDataText = req.body['text'];
    	if (reqDataText.length){
        	responseMsg = addCountry(reqDataText);
    	}
		res.send(responseTemplate + responseMsg);
	},
	removeCountry : function(req,res){
		responseMsg = removeCountry(req.params['countryname']);
		if(responseMsg.indexOf('ERROR') + 1) {
			res.status(404);
			res.send(responseMsg);
		}
		else res.send(responseTemplate + responseMsg);
	},
	addHotel : function(req,res){
		var reqDataText = req.body['text'];
    	if (reqDataText.length){
        	responseMsg = addHotel(req.params['countryname'], reqDataText);
    	}
    	if(responseMsg.indexOf('ERROR') + 1) {
			res.status(404);
			res.send(responseMsg);
		}
		else res.send(responseTemplate + responseMsg);
	},
	updateHotel : function(req,res){
		var reqDataText = req.body['text'];
    	responseMsg = updateHotelInfo(req.params['countryname'], req.params['hotelname'], reqDataText);
    	if(responseMsg.indexOf('ERROR') + 1) {
			res.status(404);
			res.send(responseMsg);
		}
		else res.send(responseTemplate + responseMsg);
	},
	removeHotel : function(req,res){
       	responseMsg = removeHotel(req.params['countryname'], req.params['hotelname']);
       	if(responseMsg.indexOf('ERROR') + 1) {
			res.status(404);
			res.send(responseMsg);
		}
		else res.send(responseTemplate + responseMsg);
	}

}

function getCountrys() {
    return Object.getOwnPropertyNames(base);
}

function getHotels(countryname) {
    if (base.hasOwnProperty(countryname)){
        return Object.getOwnPropertyNames(base[countryname]);
    }
    else return 'ERROR not found country';
}

function getHotelInfo(countryname, hotelname) {
    if (base.hasOwnProperty(countryname)){
        if (base[countryname].hasOwnProperty(hotelname)){
            return base[countryname][hotelname];
        }
        else return 'ERROR not found hotel';
    }
    else return 'ERROR not found country';
}

function addCountry(reqDataText){
    base[reqDataText] = {};
    return 'country ' + reqDataText + ' add' ;
}

function removeCountry(countryname){
    if (base.hasOwnProperty(countryname)) {
        delete base[countryname];
        return 'country ' + countryname + ' removed';
    }
    else return 'ERROR not found country';
}

function addHotel(countryname, reqDataText){
    if (base.hasOwnProperty(countryname)) {
        base[countryname][reqDataText] = '';
        return 'hotel ' + reqDataText + ' in country ' + countryname + ' add';
    }
    else return 'ERROR not found country';
}

function removeHotel(countryname,hotelname){
    if (base.hasOwnProperty(countryname)){
        if (base[countryname].hasOwnProperty(hotelname)) {
            delete base[countryname][hotelname];
            return 'hotel ' + hotelname + ' in country ' + countryname + ' removed';
        }
        else return 'ERROR not found hotel';
    }
    else return 'ERROR not found country';
}
function updateHotelInfo(countryname,hotelname,reqDataText) {
    if (base.hasOwnProperty(countryname)){
        if (base[countryname].hasOwnProperty(hotelname)) {
            base[countryname][hotelname] = reqDataText;
            return 'Information about ' + hotelname + ' in country ' + countryname + ' add';
        }
        else return 'ERROR not found hotel';
    }
    else return 'ERROR not found country';
}
