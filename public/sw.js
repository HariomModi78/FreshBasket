const CACHE_NAME = "dairy-cache-v1";
const urlsToCache = [
  "/",
  "/images/icon.png",  
  "/stylesheets/adminAddProduct.css",  
  "/stylesheets/adminProduct.css",  
  "/stylesheets/adminUser.css",  
  "/stylesheets/adminUserView.css",  
  "/stylesheets/cart.css",  
  "/stylesheets/categary.css",  
  "/stylesheets/checkProfit.css",  
  "/stylesheets/feed.css",  
  "/stylesheets/home.css",  
  "/stylesheets/login.css",  
  "/stylesheets/more.css",  
  "/stylesheets/nearOrderDetail.css",  
  "/stylesheets/order.css",  
  "/stylesheets/orderStatus.css",  
  "/stylesheets/placeOrder.css",  
  "/stylesheets/productView.css",  
  "/stylesheets/profile.css",  
  "/stylesheets/search.css",  
  "/stylesheets/sellerPage.css",  
  "/stylesheets/sellerSignup.css",  
  "/stylesheets/subscription.css",  
  "/stylesheets/support.css",  
  "/stylesheets/transaction.css",  
  "/stylesheets/wallet.css", 

  "/javaScripts/adminAddProduct.js",  
  "/javaScripts/adminCategaryUpdate.js",  
  "/javaScripts/adminNav.js",  
  "/javaScripts/adminOrder.js",  
  "/javaScripts/adminProduct.js",  
  "/javaScripts/adminUser.js",  
  "/javaScripts/cart.js",  
  "/javaScripts/cartOrderConfirm.js",  
  "/javaScripts/categary.js",  
  "/javaScripts/feed.js",  
  "/javaScripts/home.js",  
  "/javaScripts/index.js",  
  "/javaScripts/login.js",  
  "/javaScripts/more.js",  
  "/javaScripts/nav.js",  
  "/javaScripts/nearOrder.js",  
  "/javaScripts/order.js",  
  "/javaScripts/orderAddress.js",  
  "/javaScripts/orderPayment.js",  
  "/javaScripts/orderStatus.js",  
  "/javaScripts/otp.js",  
  "/javaScripts/placeCartOrder.js",  
  "/javaScripts/placeOrder.js",  
  "/javaScripts/productView.js",  
  "/javaScripts/profile.js",  
  "/javaScripts/search.js",  
  "/javaScripts/sellerPage.js",  
  "/javaScripts/sellerSignup.js",  
  "/javaScripts/wallet.js", 
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
