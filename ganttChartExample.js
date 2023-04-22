import GanttChart from "./js/ganttChart.js";

export function drawChart(){
    const beginDate = "2023-04-09 08:00:00";
    const endDate   = "2023-04-12 05:00:00";

    const aixsItems = [
        { id : 1, airWayName : "ADL-KPO", beginAltitude : 60000, endAltitude: null  },
        { id : 1, airWayName : "ADL-KPO", beginAltitude : 50000, endAltitude: 60000 },
        { id : 1, airWayName : "ADL-KPO", beginAltitude : 40000, endAltitude: 50000 },
        { id : 1, airWayName : "ADL-KPO", beginAltitude : 30000, endAltitude: 40000 },
        { id : 1, airWayName : "ADL-KPO", beginAltitude : 20000, endAltitude: 30000 },
        { id : 1, airWayName : "ADL-KPO", beginAltitude : 10000, endAltitude: 20000 },
        { id : 1, airWayName : "ADL-KPO", beginAltitude : 0    , endAltitude: 10000 },
    ];
    
    const dataItems = [
         { refid: 1, beginAltitude:  8000, endAltitude:12000, beginDateTime: "2023-04-09 09:00:00", endDateTime: "2023-04-09 09:15:00" },
         { refid: 1, beginAltitude: 20000, endAltitude:25000, beginDateTime: "2023-04-09 10:00:00", endDateTime: "2023-04-09 11:00:00" },
         { refid: 1, beginAltitude: 30000, endAltitude:37000, beginDateTime: "2023-04-09 12:00:00", endDateTime: "2023-04-09 15:30:00" },
    ];

    let ganttChartTag = document.getElementById("ganttChart");

	let ganttChart = new GanttChart(ganttChartTag);

    ganttChart.draw(beginDate, endDate, aixsItems, dataItems);
}
