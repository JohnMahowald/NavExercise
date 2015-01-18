(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }

  HugeNav.controller = new HugeNav.NavController({
    route: "/api/nav.json",
    model: HugeNav.NavModel
  });

  HugeNav.controller.getNavObjects();

})();

