const { series, src, dest } = require('gulp');
const ts = require('gulp-typescript');
const less = require('gulp-less');

function buildTs() {
  const tsProject = ts.createProject('tsconfig.json');

  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(dest('lib'));
}

function buildLess() {
  return src('components/**/*.less')
    .pipe(less())
    .pipe(dest('lib'));
}

exports.default = series(buildTs, buildLess);
