App.CustomSlaveTrade = {
	export: function() {
		let textArea = document.createElement("textarea");
		textArea.value = JSON.stringify(State.variables.nationalities);
		$("#importExportArea").html(textArea);
	},

	import: function() {
		let textArea = document.createElement("textarea");
		let button = document.createElement("button");
		button.name = "Load";
		button.innerHTML = "Load";
		button.onclick = () => {
			State.variables.nationalities = JSON.parse(textArea.value);
			State.display(State.passage);
		};

		$("#importExportArea").html("").append(textArea).append(button);
	}
};
