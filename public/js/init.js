(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }

  HugeNav.controller = new HugeNav.NavController({
    route: "/api/nav.json",
    model: HugeNav.NavModel
  });

  // Initialze by making API call for navigation data
  HugeNav.controller.getNavObjects();
  
  // Store Common Globals
  HugeNav.MASK = document.getElementById("mask");
  HugeNav.HUGENAV = document.getElementById("huge-nav");
  HugeNav.OUTERNAV = document.getElementsByTagName("nav")[0];

  // Register Events
  HugeNav.MASK.addEventListener("click", HugeNav.Events.removeAndClear);
  // Passing 'true' allows presicence for TopLevelNav events
  HugeNav.OUTERNAV.addEventListener("click", HugeNav.Events.removeAndClear, true);
})();

