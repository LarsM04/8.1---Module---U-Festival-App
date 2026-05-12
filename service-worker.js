self.addEventListener("install", (event) => {
  console.log("Service Worker geïnstalleerd");
});

self.addEventListener("fetch", (event) => {
  // later caching toevoegen
});