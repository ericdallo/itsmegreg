define('terminal-commander', ['doc'], function($) {

    var $body = $('body');

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
        $body.toggleClass('inverted');
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
        $body.toggleClass('mirrored');
        return '';
    }

    var commands = {
        'help': help,
        'help --hidden': 'mirror-me                   Just try :o',
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

    var autocomplete = function(text) {
        var commandAndArgs = text.split(' '),
            command        = commandAndArgs[0],
            allCommands    = Object.keys(commands);

        for (i = 0; i < allCommands.length; i++) {
            if (allCommands[i].startsWith(command)) {

                if (commandAndArgs.length == 2) {
                    var arg = commandAndArgs[1],
                        subCommand = commands[command],
                        subCommandKeys = Object.keys(subCommand);

                    if (arg != "" && subCommand != undefined &&  isObject(subCommand)) {
                        
                        for (j = 0; j < subCommandKeys.length; j++) {
                            if (subCommandKeys[j].startsWith(arg)) {
                                return allCommands[i] + ' ' + subCommandKeys[j];
                            }
                        }
                    }

                    return text;
                }

                return allCommands[i];
            }
        }

        return text;
    };

    return {
        'issue': issue,
        'autocomplete': autocomplete
    };
});