
var config = {
	apiKey: "AIzaSyC1gopP_4Oi5apjJvR84Jq-ie-xlk5vr1A",
	authDomain: "tboi-87214.firebaseapp.com",
	databaseURL: "https://tboi-87214-default-rtdb.firebaseio.com",
	projectId: "tboi-87214",
	storageBucket: "tboi-87214.appspot.com",
	messagingSenderId: "636052509",
	appId: "1:636052509:web:5a6f451c1943f0467bd2f4"
};

firebase.initializeApp(config);

const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');


readUserData();


function readUserData() {

	const userListUI = document.getElementById("user-list");

	usersRef.on("value", snap => {

		userListUI.innerHTML = ""

		snap.forEach(childSnap => {

			let key = childSnap.key,
				value = childSnap.val()

			let $li = document.createElement("li");

			let editIconUI = document.createElement("span");
			editIconUI.class = "edit-user";
			editIconUI.setAttribute("userid", key);
			editIconUI.addEventListener("click", editButtonClicked)

			let deleteIconUI = document.createElement("span");
			deleteIconUI.class = "delete-user";
			deleteIconUI.setAttribute("userid", key);
			deleteIconUI.addEventListener("click", deleteButtonClicked)

			$li.innerHTML = value.name;
			$li.append(editIconUI);
			$li.append(deleteIconUI);

			$li.setAttribute("user-key", key);
			$li.addEventListener("click", userClicked)
			userListUI.append($li);

		});


	})

}



function userClicked(e) {


	var userID = e.target.getAttribute("user-key");

	const userRef = dbRef.child('users/' + userID);
	const userDetailUI = document.getElementById("user-detail");

	userRef.on("value", snap => {

		userDetailUI.innerHTML = ""

		snap.forEach(childSnap => {
			var $p = document.createElement("p");
			$p.innerHTML = childSnap.key  + " - " +  childSnap.val();
			userDetailUI.append($p);
		})

	});


}

const addUserBtnUI = document.getElementById("add-user-btn");
addUserBtnUI.addEventListener("click", addUserBtnClicked)



function addUserBtnClicked() {
	const usersRef = dbRef.child('users');

	const addUserInputsUI = document.getElementsByClassName("user-input");

	let newUser = {};

	for (let i = 0, len = addUserInputsUI.length; i < len; i++) {

		let key = addUserInputsUI[i].getAttribute('data-key');
		let value = addUserInputsUI[i].value;
		newUser[key] = value;
	}
	if(validate_field(newUser.username)==false|validate_seed(newUser.seed)==false){
		alert("not valid")
	}else{
		alert("seed added!")
		usersRef.push(newUser)
	}

	console.log(myPro)



}

function validate_seed(field) {
	if ( /^[A-Za-z0-9]*$/ .test(field) == true) {
		if (field.toString().toUpperCase().includes("5") | field.toString().toUpperCase().includes("I") | field.toString().toUpperCase().includes("O") | field.toString().toUpperCase().includes("U")) {
			return false
		}
	}
	else{
		return false;
	}


	if (field.length != 8) {
		return false
	} else {
		return true
	}
}

function validate_field(field) {
	if (field.length<=0) {
		return false
	}

	if (field.length <= 0) {
		return false
	} else {
		return true
	}
}


function deleteButtonClicked(e) {

	e.stopPropagation();

	var userID = e.target.getAttribute("userid");

	const userRef = dbRef.child('users/' + userID);

	userRef.remove();

}


function editButtonClicked(e) {

	document.getElementById('edit-user-module').style.display = "block";

	document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

	const userRef = dbRef.child('users/' + e.target.getAttribute("userid"));

	const editUserInputsUI = document.querySelectorAll(".edit-user-input");


	userRef.on("value", snap => {

		for(var i = 0, len = editUserInputsUI.length; i < len; i++) {

			var key = editUserInputsUI[i].getAttribute("data-key");
			editUserInputsUI[i].value = snap.val()[key];
		}

	});




	const saveBtn = document.querySelector("#edit-user-btn");
	saveBtn.addEventListener("click", saveUserBtnClicked)
}


function saveUserBtnClicked(e) {

	const userID = document.querySelector(".edit-userid").value;
	const userRef = dbRef.child('users/' + userID);

	var editedUserObject = {}

	const editUserInputsUI = document.querySelectorAll(".edit-user-input");

	editUserInputsUI.forEach(function(textField) {
		let key = textField.getAttribute("data-key");
		let value = textField.value;
		editedUserObject[textField.getAttribute("data-key")] = textField.value
	});



	userRef.update(editedUserObject);

	document.getElementById('edit-user-module').style.display = "none";


}








