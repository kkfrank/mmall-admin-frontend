(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{193:function(e,t,n){},203:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return _}));var o=n(0),r=n.n(o),a=n(24),c=n(1),u=n.n(c),i=n(82),l=n(81),f=n(85),s=n(23),p=n(2),y=n(80);function d(e){return function(t,n){t(Object(y.d)()),s.a.get("/manage/category/get_category.do",{categoryId:e}).then((function(n){t({type:p.h,currentCategoryId:e,list:n.data}),t(Object(y.b)())})).catch((function(e){t(Object(y.c)(e.message))}))}}function m(){return{type:p.j}}function h(){return{type:p.i}}var b,g,v;n(193);function E(e){return(E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function C(e,t){return!t||"object"!==E(t)&&"function"!=typeof t?O(e):t}function O(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function N(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function k(e){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function F(e,t){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var _=Object(a.b)((function(e){return{category:e.category,loadingError:e.loadingError}}),(function(e){return{categoryForwardFunc:function(t,n){e(function(e,t){return function(n){n({type:p.d,id:e,parentId:t}),n(d(e))}}(t,n))},categoryGobackFunc:function(){e((function(e,t){var n=t().category.parentIds.slice().pop();e({type:p.e}),e(d(n))}))},showSetNameModalFunc:function(t,n){e(function(e,t){return{type:p.o,id:e,name:t}}(t,n))},hideSetNameModalFunc:function(){e(m())},setCategoryNameFunc:function(){e((function(e,t){var n=t().category,o=n.setNameCategoryId,r=n.tempCategoryName;e({type:p.l}),s.a.post("/manage/category/set_category_name.do",null,{categoryId:o,categoryName:r}).then((function(t){e({type:p.m,categoryId:o,categoryName:r}),e(m())})).catch((function(t){e({type:p.k}),e(Object(y.c)(t.message))}))}))},showAddCategoryModalFunc:function(){e({type:p.n})},hideAddCategoryModalFunc:function(){e(h())},addCategoryFunc:function(){e((function(e,t){var n=t().category,o=n.currentCategoryId,r=n.tempCategoryName;e({type:p.b}),s.a.post("/manage/category/add_category.do",null,{parentId:o,categoryName:r}).then((function(t){e({type:p.c}),e(h()),e(d(o))})).catch((function(t){e({type:p.a}),e(Object(y.c)(t.message))}))}))},changeTempCategoryNameFunc:function(t){e(function(e){return{type:p.f,name:e}}(t))},clearErrorMsgFunc:function(){e(Object(y.a)())},clearCategoryFunc:function(){e((function(e,t){e({type:p.g})}))}}}))((v=g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(u,e);var t,n,o,a,c=(t=u,function(){var e,n=k(t);if(N()){var o=k(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return C(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=c.call(this,e)).handleKeyDown=t.handleKeyDown.bind(O(t)),t}return n=u,(o=[{key:"componentDidMount",value:function(){this.props.categoryForwardFunc(0,null)}},{key:"componentWillUnmount",value:function(){this.props.clearCategoryFunc()}},{key:"handleKeyDown",value:function(e,t){13===t.keyCode&&("CHANGE_NAME"===e?this.props.setCategoryNameFunc():"ADD_CATEGORY"===e&&this.props.addCategoryFunc())}},{key:"render",value:function(){var e=this,t=this.props.category,n=t.parentIds,o=t.currentCategoryId,a=t.list,c=t.isShowSetNameModal,u=t.isSetNameLoading,s=t.isAddLoading,p=t.isShowAddModal,y=t.tempCategoryName,d=(t.setNameCategoryId,this.props.loadingError),m=d.isLoading,h=d.errorMsg;return r.a.createElement("div",null,r.a.createElement("h1",null,"分类管理"),h&&r.a.createElement(l.a,{onOk:function(){return e.props.clearErrorMsgFunc()},onCancel:function(){return e.props.clearErrorMsgFunc()},title:"对话框",visible:!!h},r.a.createElement("p",null,h)),m&&r.a.createElement(i.a,null),r.a.createElement(l.a,{visible:c,confirmLoading:u,onOk:this.props.setCategoryNameFunc,onCancel:this.props.hideSetNameModalFunc},r.a.createElement("div",null,r.a.createElement("label",{className:"mr10"},"请输入新的分类名称:"),r.a.createElement("input",{value:y,onChange:function(t){return e.props.changeTempCategoryNameFunc(t.target.value)},onKeyDown:function(t){return e.handleKeyDown("CHANGE_NAME",t)}}))),r.a.createElement(l.a,{visible:p,title:"添加分类",confirmLoading:s,onOk:this.props.addCategoryFunc,onCancel:this.props.hideAddCategoryModalFunc},r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("label",{className:"mr10"},"分类名称:"),r.a.createElement("input",{value:y,onChange:function(t){return e.props.changeTempCategoryNameFunc(t.target.value)},onKeyDown:function(t){return e.handleKeyDown("ADD_CATEGORY",t)}})))),r.a.createElement("div",{className:"mb20"},r.a.createElement("span",null,"当前商品分类ID：",o),n.length>0&&r.a.createElement("a",{className:"ml10",onClick:function(){return e.props.categoryGobackFunc()}},"返回上一分类"),r.a.createElement("a",{className:"btn right",onClick:this.props.showAddCategoryModalFunc},"添加分类")),r.a.createElement(f.a,{tableHeaders:[{name:"分类ID",width:"20%"},{name:"分类名称",width:"40%"},{name:"操作",width:"40%"}]},a.map((function(t){return r.a.createElement("tr",{key:t.id},r.a.createElement("td",null,t.id),r.a.createElement("td",null,t.name),r.a.createElement("td",null,r.a.createElement("a",{className:"mr10",onClick:function(){return e.props.showSetNameModalFunc(t.id,t.name)}},"修改名称"),r.a.createElement("a",{onClick:function(){e.props.categoryForwardFunc(t.id,o)}},"查看子分类")))}))))}}])&&w(n.prototype,o),a&&w(n,a),u}(o.Component),g.propTypes={category:u.a.object,loadingError:u.a.object,categoryForwardFunc:u.a.func,categoryGobackFunc:u.a.func,showSetNameModalFunc:u.a.func,hideSetNameModalFunc:u.a.func,setCategoryNameFunc:u.a.func,showAddCategoryModalFunc:u.a.func,hideAddCategoryModalFunc:u.a.func,addCategoryFunc:u.a.func,changeTempCategoryNameFunc:u.a.func,clearErrorMsgFunc:u.a.func,clearCategoryFunc:u.a.func},b=v))||b},80:function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return u}));var o=n(10);function r(){return{type:o.d}}function a(){return{type:o.b}}function c(e){return{type:o.c,message:e}}function u(){return{type:o.a}}},81:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var o=n(0),r=n.n(o);n(84);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t){return!t||"object"!==a(t)&&"function"!=typeof t?i(e):t}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function l(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var p=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(y,e);var t,n,o,a,p=(t=y,function(){var e,n=f(t);if(l()){var o=f(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return u(this,e)});function y(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,y),(t=p.call(this,e)).state={confirmLoading:!1},t.onOk=t.onOk.bind(i(t)),t.onCancel=t.onCancel.bind(i(t)),t.handleKeyDown=t.handleKeyDown.bind(i(t)),t}return n=y,(o=[{key:"componentDidMount",value:function(){var e=this;this.modalContentRef.focus(),this.maskRef.onclick=function(){e.onCancel()}}},{key:"handleKeyDown",value:function(e){27===e.keyCode&&this.onCancel()}},{key:"onOk",value:function(){if(!this.props.confirmLoading){var e=this.props.onOk;"function"==typeof e&&e()}}},{key:"onCancel",value:function(){var e=this.props.onCancel;"function"==typeof e&&e()}},{key:"render",value:function(){var e=this,t=this.props,n=t.title,o=t.children,a=this.props,c=a.visible,u=a.confirmLoading;return n=n||"提示",r.a.createElement("div",{className:"modal-box ".concat(c?"":"hide")},r.a.createElement("div",{className:"modal-mask",ref:function(t){return e.maskRef=t}}),r.a.createElement("div",{className:"modal-content",ref:function(t){return e.modalContentRef=t},tabIndex:"0",onKeyDown:this.handleKeyDown},r.a.createElement("div",{className:"modal-header"},n,r.a.createElement("i",{onClick:this.onCancel,className:"right"},"x")),r.a.createElement("div",{className:"modal-body"},o),r.a.createElement("div",{className:"modal-footer"},r.a.createElement("button",{onClick:this.onCancel,className:"btn default mr10"},"取消"),r.a.createElement("button",{onClick:this.onOk,className:"btn ".concat(u?"disabled":"")},"确定"))))}}])&&c(n.prototype,o),a&&c(n,a),y}(o.Component)},82:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var o=n(0),r=n.n(o);n(83);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t){return!t||"object"!==a(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var s=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(p,e);var t,n,o,a,s=(t=p,function(){var e,n=l(t);if(i()){var o=l(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return u(this,e)});function p(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,p),s.call(this,e)}return n=p,(o=[{key:"render",value:function(){return r.a.createElement("div",{className:"loading-container ".concat(this.props.isFull?"is-full":"")},r.a.createElement("div",{className:"loading-mask"}),r.a.createElement("div",{className:"loading-box"},r.a.createElement("span",null),r.a.createElement("span",null),r.a.createElement("span",null),r.a.createElement("span",null)))}}])&&c(n.prototype,o),a&&c(n,a),p}(o.Component)},83:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var o=n(0),r=n.n(o);n(86);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t){return!t||"object"!==a(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var s=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(y,e);var t,n,o,s,p=(t=y,function(){var e,n=l(t);if(i()){var o=l(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return u(this,e)});function y(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,y),p.call(this,e)}return n=y,(o=[{key:"render",value:function(){var e=this.props.tableHeaders.map((function(e,t){return"object"===a(e)?r.a.createElement("th",{key:t,width:e.width,className:e.class},e.name):"string"==typeof e?r.a.createElement("th",{key:t},e):void 0})),t=this.props.children;return this.props.isLoading||t&&0!==t.length||(t=r.a.createElement("tr",null,r.a.createElement("td",{colSpan:this.props.tableHeaders.length},"没有找到相应的结果"))),r.a.createElement("div",null,r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,e)),r.a.createElement("tbody",null,t)))}}])&&c(n.prototype,o),s&&c(n,s),y}(o.Component)},86:function(e,t,n){}}]);