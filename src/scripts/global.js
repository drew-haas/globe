class Global {
	constructor() {
		this.ga = new GoogleAnalytics();
		//this.main = new main();
	}

	init() {
		this.ga.init();
		//this.main.init();
	}	
}

const global = new Global();
global.init();