#Dragonstone App
**Scalable JavaScript Application built w/ Module-Sandbox-Core Pattern**

Dragonstone is a mobile ready, single page web application with modern user interface. Features include a realtime chat with Socket.io, a gallery page, and a configuration page.


The application **Core** implements aliases for DOM manipulation and other lower-level utilities that pipe back to a library of choice. Aliases allow switching libraries with minimum impact on the application.
The **Sandbox** is just a way to implement the **Facade** pattern on top of features provided by **Core**. It exposes the parts of the library that are safe to use instead of exposing the entire API.
A **Module** is an independent unit of a page. **Modules** know nothing about each other. To make them communicate, a **PubSub** pattern is used.


###Technologies / tools used:
1. Node.js - Server
2. Socket.io - Real time engine
3. Express.js - Web App Framework
4. Gulp - Streaming build system
5. Sass - CSS extension language
6. Uglify - JavaScript parser / compressor
7. Concat - Streaming concat middleware
8. JsHint - JavaScript code quality tool
9. jQuery - Cross-platform JavaScript library
10. Font Awesome - Scalable vector icons
11. Jasmine - BDD Testing
12. HTML5 - Markup Language
13. CSS3 - Cascading Style Sheets
14. JSDoc - JavaScript source code annotations

###Custom
1. Custom UI - Responsive, CSS3 + animations, mobile ready interface
2. Custom Router


###Patterns:
1. Observer
2. Facade
3. Mediator
4. Module
5. PubSub
6. Sandbox

###Setup:
1. Install Node.js
2. Run node index.js
3. Open [localhost](http://localhost:3000/)