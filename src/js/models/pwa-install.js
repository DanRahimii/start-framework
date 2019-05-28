import {elements} from "../views/base";
var deferredPrompt;
//check if there is no service worker install one
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
      console.log('Service worker registered!');
    });
}
// prevent browser from triggering automatic save app and save that event in a var
window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  //it shows our install button for devices except Apple's
  if (deferredPrompt) {
    elements.PWABtn.style.display = "inline-block";
  }
  return false;
});
// triggers the save app banner and console log the result
  elements.PWABtn.addEventListener("click",() => {
    if (deferredPrompt) {
        
        deferredPrompt.prompt();
    
        deferredPrompt.userChoice.then(function(choiceResult) {
          console.log(choiceResult.outcome);
    
          if (choiceResult.outcome === 'dismissed') {
            console.log('User cancelled installation');
          } else {
            console.log('User added to home screen');
          }
        });
    
        deferredPrompt = null;
    }
  })

//detects whether the phone is apple and show the save app message
if(!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform) && deferredPrompt){
  elements.iosAlert.style.display = "block";
  elements.mainContent.style.display = "none";
  elements.footer.style.display = "none";
};
elements.PWACloseAlertBtn.addEventListener("click",() => {
  elements.iosAlert.style.display = "none";
  elements.mainContent.style.display = "initial";
  elements.footer.style.display = "initial";
  elements.mainContent.style.transition = "1s";
}) 