# Coordinator App

Coordinator is an App designed for concurrent editing of shared ToDo lists. You can find friends through the App and then invite them to coordinate on your lists. Any user working on a list can add tasks, claim tasks, or mark their claimed tasks complete. By default this will point to a backend hosted on a dynamic Heroku instance, so the first request may take some time to start up the server. If you wish to make any modifications to the backend behavior, you can clone the repo at https://github.com/sjweil9/coordinator_api and change the `API_BASE` in `config/config.js` to your local server.

## Dependencies

yarn, react-native, react, node, npm

Check React Native and Expo docs for more information on running the packager. 
