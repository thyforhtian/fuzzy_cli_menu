/*eslint-env node, es6 */
'use strict';

const chalk = require('chalk');
const keypress = require('keypress');
const fuzzy = require('fuzzy');
const extend = require('util')._extend;

module.exports = (function() {
    let _itemsBase;

    let _menuString = '';
    let _inputValue = '';
    let _items;

    let init = (items) => {
        _itemsBase = items;

        _resetItems();
        _listen();
        _draw();
    };

    let _resetItems = () => {
        _items = extend([], _itemsBase);
        _items.map((el, index) => {
            index === 0 ? el.active = true : el.active = false;
        });
    };

    let _getSelected = () => {
        var active = null;
        _items.forEach((el, index) => {
            if (el.active) {
                active = index;
            }
        });
        return active;
    };

    let _filter = (val) => {
        let options = {
            pre: chalk.styles.inverse.open,
            post: chalk.styles.inverse.close,
            extract: (element) => {
                return element.name;
            }
        }

        _items = [];
        let results = fuzzy.filter(val, _itemsBase, options);

        results.forEach((el, index) => {
            let temp = extend({}, el.original);
            temp.name = el.string;
            index === 0 ? temp.active = true : temp.active = false;
            _items.push(temp);
        });
    };

    let _listen = () => {
        keypress(process.stdin);

        process.stdin.on('keypress', (ch, key) => {
            let selected = _getSelected();
            let amount = key.shift ? 2 : 1;
            let command;

            switch (true) {
                case key && key.name == 'down':
                    if (selected+amount <= _items.length-amount) {
                        _items[selected].active = false;
                        _items[selected+amount].active = true;
                        _populateMenu();
                        _draw();
                    }
                    break;
                case key && key.name == 'up':
                    if (selected-amount >= 0) {
                        _items[selected].active = false;
                        _items[selected-amount].active = true;
                        _populateMenu();
                        _draw();
                    }
                    break;
                case key && key.name == 'backspace':
                    if (!_inputValue.length) {
                        _resetItems();
                        break;
                    }
                    _inputValue = _inputValue.slice(0, -1);
                    _filter(_inputValue);
                    _draw();
                    break;
                case key && key.name == 'return':
                    let cb = _items[selected].value;

                    if (typeof cb === 'function') {
                        cb();
                        // stop();
                    } else {
                        throw new Error('This should be a function');
                    }
                    stop();

                    break;
                case key && /[a-zA-Z1-9]/.test(ch):
                    _inputValue+= ch;
                    _filter(_inputValue);
                    _draw();
                    break;
                case key && key.ctrl && key.name == 'c':
                    stop();
                    break;
            }
        });

        process.stdin.setRawMode(true);
        process.stdin.resume();
    };

    let stop = () => {
        process.stdin.pause();
        process.stdin.removeAllListeners();
    };

    let _populateMenu = () => {
        _menuString = '';
        _items.forEach((item, index) => {
            _menuString+= item.active ? chalk.cyan("> ") + chalk.white(item.name) + '\n' : "  " + chalk.gray(item.name) + '\n';
        });
    };

    let add = (name, value) => {
        _itemsBase.push({
            name: name,
            value: value
        });
        _resetItems();
        _populateMenu();
        _draw();
    };

    let _getSearchBar = () => {
        let input = chalk.red(_inputValue);
        let prompt = chalk.gray('>>> ');
        let searchLine = _inputValue.length ? `\n${prompt}${input}` : '';
        return searchLine;
    };

    let _clearCli  = () => {
        var i,lines;
        var stdout = "";

        lines = process.stdout.rows;

        for (i=0; i<lines; i++)
        {
            stdout += "\r\n\n";
        }

        stdout += "\x1B[0f";

        process.stdout.write(stdout);
    };

    let _draw = () => {
        _clearCli();
        _populateMenu();
        process.stdout.write(_menuString + _getSearchBar());
        process.stdout.write('\u001b[?25l');
    };

    return {
        init, add, stop
    };
})();