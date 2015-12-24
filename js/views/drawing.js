/// <reference path="../paper-full.min.js" />
/// <reference path="../vendor/backbone-min.js" />
(function() {
    var ToolView = Sketcher.ToolView;
    var drawingView = Sketcher.DrawingView = Backbone.View.extend({

        tools: null,


        initialize: function(props) {
            paper.install(this.el);
            paper.setup(this.el);
            var topLeft = new paper.Point(0,0);
            var viewSize = paper.view.getSize();
            var rectSize = new paper.Size(viewSize.width, viewSize.width);
            var rect = new paper.Rectangle(topLeft, rectSize);
            var rectPath = new paper.Path.Rectangle(rect);
            rectPath.fillColor = '#FFF'
            this.setupTools();
            this.attachEvents();
            return this.render();
        },

        setupTools: function() {
            var tools = {};
            tools.pencil = new Sketcher.ToolView({
                type: ToolView.TYPES.PENCIL
            });

            tools.rectangle = new Sketcher.ToolView({
                type: ToolView.TYPES.RECTANGLE
            });

            this.tools = tools;
            return this.activateTool(ToolView.TYPES.PENCIL);
        },

        activateTool: function(type) {
            var tools = this.tools,
                toolToctivate = null;
            switch (type) {
                case ToolView.TYPES.PENCIL:
                    toolToctivate = tools.pencil;
                    break;
                case ToolView.TYPES.RECTANGLE:
                    toolToctivate = tools.rectangle;
                    break;
                default:
                    toolToctivate = tools.pencil;
            }
            toolToctivate.activate();
            return this;
        },

        attachEvents: function() {
        },

        render: function() {

        }

    });

})();