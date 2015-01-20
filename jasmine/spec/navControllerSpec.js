describe("navController", function () {
  var controller;

  beforeEach(function() {
    controller = new HugeNav.NavController({
      route: "/api/test",
      model: "testModel",
    });

  });

  it("should initialize with a route, model, and array of models", function() {
    expect(controller.route).toEqual("/api/test");
    expect(controller.model).toEqual("testModel");
    expect(controller.navModels).toEqual([]);
  });

  describe("Making an api call", function () {
    beforeEach( function () {
      jasmine.Ajax.install();

      spyOn(controller, "_handleResponse");
    });

    afterEach( function () {
      jasmine.Ajax.uninstall();
    })

    it ("should make an api call for navbar objects", function () {
      controller.getNavObjects();
      
      expect(jasmine.Ajax.requests.mostRecent().url).toBe("/api/test");
    });

    it ("should call the response handler call", function () {
      jasmine.Ajax.stubRequest('/api/test').andReturn({
        "status": 200,
      });

      controller.getNavObjects();

      expect(controller._handleResponse).toHaveBeenCalled();
    });
  });

  it("should create navModel objects", function () {
    controller.model = function () { 
      this.render = function() { return };
    };

    var data = '{ "items":[' + 
        ' { "label":"Work",' + 
        ' "url":"#/work", ' +
        ' "items": [] ' + 
        ' }]} '

    controller._buildAndRenderNav(data);

    expect(controller.navModels.length).toBe(1);
  });
});
