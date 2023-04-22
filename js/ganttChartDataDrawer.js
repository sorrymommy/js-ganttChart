function GanttChartDataDrawer(dataPanel, beginDateTime, endDateTime, _axisItems){
    this._dataPanel = dataPanel;
    this._beginDateTime = beginDateTime;
    this._endDateTime = endDateTime;
    this._axisItems = _axisItems;
    this._that = this;

    function getTop(dataItem){
        for(let i=0; i< this._axisItems.length; i++){
            let axisItem = this._axisItems[i];

            if ( axisItem.beginAltitude <= dataItem.endAltitude &&
                axisItem.endAltitude   >= dataItem.endAltitude )
                return 100 + (25 * i);
        }
        return 0;
    };

    function getHeight(dataItem){
        let height = 0;
        for(let i=0; i< this._axisItems.length; i++){
            let axisItem = this._axisItems[i];

            axisItem.endAltitude = (axisItem.endAltitude == null ? 100000000 : axisItem.endAltitude);
            axisItem.endAltitude = axisItem.endAltitude - 1;

            let isAixsItemBegin   = ( axisItem.beginAltitude <= dataItem.beginAltitude &&
                                      axisItem.endAltitude   >= dataItem.beginAltitude );
            let isAixsItemEnd     = ( axisItem.beginAltitude <= dataItem.endAltitude   &&
                                      axisItem.endAltitude   >= dataItem.endAltitude   );
            let isAixsItemBetween = ( axisItem.beginAltitude >= dataItem.beginAltitude &&
                                      axisItem.endAltitude   <= dataItem.endAltitude   );

            if ( isAixsItemBegin || isAixsItemBetween || isAixsItemEnd )
                height += 25;
        }
        return height;
    };

    function getWidthAAA(beginDateTime, endDateTime){
        let minuteItems = dateUtil.getMinuteItems(beginDateTime, endDateTime);
        let hoursItems  = dateUtil.getHourItems(beginDateTime, endDateTime);
        let dayItems    = dateUtil.getDayItems(beginDateTime, endDateTime);

        return (tagLocationCalculator.getMinuteHeaderWidth() * minuteItems.length) +
               (hoursItems.length > 0 ? 0 : hoursItems.length - 1 ) + 
               (dayItems.length   > 0 ? 0 : dayItems.length   - 1 );
        
    };
    
    this.draw=function(dataItems){
        for(let i=0; i<dataItems.length; i++){
            let item = dataItems[i];

            let tempTag = tagBuilder.create(dataPanel, "div", "ganttOption");
            tempTag.innerText = item.beginAltitude + "~" + item.endAltitude;
            tempTag.style.left  = getWidthAAA.call(this, this._beginDateTime, item.beginDateTime);
            tempTag.style.width = getWidthAAA.call(this, item.beginDateTime, item.endDateTime);

            tempTag.style.top    = getTop.call(this, item );
            tempTag.style.height = getHeight.call(this, item );
        }
    };
}
