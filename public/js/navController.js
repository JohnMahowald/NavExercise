(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }

  // NavController Class //
  // Namespace: HugeNav.NavController
  // Load Order: 3 of 4

  // Initialize a NavController object
  var NavController = HugeNav.NavController = function (options) {
    this.route = options.route;
    this.model = options.model;
    this.navModels = [];
  };

  // Builds an API call and requests Nav objects, binds an event listener for
  // http response
  NavController.prototype.getNavObjects = function () {
    var xmlHttp 

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", this.route, true);
    xmlHttp.onreadystatechange = this._handleResponse.bind(this);

    xmlHttp.send();
  };

  // PRIVATE
  
  // Only build the nav if request finished, response is ready, and status is ok
  NavController.prototype._handleResponse = function (e) {
    var data = e.currentTarget

    if (data.readyState === 4 && data.status === 200) {
      this._buildAndRenderNav(data.response);
    }
  }

  // Both builds models and calls their render function before adding them to
  // the controllers navModel array
  NavController.prototype._buildAndRenderNav = function (response) {
    var res;

    res = JSON.parse(response);

    for (var i = 0; i < res.items.length; i ++) {
      model = new this.model(res.items[i]);
      model.render();
      this.navModels.push(model);
    }
  }
})();
