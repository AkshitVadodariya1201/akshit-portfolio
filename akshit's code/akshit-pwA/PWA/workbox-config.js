module.exports = {
	globDirectory: 'Simple-PWA/',
	globPatterns: [
		'**/*.{css,js,png,html,json,md}'
	],
	swDest: 'Simple-PWA/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
		/^q/
	]
};