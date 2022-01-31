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
		//url: "https://ar9kc22cve.execute-api.eu-central-1.amazonaws.com/Prod/beets",
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
	$('.modal').modal('hide');
	const beets = await executeAjax(oSetting);
	if (!beets.error) {
		navToWall();
	}
};

async function fetchBeets() {
	let oSetting = {
		url: "http://127.0.0.1:3000/beets/all",
		//url: "https://ar9kc22cve.execute-api.eu-central-1.amazonaws.com/Prod/beets/all",
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
		$("#content").after(`
		<div class="timeline-item dynamicBeets">
			<hr>
			<h4>
				<img src="img/avatar.png" alt="Avatar" class="avatar">
				${o.author}
			</h4>
			<h5>${o.content}</h5>
			<p>Posted on: ${dayjs(o.createdOn).format("HH:MM - DD/MM/YYYY")}</p>
			<hr>
		</div>`);
	});
}

let executeAjax = async (oSetting) => {
	$("#loader").attr("hidden", false);
	let result;
	try {
		const response = await $.ajax(oSetting);
		result = {
			error: false,
			response: response
		};
	} catch (error) {
		result = {
			error: true,
			response: error
		};
	}
	$("#loader").attr("hidden", true);
	return result;
}

let navToWall = function () {
	$(".dynamicBeets").remove();
	$('#wall-content').show().removeClass('d-none');
	$('#aboutus-content').hide();
	$('#home-content').hide();
	$('#contact-content').hide();
	fetchBeets();
}