export const dateUtil = {
    getAddHour : function(date, hour){
        let tempDate = new Date(date);

        return new Date(tempDate.getTime() + 60 * 60 * 1000);
    },

	getHourItems : function(beginDateTime, endDateTime){
		let hourItems = [];
		let tempDate = new Date(beginDateTime);
	
		while( tempDate < new Date(endDateTime)){ 
			hourItems.push(tempDate);
			tempDate = new Date(tempDate.getTime() + 60 * 60 * 1000); //1시간증가
		}
	
		return hourItems;
	},

	getMinuteItems : function(beginDateTime, endDateTime){
		let minuteItems = [];
		let tempDate = new Date(beginDateTime);
	
        if (new Date(beginDateTime) === new Date(endDateTime))
            return minuteItems;
            
		while( tempDate <= new Date(endDateTime)){ 
			minuteItems.push(tempDate);
			tempDate = new Date(tempDate.getTime() + 15 * 60 * 1000); //15분 증가
		}
	
		return minuteItems;
	},

	getDayItems : function(beginDateTime, endDateTime){
		let dayItems = [];

		let tempBeginDate = beginDateTime;
		let tempEndDate   = endDateTime;
		
		let tempDate = new Date(tempBeginDate.substring(0,10)+" 00:00:00");
	
		while( tempDate <= new Date(tempEndDate)){ 
			dayItems.push(tempDate);
			tempDate = new Date(tempDate.getTime() + 24* 60 * 60 * 1000); //일일증가
		}
	
		return dayItems;
	},

	getYMDString : function(date){
		const year  = date.getFullYear();
		const month = date.getMonth() + 1;
		const day   = date.getDate();
		
		const monthString = month < 10 ? `0${month}` : month;
		const dayString = day < 10 ? `0${day}` : day;
		
		const formattedDate = `${year}-${monthString}-${dayString}`;
		
		return formattedDate;
	},

	isSameDay : function(date1, date2){
		return date1.getFullYear() === date2.getFullYear() && 
				date1.getMonth() === date2.getMonth() && 
				date1.getDate() === date2.getDate();
	}
};
