(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }

  var Events = HugeNav.Events = {
    toggleSidebar: function (e) {
      if (HugeNav.masked) {
        Events._closeSidebar();
      } else {
        Events._openSidebar();
      }
    },

    activateNav: function (e) {
      e.preventDefault();

      e.currentTarget.className = "top-level-nav active";

      Events._openSidebar();
      Events._setCopyright();
    }, 

    navigateAndClearScreen: function (e) {
      Events._closeSidebar();

      window.open(e.currentTarget.childNodes[0].href, "_self");
    },

    clearScreen: function () {
      if (HugeNav.masked) {
        Events._closeSidebar();
      }
    },

    // Private Methods
    _setMask: function () {
      HugeNav.masked = true;
      HugeNav.MAINCONTENT.className = "open";
    },

    _removeMask: function() {
      HugeNav.masked = false;
      HugeNav.MAINCONTENT.className = "";
    },

    _clearTopLevelEls: function () {
      for (var i = 0; i < HugeNav.controller.navModels.length; i ++) {
        HugeNav.controller.navModels[i].restoreClassName();
      }
    },

    _openSidebar: function () {
      HugeNav.OUTERNAV.className = "open";
      Events._setMask();
      Events._openHeader();

      // Ensure copyright is set based on sidebar height post DOM rendering
      setTimeout(Events._setCopyright, 0);
    },

    _closeSidebar: function () {
      HugeNav.OUTERNAV.className = "";
      Events._removeMask();
      Events._closeHeader();
      Events._clearTopLevelEls();
    }, 

    _setCopyright: function (e) {
      // 48px copyright height, 60px header height
      if ((HugeNav.NAV.offsetHeight + 108) > window.innerHeight) {
        HugeNav.COPYRIGHT.className = "";
      } else {
        HugeNav.COPYRIGHT.className = "fixed"
      }
    },

    _closeHeader: function () {
      HugeNav.HEADER.className = "";
    },

    _openHeader: function () {
      HugeNav.HEADER.className = "open";
    }
  }
})();
