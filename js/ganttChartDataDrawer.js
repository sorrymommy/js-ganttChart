import { dateUtil } from "./utils/dateUtil.js";
import { tagBuilder } from "./utils/tagBuilder.js";
import { tagLocationCalculator } from "./utils/tagLocationCalculator.js";

export default function GanttChartDataDrawer(dataPanel, beginDateTime, endDateTime, _axisItems){
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
    }

    function getHeight(dataItem){
        let height = 0;
        for(let i=0; i< this._axisItems.length; i++){
            let axisItem = this._axisItems[i];

            axisItem.endAltitude = (axisItem.endAltitude == null ? 100000000 : axisItem.endAltitude);
            axisItem.endAltitude = axisItem.endAltitude - 1;

            let isInAxisBegnRange = ( axisItem.beginAltitude <= dataItem.beginAltitude &&
                                      axisItem.endAltitude   >= dataItem.beginAltitude );
            let isInAxisEndRange  = ( axisItem.beginAltitude <= dataItem.endAltitude   &&
                                      axisItem.endAltitude   >= dataItem.endAltitude   );
            let isInAxisBetween = ( axisItem.beginAltitude >= dataItem.beginAltitude &&
                                      axisItem.endAltitude   <= dataItem.endAltitude   );

            if ( isInAxisBegnRange || isInAxisBetween || isInAxisEndRange )
                height += 25;
        }
        return height;
    }

    function getWidth(beginDateTime, endDateTime){
        let minuteItems = dateUtil.getMinuteItems(beginDateTime, endDateTime);

        return (tagLocationCalculator.getMinuteHeaderWidth() * minuteItems.length);
        
    }
    
    this.draw = function(dataItems){
        for(let i=0; i<dataItems.length; i++){
            let item = dataItems[i];

            let tempTag = tagBuilder.create(dataPanel, "div", "ganttOption");
            tempTag.innerText = item.beginAltitude + "~" + item.endAltitude;
            tempTag.style.left  = getWidth.call(this, this._beginDateTime , item.beginDateTime);
            tempTag.style.width = getWidth.call(this, item.beginDateTime  , item.endDateTime  );

            tempTag.style.top    = getTop.call(this, item );
            tempTag.style.height = getHeight.call(this, item );
        }
    };
}
