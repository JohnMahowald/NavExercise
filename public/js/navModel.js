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

    HugeNav.NAV.appendChild(this.li);
  }

  NavModel.prototype.restoreClassName = function () {
    this.li.className = "top-level-nav";
  }

  // Private Methods
  NavModel.prototype._buildTopLevelNav = function () {
    var li;

    li = this._buildLi({
      label: this.label,
      url: this.url,
    });

    li.className = "top-level-nav";
    li.dataset.subNavCount = this.items.length;
    
    this.li = this._registerEventHandlers(li);
  }

  NavModel.prototype._buildSubLevelNav = function () {
    var li, span;

    // Return if there is no sub-level nav
    if (this.items.length <= 0) { return }

    this.ul = document.createElement("ul");

    // Build all sublevel navs
    for (var i = 0; i < this.items.length; i ++) {
       li = this._buildLi(this.items[i]);
       li.className = "secondary-nav";
       li.addEventListener("click", HugeNav.Events.navigateAndClearScreen);
       this.ul.appendChild(li);
    }

    // Build the chevron for the top-level-nav;
    span = document.createElement('span');
    span.className = "chevron";

    // For DOM precedence, first append the chevron, then append the list.  The
    // chevron is added before the link on the top-level-nav for favorable
    // hover styling
    this.li.insertBefore(span, this.li.firstChild);
    this.li.appendChild(this.ul) 
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
      li.addEventListener("click", HugeNav.Events.toggleNav, true);
    } else {
      li.addEventListener("click", HugeNav.Events.navigateAndClearScreen);
    }

    return li;
  }
})();
