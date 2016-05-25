"use strict";

var bourbon = require("bourbon").includePaths;
var neat = require("bourbon-neat").includePaths;
var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var cssnano = require("gulp-cssnano");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var util = require("gulp-util");

var paths = {
    src: {
        scss: "src/scss/style.scss"
    },
    dst: {
        css: "assets/css/"
    },
    watch: {
        scss: "src/scss/**/*.scss"
    }
};

gulp.task("scss", function() {
    return gulp.src(paths.src.scss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(paths.dst.css));
});

gulp.task("watch-scss", function(cb) {
    gulp.start("scss");
    gulp.watch(paths.watch.scss, ["scss"]);
});

gulp.task("watch", ["watch-scss"]);
