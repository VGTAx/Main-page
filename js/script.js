
document.addEventListener('DOMContentLoaded', function () {

  let formSignIn = document.forms.formSignIn; 
  let login = formSignIn.elements.login; 
  let password = formSignIn.elements.password;

  let formSignUp =  document.forms.formSignUp;
  let Email = formSignUp.elements.email;
  let FirstName = formSignUp.elements.firstName;
  let LastName = formSignUp.elements.lastName;
  let Password =  formSignUp.elements.password;
  let Mobile = formSignUp.elements.mobile; 

  let loginContainer = document.querySelector('.login-container');
  let modalRegister =  document.querySelector('.modal-register');
  let btnSignUp = document.querySelector('#btnSignUp');
  let btnCloseSignUpMenu = document.querySelector('#closeSignUpMenu');

  btnCloseSignUpMenu.addEventListener('click', function () {
    
    modalRegister.style.visibility = 'hidden';
    modalRegister.style.transform = 'translateY(-100%)';
    modalRegister.style.transition = '0.5s';
    setTimeout(()=> {loginContainer.style.display = 'unset';},400);
    
  })
  btnSignUp.addEventListener('click', function(){    
    loginContainer.style.display = 'none';
    modalRegister.style.visibility = 'visible';
    modalRegister.style.transform = 'translateY(0%)';
    modalRegister.style.transition = '0.5s';
  })
  
  formSignIn.addEventListener('submit', function (event) {
    event.preventDefault(true);
    soapReuqestLogin(login, password);
    event.target.reset();
  })
  formSignUp.addEventListener('submit', function(event) {
    event.preventDefault(true);
    loginContainer = document.querySelector('.login-container');
    loginContainer.style.display = 'none';
    soapReuqestRegister(Email,Password,FirstName,LastName,Mobile);
    event.target.reset;
  })
  let btnCloseModalResponce = document.querySelector('.btn-close-modal-responce');
  btnCloseModalResponce.addEventListener('click', function() {
    
    let modalResponce = document.querySelector('.modal-responce')
    modalResponce.style.visibility = 'hidden'; 
    modalResponce.style.transform = 'translateY(-100%)';
    modalResponce.style.transition = '0s'; 
     })

    
})

function soapReuqestLogin(login, password) {
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
      showResult(xmlhttp);
    }
  }
  // Send the POST request
  xmlhttp.send(soapRequest);
}

function soapReuqestRegister(Email, Password, FirstName, LastName, Mobile) {
  var soapRequest = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ICUTech.Intf-IICUTech">' +
    '<soapenv:Header/>' +
      '<soapenv:Body>' +
        '<urn:RegisterNewCustomer soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
         '<Email xsi:type="xsd:string">'+ Email.value +'</Email>'+
         '<Password xsi:type="xsd:string">'+ Password.value +'</Password>'+
         '<FirstName xsi:type="xsd:string">'+ FirstName.value +'</FirstName>'+
         '<LastName xsi:type="xsd:string">'+ LastName.value +'</LastName>'+
         '<Mobile xsi:type="xsd:string">'+ Mobile.value +'</Mobile>'+
         '<CountryID xsi:type="xsd:int">0</CountryID>' +
         '<aID xsi:type="xsd:int">0</aID>' +
         '<SignupIP xsi:type="xsd:string">0</SignupIP>' +
     '</urn:RegisterNewCustomer>' +
  '</soapenv:Body>'+
'</soapenv:Envelope>';
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'http://isapi.icu-tech.com/icutech-test.dll/soap/IICUTech', true);
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      showResult(xmlhttp);
    }
  }
  xmlhttp.send(soapRequest);
}

function showResult(xmlhttp) {
  var xmlStr, i, xmlDoc, jsonStr;  
  xmlDoc = xmlhttp.responseXML; //get responceXML;
  jsonStr = ""; //str for 
  xmlStr = xmlDoc.getElementsByTagName("return"); //get result request in XML format
  for (i = 0; i < xmlStr.length; i++) {
    jsonStr += xmlStr[i].childNodes[0].nodeValue; //get result in JSON format
  }

  var object = JSON.parse(jsonStr);//parse JSON to object
  
  if (object['ResultCode'] == -1 ||  object['ResultCode'] == -3) {      
    let modalResponceText = document.querySelector('.modal-responce-text');    
    modalResponceText.innerText = object['ResultMessage'];
    modalResponceText.style.color = 'red';    
    
    let modalResponce = document.querySelector('.modal-responce')
    modalResponce.style.visibility = 'visible'; 
    modalResponce.style.transition = '.4s';
    modalResponce.style.transform = 'translateY(0%)';   
    
    
  } else {
    let modalResponceText = document.querySelector('.modal-responce-text');    
    modalResponceText.innerText = 'Successful';
    modalResponceText.style.color = 'green';    
    
    let modalResponce = document.querySelector('.modal-responce')
    modalResponce.style.visibility = 'visible'; 
    modalResponce.style.transition = '.4s';
    modalResponce.style.transform = 'translateY(0%)';
  }
  
}







        