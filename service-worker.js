// Initialize constants
const version = "test-20";
const resources = [
    "https://cdn.jsdelivr.net/npm/vue@2.6.11",
    "./Images/favicon-32.png",
    "./Images/favicon-180.png",
    "./Images/favicon-192-maskable.png",
    "./Images/favicon-192.png",
    "./Images/favicon-512-maskable.png",
    "./Images/favicon-512.png",
    "./index.css",
    "./index.html",
    "./index.js",
    "./",
];



self.addEventListener("install", function(event) {
    event.waitUntil(async function() {
        // Cache resources
        const cache = await caches.open(version);
        await cache.addAll(resources);
    }());
});



self.addEventListener("fetch", function(event) {
    // Ignore non-GET requests
    if (event.request.method !== "GET") return;

    event.respondWith(async function() {
        // Look for cached response
        const cache = await caches.open(version);
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
            // Update cache in the background
            event.waitUntil(cache.add(event.request));

            // Returned cached response
            return cachedResponse;
        }
        else {
            // Fall back to network
            return fetch(event.request);
        }
    }());
});



self.addEventListener("activate", function(event) {
    event.waitUntil(
        // Remove outdated caches
        caches.keys().then(function (keys) {
            return Promise.all(
                keys.filter(function (key) {
                    return key != version;
                })
                .map(function (key) {
                    return caches.delete(key);
                })
            );
        })
    );
});
