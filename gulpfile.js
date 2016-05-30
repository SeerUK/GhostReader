"use strict";

var bourbon = require("bourbon").includePaths;
var neat = require("bourbon-neat").includePaths;
var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");
var cssmin = require("gulp-clean-css");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var util = require("gulp-util");

var paths = {
    src: {
        js: [
            "node_modules/prismjs/prism.js",
            "node_modules/prismjs/components/prism-bash.js",
            "node_modules/prismjs/components/prism-css.js",
            "node_modules/prismjs/components/prism-css-extras.js",
            "node_modules/prismjs/components/prism-clike.js",
            "node_modules/prismjs/components/prism-docker.js",
            "node_modules/prismjs/components/prism-go.js",
            "node_modules/prismjs/components/prism-ini.js",
            "node_modules/prismjs/components/prism-java.js",
            "node_modules/prismjs/components/prism-javascript.js",
            "node_modules/prismjs/components/prism-json.js",
            "node_modules/prismjs/components/prism-kotlin.js",
            "node_modules/prismjs/components/prism-makefile.js",
            "node_modules/prismjs/components/prism-markdown.js",
            "node_modules/prismjs/components/prism-php.js",
            "node_modules/prismjs/components/prism-php-extras.js",
            "node_modules/prismjs/components/prism-protobuf.js",
            "node_modules/prismjs/components/prism-python.js",
            "node_modules/prismjs/components/prism-sass.js",
            "node_modules/prismjs/components/prism-scala.js",
            "node_modules/prismjs/components/prism-scss.js",
            "node_modules/prismjs/components/prism-sql.js",
            "node_modules/prismjs/components/prism-sqift.js",
            "node_modules/prismjs/components/prism-twig.js",
            "node_modules/prismjs/components/prism-vim.js",
            "node_modules/prismjs/components/prism-yaml.js",
        ],
        scss: "src/scss/style.scss"
    },
    dst: {
        css: "assets/css/",
        js: "assets/js/"
    },
    watch: {
        scss: "src/scss/**/*.scss"
    }
};

gulp.task("js", function() {
    return gulp.src(paths.src.js)
        .pipe(sourcemaps.init())
        .pipe(concat("scripts.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dst.js));
});

gulp.task("scss", function() {
    return gulp.src(paths.src.scss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(paths.dst.css));
});

gulp.task("watch-scss", function() {
    gulp.watch(paths.watch.scss, ["scss"]);
});

gulp.task("watch", ["build", "watch-scss"]);
gulp.task("build", ["js", "scss"]);
