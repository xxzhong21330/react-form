(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{141:function(e,t,n){},142:function(e,t,n){},168:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),l=n(51),i=n.n(l),u=(n(141),n(142),n(10)),c=n(120),s=n(37),o=n(43),d=n(3),h=n(19),v=n.n(h),f=n(99),j=n.n(f),m=n(215),b=n(222),p=n(2);function O(e){var t=e.value,n=e.content,r=e.selected;return t===r?Object(p.jsx)("div",{className:"panelContainer",id:"StepPanel"+r,children:n}):null}function x(e){var t=e.tabBars,n=e.tabPanels,a=void 0===n?[]:n,l=e.canSwitchTab,i=e.nextHandleRef,c=e.onTabChange,s=e.disableSwitch,o=void 0!==s&&s,d=Object(r.useState)(0),h=Object(u.a)(d,2),v=h[0],f=h[1];Object(r.useEffect)((function(){c&&c(v)}),[v,c]),Object(r.useImperativeHandle)(i,(function(){return{next:function(){f(v+1)},previous:function(){f(v-1)},getCurrentIndex:function(){return v}}}));return Object(p.jsxs)("div",{className:"mutiStepTab-container",children:[Object(p.jsx)(m.a,{className:j.a.tabBar,value:v,onChange:function(e,t){o||l&&!l(t)||f(t)},children:t.map((function(e,t){return Object(p.jsx)(b.a,{label:e,value:t,disabled:o,disableRipple:o},t)}))}),Object(p.jsx)("div",{className:"mutiStepTab-panel-wrap",children:a.map((function(e,t){var n="function"===typeof e?e(t):e;return Object(p.jsx)(O,{content:n,value:t,selected:v},t+"")}))})]})}var g,_=n(122),C=n.n(_),y=n(87),V=n(209),N=n(210),k=n(217);function S(e,t){return t.reduce((function(t,n){var r=e.get(n);return r.updateState({onlySelf:!1}),t&&r.isValid}),!0)}!function(e){e.meal="meal",e.peopleNum="peopleNum",e.restaurant="restaurant",e.dishList="dishList"}(g||(g={}));var F=n(218),w=n(219),P=n(212),D=n(216),B=n(225),E=n(226),L=n(213);function M(e,t){return e.reduce((function(e,n){var r=n[t];return Array.isArray(r)?Object(L.a)(e,r):null==r?e:Object(L.a)(e,[r])}),[])}function R(e){return M(e,"availableMeals")}function W(e){var t,n,r,a=e.mealData,l=e.formRef,i=e.handleFormChange,u=l.current;return Object(p.jsxs)("div",{children:[Object(p.jsx)(F.a,{style:{textAlign:"left"},children:"Please Select a meal:"}),Object(p.jsxs)(w.a,{fullWidth:!0,error:!u.get(g.meal).isValid,children:[Object(p.jsx)(P.a,{labelId:"select-meal-label",id:"select-meal",value:u.get(g.meal).value,onChange:function(e){i(g.meal,e.target.value)},children:R(a).map((function(e,t){return Object(p.jsx)(D.a,{value:e,children:e},"key"+t)}))}),(null===(t=u.get(g.meal).error)||void 0===t?void 0:t.require)?Object(p.jsx)(B.a,{children:"Must Select Meal"}):null]}),Object(p.jsx)(F.a,{style:{textAlign:"left"},children:"Please Enter Number Of People:"}),Object(p.jsx)(E.a,{fullWidth:!0,id:"standard-number",type:"number",value:u.get(g.peopleNum).value,onChange:function(e){i(g.peopleNum,e.target.value)},error:!u.get(g.peopleNum).isValid}),(null===(n=u.get(g.peopleNum).error)||void 0===n?void 0:n.min)?Object(p.jsx)(B.a,{className:"Mui-error",children:"Number must be greater than or equal to 1"}):null,(null===(r=u.get(g.peopleNum).error)||void 0===r?void 0:r.max)?Object(p.jsx)(B.a,{className:"Mui-error",children:"Number must be less than or equal to 10"}):null]})}var q=n(227),A=n(70),T=n(94),I=n(93),z=n(80),H=function(){function e(){Object(s.a)(this,e)}return Object(o.a)(e,null,[{key:"require",value:function(e){var t=e.value;return null==t||0===t.length?{require:!0}:null}},{key:"min",value:function(e){return function(t){return t.value<e?{min:!0}:null}}},{key:"max",value:function(e){return function(t){return t.value>e?{max:!0}:null}}}]),e}(),J=function(){function e(t,n){Object(s.a)(this,e),this._parent=null,this._validators=[],this._value=void 0,this._errors=null,this._isValid=!0,this._value=t,this._validators=n}return Object(o.a)(e,[{key:"value",get:function(){return this._value}},{key:"error",get:function(){return this._errors}},{key:"isValid",get:function(){return this._isValid}},{key:"setValue",value:function(e,t){this._value=e,this.updateState(t),this._synchronizeParentValue()}},{key:"setParent",value:function(e){this._parent=e}},{key:"updateState",value:function(t){var n,r=!0;((this instanceof K||this instanceof U)&&this._forEachChild((function(e){r=r&&e.isValid})),this._isValid=!!r&&e.executeCurrentValidators(this),!0!==(null===t||void 0===t?void 0:t.onlySelf))&&(null===(n=this._parent)||void 0===n||n.updateState())}},{key:"removeValidator",value:function(){this._validators=[]}},{key:"addValidators",value:function(e){this._validators=this._validators.concat(e)}},{key:"_synchronizeParentValue",value:function(){for(var e=this._parent;null!=e;)(e instanceof K||e instanceof U)&&e._refreshValue(),e=e._parent}}],[{key:"executeCurrentValidators",value:function(t){var n,r=Object(z.a)(t._validators);try{for(r.s();!(n=r.n()).done;){var a=(0,n.value)(t);if(null!=a)return t._errors=a,t._isValid=!1,!1}}catch(a){r.e(a)}finally{r.f()}var l=!0;return(t instanceof K||t instanceof U)&&t._forEachChild((function(t){l=l&&e.executeCurrentValidators(t)})),l?(t._errors=null,t._isValid=!0,!0):(t._isValid=!1,!1)}}]),e}(),G=function(e){Object(T.a)(n,e);var t=Object(I.a)(n);function n(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(s.a)(this,n),t.call(this,e,r)}return n}(J),K=function(e){Object(T.a)(n,e);var t=Object(I.a)(n);function n(e){var r,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(s.a)(this,n),(r=t.call(this,n.parseValueFormControls(e),a)).controls={},r.controls=e,r._forEachChild((function(e){return e.setParent(Object(A.a)(r))})),r}return Object(o.a)(n,[{key:"setValue",value:function(e,t){var r=this;this._value=n.parseValueFormControls(e),this.controls=e,this._forEachChild((function(e){return e.setParent(r)})),this.updateState(t),this._synchronizeParentValue()}},{key:"get",value:function(e){var t=this.controls[e];return null==t&&console.error("formGroup \u4e2d\u6ca1\u6709\u5bf9\u5e94\u7684\u8868\u5355\u9879"),t}},{key:"_forEachChild",value:function(e){Object.values(this.controls).forEach((function(t){return e(t)}))}},{key:"_refreshValue",value:function(){this._value=n.parseValueFormControls(this.controls)}}],[{key:"parseValueFormControls",value:function(e){return"[object Object]"!==Object.prototype.toString.call(e)?(console.error("ngFormGroup \u53ea\u652f\u6301\u5bf9\u8c61\u53c2\u6570"),{}):Object.entries(e).reduce((function(e,t){var n=Object(u.a)(t,2),r=n[0],a=n[1];return e[r]=a.value,e}),{})}}]),n}(J),U=function(e){Object(T.a)(n,e);var t=Object(I.a)(n);function n(e){var r,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(s.a)(this,n),(r=t.call(this,n.parseValueFormControls(e),a)).controls=[],r.controls=e,r._forEachChild((function(e){return e.setParent(Object(A.a)(r))})),r}return Object(o.a)(n,[{key:"setValue",value:function(e,t){var r=this;this._value=n.parseValueFormControls(e),this.controls=e,this._forEachChild((function(e){return e.setParent(r)})),this.updateState(t),this._synchronizeParentValue()}},{key:"_forEachChild",value:function(e){this.controls.forEach((function(t){return e(t)}))}},{key:"_refreshValue",value:function(){this._value=n.parseValueFormControls(this.controls)}},{key:"addControl",value:function(e){this.controls.push(e),e.setParent(this),this._value=n.parseValueFormControls(this.controls)}},{key:"removeControl",value:function(e){this.controls.splice(e,1),this._value=n.parseValueFormControls(this.controls)}}],[{key:"parseValueFormControls",value:function(e){return e.map((function(e){return e.value}))}}]),n}(J),Q=n(211);function X(e){var t,n=e.mealData,r=e.formRef,a=e.handleFormChange,l=r.current,i=function(e){a(g.restaurant,e.target.value)};return Object(p.jsxs)("div",{children:[Object(p.jsx)(F.a,{style:{textAlign:"left"},children:"Please Select a Restaurant:"}),Object(p.jsxs)(w.a,{fullWidth:!0,error:!l.get(g.restaurant).isValid,children:[function(){var e=function(e,t){var n=t.get(g.meal).value;return M(e.filter((function(e){return e.availableMeals.includes(n)})),"restaurant")}(n,l),t=l.get(g.restaurant).value;return e.includes(t)||l.get(g.restaurant).setValue(""),Object(p.jsx)(P.a,{labelId:"select-meal-label",id:"select-meal",value:l.get(g.restaurant).value,onChange:i,children:e.map((function(e,t){return Object(p.jsx)(D.a,{value:e,children:e},"key"+t)}))})}(),(null===(t=l.get(g.restaurant).error)||void 0===t?void 0:t.require)?Object(p.jsx)(B.a,{children:"Must Select Restaurant"}):null]})]})}function Y(){return new K({dish:new G("",[H.require]),num:new G("1")})}function Z(e,t){var n=e.get(g.peopleNum).value,r=0;return t._forEachChild((function(e){r+=+e.get("num").value})),n<=r?null:{lackOfDish:!0}}function $(e){var t,n=e.mealData,r=e.formRef,a=e.handleFormChange,l=r.current,i=l.get(g.meal).value,u=l.get(g.restaurant).value,c=l.get(g.dishList).value,s=l.get(g.dishList),o=n.filter((function(e){return e.restaurant===u&&e.availableMeals.includes(i)}));s.isValid&&(s.removeValidator(),s.addValidators([Z.bind(void 0,l)]));var d=function(e,t){var n=c.slice(0,t).map((function(e){return e.dish})),r=o.filter((function(e){return!n.includes(e.name)}));return Object(p.jsx)(P.a,{labelId:"select-dish-label"+t,id:"select-dish"+t,value:e.get("dish").value,onChange:function(e){var n,r;n=t,r=e,s.controls[n].get("dish").setValue(r.target.value),a(g.dishList,null)},children:r.map((function(e){return Object(p.jsx)(D.a,{value:e.name,children:e.name},e.name)}))})},h=function(e){s.controls.length<=1||(s.removeControl(e),a(g.dishList,null))};return Object(p.jsxs)("div",{children:[Object(p.jsxs)("div",{className:"".concat(v.a.threeColumn," ").concat(v.a.caption),children:[Object(p.jsx)("div",{children:"Please Select a Dish"}),Object(p.jsx)("div",{children:"Please Enter Number of Serving"})]}),function(){var e=o.map((function(e){return e.name}));return c.every((function(t){return""===t.dish||e.includes(t.dish)}))||s.setValue([Y()]),s.controls.map((function(e,t){var n;return Object(p.jsxs)("div",{className:v.a.threeColumn,children:[Object(p.jsx)("div",{children:Object(p.jsxs)(w.a,{fullWidth:!0,error:!e.get("dish").isValid,children:[d(e,t),(null===(n=e.get("dish").error)||void 0===n?void 0:n.require)?Object(p.jsx)(B.a,{children:"Must Select a Dish"}):null]})}),Object(p.jsx)("div",{children:Object(p.jsx)(E.a,{fullWidth:!0,id:"standard-number",type:"number",value:e.get("num").value,error:!e.get("num").isValid,onChange:function(e){var n,r;n=t,+(r=e).target.value<1||(s.controls[n].get("num").setValue(r.target.value),a(g.dishList,null))}})}),Object(p.jsx)(q.a,{className:v.a.deleteBtn,size:"small",onClick:function(){return h(t)},variant:"contained",color:"secondary",disabled:c.length<=1,children:"Delete"})]},t)}))}(),Object(p.jsx)(B.a,{className:"Mui-error",children:s.controls.every((function(e){return e.isValid}))&&(null===(t=s.error)||void 0===t?void 0:t.lackOfDish)?"Total dish number must be greater than or equal to people number":""}),c.length===o.length?null:Object(p.jsx)("div",{className:v.a.addDishBtnWrap,children:Object(p.jsx)(q.a,{variant:"contained",onClick:function(){var e,t=!0,n=Object(z.a)(s.controls);try{for(n.s();!(e=n.n()).done;){var r=e.value;if(r.updateState({onlySelf:!0}),!(t=t&&r.isValid))return void a(g.dishList,null)}}catch(i){n.e(i)}finally{n.f()}if(c.length!==o.length){var l=Y();l.updateState(),s.addControl(l),a(g.dishList,null)}},children:"add Dish"})})]})}function ee(e){var t=e.formRef.current.value;return Object(p.jsxs)("div",{className:v.a.reviewContainer,children:[Object(p.jsxs)("div",{className:v.a.reviewColumn,children:[Object(p.jsx)("div",{children:"Meal:"}),Object(p.jsx)("div",{children:t[g.meal]})]}),Object(p.jsxs)("div",{className:v.a.reviewColumn,children:[Object(p.jsx)("div",{children:"No. of People:"}),Object(p.jsx)("div",{children:t[g.peopleNum]})]}),Object(p.jsxs)("div",{className:v.a.reviewColumn,children:[Object(p.jsx)("div",{children:"Restaurant:"}),Object(p.jsx)("div",{children:t[g.restaurant]})]}),Object(p.jsxs)("div",{className:v.a.reviewColumn,children:[Object(p.jsx)("div",{children:"Dishes:"}),Object(p.jsx)("div",{children:t[g.dishList].map((function(e,t){return Object(p.jsxs)("div",{children:[e.dish," - ",e.num," "]},t)}))})]})]})}function te(){var e;return new K((e={},Object(d.a)(e,g.meal,new G("",[H.require])),Object(d.a)(e,g.peopleNum,new G("1",[H.min(1),H.max(10)])),Object(d.a)(e,g.restaurant,new G("",[H.require])),Object(d.a)(e,g.dishList,new U([Y()])),e))}var ne=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;Object(s.a)(this,e),this._reactNode=null,this._customValidator=void 0,this._reactNode=t,this._customValidator=n}return Object(o.a)(e,[{key:"getNode",value:function(){return this._reactNode}},{key:"updateValidity",value:function(e){return!this._customValidator||this._customValidator(e)}}]),e}();function re(e,t,n){var r=a.a.createElement(e,Object(c.a)({},t));return new ne(r,n)}function ae(e){return S(e,[g.meal,g.peopleNum])}function le(e){return S(e,[g.restaurant])}function ie(e){return S(e,[g.dishList])}function ue(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],a=t[1],l=Object(r.useState)({current:te()}),i=Object(u.a)(l,2),c=i[0],s=i[1],o=Object(r.useState)(0),d=Object(u.a)(o,2),h=d[0],f=d[1];Object(r.useEffect)((function(){Object(y.a)(C.a.get("/dishes.json")).pipe(Object(V.a)((function(e){var t;return(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.dishes)||[]})),Object(N.a)((function(e){return console.error("\u8bf7\u6c42\u5f02\u5e38"),Object(k.a)([])}))).subscribe((function(e){a(e)}))}),[]);var j=function(e,t){var n=Object(Q.a)(c),r=n.current;switch(e){case g.peopleNum:if(t<0)break;r.get(e).setValue(t);break;case g.dishList:break;default:r.get(e).setValue(t)}s(n)},m=[Object(p.jsx)("div",{children:"step1"},"step1"),Object(p.jsx)("div",{children:"step2"},"step2"),Object(p.jsx)("div",{children:"step3"},"step3"),Object(p.jsx)("div",{children:"review"},"step4")],b=re(W,{key:"StepComponent1",mealData:n,formRef:c,handleFormChange:j},ae),O=re(X,{key:"StepComponent2",mealData:n,formRef:c,handleFormChange:j},le),_=re($,{key:"StepComponent3",mealData:n,formRef:c,handleFormChange:j},ie),S=re(ee,{key:"StepComponent4",formRef:c}),F=[b.getNode(),O.getNode(),_.getNode(),S.getNode()],w=[b,O,_,S],P=function(e){return w[null==e?h:e].updateValidity(c.current)},D=Object(r.useRef)(null),B=function(){var e;P()?(null==D.current&&console.error("mutiStepTab\u7ec4\u4ef6\u4e3a\u66b4\u9732\u5bf9\u5e94\u7684 next \u5f15\u7528"),null===(e=D.current)||void 0===e||e.next()):s({current:c.current})},E=function(){var e;null==D.current&&console.error("mutiStepTab\u7ec4\u4ef6\u4e3a\u66b4\u9732\u5bf9\u5e94\u7684 next \u5f15\u7528"),null===(e=D.current)||void 0===e||e.previous()},L=Object(r.useCallback)((function(e){f(e)}),[]),M=function(){console.log("\u63d0\u4ea4\u8868\u5355",c.current.value)};return Object(p.jsxs)("div",{className:v.a.selectMealFormContainer,children:[Object(p.jsx)(x,{tabBars:m,tabPanels:F,nextHandleRef:D,canSwitchTab:function(e){if(e<h)return!0;if(e>h+1)return!1;var t=P(h);return s(Object(Q.a)(c)),t},onTabChange:L}),h===F.length-1?Object(p.jsx)(q.a,{className:v.a.actionBtn,variant:"contained",fullWidth:!0,onClick:M,children:"Submit"}):0===h?Object(p.jsx)(q.a,{className:v.a.actionBtn,variant:"contained",fullWidth:!0,onClick:B,children:"Next"}):Object(p.jsxs)("div",{className:v.a.previousAndNextWrap,children:[Object(p.jsx)(q.a,{variant:"contained",color:"secondary",onClick:E,children:"Previous"}),Object(p.jsx)(q.a,{variant:"contained",onClick:B,children:"Next"})]})]})}var ce=function(){return Object(p.jsx)("div",{className:"App",children:Object(p.jsx)(ue,{})})},se=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,228)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,l=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),l(e),i(e)}))};i.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(ce,{})}),document.getElementById("root")),se()},19:function(e,t,n){e.exports={selectMealFormContainer:"select-meal-form_selectMealFormContainer__FyWDr",actionBtn:"select-meal-form_actionBtn__2qA9y",previousAndNextWrap:"select-meal-form_previousAndNextWrap__1F1pr",threeColumn:"select-meal-form_threeColumn__39Kxk",deleteBtn:"select-meal-form_deleteBtn__1IOPx",caption:"select-meal-form_caption__2kt8U",addDishBtnWrap:"select-meal-form_addDishBtnWrap__3rJCA",reviewContainer:"select-meal-form_reviewContainer__3L1fM",reviewColumn:"select-meal-form_reviewColumn__2HuFI"}},99:function(e,t,n){e.exports={tabBar:"muti-step-tab_tabBar__3cAgK"}}},[[168,1,2]]]);
//# sourceMappingURL=main.a27bf46f.chunk.js.map