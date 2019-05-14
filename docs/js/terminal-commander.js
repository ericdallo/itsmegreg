define('terminal-commander', ['doc'], function($) {

    var $body = $('body');

    var isMirrored = function() {
        return $body.hasClass('mirrored');
    };

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

    var $digitedTextContainer    = $('#digited-text'),
        help                     = $('#help-text-block').html(),
        aboutMeText              = $('#about-me-text-block').html(),
        personalProjectsText     = $('#personal-projects-text-block').html();

    var clear = function() {
        $digitedTextContainer.html('');
        return '';
    }

    var changeTheme = function() {
        $('body').toggleClass('inverted');
        return '';
    }

    var aboutMe = function() {
        return aboutMeText;
    }

    var curriculum = function() {
        return 'TODO CV';
    }

    var projects = function() {
        return personalProjectsText;
    }

    var mirrorMe = function() {
        $('body').toggleClass('mirrored');
    }

    var commands = {
        'help': help,
        'help --hidden': 'do-a-magick                   Just try :x',
        'mirror-me': mirrorMe,
        'clear': clear,
        'change-theme': changeTheme,
        'ls': 'about-me.txt  curriculum.txt  personal-projects.csv',
        'cat': {'about-me.txt': aboutMe, 'curriculum.txt': curriculum, 'personal-projects.csv': projects, 'error': 'Error: Input the file to read'}
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