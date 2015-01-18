(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }

  var HugeNav = window.HugeNav;

  var Events = HugeNav.Events = {
    toggleNav: function (e) {
      e.preventDefault();

      // Close any open navigation
      Events._clearTopLevelEls();

      var className = e.currentTarget.className;

      // Test if the class is currently active
      if (className.indexOf("active") === -1) {
        e.currentTarget.className = className + " active";
        HugeNav.MASK.className = "active";
      } else {
        e.currentTarget.className = "top-level-nav";
        HugeNav.MASK.className = "";
      }
    }, 

    navigateAndClearScreen: function (e) {
      var link = e.currentTarget.childNodes[0].href;
      Events._clearTopLevelEls();
      Events._removeMask();
      window.open(link, "_self");
    },

    removeAndClear: function () {
      Events._removeMask();
      Events._clearTopLevelEls();
    },

    // Private Methods
    _removeMask: function() {
      HugeNav.MASK.className = "";
    },

    _clearTopLevelEls: function () {
      var navModels = HugeNav.controller.navModels;
      
      for (var i = 0; i < navModels.length; i ++) {
        navModels[i].restoreClassName();
      }
    }
  }
 })();
