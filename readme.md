# fuzzy_cli_menu

Simple cli menu with fuzzy filtering 

![fuzzy_cli_menu_in_action](https://cloud.githubusercontent.com/assets/875767/13063383/e325f148-d447-11e5-8aff-e815205483d1.gif)

## Installation

`npm install fuzzy_cli_menu`

## Usage

```js
var fcm = require("fuzzy_cli_menu");

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


## License

[MIT](LICENSE)
