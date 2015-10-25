# shells-node-couch
   A basic NodeJS API shell that uses Couchbase for a NoSQL data store.

## Running the Project
  1. Clone the repo to some directory and run `npm install`.
  2. Make sure you have [Couchbase](http://www.couchbase.com/nosql-databases/downloads) installed.
  3. In the config files, make sure you're pointing at the appropriate couchbase cluster(s).
  4. Open Terminal, `cd` to the appropriate directory and run `node server.js`.  To avoid doing
     this every time you make a change, use something like [nodemon](https://github.com/remy/nodemon).
  5. To run in a specific configuration, just set the `NODE_ENV` before running the server
     i.e., `NODE_ENV=<configuration> node server.js`