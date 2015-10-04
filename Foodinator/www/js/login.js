function onGoogleSignIn(googleUser) {
	// Useful data for your client-side scripts:
	var profile = googleUser.getBasicProfile();
	// console.log("ID: " + profile.getId()); // Don't send this directly to your server!
	// console.log("Name: " + profile.getName());
	// console.log("Image URL: " + profile.getImageUrl());
	// console.log("Email: " + profile.getEmail());

	// The ID token you need to pass to your backend:
	var id_token = googleUser.getAuthResponse().id_token;
	//console.log("ID Token: " + id_token);
	document.getElementById("CLIENTID").innerHTML=profile.getId();
	document.getElementById("login-slide").style.display="none";
	document.getElementById("map-slide").style.display="initial";
	console.log("login successful");

};