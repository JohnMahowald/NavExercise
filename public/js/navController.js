(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }

  var NavController = HugeNav.NavController = function (options) {
    this.route = options.route;
  };

  NavController.prototype.getNavObjects = function () {
    var xmlHttp = null;
    var controller = this;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", this.route, true);
    xmlHttp.send();

    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        controller.parseResponse(xmlHttp.response);
      }
    };
  };

  NavController.prototype.parseResponse = function (response) {
    this.res = JSON.parse(response);
  }
})();
