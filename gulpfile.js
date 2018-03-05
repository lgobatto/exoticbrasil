/**
 * Created by lgobatto on 19/12/16.
 */
var argv = require('minimist')(process.argv.slice(2));
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var lazypipe = require('lazypipe');
var less = require('gulp-less');
var merge = require('merge-stream');
var cssNano = require('gulp-cssnano');
var plumber = require('gulp-plumber');
var rev = require('gulp-rev');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

// See https://github.com/austinpray/asset-builder
var manifest = require('asset-builder')('./content/themes/theme/assets/manifest.json');
var path = manifest.paths;
var config = manifest.config || {};

// `globs` - These ultimately end up in their respective `gulp.src`.
// - `globs.js` - Array of asset-builder JS dependency objects. Example:
//   ```
//   {type: 'js', name: 'main.js', globs: []}
//   ```
// - `globs.css` - Array of asset-builder CSS dependency objects. Example:
//   ```
//   {type: 'css', name: 'main.css', globs: []}
//   ```
// - `globs.fonts` - Array of font path globs.
// - `globs.images` - Array of image path globs.
// - `globs.bower` - Array of all the main Bower files.
var globs = manifest.globs;
var project = manifest.getProjectGlobs();
var enabled = {
    rev: argv.production,
    maps: !argv.production,
    failStyleTask: argv.production,
    failJSHint: argv.production,
    stripJSDebug: argv.production
};
var revManifest = path.dist + 'assets.json';
var cssTasks = function (filename) {
    return lazypipe()
        .pipe(function () {
            return gulpif(!enabled.failStyleTask, plumber());
        })
        .pipe(function () {
            return gulpif(enabled.maps, sourcemaps.init({loadMaps: true, largeFile: true}));
        })
        .pipe(function () {
            return gulpif('*.less', less());
        })
        .pipe(function () {
            return gulpif('*.scss', sass({
                outputStyle: 'expanded', // libsass doesn't support expanded yet
                precision: 10,
                includePaths: ['.'],
                errLogToConsole: !enabled.failStyleTask
            }));
        })
        .pipe(autoprefixer, {
            browsers: [
                'last 2 versions', 'ie >= 9', 'and_chr >= 2.3'
            ]
        })
        .pipe(concat, filename)
        .pipe(cssNano, {
            safe: true
        })
        .pipe(function () {
            return gulpif(enabled.rev, rev());
        })
        .pipe(function () {
            return gulpif(enabled.maps, sourcemaps.write('.'));
        })();
};
var jsTasks = function (filename) {
    return lazypipe()
        .pipe(function () {
            return gulpif(enabled.maps, sourcemaps.init());
        })
        .pipe(concat, filename)
        .pipe(uglify, {
            compress: {
                'drop_debugger': enabled.stripJSDebug
            }
        })
        .pipe(function () {
            return gulpif(enabled.rev, rev());
        })
        .pipe(function () {
            return gulpif(enabled.maps, sourcemaps.write('.', {
                sourceRoot: 'assets/scripts/'
            }));
        })();
};
var writeToManifest = function (directory) {
    return lazypipe()
        .pipe(gulp.dest, path.dist + directory)
        .pipe(browserSync.stream, {match: '**/*.{js,css}'})
        .pipe(rev.manifest, revManifest, {
            base: path.dist,
            merge: true
        })
        .pipe(gulp.dest, path.dist)();
};
gulp.task('styles', ['wiredep'], function () {
    var merged = merge();
    manifest.forEachDependency('css', function (dep) {
        var cssTasksInstance = cssTasks(dep.name);
        if (!enabled.failStyleTask) {
            cssTasksInstance.on('error', function (err) {
                console.error(err.message);
                this.emit('end');
            });
        }
        merged.add(gulp.src(dep.globs, {base: 'styles'})
            .pipe(cssTasksInstance));
    });
    return merged
        .pipe(writeToManifest('styles'));
});
gulp.task('scripts', ['jshint'], function () {
    var merged = merge();
    manifest.forEachDependency('js', function (dep) {
        merged.add(
            gulp.src(dep.globs, {base: 'scripts'})
                .pipe(jsTasks(dep.name))
        );
    });
    return merged
        .pipe(writeToManifest('scripts'));
});
gulp.task('fonts', function () {
    return gulp.src(globs.fonts)
        .pipe(flatten())
        .pipe(gulp.dest(path.dist + 'fonts'))
        .pipe(browserSync.stream());
});
gulp.task('images', function () {
    return gulp.src(globs.images)
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
        }))
        .pipe(gulp.dest(path.dist + 'images'))
        .pipe(browserSync.stream());
});
gulp.task('jshint', function () {
    return gulp.src([
        'bower.json', 'gulpfile.js'
    ].concat(project.js))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulpif(enabled.failJSHint, jshint.reporter('fail')));
});
gulp.task('clean', require('del').bind(null, [path.dist]));
gulp.task('watch', function () {
    browserSync.init({
        files: ['{lib,templates}/**/*.php', '*.php', './content/themes/theme/*.php'],
        proxy: config.devUrl,
        open: false,
        snippetOptions: {
            whitelist: ['/wp-admin/admin-ajax.php'],
            blacklist: ['/wp-admin/**']
        }
    });
    gulp.watch([path.source + 'styles/**/*'], ['styles']);
    gulp.watch([path.source + 'scripts/**/*'], ['jshint', 'scripts']);
    gulp.watch([path.source + 'fonts/**/*'], ['fonts']);
    gulp.watch([path.source + 'images/**/*'], ['images']);
    gulp.watch(['bower.json', 'content/themes/theme/assets/manifest.json'], ['build']);

});
gulp.task('build', function (callback) {
    runSequence('styles',
        'scripts',
        ['fonts', 'images'],
        callback);
});
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;
    return gulp.src(project.css)
        .pipe(wiredep())
        .pipe(changed(path.source + 'styles', {
            hasChanged: changed.compareSha1Digest
        }))
        .pipe(gulp.dest(path.source + 'styles'));
});
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});