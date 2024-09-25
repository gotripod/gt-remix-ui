# TODO

- insights_$slug.tsx - styling
- swap root quote "learn our approach" for real image
- fix subheadings on solutions page
- fix content on solutions page
- fix work page error

# Introduction

This is a (Remix)[https://remix.run] frontend to Wordpress.

# Setup

`npm i`

# Development

To run in dev mode:

`npm run dev`

# Deployment

`npm run deploy`

# Understanding the code

Have a look in `app/routes`, which has the following files:

- _index.tsx - this is the home page template (https://gotripod.com)
- $.tsx - catch-all for pages that have no specific template (https://gotripod.com/privacy)
- contact.tsx - https://gotripod.com/contact
- contact_.success.tsx - https://gotripod.com/contact/success
- work.tsx - https://gotripod.com/work
- work\_.$slug.tsx - individual case study template (https://gotripod.com/work/letcheck)
- insights.tsx - https://gotripod.com/insights
- insights_.$slug.tsx - individual blog post https://gotripod.com/insights/post-name

If you want to understand what all the $ and \_ symbols mean, check out the [Remix routing docs](https://remix.run/docs/en/main/file-conventions/routes) or this way of [visualising routes](https://interactive-remix-routing-v2.netlify.app).
