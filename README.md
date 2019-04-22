[![Netlify Status](https://api.netlify.com/api/v1/badges/7e02d865-7895-47f6-97d9-c29242c26dd8/deploy-status)](https://app.netlify.com/sites/img-tag/deploys)

# Image Optimization Techniques

Image optimization is one of the most important factors to consider for boosting page preformation. We shouldn't ignore *img* tag, while DOM parses *img* tag, the browser starts downloading the resource. If *img* tag has ```visibility none``` or ``` display: none``` style properties, the browser simply ignores them and downloads the resource. If the page has more images then we should witness poor page load time. Because the browser has to download all resources and parse them which is a time-consuming job. There are a few techniques you may consider to solve this problem

* Every browser has concurrency request limit that means browser can't download all resources at the same time, Chrome's concurrency limit is 6. We can distribute page resources to multiple CDNs. Well, it's solving our problem, but we are adding an additional task to browsers to check CDN lookup.

* Download the image when needed it's called lazy image. That means, when a user scrolls to a particular view, the browser can start downloading images. We can achieve this technique with [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Unfortunately all browser don't support this API, we should need a [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill). Chrome recently announced that it will support Lazy-loading by default, so we don't need of Intersection Observer API.

I've demonstrated three techniques in this [demo](https://img-tag.netlify.com/)

1. Loading all images, so we can see find the page load time and its problems.
2. Progressive Load: In this method, we will load low-resolution image first, and when a user sees or scrolls towards it, we will start downloading high-resolution image. It eliminates unnecessary downloading and saves lots of data in case of mobile users.
3. Lazy Load: It's the same as progressive load except that we avoid displaying low-resolution image. Instead, we will display one placeholder image to save the data load further.

### Run
```
npm i && npm start
```
### Production
```
npm run build
```