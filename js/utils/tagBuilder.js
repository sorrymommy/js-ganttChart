export const tagBuilder = {
	create : function(parentTag, tagName, classNames){
		let tag = document.createElement(tagName);

		if (classNames != undefined && classNames != ""){
			let classNameArray = classNames.split(" ");

			classNameArray.map((item)=>{
				tag.classList.add(item);
			});
		}

		parentTag.appendChild(tag);

		return tag;
	},
	removeChildAll: function(divTag){
		while (divTag.firstChild) {
			divTag.removeChild(divTag.firstChild);
		}
	}
}
