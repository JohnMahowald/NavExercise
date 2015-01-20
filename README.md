# Huge Navigation Exercise

Hey Huge Team,

Thanks for the fun exercise. I have included documentation through my code, but wanted to give a high level overview. 

I've added six files to /public

## CSS:
  1. desktop.css
  2. mobile.css
  
## JS (in load order):
  1. events.js: An object storing functions for handling events
  2. navModel.js: An object constructor for representing Top-Level-Links.
  3. navController.js: An object constructor for making API calls and storing
     collections of NavModel objects
  4. init.js:

After the init.js is loaded, it stores a series of globals and initializes an instance of the navController object. The navController has a function for making an API call to request the menu items. This function is called at the end of init.js.

On successful return of the API call, the JSON is parsed and navModel objects are created. These navModel objects each have a render function. This function will create a '<li>', '<a>', nested '<ul>' if it exists, register necessary event handlers, and add the newly created HTML to the DOM.

One of the unique challenges I ran into with this project was handling the copyright placement in the mobile view. The challenge was having the copyright fixed at the bottom when the nav did span the height of the page, and having the copyright sit below the menu when the nav exceeded the height of the page.

My solution was to trigger a setCopyright event. The event handler gets data stored in the clicked top-level-li about how many nested list items it contains. The function then determines if the expanded list will overflow the screen, and positions the copyright accorgindly. The data element is added in navModel.js on line 41, and the setCopyright event handler is in events.js on line 99.

I also wrote tests for the Controller API call. Tests can be found in the /jasmine folder and can be run by opening the SpecRunner.html file.

I had a great time working on the project. I hope to work on many more with Huge!

Cheers,

John
