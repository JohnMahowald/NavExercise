(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }

  var NavController = HugeNav.NavController = function (options) {
    this.route = options.route;
    this.model = options.model;
    this.navModels = [];
  };

  NavController.prototype.getNavObjects = function () {
    var xmlHttp;
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
    var res = JSON.parse(response);
    this.buildNavModels(res);
  }

  NavController.prototype.buildNavModels = function(res) {
    for (var i = 0; i < res.items.length; i ++) {
      var model = new this.model(res.items[i]);
      this.navModels.push(model);
    }

    this.renderNav();
  }

  NavController.prototype.renderNav = function () {
    for (var i = 0; i < this.navModels.length; i ++) {
      this.navModels[i].render();
    }
  }
})();
