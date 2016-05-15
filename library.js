(function () {
	"use strict";
	var data = {
		name: 'It works'
	};

	var render = {
		admin: function (req, res, next) {
			res.render('admin/plugins/streams.tpl', data);
		},
		page: function (req, res, next) {
			res.render('streams', data);
		}
	};

	var Plugin = {
		init: function (params, callback) {
			params.router.get('/streams', params.middleware.buildHeader, render.page);
			params.router.get('/api/streams', render.page);
			params.router.get('/plugins/streams', params.middleware.admin.buildHeader, render.admin);
			params.router.get('/api/plugins/streams', params.middleware.admin.buildHeader, render.admin);
			callback(null);
		},
		admin: function (header, callback) {
			header.plugins.push({
				route: '/plugins/streams',
				icon: 'fa-paint-brush',
				name: 'Streams'
			});

			callback(null, header);
		}
	};

	module.exports = Plugin;
})();