const widthBorder = 1;
const widthMinuteColumn = 20;

export const tagLocationCalculator = {
    getDurationHeaderWidth: function(dayItems){
        let width = 0;
        for(let i = 0; i < dayItems.length; i++){
            width += this.getDayHeaderWidth(dayItems[i]);
        }
        return width + (dayItems.length - widthBorder);
    },
    getDayHeaderWidth: function(dayItem){
        let width = 0;
        for(let i = 0; i < dayItem.hours.length; i++){
            width += this.getHourHeaderWidth(dayItem.hours[i]);
        }
        return width + (dayItem.hours.length - widthBorder);
    },
    getHourHeaderWidth: function(hourItem){
        return this.getMinuteHeaderWidth() * hourItem.minuteCount + (hourItem.minuteCount -1);
    },
    getMinuteHeaderWidth: function(){
        return widthMinuteColumn;
    }
}
