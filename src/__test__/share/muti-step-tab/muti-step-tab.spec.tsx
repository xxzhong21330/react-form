import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import StepPanel from "../../../share/muti-step-tab/step-panel";
import MutiStepTab from "../../../share/muti-step-tab/muti-step-tab";
import React, {ReactNode, RefObject} from "react";
import {findByText, queryByText, waitFor} from "@testing-library/react";


let container: HTMLElement = null as any;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
})

afterEach(() => {
  unmountComponentAtNode(container as HTMLElement);
  container?.remove();
  container = null as any;
})

describe('step-panel', () => {
  it('组件渲染', function () {
    act(() => {
      render(<StepPanel content={<div>abc</div>} value={0} selected={0}/>, container)
    })

    expect(container.querySelector('.panelContainer')?.textContent).toEqual('abc')
  });
})


describe('MutiStepTab', () => {
  const tabBars_default = [
    <div id={'tabBar1'}>a</div>,
    <div id={'tabBar2'}>b</div>,
  ];
  const tabPanels_default = [
    <div>a_panel</div>,
    <div>b_panel</div>,
  ];

  function renderMutiStepTab(config: {
    tabBars?: ReactNode[];
    tabPanels?: ReactNode[];
    nextHandleRef?: RefObject<any>;
    disableSwitch?: boolean;
    canSwitchTab?: (index: number) => boolean;
    onTabChange?: (index: number) => void;
  }) {
    const {
      tabBars = tabBars_default,
      tabPanels = tabPanels_default,
      nextHandleRef,
      disableSwitch = false,
      canSwitchTab = () => true,
      onTabChange = () => {
      },
    } = config;

    act(() => {
      render(
        (
          <MutiStepTab tabBars={tabBars}
                       tabPanels={tabPanels}
                       nextHandleRef={nextHandleRef}
                       disableSwitch={disableSwitch}
                       canSwitchTab={canSwitchTab}
                       onTabChange={onTabChange}
          />
        )
        , container)
    })
  }


  it('初次渲染', function () {
    renderMutiStepTab({});
    //  tabBar
    expect(
      container
        .querySelector('.mutiStepTab-container .MuiTabs-flexContainer ')
        ?.textContent
    ).toEqual('ab')

    //  tabPanel 首次渲染
    const panelContainer = container
      .querySelector('.mutiStepTab-container .panelContainer');
    expect(panelContainer?.textContent).toEqual('a_panel');
  });

  it('tab 切换功能、handleTabChange()方法、', async () => {
    const handleRef = React.createRef<any>();
    const handleTabChange = jest.fn();
    renderMutiStepTab({
      nextHandleRef: handleRef,
      onTabChange: handleTabChange,
    });
    //  点击切换
    act(() => {
      container.querySelector('#tabBar2')?.dispatchEvent(
        new Event('click', {bubbles: true})
      );
    });
    await findByText(container, 'b_panel');

    //  暴露的调用方法 handleRef previous
    act(() => {
      handleRef.current.previous();
    })
    await findByText(container, 'a_panel');
    expect(handleTabChange).toBeCalledWith(0);
    expect(handleRef.current.getCurrentIndex()).toEqual(0);
    // next()
    act(() => {
      handleRef.current.next();
    });
    await findByText(container, 'b_panel');
    expect(handleTabChange).toBeCalledWith(1);
    expect(handleRef.current.getCurrentIndex()).toEqual(1);
  });

  it('disableSwitch 属性', async function () {
    const handleRef = React.createRef<any>();
    renderMutiStepTab({
      disableSwitch: true,
      nextHandleRef: handleRef,
    });
    //  点击
    act(() => {
      container.querySelector('#tabBar2')?.dispatchEvent(
        new Event('click', {bubbles: true})
      );
    });
    await waitFor(() => {
      expect(queryByText(container, 'b_panel')).toBeNull();
    });

    //  调用方法
    handleRef.current.next();
    await waitFor(() => {
      expect(queryByText(container, 'b_panel')).toBeNull();
    });
  });

  it('canSwitchTab 方法禁用切换', async function () {
    const handleRef = React.createRef<any>();
    const canSwitchTab = () => false;
    renderMutiStepTab({
      nextHandleRef: handleRef,
      canSwitchTab,
    });

    //  点击
    act(() => {
      container.querySelector('#tabBar2')?.dispatchEvent(
        new Event('click', {bubbles: true})
      );
    });
    await waitFor(() => {
      expect(queryByText(container, 'b_panel')).toBeNull();
    });

    //  调用方法
    handleRef.current.next();
    await waitFor(() => {
      expect(queryByText(container, 'b_panel')).toBeNull();
    });
  });

})
