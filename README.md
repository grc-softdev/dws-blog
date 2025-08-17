<h1>DWS Project</h1>

<h3>Description</h3>

This is a *take-home* project built with [React](https://reactjs.org/) and Redux Toolkit, following the instructions provided for this stage of the process, and consuming the given API.

The goal is to demonstrate modern frontend development skills with React, implementing all the requested requirements:

## Requirements

- [x] Used Redux to handle filters  
- [x] Test with RTL and Vitest  
- [x] Home page with a list of posts and category/author filters  
- [x] Sort filter to view posts from newest to oldest  
- [x] Search page with dynamic results  
- [x] Post page with full content and related data  
- [x] API consumption with DWS data integration  

👉 [Check out the live project](https://dws-blog-black.vercel.app/)

<p align="center">
  <figure style="display:inline-block; margin:10px;">
    <figcaption align="center"><strong>App</strong></figcaption>
    <img src="public/screenshots/app.png" alt="Home page" width="400px" />
  </figure>
  
  <figure style="display:inline-block; margin:10px;">
    <figcaption align="center"><strong>Post Details</strong></figcaption>
  </figure>
    <img src="public/screenshots/pageId.png" alt="Details of an anime" width="400px" />
    
  <figure style="display:inline-block; margin:10px;">
    <figcaption align="center"><strong>Mobile</strong></figcaption>
    <img src="public/screenshots/mobile.png" alt="Search page with filtered results" width="400px" />
    
  </figure>
</p>


## Highlights  

- Redux Toolkit for global state management  

- React Query for efficient API data fetching and caching  

- Styled buttons  

- CSS for styling and responsiveness  

- DWS API as the data source
  
- Tests using RTL and Vitest

---

## 🚀 How to run the project locally

```bash
npm install
npm run dev
```

Then access: http://localhost:3000

<h2>📌 Improvements</h2>

- We have some prop drilling that can be extracted to the store.
- We can add more tests, added just a few as an example, to outline how it can be done.
- Could have made more abstractions to avoid repetition.
- Had to compromise on time vs quality at times.

<h2>📌 Discussion Points</h2> 

The below are points that should/could have been discussed. We can talk about them sync, but in a nutshell, some decisions had to be made.

- There is no "clear filters" option on the desktop (but we have one on the mobile).
- Several actions were not outlined in the mobile (e.g., Search)
- How the filters should behave: additive vs exclusive.
- How the filters should behave upon deselection on the desktop.
- Category list on mobile example was not clear.
- Dropdown behavior on mobile was atypical (stays on top of cards).
- Dropdown size was not outlined for mobile (too big for mobile).
- "Selected" categories/authors "chips" (post-selection) was not clear.
