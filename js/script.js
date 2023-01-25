
document.addEventListener('DOMContentLoaded', function () {

  let formSignIn = document.forms.formSignIn;
  let loginSignIn = formSignIn.elements.loginSignIn;
  let passwordSignIn = formSignIn.elements.passwordSignIn;

  let formSignUp = document.forms.formSignUp;
  let emailSignUp = formSignUp.elements.emailSignUp;
  let firstNameSignUp = formSignUp.elements.firstNameSignUp;
  let lastNameSignUp = formSignUp.elements.lastNameSignUp;
  let passwordSignUp = formSignUp.elements.passwordSignUp;
  let mobileSignUp = formSignUp.elements.mobileSignUp;

  let signInContainer = document.querySelector('.signIn-container');
  let modalSignUp = document.querySelector('.modal-signUp');
  let btnSignUp = document.querySelector('#btnSignUp');
  let btnCloseSignUpMenu = document.querySelector('#closeSignUpMenu');
  /*Close Sign-Up  modal-window*/
  btnCloseSignUpMenu.addEventListener('click', function () {
    closeModalSignUpMenu();
  })
  /*Call Sign Up modal-window */
  btnSignUp.addEventListener('click', function () {
    signInContainer.style.visibility = 'hidden';
    modalSignUp.style.visibility = 'visible';
    modalSignUp.style.transform = 'translateY(0%)';
    modalSignUp.style.transition = '0.5s';
    document.body.style.overflow = 'hidden';
    var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
    modalSignUp.style.marginLeft = scrollbar;
  })
  /*submit Sign In form*/
  formSignIn.addEventListener('submit', function (event) {
    event.preventDefault(true);
    soapReuqestSignIn(loginSignIn, passwordSignIn);
    event.target.reset();
  })
  /*submit Sign Up form*/
  formSignUp.addEventListener('submit', function (event) {
    event.preventDefault(true);
    signInContainer = document.querySelector('.signIn-container');
    signInContainer.style.visibility = 'hidden';
    soapReuqestSignUp(emailSignUp, passwordSignUp, firstNameSignUp, lastNameSignUp, mobileSignUp);
    event.target.reset();
  })
  /*close responce modal-window*/
  let btnCloseModalResponce = document.querySelector('.btn-close-modal-responce');
  btnCloseModalResponce.addEventListener('click', function () {
    let modalResponce = document.querySelector('.modal-responce')
    modalResponce.style.visibility = 'hidden';
    modalResponce.style.transition = '.1ms';
  })
})
/* Soap request Sign In*/
function soapReuqestSignIn(login, password) {
  var soapRequest = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/ XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ICUTech.Intf-IICUTech">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<urn:Login soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<UserName xsi:type="xsd:string">' + login.value + '</UserName>' +
    '<Password xsi:type="xsd:string">' + password.value + '</Password>' +
    '<IPs xsi:type="xsd:string"></IPs>' +
    '</urn:Login>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'http://isapi.icu-tech.com/icutech-test.dll/soap/IICUTech', true);

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      /*if Sign In successful - move to account.html page */
      resultRequest(xmlhttp) ? moveToAccountPage(xmlhttp) : null;
    }
  }
  // Send the POST request
  xmlhttp.send(soapRequest);
}
/* Soap request Sign Up*/
function soapReuqestSignUp(Email, Password, FirstName, LastName, Mobile) {
  var soapRequest = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ICUTech.Intf-IICUTech">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<urn:RegisterNewCustomer soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<Email xsi:type="xsd:string">' + Email.value + '</Email>' +
    '<Password xsi:type="xsd:string">' + Password.value + '</Password>' +
    '<FirstName xsi:type="xsd:string">' + FirstName.value + '</FirstName>' +
    '<LastName xsi:type="xsd:string">' + LastName.value + '</LastName>' +
    '<Mobile xsi:type="xsd:string">' + Mobile.value + '</Mobile>' +
    '<CountryID xsi:type="xsd:int">0</CountryID>' +
    '<aID xsi:type="xsd:int">0</aID>' +
    '<SignupIP xsi:type="xsd:string">0</SignupIP>' +
    '</urn:RegisterNewCustomer>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'http://isapi.icu-tech.com/icutech-test.dll/soap/IICUTech', true);
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      /*if Sign up successful - close modal-window */
      resultRequest(xmlhttp) ? closeModalSignUpMenu() : null;
    }
  }
  xmlhttp.send(soapRequest);
}
/*return result Request (true or false)*/
function resultRequest(xmlhttp) {
  var xmlStr, i, xmlDoc, jsonStr;
  xmlDoc = xmlhttp.responseXML; //get responceXML;
  jsonStr = ""; //str for 
  xmlStr = xmlDoc.getElementsByTagName("return"); //get result request in XML format
  for (i = 0; i < xmlStr.length; i++) {
    jsonStr += xmlStr[i].childNodes[0].nodeValue; //get result in JSON format
  }

  var object = JSON.parse(jsonStr);//parse JSON to object
  /*show result*/
  if (object['ResultCode'] == -1 || object['ResultCode'] == -3) {
    showRequestResponce('red', object['ResultMessage']);
    return false;
  } else {
    showRequestResponce('green', 'Successful');
    return true;
  }
}
/*show result Responce*/
function showRequestResponce(colorMessage, message) {
  /*set message for responce modal window*/
  let modalResponceText = document.querySelector('.modal-responce-text');
  modalResponceText.innerText = message;
  modalResponceText.style.color = colorMessage;
  /*show modal responce modal-window*/
  let modalResponce = document.querySelector('.modal-responce')
  modalResponce.style.visibility = 'visible';
  modalResponce.style.transition = '.4s';
  modalResponce.style.transform = 'translateY(0%)';
}

/*Close Sign Up modal-window*/
function closeModalSignUpMenu() {
  let loginContainer = document.querySelector('.signIn-container');
  let modalRegister = document.querySelector('.modal-signUp');
  modalRegister.style.visibility = 'hidden';
  modalRegister.style.transform = 'translateY(-100%)';
  modalRegister.style.transition = '0.5s';
  setTimeout(() => { loginContainer.style.visibility = 'visible'; }, 400);
}
/*getInfo about user and send it to accont.html page*/
function moveToAccountPage(xmlhttp) {
  var xmlStr, i, xmlDoc, jsonStr;
  xmlDoc = xmlhttp.responseXML; //get responceXML;
  jsonStr = "";
  xmlStr = xmlDoc.getElementsByTagName("return"); //get result request in XML string
  for (i = 0; i < xmlStr.length; i++) {
    jsonStr += xmlStr[i].childNodes[0].nodeValue; //get result in JSON string
  }

  var object = JSON.parse(jsonStr);//parse JSON to object    

  localStorage.setItem('firstName', object['FirstName']);
  localStorage.setItem('lastName', object['LastName']);
  localStorage.setItem('email', object['Email']);
  localStorage.setItem('mobile', object['Mobile']);

  window.location.href = '/account.html';
}



