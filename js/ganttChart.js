import GanttChartAxisDrawer from "./ganttChartAixsDrawer.js";
import GanttChartDataDrawer from "./ganttChartDataDrawer.js";
import GanttChartHeaderDrawer from "./ganttChartHeaderDrawer.js";
import { tagBuilder } from "./utils/tagBuilder.js";
import { tagNames } from "./global/tagNames.js";
import { classNames } from "./global/classNames.js";

export default function GanttChart(_ganttChartDivTag){
    this._ganttChartDivTag = _ganttChartDivTag;

    function createNode(item){
        if (item.node == undefined){
            return tagBuilder.create(item.parentNode, item.tagName, item.className);
        }
        return item.node;
    }

    this.drawHeader = function(beginDateTime, endDateTime){
        this._beginDateTime = beginDateTime;
        this._endDateTime = endDateTime;

        this._leftPanel     = createNode.call(this, { node: this._leftDataPanel, parentNode: this._ganttChartDivTag , tagName: tagNames.div, className: classNames.leftPanel      });
        this._spacer        = createNode.call(this, { node: this._spacer       , parentNode: this._leftPanel        , tagName: tagNames.div, className: classNames.spacer         });
        this._leftDataPanel = createNode.call(this, { node: this._leftDataPanel, parentNode: this._leftPanel        , tagName: tagNames.div, className: classNames.leftDataPanel  });
        this._rightPanel    = createNode.call(this, { node: this._rightPanel   , parentNode: this._ganttChartDivTag , tagName: tagNames.div, className: classNames.empty          });
        this._dataPanel     = createNode.call(this, { node: this._dataPanel    , parentNode: this._rightPanel       , tagName: tagNames.div, className: classNames.dataPanel      });
        this._headerGroup   = createNode.call(this, { node: this._headerGroup  , parentNode: this._dataPanel        , tagName: tagNames.div, className: classNames.headerGroupRow });
        this._dataGroup     = createNode.call(this, { node: this._dataGroup    , parentNode: this._dataPanel        , tagName: tagNames.div, className: classNames.dataGroup      });

        this._headerDrawer = new GanttChartHeaderDrawer(this._headerGroup);
        this._headerDrawer.draw(this._beginDateTime, this._endDateTime);
    };

    this.drawAxis = function(axisItems){
        this._aixsItems = axisItems;

        this._aixsDrawer = new GanttChartAxisDrawer(this._leftDataPanel);
        this._aixsDrawer.draw(this._aixsItems);
    };

    this.drawData = function(dataItems){
        this._dataDrawer = new GanttChartDataDrawer(this._dataGroup, this._beginDateTime, this._endDateTime, this._aixsItems);
        this._dataDrawer.draw(dataItems);
    }

    this.draw = function(beginDateTime, endDateTime, axisItems, dataItems){
        tagBuilder.removeChildAll(this._ganttChartDivTag);

        this.drawHeader(beginDateTime, endDateTime);
        this.drawAxis(axisItems);
        this.drawData(dataItems);
    }
}
