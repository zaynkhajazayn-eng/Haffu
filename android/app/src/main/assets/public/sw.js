/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "c25ac93ccca92208536dfe4bf264cfea"
  }, {
    "url": "pwa-512x512.png",
    "revision": "c25ac93ccca92208536dfe4bf264cfea"
  }, {
    "url": "pwa-192x192.png",
    "revision": "d92daaf045bc1eaf56bc2fb62c69b92f"
  }, {
    "url": "index.html",
    "revision": "8748130d9ef83db804d0c314710414cc"
  }, {
    "url": "icon.svg",
    "revision": "d239e7b139c213d827746ae6844a44b3"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "eb2dc5ca818398870116c51a3d0cfef9"
  }, {
    "url": "assets/index-Rb-ZzNRm.css",
    "revision": null
  }, {
    "url": "assets/index-8gHw4BN8.js",
    "revision": null
  }, {
    "url": "assets/aistudio/Screenshot_20261021-151142_Chrome_eb0a4834.png",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "eb2dc5ca818398870116c51a3d0cfef9"
  }, {
    "url": "icon.svg",
    "revision": "d239e7b139c213d827746ae6844a44b3"
  }, {
    "url": "pwa-192x192.png",
    "revision": "d92daaf045bc1eaf56bc2fb62c69b92f"
  }, {
    "url": "pwa-512x512.png",
    "revision": "c25ac93ccca92208536dfe4bf264cfea"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "c25ac93ccca92208536dfe4bf264cfea"
  }, {
    "url": "manifest.webmanifest",
    "revision": "db2303fe63bc392b1164f42da5d2e259"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
