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

	$("#btn_save").click(function () {

		alert($("#exampleInputEmail1").val() + "    " + $("#floatingTextarea2").val());
	})
})

async function fetchBeets() {
	let oSetting = {
		url: "http://127.0.0.1:3000/beets/all",
		type: "GET",
		dataType: "json",
		headers: { "Access-Control-Allow-Origin": "*" },
		crossDomain: false
	}
	const result = await executeAjax(oSetting);
	debugger;
}


let executeAjax = async (oSetting) => {
	let result;
	try {
		const respons = await $.ajax(oSetting);
		result = {
			error: false,
			response: result
		};
	} catch (error) {
		result = {
			error: true,
			response: error
		};
	}
	return result;
}