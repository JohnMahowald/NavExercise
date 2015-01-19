(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }

  var NavModel = HugeNav.NavModel = function (options) {
    this.items = options.items;
    this.label = options.label;
    this.url = options.url;

    this.li = null;
    this.ul = null;
  }

  NavModel.prototype.render = function() {
    this._buildTopLevelNav();
    this._buildSubLevelNav();

    // Only add submenu if it exists
    if (this.ul) { this.li.appendChild(this.ul) }

    HugeNav.NAV.appendChild(this.li);
  }

  NavModel.prototype.restoreClassName = function () {
    this.li.className = "top-level-nav";
  }

  // Private Methods
  NavModel.prototype._buildTopLevelNav = function () {
    this.li = this._buildLi({
      label: this.label,
      url: this.url,
    });

    this.li.className = "top-level-nav";
    
    this._registerEventHandlers();
  }

  NavModel.prototype._buildSubLevelNav = function () {
    var li;

    // Return if there is no sub-level nav
    if (this.items.length <= 0) { return }

    this.ul = document.createElement("ul");

    for (var i = 0; i < this.items.length; i ++) {
       li = this._buildLi(this.items[i]);
       li.className = "secondary-nav";
       li.addEventListener("click", HugeNav.Events.navigateAndClearScreen);
       this.ul.appendChild(li);
    }

    return this.ul;
  }

  NavModel.prototype._buildLi = function(options) {
    var li, a;

    li = document.createElement("li");
    a = document.createElement("a");

    a.innerHTML = options.label;
    a.href = options.url;
    li.appendChild(a);

    return li;
  }

  NavModel.prototype._registerEventHandlers = function(li) {
    if (this.items.length > 0) {
      this.li.addEventListener("click", HugeNav.Events.activateNav, true);
    } else {
      this.li.addEventListener("click", HugeNav.Events.navigateAndClearScreen);
    }
  }
})();
