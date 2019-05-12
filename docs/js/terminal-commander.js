define('terminal-commander', ['doc'], function($) {

    var help = $('#help-text-block').html();

    var commands = {
        'help': help,
        'ls': 'about-me.txt  profile.txt  links.txt',
        'cat': ['about-me.txt', 'profile.txt', 'links.txt']
    };

    var issue = function(text) {
        if (text === '') {
            return '';
        }
        var command = commands[text];
        if (command === undefined) {
            return "Command '" + text + "' not found. In doubt, type 'help'";
        }

        return command;
    };

    return {
        'issue': issue
    };
});