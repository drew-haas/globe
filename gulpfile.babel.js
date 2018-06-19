import gulp from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import del from 'del';
import gulpif from 'gulp-if';
import yargs from 'yargs';

const argv = yargs.argv;

const config = {
	html: {
		source: './src/**/*.html',
		destination: './dist'
	},
	styles: {
		source: './src/styles/**/*.scss',
		destination: './dist',
		browsers: ['last 2 versions', 'ie >= 9']
	},
	scripts: {
		source: [
			'./src/scripts/google-analytics.js',
			'./src/scripts/global.js'
		],
		modules: [
			'./src/scripts/libs/three.min.js',
			'node_modules/jquery/dist/jquery.js'
		],
		destination: './dist'
	},
	media: {
		source: './src/media/**/*.{png,jpg,gif}',
		destination: './dist/media'
	},
	fonts: {
		source: './src/fonts/**/*',
		destination: './dist/fonts'
	},
	extras: {
		source: './src/*.{xml,txt}',
		destination: './dist/'
	},
	browserSync: {
		port: 5000,
		server: './'
	}
};

export function styles() {
	return gulp.src(config.styles.source)
		.pipe(plumber())
		.pipe(gulpif(!argv.prod, sourcemaps.init()))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: config.styles.browsers
		}))
		.pipe(gulpif(argv.prod, cssnano()))
		.pipe(concat('bundle.css'))
		.pipe(gulpif(!argv.prod, sourcemaps.write('.')))
		.pipe(gulp.dest(config.styles.destination))
		.pipe(browserSync.stream());
}

export function scripts() {
	return gulp.src(config.scripts.source)
		.pipe(plumber())
		.pipe(gulpif(!argv.prod, sourcemaps.init()))
		.pipe(babel())
		.pipe(gulpif(argv.prod, uglify()))
		.pipe(concat('bundle.js'))
		.pipe(gulpif(!argv.prod, sourcemaps.write('.')))
		.pipe(gulp.dest(config.scripts.destination))
		.pipe(browserSync.stream());
}
	
export function modules() {
	return gulp.src(config.scripts.modules)
		.pipe(plumber())
		.pipe(gulpif(argv.prod, uglify()))
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(config.scripts.destination))
		.pipe(browserSync.stream());
}

export function html() {
	return gulp.src(config.html.source)
		.pipe(plumber())
		.pipe(gulpif(argv.prod, htmlmin({
			collapseWhitespace: true,
			removeComments: true
		})))
		.pipe(gulp.dest(config.html.destination))
		.pipe(browserSync.stream());
}

export function media() {
	return gulp.src(config.media.source)
		.pipe(plumber())
		.pipe(gulp.dest(config.media.destination))
		.pipe(browserSync.stream());
}

export function fonts() {
	return gulp.src(config.fonts.source)
		.pipe(plumber())
		.pipe(gulp.dest(config.fonts.destination))
		.pipe(browserSync.stream());
}

export function extras() {
	return gulp.src(config.extras.source)
		.pipe(plumber())
		.pipe(gulp.dest(config.extras.destination))
		.pipe(browserSync.stream());
}

export function serve() {
	browserSync.init(config.browserSync);
	gulp.watch(config.html.source, html);
	gulp.watch(config.styles.source, styles);
	gulp.watch(config.scripts.source, scripts);
	gulp.watch(config.scripts.modules, modules);
	gulp.watch(config.media.source, media);
	gulp.watch(config.fonts.source, fonts);
}

export const clean = () => del(['dist']);

const tasks = gulp.parallel(styles, scripts, modules, html, media, fonts, extras);
export const build = gulp.series(clean, tasks);