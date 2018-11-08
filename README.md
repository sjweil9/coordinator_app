# Coordinator App

Coordinator is a mobile app for concurrent editing of To-Do lists. Users can add friends and invite them to collaborate on lists, where each can mark tasks as claimed or completed with real-time updates to all other list collaborators. This is a personal project developed for the purpose of learning React Native. It is not distributed in any App Store or intended for any commerical use.

The API backend for the App can be found here: https://github.com/sjweil9/coordinator_api

By default this will point to a dynamic Heroku instance, so the first request may take some time to start up the server. If you wish to make any modifications to the backend behavior, you can clone the repo and change the `API_BASE` in `config/config.js` to your local server.

## Dependencies

yarn, react-native, react, node, npm

Check React Native and Expo docs for more information on running the packager.

Tested for Android (Samsung Galaxy S8) via both simulator and physical device. In principle it should work for iOS, but it hasn't been tested on any iOS device or simulator.
