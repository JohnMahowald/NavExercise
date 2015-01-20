(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }

  // Store comon DOM elements for efficiency
  HugeNav.MAINCONTENT = document.getElementsByTagName("main")[0];
  HugeNav.NAV = document.getElementById("huge-nav");
  HugeNav.OUTERNAV = document.getElementsByTagName("nav")[0];
  HugeNav.HEADER = document.getElementsByTagName("header")[0];
  HugeNav.COPYRIGHT = document.getElementById("copy");
  HugeNav.BURGER = document.getElementsByClassName("hamburger")[0];
  HugeNav.BRAND = document.getElementsByClassName("brand")[0];

  // Remember if the screen is masked
  HugeNav.masked = false;
  // Remember the menu height for setting the copyright (Events._setCopyright)
  setTimeout( function () {
    HugeNav.naturalOffset = HugeNav.NAV.offsetHeight;
  }, 0);

  // Instantiates the controller
  HugeNav.controller = new HugeNav.NavController({
    route: "/api/nav.json",
    model: HugeNav.NavModel
  });

  // Make API Call for JSON objects
  HugeNav.controller.getNavObjects();
  
  // Register Event Listeners
  // NOTE: Passing true as third argument ensures screen clears first.
  // NOTE: Additional event listers are added in navModels.js
  HugeNav.MAINCONTENT.addEventListener("click", HugeNav.Events.clearScreen);
  HugeNav.HEADER.addEventListener("click", HugeNav.Events.clearScreen, true);
  HugeNav.BURGER.addEventListener("click", HugeNav.Events.toggleSidebar);
})();

