document.addEventListener('DOMContentLoaded', function () {
   /*get data from localStorage*/
   const firstName = localStorage.getItem('firstName');
   document.querySelector('.firstName').textContent = firstName;

   const lastName23 = localStorage.getItem('lastName');
   document.querySelector('.lastName').textContent = lastName23;

   const email = localStorage.getItem('email');
   document.querySelector('.email').textContent = email;

   const mobile = localStorage.getItem('mobile');
   document.querySelector('.mobile').textContent = mobile;

   localStorage.clear();
   /*move to main-page*/
   const btnLeave = document.querySelector('.exitBtn');
   btnLeave.addEventListener('click', function () {
      window.location.href = '/index.html';
   })
})