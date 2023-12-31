//index.js

function registerUserBtn() {
  window.location = "./register.html";
}

function loginUserBtn() {
  window.location = "./login.html";
}

//register.js

function registerUser() {
  const userDetails = {
    username: uname.value, //document.getElementById("uname").value;
    accno: acno.value,
    pswd: pwd.value,
  };
  if(uname.value == "" || acno.value == "" || pwd.value == "")
  {
    alert("Please fill the form");
  }
  else{
    if(userDetails.accno in localStorage)
    {
      alert("User already exists");
    }else{
        localStorage.setItem(userDetails.accno, JSON.stringify(userDetails));
        localStorage.setItem("USERNAME", userDetails.username); 
        alert("User details added");
        uname.value = "";
        acno.value = "";
        pwd.value = "";
    }   
  }
}
function signIn() {
  window.location = "./login.html";
}

//login.js

function loginUser() {
    let accnum = acno1.value;
    let paswd = pwd1.value;

    if (accnum === "" || paswd === "") {
        alert("Please fill the form");
        return;
    }

if (accnum in localStorage) {
  let accountDetails = JSON.parse(localStorage.getItem(accnum));

  if (paswd === accountDetails.pswd) {
      alert("Login successful");
      localStorage.setItem("CURRENT-USER", JSON.stringify(accountDetails))
      window.location = "./userpage.html";
  } else {
      alert("Incorrect password");
  }
} else {
  alert("User is not registered....Redirecting..");
  window.location = "./register.html";
}
}
let username = localStorage.getItem("USERNAME");
console.log(username);

headUser.innerHTML = `Welcome ${username}`;


//userpage.js

let total = 0;

function amountDeposit() {
  const depositAmount = {
    amount: parseFloat(amt1.value),
    pass: psd1.value
  }

  if (depositAmount.amount <= 0 || isNaN(depositAmount.amount)) {
    alert("Please enter a valid amount");
    return;
  }
  const currentUser = JSON.parse(localStorage.getItem("CURRENT-USER"));

  if (currentUser === null || currentUser.pswd !== depositAmount.pass) {
    alert("Incorrect password");
    return;
  }

  total += depositAmount.amount;
  alert("Amount deposited");
  displayBalance();
}



function amountWithdraw(){
  const withdrawAmount = {
    amount: parseFloat(amt2.value),
    pass : psd2.value
  }
  if(withdrawAmount.amount <= 0 || isNaN(withdrawAmount.amount)){
    alert("Please enter a valid amount")
    return;
}

const currentUser = JSON.parse(localStorage.getItem("CURRENT-USER"));

  if (currentUser === null || currentUser.pswd !== withdrawAmount.pass) {
    alert("Incorrect password");
    return;
  }
if(withdrawAmount.amount > total){
  alert("Insufficient balance");
}else{
  total -= withdrawAmount.amount
  alert("Amount withdrawn");
  displayBalance();
}

}

function displayBalance(){
  result.innerHTML = `Account balance : ${total}`
}