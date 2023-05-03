import {soapReuqestSignIn,soapReuqestSignUp,closeModalSignUpMenu}
from './functions.js'


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



