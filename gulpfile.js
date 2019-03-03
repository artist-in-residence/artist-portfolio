var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
browserSync = require('browser-sync'),
mixins = require('postcss-mixins');


gulp.task('styles', styles);
function styles(done){
  return gulp.src('./app/css/styles.css')
  .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
  .on('error', function(errorInfo) {
    console.log(errorInfo.toString());
    this.emit('end');
  })
  .pipe(gulp.dest('./app/'));
  if(done) done();
};

gulp.task('watch', function() {

  browserSync.init({
    server: {
      baseDir: "app"
    },
    notify: false
  });

  watch('./app/index.html', function(){
      browserSync.reload();
  });

  watch('./app/css/**/*.css', gulp.series(gulp.parallel('styles')), function() {
      browserSync.reload();


  });
});
