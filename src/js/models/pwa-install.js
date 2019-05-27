import {elements} from "../views/base";

var deferredPrompt;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
      console.log('Service worker registered!');
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});


  elements.pwaBtn.addEventListener("click",() => {
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