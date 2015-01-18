(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }

  var NavModel = HugeNav.NavModel = function (options) {
    this.items = options.items;
    this.label = options.label;
    this.url = options.url;
    this.el = null;
  }

  NavModel.prototype.render = function() {
    var li = this._buildTopLevelNav();
    var ul = this._buildSubLevelNav();

    if (ul) { li.appendChild(ul) }

    // Store a reference to the element for event handling
    this.el = li;

    HugeNav.HUGENAV.appendChild(li);
  }

  NavModel.prototype.restoreClassName = function () {
    this.el.className = "top-level-nav";
  }

  // Private Methods
  NavModel.prototype._buildTopLevelNav = function () {
    var li = this._buildLi({
      label: this.label,
      url: this.url,
    });

    li.className = "top-level-nav";

    // Only register a toggle event if the item has a sub-menu
    if (this.items.length > 0) {
      li.addEventListener("click", HugeNav.Events.toggleNav, true);
    }

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
       li.addEventListener("click", HugeNav.Events.navigateAndClearScreen);
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
