if (window.matchMedia('(display-mode: standalone)').matches) {
  
  var alerted = localStorage.getItem('alerted') || '';
  if (alerted != 'yes') {
    alert("we are on mobile app.");
    localStorage.setItem('alerted','yes');
  }
  
} 
