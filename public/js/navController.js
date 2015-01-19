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
    var xmlHttp, controller;

    controller = this;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", this.route, true);
    xmlHttp.send();

    xmlHttp.onreadystatechange = controller.handleResponse.bind(this);
  };

  NavController.prototype.handleResponse = function (e) {
    var req;

    req = e.currentTarget

    if (req.readyState === 4 && req.status === 200) {
      this._buildNav(req.response);
    }
  }

  // Private Methods
  NavController.prototype._buildNav = function (response) {
    this._buildNavModels(JSON.parse(response));
    this._renderNav();
  }

  NavController.prototype._buildNavModels = function(res) {
    var model;

    for (var i = 0; i < res.items.length; i ++) {
      model = new this.model(res.items[i]);
      this.navModels.push(model);
    }
  }

  NavController.prototype._renderNav = function () {
    for (var i = 0; i < this.navModels.length; i ++) {
      this.navModels[i].render();
    }
  }
})();
