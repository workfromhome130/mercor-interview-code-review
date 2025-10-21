# Code Review

I see that it's a good job setting up a functional React component that tracks and logs the window width - but there's one **subtle bug** in the cleanup function.

## The Issue

In `useEffect`, the event listener is added as follows:

```js
window.addEventListener("resize", onResize);
```

But during cleanup, it is removed like this:

```js
window.removeEventListener("resize", () => onResize());
```

### The Problem

`() => onResize()` creates a **new function reference**, so it does not match the original `onResize` function that was registered.
That means the cleanup never actually removes the event listener, potentially causing **memory leaks** or duplicated logs.

## Changes made

Refer to [The Fix](result_answer_code.js)

## Optional improvements

- **Debounce the resize** event for performance (e.g., using `lodash.debounce`), especially if doing expensive operations inside.
- **SSR safety**: wrap `window` usage in a check if `Next.js` or `SSR` is being used.

```js
const [width, setWidth] = useState(
  typeof window !== "undefined" ? window.innerWidth : 0
);
```
