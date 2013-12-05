# Hire Convention 2014
[http://hireconvention.org.uk/2014/](http://www.hireconvention.org.uk/2014/)

## Description

The aim of the website site is to; facilitate the free registration for the event, paid registration for an events dinner and to create leads for the sales rep to sell Partner Opportunities.

## Dependencies

- NodeJS
  - Grunt
  - Bower
  - LESSCSS

## Instructions

### Setup Development Area

```
npm install
bower install
ln -s ../../_scripts/pre-commit .git/hooks/pre-commit
```

### Run Development Server

```
grunt serve
```

Visit the url [localhost:3000](http://localhost:3000/) to view the site.

### Deploy Build

```
grunt deploy
```

Will output all the files to a 2014 fold. Just upload these to the server.

## Documentation

During the Alpha/Beta stages, due to constant changes, documentation will be mainly written in-line. With a dedicated section being created at the first major release.

### File Structure

```
|- _scripts          –  contains useful scripts to help with
|                       development of this project
|- html              –  compiled development files (not committed)
|- src
|  |- data
|  |- helpers
|  |- less
|  |  |- _variables.less
|  |  |- global.less
|  |
|  |- templates
|     |- includes    –  partial snippets of code to be used in layouts
|     |- layouts     –  page layouts
|     |- pages       –  page content laid-out in the structure of the site
|
|- bower.json
|- gruntfile.js
|- package.json
```

## Report Issues

If you spot any issues please create a ticket via GitHub's Issue Tracker. If the issue is security related please use the contact information below.

## Contribute

In lieu of a formal style guide, take care to maintain the existing coding style.

## Contact

## Copyright

Unless otherwise stated &copy; Trinity Mirror Creative. All rights reserved.