# TissueBarGraphs

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/tissue-bar-graphs` directory.

## Building web component
Run `ng build` to build the project. The build artifacts will be stored in the `dist/cns-tissue-blocks` directory.

### Web component options
The web component supports additional properties that can be passed to override the initial configuration for the bar graph.

<table>
<tr><th>Option</th><th>Description</th></tr>
<tr><td><code>show-ui</code></td><td> Enables the configuration UI</td></tr>
<tr><td><code>dataset-source</code></td><td>Datasheet source. Currently supported values are <code>kidney</code>, <code>ge_skin</code> and <code>cellar_lymph_node</code>.  Defaults to <code>kidney</code>.</td></tr>
<tr><td><code>sort-by</code></td><td>Attribute/cell type on which datasets need to sorted. Depends on available cell types or sortable attributes for a collection. Defaults to <code>Total Cell Count</code>.</td></tr>
<tr><td><code>group-by</code></td><td>Attribute/cell type on which facets will be displayed. Depends on groupable attributes for a collection. Defaults to <code>None</code>.</td></tr>
<tr><td><code>y-axis-field</code></td><td>Field with quantitative data. Supported values are <code>count</code> and <code>percentage</code>. Defaults to <code>count</code>.</td></tr>
<tr><td><code>order-type</code></td><td>Set ordering as <code>ascending</code> or <code>descending</code>. Defaults to <code>descending</code>.</td></tr>
</table>

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
