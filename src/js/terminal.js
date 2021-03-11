define('terminal', ['doc', 'terminal-commander'], function($, $terminalCommander) {
    'use strict';

    var history = [],
        historyPointer = 0;

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

    var saveHistory = function(text) {
        history.push(text);
    }

    var bind = function() {
        var initText                 = $('#initial-text-block').html(),
            $digitedTextContainer    = $('#digited-text'),
            $input                   = $('#input');

        var write = function(text) {
            var $newText = $(document.createElement('pre'));
            $newText.addClass('text-block');
    
            $newText.html(text);
    
            $digitedTextContainer.append($newText.first());
        };

        $(document).on('click', function() {
            $input.focus();  
        });

        $(window).on('keydown', function(e) {

            var text = $input.val();
        
            if (e.key === 'Enter') {
                e.preventDefault();
                saveHistory(text);
                write(buildShellText(text));
                write($terminalCommander.issue(text));
                $input.val('');
                window.scrollTo(0,document.body.scrollHeight);
            }

            if (e.keyCode === 76 && e.ctrlKey) {
                e.preventDefault();
                $terminalCommander.issue('clear');
            }

            if (e.keyCode === 67 && e.ctrlKey) {
                e.preventDefault();
                write(buildShellText(text));
                $input.val('');
            }
            
            if (e.keyCode === 38) {
                e.preventDefault();
                
                if (history.length > 0 && historyPointer < history.length) {
                    var lastCommand = history[history.length - ++historyPointer];
                    $input.val(lastCommand);
                }
            }

            if (e.keyCode === 40) {
                e.preventDefault();
                
                if (historyPointer <= history.length && historyPointer >= 1) {
                    var redoCommand = history[history.length - --historyPointer];
                    $input.val(redoCommand);
                }
            }

            if (e.keyCode === 9) {
                e.preventDefault();
                var newText = $terminalCommander.autocomplete(text);
                $input.val(newText);
            }
        });

        write(initText);
    };

    return {
        'bind': bind
    };
});
