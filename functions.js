

  	//sequence of program
	function buttonctrl () {
		var stage = document.getElementById('go').innerHTML;
		if (stage == 'sure'){
			startmeup();
		}
		else if (stage == 'message') {
			var fname = document.getElementById('fname').value;
			var lname = document.getElementById('lname').value;
			getmsgbox (fname, lname);
		}
		else if (stage == 'send') {
			var fname   = document.getElementById('fname').value;
			var lname   = document.getElementById('lname').value;
			var message = document.getElementById('message').value;
			postmessage(fname, lname, message);
		}
		else if (stage == 'okay') {
			document.getElementById('talk').innerHTML = 'Would you like to leave a message?'
			document.getElementById('go').innerHTML = 'sure';
		}
	}


	//tests
	function isAlpha (text) {
		return /^[a-zA-Z()]+$/.test(text);
	}
	function testnames (fname, lname) {
		if(/^[a-zA-Z]+$/.test(fname) && /^[a-zA-Z]+$/.test(lname)) {
			return true;
		}
		return false;

	}	
	function testmessage (message) {
		if(/^[-\w\s.,?!]+$/.test(message) && message != "") {
			return true;
		}
		return false;
	}


	//first
	function startmeup () {
		//getting current elements
		var stuff = document.getElementById('stuff');
		var talk = document.getElementById('talk');
		var go	 = document.getElementById('go');
		talk.innerHTML = 'Enter your Username and a Password:';
		go.innerHTML = 'message';

		//creating name input boxes
		var fname = document.createElement('input');fname.id = 'fname';fname.value = 'Username';
		var lname = document.createElement('input');lname.id = 'lname';lname.value = 'Password';		
		fname.addEventListener("focus", function(){ 
			if( fname.value == 'Username') {
				fname.value = '';
				fname.style.textAlign="center";
			}
		});
		lname.addEventListener("focus", function(){ 
			if( lname.value == 'Password') {
				lname.value = '';
				lname.style.textAlign="center";
			}
		});

		//adding input boxes
		var talk = document.getElementById('talk');
		talk.appendChild(document.createElement('br'));
		talk.appendChild(fname);
		talk.appendChild(lname);

	}

	//second
	function getmsgbox (fname, lname) {
		if(testnames(fname, lname)) {

			//adding message box			
			var message = document.createElement('textarea');message.id = 'message';message.value = 'Type your message here...';message.maxLength=300;
			message.addEventListener("focus", function () { 
				if( message.value == 'Type your message here...')
					message.value = '';
			});

			//placing in dom
			var talk = document.getElementById('talk');
			talk.appendChild(document.createElement('br'));
			talk.appendChild(message);
			document.getElementById('go').innerHTML = 'send';
			return true;
		}
		return false;
	}

	//third
	function postmessage (fname, lname, message) {

		if (testmessage (message) && testnames(fname, lname)) {
			var request = new XMLHttpRequest();
			var post = "fname=" + fname + "&lname=" + lname + "&message=" + message;
			request.open('POST', 'message.php', true);
			request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			request.onreadystatechange = function () {
				if(request.readyState == 4 && request.status == 200) {
					completedmessage(request.responseText);
				}
			}
			request.send(post);
		}
  	}

  	//last -> first
  	function completedmessage (msg) {
		if (msg == 0) 
		{
			var talk = document.getElementById('talk');
			var childs = talk.childNodes;
			for(var i=0;i<childs.length;i++){
				talk.removeChild(childs[i]);
			}
			talk.innerHTML = "Your message has been sent. Thank you for your input!"
			document.getElementById('go').innerHTML = 'okay';
		}
		else{
			var talk = document.getElementById('talk');
			talk.innerHTML = "Your message could not be sent... Sorry!";
			document.getElementById('go').innerHTML = 'okay';
		}
  	}