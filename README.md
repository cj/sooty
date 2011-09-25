# Sooty

## DESCRIPTION

Sooty is a framework for building bots to interact with
[Campfire](http://campfirenow.com). It's built using the
[Smores](https://github.com/tombell/smores) library. It is also inspired by
[Scamp](https://github.com/wjessop/Scamp) written by @wjessop.

## INSTALLATION

### For Your Project

* Install the library in your project directory with `npm install sooty`

### For Development

1. Clone the repository
2. Change into the directory
3. Install dependencies with `npm install`

## USAGE

The simplest example of using Sooty. It simply listens for the text "Hello"
and will respond with "Hello there!" when ever someone in the channel says
it.

```coffeescript
Robot = require("sooty").Robot

sooty = new Robot ssl: true, token: "your_api_key", account: "your_account_subdomain"

sooty.behaviour ->
  @hear "Hello", ->
    @speak "Hello there!"

sooty.connect [ 465901, 456789 ]
```

A more detailed example coming soon.

## CONTRIBUTE

Here's there most direct way to get your work merged into the project:

1. Fork the project
2. Clone down your fork
3. Create a feature branch
4. Hack away and add tests. Not necessarily in that order
5. Make sure everything still passes by running tests
6. If necessary, rebase your commits into logical chunks, without errors
7. Push the branch up
8. Send a pull request for your branch

## LICENSE

The MIT License

Copyright (c) 2011 Tom Bell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
