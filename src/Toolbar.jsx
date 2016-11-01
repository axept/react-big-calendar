import React from 'react';
import cn from 'classnames';
import message from './utils/messages';
import { navigate } from './utils/constants';

const Icon = ({ value }) => (
  <svg className={`rbc-toolbar-svg-${value}`} viewBox="0 0 32 32">
    <g>
        <polyline fill="none" stroke="#000000" strokeWidth="1" strokeMiterlimit="10" points="23.7,31.5 8.3,16 23.7,0.5" />
    </g>
  </svg>
);

const HeaderLabel = ({ label }) => {
  const labelSplit = label.split(' ');

  switch (labelSplit.length) {
    case 2:
      return (
        <span>
          <span className="rbc-toolbar-label-span">{labelSplit[0]}</span>&nbsp;
          {labelSplit[1]}
        </span>
      );

    case 3:
      return (
        <span>
          <span className="rbc-toolbar-label-span">{labelSplit[0]} {labelSplit[1]}</span>&nbsp;
          {labelSplit[2]}
        </span>
      );

    case 5:
      return (
        <span>
          {label}
        </span>
      );

    default:
      return (
        <span>
          {label}
        </span>
      );
  }

  return label;
};

let Toolbar = React.createClass({
  render() {
    let { messages, label } = this.props;

    messages = message(messages)

    return (
      <div className='rbc-toolbar'>
        <span className='rbc-toolbar-label'>
          <HeaderLabel label={label} />
        </span>

        <span className='rbc-btn-group'>
        {
          this.viewNamesGroup(messages)
        }
        </span>

        <span className='rbc-btn-group'>
          <button
            className="rbc-btn-prev"
            type='button'
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            <Icon value="prev" />
          </button>

          <button
            type='button'
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </button>

          <button
            className="rbc-btn-next"
            type='button'
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            <Icon value="next" />
          </button>
        </span>
      </div>
    );
  },

  navigate(action){
    this.props.onNavigate(action)
  },

  view(view){
    this.props.onViewChange(view)
  },

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return (
        viewNames.map(name =>
          <button type='button' key={name}
            className={cn({'rbc-active': view === name})}
            onClick={this.view.bind(null, name)}
          >
            {messages[name]}
          </button>
        )
      )
    }
  }
});

export default Toolbar;
