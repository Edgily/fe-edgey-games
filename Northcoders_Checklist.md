# Checklist for NC Games Front End

## README - write your own and make sure that it:

- [x] has a link to the deployed version
- [ ] provides general info about your app
- [x] includes links to your back end repo
- [ ] specifies the minimum version of Node required to run locally (check your Node version, `node --version` and use the major version that you are on)
- [ ] has clear instructions on how to run your project locally (`git clone <repo-url>, cd ...`)

## UX

- [x] Basic styling added
- [ ] Responsive design
  - Not optimal in some mobile versions
- [x] Items aligned
- [x] Content legible (not too wide, obstructed, etc)
- [x] Refreshing doesn’t cause an issue on sub-pages
- [ ] No errors in the console
  - One error regarding select tag
- [x] Votes / Posts / Deletions happen instantly _OR_ give user indication of loading

## Functionality

### Login

- [x] Some indication of who is logged in (this can be hardcoded)

### Reviews

- [x] Serves all reviews / top reviews
- [x] Can vote on reviews
- [x] Can vote a maximum of once in either direction per page load
- [x] Votes are persistent when page is refreshed
- [x] Reviews by category pages load only relevant reviews (especially when navigating from one category page to another)
- [x] Can sort reviews by date created / comment_count / votes

### Individual Review / Comments

- [x] Individual reviews are served with comments
- [ ] Can vote on comments
- [ ] Can vote a maximum of once in either direction per page load
- [x] Votes are persistent when page is refreshed
- [x] Can post new comments, which are persistent

### Additional functionality:

- [x] Can only delete comments of logged in user
- [x] Deleted comments don’t re-appear on re-render/refresh
- [ ] sort comments by date created / votes
- [ ] navigate over pages of reviews (if implemented in back-end)
- [ ] navigate over pages of comments (if implemented in back-end)
- [x] filter / display reviews by specific user
- [ ] post new review
- [ ] delete logged in user’s reviews

## Error Handling

- [x] Bad url
- [x] Bad category slug in url
- [x] Bad review_id in url
- [x] Post comment: (No text in comment body / Can you post without logging in?)

## Code

- [x] Well named components
- [ ] Components reused where possible (`Reviews` / `Voter`...)
  - You aren’t extracting the components from your functionality
- [ ] Minimal state - don’t hold derivable data in state
  - Same as above
- [x] Set state correctly, using previous state where possible
- [x] Handle asynchronicity clearly (i.e. isLoading pattern)
- [x] Functions are DRY (`handleChange` for controlled components / api calls)
- [x] Use object destructuring where possible
- [x] Tidy? If not: ESLint / Prettier
- [x] `node_modules` git ignored
- [x] No `console.log`s / comments
- [x] remove unnecessary files (e.g. App.test.js)
