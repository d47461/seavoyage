---
trigger: always_on
---

# Continuous Git Synchronization & Website Update

Every time changes or improvements are made to the codebase (HTML, CSS, JS, documentation, assets, etc.):
1. Automatically stage all modified and added files with `git add`.
2. Create a clean, descriptive commit describing the changes made.
3. Push immediately to `origin master` (`git push origin master`).
4. Ensure the repository and live website deployment are always updated and in sync with local work.
