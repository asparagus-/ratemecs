<?php
	session_start();

	ini_set('display_errors',1);
	ini_set('display_startup_errors',1);
	error_reporting(-1);

	// if(isset($_SESSION['login_user'])){
	// 	header("location: profile.php");
	// }

	if(isset($_SESSION["tries"]) && $_SESSION["tries"] > 5)
		die("lol are you trying to hax me?");

	if(isset($_GET['username']) && isset($_GET['password']))
	{
		$mysqli = new mysqli("localhost", "root", "ielowutil", "ratemycs");
		if (mysqli_connect_errno()) {
		    printf("Sorry no cake today: %s\n", mysqli_connect_error());
		    exit();
		}
		$stmt = $mysqli->prepare("SELECT EmpName, EmpPassword FROM Employees WHERE EmpName=? AND EmpPassword=?");
		$stmt->bind_param("ss", $_GET['username'], $_GET['password']);
		$stmt->execute();
		$stmt->bind_result($EmpName, $EmpPassword);
		$stmt->fetch();

		if(isset($EmpName) && 
			isset($EmpPassword) &&
		 	$EmpName == $_GET['username'] && 
		 	$EmpPassword == $_GET['password']) 
		{
			$_SESSION["username"] = $EmpName;
			$_SESSION["tries"] = 1;
		}
		else {
			$_SESSION["tries"] = 1 + $_SESSION["tries"];
			echo '<p style="color:red;">Couldn\'t find that login (hint: vlcs)</p>';
		}
	}
?>

<html>
	<head>
		<title> Whats up </title>
		<link rel="stylesheet" type="text/css" href="style.css">
		<script type="text/javascript" src="home.js" > </script> 
	</head>

	<body>
		<div class="main">
			<h1 align="center" font="white">RateMyCS</h1>
			<form id="loginbox" action="./" method="get">
				<div class="username">
					Username:
					<input id="username" name="username">
				</div>
				<div class="password">
					Password:&nbsp;
					<input id="password" type="password" name="password">
				</div>
				<input id="login" type="submit" value="Login!">
			</form>
		</div>
	</body>
</html>