const login = require('facebook-chat-api');
const schedule = require('node-schedule');
const config = require('./config.json');

var send = schedule.scheduleJob('0 0-23 * * * *', function(){
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
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
