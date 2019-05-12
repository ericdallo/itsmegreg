define('terminal-commander', ['doc'], function($) {

    function isFunction(fn) {
        return fn && typeof fn === "function";
    }

    function isObject(obj) {
        return obj && typeof obj === "object";
    }

    function getRootCommand(commands, text) {
        var command = commands[text];

        if (command === undefined) {
            var subCommands = text.split(' ');

            if (commands[subCommands[0]] === undefined) {
                return undefined;
            }

            return commands[subCommands[0]][subCommands[1]];
        }
        return command;
    }

    var help                     = $('#help-text-block').html(),
        $digitedTextContainer    = $('#digited-text');

    var clear = function() {
        $digitedTextContainer.html('');
        return '';
    }

    var changeTheme = function() {
        $('body').toggleClass('inverted');
        return '';
    }

    var aboutMe = function() {
        return 'TODO me';
    }

    var curriculum = function() {
        return 'TODO CV';
    }

    var links = function() {
        return 'TODO links';
    }

    var commands = {
        'help': help,
        'help --hidden': 'do-a-magick                   Just try :x',
        'do-a-magick': {},
        'clear': clear,
        'change-theme': changeTheme,
        'ls': 'about-me.txt  curriculum.txt  links.txt',
        'cat': {'about-me.txt': aboutMe, 'curriculum.txt': curriculum, 'links.txt': links, 'error': 'Error: Input the file to read'}
    };

    var issue = function(text) {
        if (text === '') {
            return '';
        }
        var command = getRootCommand(commands, text);

        if (command === undefined) {
            return "Command '" + text + "' not found. In doubt, type 'help'";
        }

        if (isFunction(command)) {
            return command.call();
        }

        if (isObject(command)) {
            return command['error'];
        }

        return command;
    };

    return {
        'issue': issue
    };
});