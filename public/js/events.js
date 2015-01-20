(function () {
  if (typeof window.HugeNav === "undefined") {
    window.HugeNav = {};
  }
  
  // Events Object
  //
  // Namespace: HugeNav.Events
  //
  // Load Order: 1 of 4

  var Events = HugeNav.Events = {
    // Registered to the hamburger on click
    toggleSidebar: function (e) {
      e.stopPropagation();

      if (HugeNav.masked) {
        Events._closeSidebar();
      } else {
        Events._openSidebar();
      }
    },

    // Registered to top-level-navs containing sub-navs, on click
    toggleNav: function (e) {
      e.preventDefault();

      // If class is currently set to "active", open the sub menu. 
      // Otherwise, close the submenu and reset the copyright
      if (e.currentTarget.className.indexOf("active") === -1) {
        Events._clearTopLevelEls();
        Events._setCopyright(true, e.currentTarget);
        e.currentTarget.className = "top-level-nav active";
      } else {
        Events._setCopyright(false);
        e.currentTarget.className = "top-level-nav";
      }

      Events._setMask();
    }, 

    // Registered to all links without submenus, on click
    navigateAndClearScreen: function (e) {
      Events._closeSidebar();

      window.open(e.currentTarget.childNodes[0].href, "_self");
    },

    clearScreen: function (e) {
      if (HugeNav.masked) {
        Events._closeSidebar();
      }
    },

    recalculateCopyright: function () {
      HugeNav.naturalOffset = HugeNav.NAV.offsetHeight;
      Events._setCopyright();
    },

    // PRIVATE
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

    // Clears any top-level-nav containing the 'active' class
    _clearTopLevelEls: function () {
      for (var i = 0; i < HugeNav.controller.navModels.length; i ++) {
        HugeNav.controller.navModels[i].restoreClassName();
      }
    },

    // Takes two arguments: opening = boolean repersenting if the slider is
    // opening or closing, el =  element triggering the event. Top-level-nav
    // items with sub-menus contain a data reference to the number of elements
    // in the sub-menu. This number is used to calculate the list height after
    // completion, ensuring copright is fixed or static.
    //
    // Mobile only.
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

    // Determines the overflow of the nav.
    // 48px for the copyright height, 60px header height = 108px;
    //
    // Mobile only
    _adjustCopyright: function (offset) {
      if ((offset + 108) > window.innerHeight) {
        HugeNav.COPYRIGHT.className = "";
      } else {
        setTimeout( function () {
          HugeNav.COPYRIGHT.className = "fixed";
        }, 200);
      }
    }
  }
})();
