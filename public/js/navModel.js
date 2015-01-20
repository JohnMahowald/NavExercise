(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }

  // NavModel Class
  // Namespace:  HugeNav.NavModel
  // Load Order: 2 of 4

  // Initialize a NavModel object
  var NavModel = HugeNav.NavModel = function (options) {
    this.items = options.items;
    this.label = options.label;
    this.url = options.url;
    this.li = null;
  }

  NavModel.prototype.render = function() {
    this._buildTopLevelNav();
    this._buildSubLevelNav();

    HugeNav.NAV.appendChild(this.li);
  }

  NavModel.prototype.restoreClassName = function () {
    this.li.className = "top-level-nav";
  }

  // PRIVATE
  NavModel.prototype._buildTopLevelNav = function () {
    var li;

    li = this._buildLi({
      label: this.label,
      url: this.url,
    });

    li.className = "top-level-nav";
    // Stores the number of objects in the sublist. Used to calculate height to
    // ensure proper copyright placement in footer
    li.dataset.subNavCount = this.items.length;
    
    this.li = this._registerEventHandlers(li);
  }

  // Constructor for sub-navs. Builds a li for each sub-level-nav, appends the
  // li to a ul, and adds the ul to the primary li.
  NavModel.prototype._buildSubLevelNav = function () {
    var li, ul, span;

    // Return if there is no sub-level nav
    if (this.items.length <= 0) { return }

    ul = document.createElement("ul");

    // Build and append all sublevel navs to the ul
    for (var i = 0; i < this.items.length; i ++) {
       li = this._buildLi(this.items[i]);
       li.className = "secondary-nav";
       li.addEventListener("click", HugeNav.Events.navigateAndClearScreen);
       ul.appendChild(li);
    }

    // Build the chevron for the top-level-nav;
    span = document.createElement('span');
    span.className = "chevron";

    // For DOM precedence, first append the chevron, then append the list.  
    // The chevron is added before the link in the top-level-nav for favorable
    // hover styling
    this.li.insertBefore(span, this.li.firstChild);
    this.li.appendChild(ul) 
  }

  // Recycled function for building li's.
  NavModel.prototype._buildLi = function(options) {
    var li, a;

    li = document.createElement("li");
    a = document.createElement("a");

    a.innerHTML = options.label;
    a.href = options.url;
    li.appendChild(a);

    return li;
  }

  // If top-level-nav has a sublist, its click handler should open the sublist.
  // Otherwise, the click handler should navigate.
  NavModel.prototype._registerEventHandlers = function(li) {
    if (this.items.length > 0) {
      li.addEventListener("click", HugeNav.Events.toggleNav, true);
    } else {
      li.addEventListener("click", HugeNav.Events.navigateAndClearScreen);
    }

    return li;
  }
})();
