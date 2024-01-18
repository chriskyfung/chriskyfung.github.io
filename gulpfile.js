const {src, dest, watch, series, parallel} = require('gulp');
const htmlmin = require('gulp-htmlmin');
const minifyInline = require('gulp-minify-inline');
const processIfModified = require('gulp-process-if-modified');

const through2 = require('through2');

const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create();
const gulpAmpValidator = require('gulp-amphtml-validator');
const amphtmlValidator = require('amphtml-validator');

function build(cb) {
  return src('./_site/**/*.html')
    .pipe(processIfModified())
    .pipe(
      through2.obj(async (file, _, cb) => {
        if (file.isBuffer()) {
          const optimizedHtml = await ampOptimizer.transformHtml(
            file.contents.toString()
          );
          file.contents = Buffer.from(optimizedHtml);
        }
        cb(null, file);
      })
    )
    .pipe(htmlmin({ collapseWhitespace: false }))
    .pipe(minifyInline())
    .pipe(dest('./_site/'));
}

function test() {
  return src('./_site/**/*.html')
      // Validate the input and attach the validation result to the "amp" property
      // of the file object.
      .pipe(gulpAmpValidator.validate())
      // Print the validation results to the console.
      .pipe(gulpAmpValidator.format())
      // Exit the process with error code (1) if an AMP validation error
      // occurred.
      .pipe(gulpAmpValidator.failAfterWarningOrError());
}

function validate() {
  return src('./_site/**/*.html')
    .pipe(
      through2.obj(async (file, _, cb) => {
        if (file.isBuffer()) {
          const validator = await amphtmlValidator.getInstance();
          const result = validator.validateString(file.contents.toString());
          if (result.status !== 'PASS') console.error(`\n${result.status}: ${file.relative}`);
          // (result.status === 'PASS' ? console.log : console.error)(result.status);
          for (var ii = 0; ii < result.errors.length; ii++) {
            var error = result.errors[ii];
            var msg =
              'line ' + error.line + ', col ' + error.col + ': ' + error.message;
            if (error.specUrl !== null) {
              msg += ' (see ' + error.specUrl + ')';
            }
            (error.severity === 'ERROR' ? console.error : console.warn)(msg);
          }     
        }
        cb(null, file);
      })
    );
}

exports.build = build;
exports.test = test;
exports.validate = validate;
