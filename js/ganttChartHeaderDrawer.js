function GanttChartHeaderDrawer(headerTag) {
    this._headerTag = headerTag;

	function createDurationTag(duarationTag, dayItems){
		let tempTag = tagBuilder.create(duarationTag, "div", "headItemDuration");

        tempTag.style.width = tagLocationCalculator.getDurationHeaderWidth(dayItems);
	};

	function createDaysTag(daysTag, dayItems){
		dayItems.map((item)=>{
            let tempTag = tagBuilder.create(daysTag, "div", "headItemDay");

            tempTag.style.width = tagLocationCalculator.getDayHeaderWidth(item);
			tempTag.innerText = dateUtil.getYMDString(item.date);
		});
	};

	function createHoursTag(hoursTag, dayItems){
        dayItems.map((item)=>{
            item.hours.map((hourItem)=>{
                let tempTag = tagBuilder.create(hoursTag, "div", "headItemDay");

                tempTag.style.width = tagLocationCalculator.getHourHeaderWidth(hourItem);
                tempTag.innerText = hourItem.beginHour + "~" + hourItem.endHour;
            });
        })
	};
	function createMinutesTag(minutesTag, dayItems){
        dayItems.map((item)=>{
            item.hours.map((hourItem)=>{
                hourItem.minutes.map((minuteItem)=>{
                    let tempTag = tagBuilder.create(minutesTag, "div", "headItemDay");

                    tempTag.style.width = tagLocationCalculator.getMinuteHeaderWidth();
                    tempTag.innerText = minuteItem.beginMinute;
                });
            });
        });
	};

    this.draw = function(beginDateTime, endDateTime){
        tagBuilder.removeChildAll(this._headerTag);

        let durationNode = document.createElement("div");
        durationNode.classList.add("headerRow");
        this._headerTag.appendChild(durationNode);

        let daysNode = document.createElement("div");
        daysNode.classList.add("headerRow");
        this._headerTag.appendChild(daysNode);

        let hoursNode = document.createElement("div");
        hoursNode.classList.add("headerRow");
        this._headerTag.appendChild(hoursNode);

        let minutesNode = document.createElement("div");
        minutesNode.classList.add("headerRow");
        this._headerTag.appendChild(minutesNode);

        let dayItems = modelBuilder.getDayItems(beginDateTime, endDateTime);

        this._headerTag.style.width = tagLocationCalculator.getDurationHeaderWidth(dayItems);
        durationNode.style.width   = tagLocationCalculator.getDurationHeaderWidth(dayItems);

        let caption = beginDateTime + " ~ " + endDateTime;

        createDurationTag.call(this, durationNode, dayItems, caption);
        createDaysTag.call(this, daysNode, dayItems);
        createHoursTag.call(this, hoursNode, dayItems);
        createMinutesTag.call(this, minutesNode, dayItems);
    };

}
