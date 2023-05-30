/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************************************************************!*\
  !*** ./src/Presenter/AuthenticationPresenter/UserAuthenticationPresenter.js ***!
  \******************************************************************************/
//redirect from Login to Signup page
const signupLink = document.getElementById("signupLink");
signupLink.addEventListener("click", handleSignup);
function handleSignup() {
  window.location.href = 'registration.html';
}

//Prevent reload page on submit
const form = document.querySelector("form");
form.addEventListener('submit', function(e) {
    e.preventDefault();
  });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb25QcmVzZW50ZXIuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9zcmMvUHJlc2VudGVyL0F1dGhlbnRpY2F0aW9uUHJlc2VudGVyL1VzZXJBdXRoZW50aWNhdGlvblByZXNlbnRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL3JlZGlyZWN0IGZyb20gTG9naW4gdG8gU2lnbnVwIHBhZ2VcbmNvbnN0IHNpZ251cExpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ251cExpbmtcIik7XG5zaWdudXBMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVTaWdudXApO1xuZnVuY3Rpb24gaGFuZGxlU2lnbnVwKCkge1xuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdyZWdpc3RyYXRpb24uaHRtbCc7XG59XG5cbi8vUHJldmVudCByZWxvYWQgcGFnZSBvbiBzdWJtaXRcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9