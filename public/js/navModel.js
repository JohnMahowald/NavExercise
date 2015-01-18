(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }

  HugeNav.HUGENAV = document.getElementById("huge-nav");

  var NavModel = HugeNav.NavModel = function (options) {
    this.items = options.items;
    this.label = options.label;
    this.url = options.url;
    this.el = HugeNav.HUGENAV;
  }

  NavModel.prototype.render = function() {
    var li = this._buildTopLevelNav();
    var ul = this._buildSubLevelNav();

    if (ul) { li.appendChild(ul) }

    this.el.appendChild(li);
  }

  // Private Methods

  NavModel.prototype._buildTopLevelNav = function () {
    var li = this._buildLi({
      label: this.label,
      url: this.url,
    });

    li.className = "top-level-nav";
    return li;
  }

  NavModel.prototype._buildSubLevelNav = function () {
    var ul = document.createElement("ul");
    var li;

    if (this.items.length <= 0) {
      return
    }

    for (var i = 0; i < this.items.length; i ++) {
       li = this._buildLi(this.items[i]);
       li.className = "secondary-nav";
       ul.appendChild(li);
    }

    return ul;
  }

  NavModel.prototype._buildLi = function(options) {
    var li = document.createElement("li");
    var a = document.createElement("a");

    a.innerHTML = options.label;
    a.href = options.url;
    li.appendChild(a);

    return li;
  }
})();
