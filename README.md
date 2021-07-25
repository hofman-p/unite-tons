# unite-tons
Vue 3 movie app frontend with Quasar Framework :)
This project has been created in few hours to show how it's possible to reach a technical goal using last technologies available when I'm writing these lines.

## Features
* Authentication
* Full Vuex store
* Cookies management
* Vue router implementation (Redirection, routing heritage)
* Multi-role (Admin and viewer)
* Get user (fake) api through Vuex
* Use Vue 3 best practices (Composition API, Composables...)
* Get last trending movies using TMDB api
* End-to-end (Cypress) test

## What you need first
You need to have installed:
* Node.js
* Google Chrome (Cypress)
* TMDB api key (you need to register your app online on their website)

## How to start
1. Type `npm i` to install all modules
2. Create a .env file containing: `TMDB_API_KEY=yourapikey` where `yourapikey` is your own given by TMDB
3. Then type `quasar dev`
4. Normally, your browser should open on `http://localhost:8080`. If it's not the case, open it manually
5. You can use `vincent@unitetons.com` and `12345` credentials to connect as *admin* ; `viewer@test.com` and `67890` to connect as `viewer`
6. Enjoy :)

## Testing:
```bash
npm run test:e2e
```
To run Cypress test
