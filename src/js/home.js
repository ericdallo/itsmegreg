define(['doc', 'terminal'], function($, $terminal) {
    'use strict';

    $terminal.init();

    $('#input').on('keydown', function(e) {
        var $this = $(this);
        if (e.key === 'Enter') {
            var text = $this.val();
            $terminal.write(text);
            
            $this.val('');
        }
    })
});