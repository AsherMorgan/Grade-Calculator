// Initialize constants
const version = "grade-calculator-2";
const resources = [
    "https://cdn.jsdelivr.net/npm/vue@2.6.11",
    "./Images/favicon-32.png",
    "./Images/favicon-180.png",
    "./Images/favicon-192-maskable.png",
    "./Images/favicon-192.png",
    "./Images/favicon-512-maskable.png",
    "./Images/favicon-512.png",
    "./Images/import.svg",
    "./Images/moon.svg",
    "./Images/plus.svg",
    "./Images/sun.svg",
    "./Images/trash.svg",
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
            const response = await fetch(event.request);

            // Add response to cache
            cache.put(event.request, response.clone());

            // Return response
            return response;
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
