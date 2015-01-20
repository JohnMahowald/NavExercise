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

    toggleNav: function (e) {
      e.preventDefault();

      if (e.currentTarget.className.indexOf("active") === -1) {
        Events._clearTopLevelEls();
        Events._setCopyright(true, e.currentTarget);
        e.currentTarget.className = "top-level-nav active";
      } else {
        e.currentTarget.className = "top-level-nav";
        Events._setCopyright(false);
      }

      Events._setMask();
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
    _openSidebar: function () {
      HugeNav.OUTERNAV.className = "open";
      HugeNav.HEADER.className = "open";
      Events._setMask();
      Events._setCopyright(true);
    },

    _closeSidebar: function () {
      HugeNav.OUTERNAV.className = "";
      HugeNav.HEADER.className = "";
      Events._removeMask();
      Events._clearTopLevelEls();
    }, 

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

    _setCopyright: function (opening, el) {
      var newHeight;

      if (el) { 
        newHeight = parseInt(el.dataset.subNavCount) * 48 
      }

      if (opening && newHeight) {
        Events._adjustCopyright(HugeNav.naturalOffset + newHeight);
      } else {
        Events._adjustCopyright(HugeNav.naturalOffset);
      }
    },

    _adjustCopyright: function (offset) {
      // 48px for the copyright height, 60px header height = 108px;
      if ((offset + 108) > window.innerHeight) {
        HugeNav.COPYRIGHT.className = "";
      } else {
        HugeNav.COPYRIGHT.className = "fixed"
      }
    }
  }
})();
