import React from 'react';

export default function StepPanel(props: {
  key?: string;
  selected: string | number;
  value: string | number;
  content: React.ReactNode;
}) {
  const {value, content, selected} = props;
  return (
    value === selected
      ? <div className={'panelContainer'} id={'StepPanel' + selected}>
        {content}
      </div>
      : null
  );
}
