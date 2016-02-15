# fuzzy_cli_menu

Simple cli menu with fuzzy filtering 

## Installation

`npm install -g fuzzy_cli_menu`

## Usage

```js
var fcm = require("fuzzy_cli_menu");
var exec = require('child_process').exec;

const menuItems = [{
  "name": "Skivee",
  "value": function() {
    console.log('clicked');
  }
}, {
  "name": "JumpXS",
  "value": function() {
    console.log('clicked');
  }
}, {
  "name": "Skiba",
  "value": function() {
    console.log('clicked');
  }
}, {
  "name": "Flashspan",
  "value": function() {
    console.log('clicked');
  }
}, {
  "name": "Roomm",
  "value": function() {
    console.log('clicked');
  }
}, {
  "name": "Gabspot",
  "value": function() {
    console.log('clicked');
  }
}];

let menu = fcm;

// initialize menu
menu.init(menuItems);

// add new menu element
menu.add('new menu item', function() {
    console.log('new menu item');
});

// stop menu
menu.stop();
```

## Contributing

1. Fork it
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## Version

0.1.0

## License

[MIT](LICENSE)