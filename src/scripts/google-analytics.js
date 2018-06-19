class GoogleAnalytics {
	constructor() {
		this.id = 'UA-XXXXXX-X';
	}

	init() {
		console.info(`Initing Google Analytics with ID: ${this.id}`);
		window.dataLayer = window.dataLayer || [];
		function gtag() { dataLayer.push(arguments) }
		gtag('js', new Date());
		gtag('config', this.id);
	}
}