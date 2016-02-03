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
    origin: ['http://127.0.0.1', 'http://10.66.18.90:3000', 'http://10.66.18.91'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    headers: ['accept','content-type','origin','x-requested-with','x-csrftoken','authorization'],

    // Swagger resources setting
    discoveryUrl: '/resources',
    basePath: 'http://127.0.0.1',
    version: '0.1',
    pathResource: 'http://127.0.0.1/resources',

    // Media path
    mediaPath: '',
    mediaUrl: '/images/',
    downloadPath: 'C:\\',
    downloadUrl: '/download/',
};
