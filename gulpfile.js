var gulp            = require('gulp');
var sass            = require('gulp-sass');
var browserSync     = require('browser-sync').create();
var minify          = require('gulp-babel-minify');
var imagemin        = require('gulp-imagemin');
var autoprefixer    = require('autoprefixer');
var cssnano         = require('cssnano');
var postcss         = require('gulp-postcss');
var sourcemaps      = require('gulp-sourcemaps');
var cache           = require('gulp-cache');
var webpack         = require('webpack');
const webpackConfig = require('./webpack.config');
var spawn           = require('cross-spawn');
var del             = require('del');
var purgecss           = require('@fullhuman/postcss-purgecss');

// Utils

gulp.task('clear_cache', (done) => {
  cache.clearAll();
  done();  
})

// Processing

gulp.task('sass', () => {
    var plugins = [
        autoprefixer({}),
        cssnano()
    ];
    return gulp.src('_src/scss/**/*.+(scss|css)')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError)) // Using gulp-sass
      // Minify and prefix css
      .pipe(postcss(plugins))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/css/'))
  });

  gulp.task('sassDev', () => {
    var plugins = [
        autoprefixer({}),
        cssnano()
    ];
    return gulp.src('_src/scss/**/*.+(scss|css)')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError)) // Using gulp-sass
      // Minify and prefix css
      .pipe(postcss(plugins))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('_site/dist/css/'))
      .pipe(browserSync.stream())
  });

  gulp.task('images', () => {
    return gulp.src('_src/img/**/*.+(png|jpg|jpeg|gif|svg|webp)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest('dist/img/'))
  });

  gulp.task('del', async (cb) => {
      await del(['./dist/+(img|css|js)']);
  });

// gulp.task('minifyjs', () => {
//     return gulp.src('src/assets/js/*.js')
//     .pipe(sourcemaps.init())
//     .pipe(minify())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('dist/assets/js/'));
// });

gulp.task('webpack', () =>{
    return new Promise((resolve, reject) => {
        webpack(webpackConfig, (err, stats) => {
            if (err) {
                return reject(err)
            }
            if (stats.hasErrors()) {
                return reject(new Error(stats.compilation.errors.join('\n')))
            }
            resolve()
        })
    })}
)

gulp.task('jekyll', (cb) => {
  var cmd = spawn('bundle',
  [
    'exec',
    'jekyll',
    'build',
    '--safe'
  ],
  {stdio:'inherit'});
  cmd.on('close', (code) => {
    console.log('Jekyll exited with code ' + code);
    cb(code);
  });
});

// DEV SERVER

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
          baseDir: '_site'
        },
        open: true,
    });
});

gulp.task('watch', gulp.series([
  'del',
  'sass',
  'webpack',
  'images',
  'jekyll',
  gulp.parallel([
  'browserSync',
  () => {
    gulp.watch(['./_src/scss/**/*.scss','_sass/**/*.scss'],
    gulp.series('sassDev'));
    // Reloads the browser whenever HTML or JS files change
    gulp.watch([
      '+(_includes|_posts|_layouts)/**/*.+(html|md)',
      './*.+(html|md)'
    ]).on("change", gulp.series(['jekyll', browserSync.reload]));
    gulp.watch('_src/**/*.js').on('change', gulp.series([
      'webpack',
      'jekyll',
      browserSync.reload
    ]))
}])]));

// This task does not work....
gulp.task('purgecss', gulp.series([
  'sass',
  'webpack',
  'jekyll',
  () => {
    return gulp.src('./_site/dist/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([purgecss({
      content: ['./_site/**/*.html']
      })
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('/dist/css/'));
  }]));

// Build site

gulp.task('build', gulp.series([
    'del',
    'sass',
    'images',
    'webpack',
    'purgecss',
    // Not including jekyll, as remote will build pages anyway
    (done) => {console.log('Done! You can now commit and push!');done();}
]));
