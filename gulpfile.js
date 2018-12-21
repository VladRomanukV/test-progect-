var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
// var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var csslint = require('gulp-csslint');
var autoPrefixer = require('gulp-autoprefixer');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cmq = require('gulp-merge-media-queries');
var cleanCss = require('gulp-clean-css');
// var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pug = require('gulp-pug');
var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');
// add task fonts
// add it ro watch&build

gulp.task('stylus',function(){
	gulp.src([
		'source/styl/**/*.styl',
		'!source/styl/**/_*.styld'
		])
		.pipe(stylus())
		.pipe(autoPrefixer())
		.pipe(cmq({log:true}))
		.pipe(csslint())
		.pipe(csslint.formatter())
		.pipe(concat('main.css'))
		.pipe(gulp.dest('htdocs/css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cleanCss())
		.pipe(gulp.dest('htdocs/css'))
		.pipe(reload({stream: true, once: true}))
});
gulp.task('js',function(){
	gulp.src(['source/js/**/*.js'])
		.pipe(concat('main.js'))
		.pipe(browserify())
		.pipe(gulp.dest('htdocs/js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('htdocs/js'))
		.pipe(reload({stream: true, once: true}))
});

// remove gulp-jade with gulp-pug
gulp.task('pug',function(){
	gulp.src([
			'source/pug/**/*.pug',
			'!source/pug/**/_*.pug'
		])
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('htdocs/'))
		.pipe(reload({stream: true, once: true}))
});
gulp.task('image',function(){
	gulp.src(['source/img/**/*'])
		.pipe(cache(imageMin()))
		.pipe(gulp.dest('htdocs/img'))
		.pipe(reload({stream: true, once: true}))
});
 gulp.task('fonts', function() {
		return gulp.src('source/fonts/**/*')
		.pipe(gulp.dest('htdocs/fonts'))
	});
// remove gulp-jade with gulp-pug
// add task fonts here v
gulp.task('default',function(){
	browserSync.init({
		port: 3001,
		server: "./htdocs/"
	});
	gulp.watch('source/js/**/*.js',['js']);
	gulp.watch('source/styl/**/*.styl',['stylus']);
	gulp.watch('source/pug/**/*.pug',['pug']);
	gulp.watch('source/img/**/*',['image']);
	gulp.watch('source/fonts/**/*',['fonts']);
});
