import { tagBuilder } from "./utils/tagBuilder.js";

export default function GanttChartAxisDrawer(leftDataPanel){
    this._leftDataPanel = leftDataPanel;

    function createAxisTag(axisItems){
        axisItems.map((item)=>{
            let tempTag = tagBuilder.create(this._leftDataPanel, "div", "row name");
            tempTag.innerText = item.airWayName + " " + 
                                item.beginAltitude + "~" +
                                (item.endAltitude == null? "" : item.endAltitude);
        });
    }

    this.draw= function(axisItems){
        createAxisTag.call(this, axisItems);
    }
}
