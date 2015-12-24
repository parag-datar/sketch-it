/// <reference path="../paper-full.min.js" />
/// <reference path="../vendor/backbone-min.js" />
(function() {
    window.Sketcher = {};

    var ToolView = Sketcher.ToolView = Backbone.View.extend({

        currentPath: null,

        tool: null,

        type: null,

        activate: function() {
            this.tool.activate();
            return this;
        },

        initialize: function(props) {
            this.tool = new paper.Tool();
            this.type = props.type;
            this.attachEvents();
            return this.render();
        },

        attachEvents: function() {
            var tool = this.tool;

            tool.onMouseDown = this.mouseDown.bind(this);
        },

        mouseDown: function(event) {
            var tool = this.tool;

            switch (this.type) {
                case ToolView.TYPES.PENCIL:
                    this.pencilMouseDown(event);
                    break;
                case ToolView.TYPES.RECTANGLE:
                    this.rectangleMouseDown(event);
                    break;
                default:
            }

        },
        pencilMouseDown: function(event) {
            var tool = this.tool;
            path = new paper.Path();
            path.strokeColor = 'black';
            path.strokeWidth = ToolView.globalStyle.thickness;
            path.add(event.point);

            tool.onMouseMove = this.pencilMouseMove.bind(this);
            tool.onMouseUp = this.pencilMouseUp.bind(this);
            ToolView.currentPath = path;
        },

        pencilMouseMove: function(event) {

            ToolView.currentPath.add(event.point);
        },

        pencilMouseUp: function() {
            var tool = this.tool;

            tool.onMouseMove = null;
            ToolView.currentPath.simplify();
            ToolView.currentPath = null;
        },

        rectangleMouseDown: function(event) {
            var tool = this.tool;
            ToolView.dragStartPoint = event.point;

            tool.onMouseMove = this.rectangleMouseMove.bind(this);
            tool.onMouseUp = this.rectangleMouseUp.bind(this);
        },

        rectangleMouseMove: function(event) {
            if (ToolView.currentPath) {
                ToolView.currentPath.remove();
            }

            rect = new paper.Rectangle(ToolView.dragStartPoint, event.point);
            ToolView.currentPath = new paper.Path.Rectangle(rect);
            ToolView.currentPath.strokeColor = 'black';
            ToolView.currentPath.strokeWidth = ToolView.globalStyle.thickness;
        },

        rectangleMouseUp: function() {
            var tool = this.tool;

            tool.onMouseMove = null;
            ToolView.currentPath = null;
        },

        render: function() {
        }

    }, {
        currentPath: null,
        dragStartPoint: null,
        globalStyle: {
            thickness: 1
        },
        TYPES: {
            PENCIL: 'pencil',
            RECTANGLE: 'rectangle',
        }

    });

})();