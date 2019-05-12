define('terminal', ['doc'], function($) {
    'use strict';

    var initText                 = $('#initial-text-block').html(),
        $digitedTextContainer    = $('#digited-text'),
        $inputContainerParent    = $('#input-container');

    var write = function(text) {
        var $newText = $(document.createElement('pre'));
        $newText.addClass('text-block');

        $newText.html(text);

        $digitedTextContainer.append($newText.first());
    };

    return {
        'write': function(text) {
            var shell = $inputContainerParent.html();

            write(shell);
            write(text);
        },
        'init': function() {
            write(initText);
        }
    };
});