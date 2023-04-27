
document.addEventListener('DOMContentLoaded', function () {

  let formSignIn = document.forms.formSignIn; 
  let formSignUp = document.forms.formSignUp;  

  let signInContainer = document.querySelector('.signIn-container');
  let modalSignUp = document.querySelector('.modal-signUp');
  let btnCallSignUpMenu = document.querySelector('#btnSignUp');
  let btnCloseSignUpMenu = document.querySelector('#closeSignUpMenu');
  /*Close Sign-Up  modal-window*/
  btnCloseSignUpMenu.addEventListener('click', function () {
    closeModalSignUpMenu();
  })
  /*Call Sign Up modal-window */
  btnCallSignUpMenu.addEventListener('click', function () {
    signInContainer.classList.toggle('hiddenCont');
    modalSignUp.classList.toggle('visibleContTrans');     
  })
  /*submit Sign In form*/
  formSignIn.addEventListener('submit', function (event) { 
    event.preventDefault(true);
    soapReuqestSignIn(formSignIn);
    event.target.reset();
  })
  /*submit Sign Up form*/
  formSignUp.addEventListener('submit', function (event) {
    event.preventDefault(true);
    signInContainer = document.querySelector('.signIn-container');
    soapReuqestSignUp(formSignUp);
    event.target.reset();
  })
  /*close responce modal-window*/
  let btnCloseModalResponce = document.querySelector('.btn-close-modal-responce');
  btnCloseModalResponce.addEventListener('click', function () {
    let modalResponce = document.querySelector('.modal-responce')    
    modalResponce.classList.toggle('visibleContTrans');
  })
})
/* Soap request Sign In*/
function soapReuqestSignIn(formSignIn) {
  var soapRequest = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/ XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ICUTech.Intf-IICUTech">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
      '<urn:Login soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
      '<UserName xsi:type="xsd:string">' + formSignIn.elements.loginSignIn.value + '</UserName>' +
      '<Password xsi:type="xsd:string">' + formSignIn.elements.passwordSignIn.value + '</Password>' +
      '<IPs xsi:type="xsd:string"></IPs>' +
      '</urn:Login>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'http://isapi.icu-tech.com/icutech-test.dll/soap/IICUTech', true);

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      /*if SignIn successful - move to account.html page */
      resultRequest(xmlhttp) ? moveToAccountPage(xmlhttp) : null;
    }
  }
  // Send the POST request
  xmlhttp.send(soapRequest);
}
/* Soap request Sign Up*/
function soapReuqestSignUp(formSignUp) {
  let soapRequest = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ICUTech.Intf-IICUTech">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
      '<urn:RegisterNewCustomer soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
        '<Email xsi:type="xsd:string">' + formSignUp.elements.emailSignUp.value + '</Email>' +
        '<Password xsi:type="xsd:string">' + formSignUp.elements.passwordSignUp.value + '</Password>' +
        '<FirstName xsi:type="xsd:string">' + formSignUp.elements.firstNameSignUp.value + '</FirstName>' +
        '<LastName xsi:type="xsd:string">' + formSignUp.elements.lastNameSignUp.value + '</LastName>' +
        '<Mobile xsi:type="xsd:string">' + formSignUp.elements.mobileSignUp.value + '</Mobile>' +
        '<CountryID xsi:type="xsd:int">0</CountryID>' +
        '<aID xsi:type="xsd:int">0</aID>' +
        '<SignupIP xsi:type="xsd:string">0</SignupIP>' +
      '</urn:RegisterNewCustomer>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'http://isapi.icu-tech.com/icutech-test.dll/soap/IICUTech', true);
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      /*if SignUp successful - close modal-window */
      resultRequest(xmlhttp) ? closeModalSignUpMenu() : null;
    }
  }
  xmlhttp.send(soapRequest);
}
/*return result Request (true or false)*/
function resultRequest(xmlhttp) {
  let xmlStr, i, xmlDoc, jsonStr;
  xmlDoc = xmlhttp.responseXML; //get responceXML;
  jsonStr = ""; //str for 
  xmlStr = xmlDoc.getElementsByTagName("return"); //get result request in XML format
  for (i = 0; i < xmlStr.length; i++) {
    jsonStr += xmlStr[i].childNodes[0].nodeValue; //get result in JSON format
  }

  let object = JSON.parse(jsonStr);//parse JSON to object
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
  modalResponce.classList.toggle('visibleContTrans');
}

/*Close Sign Up modal-window*/
async function closeModalSignUpMenu() {
  let loginContainer = document.querySelector('.signIn-container');
  let modalRegister = document.querySelector('.modal-signUp');  
  modalRegister.classList.toggle('visibleContTrans');
  loginContainer.classList.toggle('hiddenCont');  
  // loginContainer.style.visibility = 'visible';  
}
/*getInfo about user and send it to accont.html page*/
function moveToAccountPage(xmlhttp) {
  let xmlStr, i, xmlDoc, jsonStr;
  xmlDoc = xmlhttp.responseXML; //get responceXML;
  jsonStr = "";
  xmlStr = xmlDoc.getElementsByTagName("return"); //get result request in XML string
  for (i = 0; i < xmlStr.length; i++) {
    jsonStr += xmlStr[i].childNodes[0].nodeValue; //get result in JSON string
  }

  let object = JSON.parse(jsonStr);//parse JSON to object    

  localStorage.setItem('firstName', object['FirstName']);
  localStorage.setItem('lastName', object['LastName']);
  localStorage.setItem('email', object['Email']);
  localStorage.setItem('mobile', object['Mobile']);

  window.location.href = '/account.html';
}



