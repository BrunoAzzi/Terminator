[ ![Codeship Status for BrunoAzzi/Terminator](https://codeship.com/projects/86a02fd0-450a-0133-4f4f-6641cf1712e7/status?branch=master)](https://codeship.com/projects/104592)

# Terminator

This project is a simple json text inspector that consumes from a [Google Sheets Rest API](https://developers.google.com/google-apps/spreadsheets/) and generates the json if the data given is valid.

Demo: http://terminator-chaordic.herokuapp.com/

You can use this link to test the app: https://docs.google.com/spreadsheets/d/1UCiLE6_iMjHZuh6j5IVJCGf4-FFF07QIrhjfLR5CA0w/pubhtml

## Utilization

Now that all is up and running, if you don't have our template, you can create a Google Sheet like [this one](https://docs.google.com/spreadsheets/d/1UCiLE6_iMjHZuh6j5IVJCGf4-FFF07QIrhjfLR5CA0w/pubhtml).

Go to `File -> "Publish to the web"`, copy the link and paste to the input field on the app index page and press send.

Then you can use both inspector panels to validate the generated JSON and download it.

## Installation

1. Just run:

```
npm install
```

## Run

Ok, now the `npm start` comand is configured to run `http-server -a localhost -p 8000 -c-1` .

Before you start the server, `node install && bower install` are called, so keep calm and do this to start the server:

```
npm start
```

Now if everything is ok, you can http://localhost:8000/app/index.html in you browser.
