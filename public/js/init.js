(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }

  HugeNav.controller = new HugeNav.NavController({
    route: "/api/nav.json"
  });

  HugeNav.controller.getNavObjects();
})();
