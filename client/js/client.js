$(document).on('ready', function (e) {
	var asyncPath = '../../plugins/nodebb-plugin-mega-knights-streampage/js/async.min',
		lastUpdateTime = 0,
		channels = {
			names: ['overoker', 'megadesu', 'stpeach', 'emzia', 'esl_csgo', 'laceduplauren', 'miamouz', 'nastjanastja'],
			online: []
		};
	require([asyncPath], function (async) {

		function updateStatus(onStreamPage) {
			var now = new Date().getTime();
			if (lastUpdateTime && (now - lastUpdateTime) < 60 * 1000 && !onStreamPage) return;
			lastUpdateTime = now;

			console.log('onStreamPage: ', onStreamPage);
			channels.online = [];

			async.each(channels.names, function (channel, next) {
				$.ajax({
					url: 'https://api.twitch.tv/kraken/streams/' + channel,
					dataType: 'jsonp',
					success: function (data, status) {
						if (data && data.stream) channels.online.push(data);
						next();
					},
					error: function () {
						console.log('Error within ajax request to Twitch api for channel: ', channel);
						next();
					}
				});
			}, function (err) {
				updateBadge();
				if (onStreamPage) {
					$('#streams').text('');
					populateStreams();
				}
			});
		}

		function updateBadge() {
			console.log('updateBadge, channels.online.length ', channels.online.length);
			if (channels.online.length) {
				$('#streams-button > i').addClass('unread-count').attr('data-content', channels.online.length);
			} else {
				$('#streams-button > i').removeClass('unread-count').attr('data-content', 0);
			}
		}

		function populateStreams() {
			async.each(channels.online, function (channel) {
				console.log('channel: ', channel);

				ajaxify.loadTemplate('partials/streamPreview', function (tpl) {
					var previewHtml = templates.parse(tpl, {
						channel: channel
					});

					$('#streams').append(previewHtml);
					// console.log('tpl: ', previewHtml);
				});

				// var streamHtml = '<iframe src="http://player.twitch.tv/?channel="' + channel.stream.channel.name + ' height="720" width="1280" frameborder="0" scrolling="no" allowfullscreen="true"></iframe>';

			}, function (err) {
				console.log('finished');

			});
		}

		$(window).on('action:ajaxify.end', function (event, data) {
			updateStatus(data.url === 'streams' ? 'onStreamPage' : null);
		});

		$(document).on('click', 'img.stream-placeholder', function (e) {
			var data = {
				channelName: $(e.target).attr('data-twitch-name'),
				width: $(e.target).width(),
				height: $(e.target).height()
			};
			if (!data.channelName) return;
			ajaxify.loadTemplate('partials/streamPlaceholder', function (tpl) {
				var html = templates.parse(tpl, {
					data: data
				});
				$(e.target).closest('.stream-container').html(html);
			});

		});

		updateStatus(window.location.pathname === '/streams' ? 'onStreamPage' : null);
	});
});
