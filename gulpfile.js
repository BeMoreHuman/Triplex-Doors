var gulp = require('gulp');
	sass           = require('gulp-sass'),
	browserSync    = require('browser-sync'),
	cleanCSS       = require('gulp-clean-css'),
	rename         = require('gulp-rename'),
	autoprefixer   = require('gulp-autoprefixer'),
	notify         = require("gulp-notify");

// Скрипты проекта
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	});
});

gulp.task('scss', function() {
	return gulp.src([
		'app/scss/**/*.scss',
		])
	.pipe(sass().on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['scss', 'browser-sync'], function() {
	gulp.watch('app/scss/**/*.scss', ['scss']);
	gulp.watch('app/*.html', browserSync.reload);
});

// gulp.task('imagemin', function() {
// 	return gulp.src('app/img/**/*')
// 	.pipe(cache(imagemin()))
// 	.pipe(gulp.dest('dist/img')); 
// });

gulp.task('default', ['watch']);