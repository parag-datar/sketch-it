/// <reference path="vendor/jquery-1.11.3.min.js" />
(function() {
    var cSelector = '#canvas-drawing-board';
    var resizeCanvas = function() {
        var $sketchContainer = $('#sketch-container'),
            $canvas = $(cSelector);

        $canvas.attr({
            height: $sketchContainer.height(),
            width: $sketchContainer.width()
        });
    };
    var saveImage = function(link) {
        //debugger
        link.href = $(cSelector).get(0).toDataURL();
        link.download = 'doodle';
    };
    var attachEvents = function() {
        $('#n-nav li[group="shape"]').on({
            click: function() {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    $this.siblings().removeClass('active');
                    $this.addClass('active');
                    var toolToActivate = $this.attr('tool');
                    if (toolToActivate === 'save') {
                        saveImage($this.find('a').get(0));
                    }
                    else {
                        drawingView.activateTool(toolToActivate);
                    }
                }
            }
        });

        $('.thickness-dropdown .dropdown-menu li').on({
            click: function() {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    $this.siblings().removeClass('active');
                    $this.addClass('active');
                    var th = $this.attr('thickness');
                    Sketcher.ToolView.globalStyle.thickness = parseInt(th, 10);
                    $('.thickness-dropdown .dropdown-toggle').html(th + 'px <span class="caret"></span>');
                }
            }
        });
    };
    var drawingView = null;

    var setup = function() {
        resizeCanvas();
        attachEvents();
        drawingView = new Sketcher.DrawingView({
            el: cSelector
        });
    };



    $(document).ready(setup);
})();