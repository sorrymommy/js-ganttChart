import { dateUtil } from "./dateUtil.js";

export const modelBuilder = {
	getItems:function(array, beginDateTime, endDateTime){
		let returnValues = [];

		if (array.length === 0)
			return returnValues;
		
		if (array.length === 1){
			returnValues.push({
				beginDateTime: new Date(beginDateTime),
				endDateTime: new Date(endDateTime)
			});

			return returnValues;
		}

		array.map((item,index)=>{
			let isFirstItem = index === 0;
			let isLastItem = index === array.length-1;

			let tempBeginDateTime = null; 
			let tempEndDateTime   = null;
	
			if ( isFirstItem ){
				tempBeginDateTime = new Date(beginDateTime);
				tempEndDateTime   = array[index + 1];
			}
			else if ( isLastItem ){
				tempBeginDateTime = item;
				tempEndDateTime = new Date(endDateTime);
			}
			else
			{
				tempBeginDateTime = item;
				tempEndDateTime   = array[index + 1];
			}

			returnValues.push({
				beginDateTime: tempBeginDateTime,
				endDateTime: tempEndDateTime
			})
		});

		return returnValues;
	},
	getMinuteItems : function(beginDateTime, endDateTime){
		let array = dateUtil.getMinuteItems(beginDateTime, endDateTime);
		array = array.slice(0, array.length - 1);

		let returnValues = this.getItems(array, beginDateTime, endDateTime);

		returnValues.map((item)=>{
			item.beginMinute = item.beginDateTime.getMinutes();
			item.endMinute = (item.endDateTime.getMinutes() == 0 ? 60 : item.endDateTime.getMinutes());
		});

		return returnValues;
	},
	getHourItems : function(beginDateTime, endDateTime){
		let array = dateUtil.getHourItems(beginDateTime, endDateTime);

		let returnValues = this.getItems(array, beginDateTime, endDateTime);

		returnValues.map((item)=>{
			item.beginHour = item.beginDateTime.getHours();
			item.endHour = (item.endDateTime.getHours() == 0 ? 24 : item.endDateTime.getHours());
			item.minutes = this.getMinuteItems(item.beginDateTime, item.endDateTime);
			item.minuteCount = item.minutes.length;
		});
	
		return returnValues;
	},
	getDayItems : function(beginDateTime, endDateTime){
		let array = dateUtil.getDayItems(beginDateTime, endDateTime);

		let returnValues = this.getItems(array, beginDateTime, endDateTime);
		
		returnValues.map((item)=>{
			item.date = new Date( dateUtil.getYMDString(item.beginDateTime));
			item.hours = this.getHourItems(item.beginDateTime, item.endDateTime);
			item.hoursCount = item.hours.length;
		});
		
		return returnValues;
	}
	//TODO : 리턴 데이터 예시 설명
}
