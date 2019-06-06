let appShell,dynamic;
appShell = "appShell-v" + "1.3";
dynamic = "dynamic-v" + "1.3"



self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(caches.open(appShell)
  .then( e => {
    e.addAll([
      "/",
      "/index.html",
      "/offline.html",
      "./js/bundle.js",
      "./css/style.css"
    ])
  }))
});



self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
    .then(e => {
      return Promise.all(e.map(e => {
        if(e !== appShell && e !== dynamic){
          console.log("this old cache has been deleted:", e);
          return caches.delete(e);
        }
      }))
    })
  )


  return self.clients.claim();
});



self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then( e => {
      if (e) {
        console.log("inha ro peida kardim ke offline estefade besehe:"+e);
        return e;
      }else{
        return fetch(event.request)
          .then(response => {
            return caches.open(dynamic)
              .then(e => {
                e.put(event.request.url,response.clone());
                return response;
            });
          })
          .catch(err => {
            return caches.open(appShell)
            .then(e => {
              return e.match("/offline.html")
            })
          })
      }
    })
  );
});