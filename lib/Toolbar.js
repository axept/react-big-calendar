'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _messages = require('./utils/messages');

var _messages2 = _interopRequireDefault(_messages);

var _constants = require('./utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function Icon(_ref) {
  var value = _ref.value;
  return _react2.default.createElement(
    'svg',
    { className: 'rbc-toolbar-svg-' + value, viewBox: '0 0 32 32' },
    _react2.default.createElement(
      'g',
      null,
      _react2.default.createElement('polyline', { fill: 'none', stroke: '#000000', strokeWidth: '1', strokeMiterlimit: '10', points: '23.7,31.5 8.3,16 23.7,0.5' })
    )
  );
};

var HeaderLabel = function HeaderLabel(_ref2) {
  var label = _ref2.label;

  var labelSplit = label.split(' ');

  switch (labelSplit.length) {
    case 2:
      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'span',
          { className: 'rbc-toolbar-label-span' },
          labelSplit[0]
        ),
        '\xA0',
        labelSplit[1]
      );

    case 3:
      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'span',
          { className: 'rbc-toolbar-label-span' },
          labelSplit[0],
          ' ',
          labelSplit[1]
        ),
        '\xA0',
        labelSplit[2]
      );

    case 5:
      return _react2.default.createElement(
        'span',
        null,
        label
      );

    default:
      return _react2.default.createElement(
        'span',
        null,
        label
      );
  }

  return label;
};

var Toolbar = _react2.default.createClass({
  displayName: 'Toolbar',
  render: function render() {
    var _props = this.props,
        messages = _props.messages,
        label = _props.label;


    messages = (0, _messages2.default)(messages);

    return _react2.default.createElement(
      'div',
      { className: 'rbc-toolbar' },
      _react2.default.createElement(
        'span',
        { className: 'rbc-toolbar-label' },
        _react2.default.createElement(HeaderLabel, { label: label })
      ),
      _react2.default.createElement(
        'span',
        { className: 'rbc-btn-group' },
        this.viewNamesGroup(messages)
      ),
      _react2.default.createElement(
        'span',
        { className: 'rbc-btn-group' },
        _react2.default.createElement(
          'button',
          {
            className: 'rbc-btn-prev',
            type: 'button',
            onClick: this.navigate.bind(null, _constants.navigate.PREVIOUS)
          },
          _react2.default.createElement(Icon, { value: 'prev' })
        ),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            onClick: this.navigate.bind(null, _constants.navigate.TODAY)
          },
          messages.today
        ),
        _react2.default.createElement(
          'button',
          {
            className: 'rbc-btn-next',
            type: 'button',
            onClick: this.navigate.bind(null, _constants.navigate.NEXT)
          },
          _react2.default.createElement(Icon, { value: 'next' })
        )
      )
    );
  },
  navigate: function navigate(action) {
    this.props.onNavigate(action);
  },
  view: function view(_view) {
    this.props.onViewChange(_view);
  },
  viewNamesGroup: function viewNamesGroup(messages) {
    var _this = this;

    var viewNames = this.props.views;
    var view = this.props.view;

    if (viewNames.length > 1) {
      return viewNames.map(function (name) {
        return _react2.default.createElement(
          'button',
          { type: 'button', key: name,
            className: (0, _classnames2.default)({ 'rbc-active': view === name }),
            onClick: _this.view.bind(null, name)
          },
          messages[name]
        );
      });
    }
  }
});

exports.default = Toolbar;
module.exports = exports['default'];