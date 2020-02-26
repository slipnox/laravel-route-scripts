# Laravel Route Scripts

> This package helps to execute Javascript with all the power of laravel mix webpack in your Laravel Named Routes.

Sometimes you don't have a running SPA in your Laravel app but you want to run modern javascript with laravel mix workflow on specific pages.
If that's the case this package can help you.

## Installation

* Just run `npm instal laravel-route-scripts --save-dev` or `yarn add laravel-route-scripts --dev`

## Usage

* In your main view layout blade file you must set to any element the attribute: `data-laravel-route-name="{{ Route::currentRouteName() }}"`.
* Then just need to create a javascrtipt file on any location inside `resources/js` and import it in your mail js file.
* Import in your new file the library. Example: `import LR from 'laravel-route-scripts'`
* Create the new instance with the name route you need an place your code inside `onInit` or `docReady` methods.

### Example

```js
import LR from 'laravel-route-scripts';

new LR('product.show') // pass the route name or array of route names
  .onInit((lr) => {

    console.log('This run immediately javascript executes')

    // with the lr reference you can access to the current instance
    lr.initVue({
      el: '#frontend-vue',
      data () {
        return {
          title: 'title'
        }
      },
    })
    
    console.log(lr.isRoute('product.show'));

  }).docReady((lr) => {
    console.log('This runs when the DOM is ready')
    
    console.log(lr.$vi); // access the created vuejs instance
  })
```

### Available Methods:

<table>
	<tr>
		<th>Method Name</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>onInit</td>
		<td>Param: <strong>function</strong>, this method receives as a callback that run immediately javascript executes.</td>
	</tr>
	<tr>
		<td>docReady</td>
		<td>Param: <strong>function</strong>, this method receives a function as a callback that run after DOM content is ready.</td>
	</tr>
	<tr>
		<td>initVue</td>
		<td>Param: <strong>object</strong>, troughthout the instance reference inside of onInit or docReady you can initialize VueJS passing the VueJS instanciation object. This also create a internal vue instance referece named $vi.</td>
	</tr>
	<tr>
		<td>isRoute</td>
		<td>Param: <strong>object</strong>, troughthout the instance reference inside of onInit or docReady you can access this helper method to check if the current route if a specific one</td>
	</tr>
</table>

##### **NOTES**: `onInit` and `docReady` have access to receive an parameter that reference to the instance itself.
