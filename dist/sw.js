let static,dynamic;
static = "static-v" + "1.1";
dynamic = "dynamic-v" + "1.1";

//FUNCTIONS
//Cache Triming Function
function trimCache(cache_name,max_items){
  caches.open(cache_name)
  .then(res => {
    res.keys()
    .then(e => {
      if(e.length > max_items){
        res.delete(e[0])
        .then(trimCache(cache_name,max_items));
      }
    })
  })
}




self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(caches.open(static)
  .then( e => {
    e.addAll([
      "/",
      "/index.html",
      "/offline.html",
      "./js/bundle.js",
      "./css/style.css",
      "./img/chi-bepazam-logo-apple.png",
      "./img/dummy.png",
      "./img/chi-bepazam-logo.png",
      "./img/daniellera-logo.png"
    ])
  }))
});



self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys() //this shows all the caches base names: for instance: static and dynamic
    .then(e => {
      return Promise.all(e.map(e => {
        if(e !== static && e !== dynamic){
          console.log("this old cache has been deleted:", e);
          return caches.delete(e);
        }
      }))
    })
  )


  return self.clients.claim();
});




self.addEventListener('fetch', function(event) {
 //inja alan in kar nemikone chon ma toye in app niazi behesh nadarim
  let url = "https://httpbin.org/ip";

  if(event.request.url.indexOf(url) > -1){
    event.respondWith(
      caches.open(dynamic)
      .then(res => {
        return fetch(event.request)
        .then(e => {
        //  trimCache(dynamic, 200); //WE DONT NEED TO DELETE ANYTHING FOR THIS APP
          res.put(event.request.url, e.clone());
          return e;
        })
      })
    );
  }else{
    event.respondWith(
      caches.match(event.request).then( e => {
        if (e) {
          console.log("inha ro peida kardim ke offline estefade besehe:" + e);
          return e;
        }else{
          return fetch(event.request)
            .then(response => {
              return caches.open(dynamic)
                .then(e => {
                  //  trimCache(dynamic, 200); //WE DONT NEED TO DELETE ANYTHING FOR THIS APP
                  e.put(event.request.url,response.clone());
                  return response;
              });
            })
            .catch(err => {
              return caches.open(static)
              .then( e =>{
                if(event.request.headers.get("accept").includes('text/html')){
                  return e.match("/offline.html");
                }
              }).catch( e => {
                console.log("ye chizi moshkel dare inja", e);
              })
            });
        }
      })
    );
  }
});