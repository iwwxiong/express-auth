/**
 * Created by wwxiong on 2014/07/08.
 */

module.exports = {
    // api version
    version: 'V1',

    // session store config
    storeUri: "mongodb://127.0.0.1:27017/express-auth",
    sessionSecret: "xhq",
    // mongodb config
    db: "mongodb://127.0.0.1:27017/express-auth",
    poolSize: 10,
    //CORS setting
    origin: ['http://127.0.0.1'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    headers: ['accept','content-type','origin','x-requested-with','x-csrftoken','authorization'],

    // Swagger resources setting
    discoveryUrl: '/resources',
    basePath: 'http://127.0.0.1:8000',
    version: '0.1',
    pathResource: 'http://127.0.0.1:8000/resources',
};
