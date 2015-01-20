(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }

  // Initialize Script
  // Load Order: 4 of 4

  // Namespace common DOM elements for efficiency
  HugeNav.MAINCONTENT = document.getElementsByTagName("main")[0];
  HugeNav.NAV = document.getElementById("huge-nav");
  HugeNav.OUTERNAV = document.getElementsByTagName("nav")[0];
  HugeNav.HEADER = document.getElementsByTagName("header")[0];
  HugeNav.COPYRIGHT = document.getElementById("copy");
  HugeNav.BURGER = document.getElementsByClassName("hamburger")[0];
  HugeNav.BRAND = document.getElementsByClassName("brand")[0];

  // Register Event Listeners
  // NOTE: Additional event listers are registered in navModels.js
  HugeNav.MAINCONTENT.addEventListener("click", HugeNav.Events.clearScreen);
  HugeNav.HEADER.addEventListener("click", HugeNav.Events.clearScreen);
  HugeNav.BURGER.addEventListener("click", HugeNav.Events.toggleSidebar);
  window.onresize = HugeNav.Events.recalculateCopyright;

  // Remember if the screen is masked
  HugeNav.masked = false;

  // Remember the menu height for setting the copyright (Events._setCopyright)
  // Must be set after DOM has rendered;
  setTimeout( function () {
    HugeNav.naturalOffset = HugeNav.NAV.offsetHeight;
  }, 0);

  // Instantiate the controller
  HugeNav.controller = new HugeNav.NavController({
    route: "/api/nav.json",
    model: HugeNav.NavModel
  });

  // Make API Call for JSON objects
  // On successful response, the nav is build. see navController.js
  HugeNav.controller.getNavObjects();

})();

