# Regression tests

Runs every page in a real browser at desktop and mobile sizes and checks titles, canonicals,
headings, images, links, console errors, layout overflow, structured data and content-accuracy guards.

    cd tests && npm install && npx playwright install chromium
    npm test                                   # tests the local files
    BASE_URL=https://www.apollogrouptv.ca npm test   # tests the live site
