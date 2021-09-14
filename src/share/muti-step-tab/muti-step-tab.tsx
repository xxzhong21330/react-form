import React, {ReactNode, RefObject, useEffect, useImperativeHandle, useState} from 'react';
import style from './index.module.scss'
import './index.module.scss'
import {Tab, Tabs} from "@mui/material";
import StepPanel from "./step-panel";

export type StepTabPanel = ReactNode | ((index: number) => ReactNode);

export default function MutiStepTab(props: {
  tabBars: ReactNode[];
  // tabPanels支持传入生成函数，提供 tab index
  tabPanels?: StepTabPanel[];
  nextHandleRef?: RefObject<any>;
  disableSwitch?: boolean;
  canSwitchTab?: (index: number) => boolean;
  onTabChange?: (index: number) => void;
}) {
  const {
    tabBars,
    tabPanels = [],
    canSwitchTab,
    nextHandleRef,
    onTabChange,
    disableSwitch = false
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);

  //  监听 selectedIndex 变化
  useEffect(() => {
    //  调用父组件 onTabChange 方法
    if (onTabChange) {
      onTabChange(selectedIndex);
    }
  }, [selectedIndex, onTabChange]);

  // 检查当前是否允许切换 Tab, 返回值为 true 则允许切换，否则不允许切换
  function checkSwitchState(index: number): boolean {
    if (disableSwitch) {
      return false;
    }
    return !(canSwitchTab && !canSwitchTab(index));
  }

  function handleTabChange(event: React.SyntheticEvent, value: any) {
    if (checkSwitchState(value)) {
      setSelectedIndex(value);
    }
  }

  //  暴露 next 方法
  useImperativeHandle(nextHandleRef, () => ({
    next: () => {
      if (checkSwitchState(selectedIndex + 1)) {
        setSelectedIndex(selectedIndex + 1);
      }
    },
    previous: () => {
      if (checkSwitchState(selectedIndex - 1)) {
        setSelectedIndex(selectedIndex - 1);
      }
    },
    getCurrentIndex: () => {
      return selectedIndex;
    }
  }))

  const renderTabPanels = (tabPanes: StepTabPanel[]) => {

    const rnList = tabPanels.map((d, i) => {

        const node: ReactNode = typeof d === 'function' ? d(i) : d;
        return <StepPanel key={i + ''}
                          content={node}
                          value={i}
                          selected={selectedIndex}
        />;
      }
    )

    return rnList;
  }

  return (
    <div className={'mutiStepTab-container'}>
      <Tabs className={style.tabBar}
            value={selectedIndex}
            onChange={handleTabChange}
      >
        {tabBars.map((d, i) =>
          <Tab key={i} label={d} value={i}
               disabled={disableSwitch}
               disableRipple={disableSwitch}
          />
        )}
      </Tabs>
      <div className={'mutiStepTab-panel-wrap'}>
        {renderTabPanels(tabPanels)}
      </div>

    </div>

  );
}

