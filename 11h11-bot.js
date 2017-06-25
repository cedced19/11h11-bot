const login = require('facebook-chat-api');
const schedule = require('node-schedule');
const config = require('./config.json');

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var send = schedule.scheduleJob('0 0-23 * * * *', function(){
	var d = new Date();
	var h = addZero(d.getHours());
	var m = addZero(d.getMinutes());
	if (m == h) {
		login(config, (err, api) => {
		    if(err) return console.error(err);
		    api.sendMessage(h+''+m, config.threadID, function (err) {
					if(err) return console.error(err);
					api.logout();
				});
		});
	}
});
