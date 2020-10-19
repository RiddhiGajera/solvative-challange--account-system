const bankRoute =  require('./app/route');

module.exports = async (server) => {
    server.use('/account', bankRoute);
}