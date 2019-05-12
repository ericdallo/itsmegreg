define('terminal', ['doc'], function($) {
    'use strict';

    var buildShellText = function(text) {
        var $parent    = $(document.createElement('div')),
            $container = $(document.createElement('section')).addClass('input-container'),
            $location  = $(document.createElement('span')).addClass('location'),
            $shell     = $(document.createElement('span')),
            $text      = $(document.createElement('span')).addClass('static-text');

        $location.text('~');
        $shell.text('$');
        $text.text(text);
        $container.append($location.first());
        $container.append($shell.first());
        $container.append($text.first());
        $parent.append($container.first());
        
        return $parent.html();
    };

    var initTerminal = function() {
        var initText                 = $('#initial-text-block').html(),
            $digitedTextContainer    = $('#digited-text'),
            $input                   = $('#input');

        var write = function(text) {
            var $newText = $(document.createElement('pre'));
            $newText.addClass('text-block');

            $newText.html(text);

            $digitedTextContainer.append($newText.first());
        };

        var clear = function() {
            $digitedTextContainer.html('');
        };

        $(document).on('click', function(e) {
            $input.focus();
        });

        $(window).on('keydown', function(e) {

            var text = $input.val();
        
            if (e.key === 'Enter') {
                e.preventDefault();
                write(buildShellText(text));
                $input.val('');
            }

            if (e.keyCode === 76 && e.ctrlKey) {
                e.preventDefault();
                clear();
            }

            if (e.keyCode === 67 && e.ctrlKey) {
                e.preventDefault();
                write(buildShellText(text));
                $input.val('');
            }
        });

        write(initText);
    };

    return {
        'bind': function() {
            initTerminal();
        }
    };
});