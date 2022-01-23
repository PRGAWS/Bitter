$(document).ready(function () {
	$(".click-aboutus").click(function () {
		$('#aboutus-content').show().removeClass('d-none');
		$('#wall-content').hide();
		$('#home-content').hide();
		$('#contact-content').hide();

	});
	$(".click-contact").click(function () {
		$('#contact-content').show().removeClass("d-none");
		$('#wall-content').hide();
		$('#home-content').hide();
		$("#aboutus-content").hide();

	});
	$(".click-wall").click(function () {
		$(".dynamicBeets").remove();
		$('#wall-content').show().removeClass('d-none');
		$('#aboutus-content').hide();
		$('#home-content').hide();
		$('#contact-content').hide();
		fetchBeets();
	});
	$(".click-home").click(function () {
		$('#home-content').show();
		$('#wall-content').hide();
		$('#aboutus-content').hide();
		$('#contact-content').hide();
	});
	$("#post").click(function () {
		postBeet();
	})
})

async function postBeet() {
	let oData = {
		author: $("#beetAuthor").val(),
		content: $("#beetContent").val()
	};
	let oSetting = {
		url: "http://127.0.0.1:3000/beets/",
		type: "POST",
		dataType: "json",
		data: JSON.stringify(oData),
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers": "*"
		},
		crossDomain: true
	}
	const beets = await executeAjax(oSetting);
	// close popup
};

async function fetchBeets() {
	let oSetting = {
		url: "http://127.0.0.1:3000/beets/all",
		type: "GET",
		dataType: "json",
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers": "*"
		},
		crossDomain: true
	}
	const oBeets = await executeAjax(oSetting);
	let beets = oBeets.response;
	beets = beets.map(o => {
		if (o.createdOn && typeof o.createdOn == "string") {
			o.createdOn = new Date(o.createdOn);
		} else {
			o.createdOn = new Date("Sun Jan 23 2000 22:32:49 GMT+0000 (GMT)");
		}
		return o;
	});
	beets = beets.sort((a, b) => a.createdOn - b.createdOn);
	beets.forEach(o => {
		$("#content").after(`<div class="timeline-item dynamicBeets">
		<span class="icon icon-info icon-lg"><i class="fab fa-react"></i></span>
		<h5 class="my-3">${o.author}</h5>
		<p>${o.content}
		</p>
	</div>`);
	});
}

let executeAjax = async (oSetting) => {
	// SHOW busyindicator
	let result;
	try {
		const response = await $.ajax(oSetting);
		result = {
			error: false,
			response: response
		};
		// Hide busy indicator
	} catch (error) {
		// hide busyindicator and show alert with error message
		result = {
			error: true,
			response: error
		};
	}
	return result;
}