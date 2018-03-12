// Super basic gulp file
const gulp = require('gulp');
const less = require('gulp-less');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify'); 
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const cleanCSS = require('gulp-clean-css');

gulp.task('less', () => {
	gulp.src('flexslider.less')
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('./'))
});

gulp.task('js', function () {
	gulp.src('jquery.flexslider.js')
		.pipe(uglify())
		.pipe(rename({ suffix: '-min' }))
		.pipe(gulp.dest('./'))
});

// Run all tasks.
gulp.task('default', ['less', 'js']);

// Watch for changes.
gulp.task('dev', function () {
	gulp.watch('**/*.js', ['js'])
	gulp.watch('**/*.less', ['less'])
});