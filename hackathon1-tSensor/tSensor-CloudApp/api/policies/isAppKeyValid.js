/**
 * isAppKeyValid
 *
 * Created by Sandip Chaudhari on 10/8/2014.
 */
module.exports = function(req, res, next) {
    if(typeof req.headers['appkey'] === 'undefined') {
        res.status(401);
        return res.json('access denied');
    }

    if(req.headers['appkey'] !== 'qQasdasdazz3435353fftt2145') {
        res.status(401);
        return res.json('access denied');
    }
    return next();
};