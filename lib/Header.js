'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var label = _ref.label;

  var splitLabel = label.split(' ');

  return splitLabel.length > 1 ? _react2.default.createElement(
    'span',
    null,
    splitLabel[0],
    ' ',
    _react2.default.createElement(
      'span',
      { className: 'rbc-header-today-span' },
      splitLabel[1]
    )
  ) : _react2.default.createElement(
    'span',
    null,
    label
  );
};

exports.default = Header;
module.exports = exports['default'];