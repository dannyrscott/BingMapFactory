# BingMapsFactory

Bing Maps Factory

## Getting Started

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/dannyrscott/BingMapFactory/master/dist/BingMapsFactory.min.js
[max]: https://raw.github.com/dannyrscott/BingMapFactory/master/dist/BingMapsFactory.js

In your web page:

```html
<script src="dist/BingMapsFactory.min.js"></script>
<script>
map = new BingMap(document.getElementById('map'),{
	apiKey: 'YourAPIKey',
	center: {
		lat: 39.763279,
		lng: -84.182617
	}
});

map.load().bind('viewchangeend',function(){
	console.log('I changed!')
}).addPin({
	lat: 39.763279,
	lng: -84.182617
});
</script>
```


## Documentation
_(Coming soon)_


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Danny Scott
Licensed under the MIT license.
