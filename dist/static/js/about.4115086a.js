(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"19d0":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"origBody"}},[e("div",{staticClass:"body"},[e("span",[e("span"),e("span"),e("span"),e("span")]),e("div",{staticClass:"base"},[e("span"),e("div",{staticClass:"face"})])]),e("div",{staticClass:"longfazers"},[e("span"),e("span"),e("span"),e("span")]),e("h1",[t._v("Redirecting")])])}],i=(e("ac1f"),e("5319"),{name:"RedirectPage",mounted:function(){var t=this;this.$store.dispatch("auth/oauthLogin",this.$route.query.token).then((function(){return t.$router.replace("/")})).catch((function(a){console.log(a),t.$router.replace("/login")}))},methods:{}}),n=i,o=(e("8e5f"),e("2877")),l=Object(o["a"])(n,s,r,!1,null,"74e052b4",null);a["default"]=l.exports},"1f27":function(t,a,e){"use strict";var s=e("ecf6"),r=e.n(s);r.a},3416:function(t,a,e){},"3d1f":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"error"},[e("b-container",{staticClass:"h-100 w-100",attrs:{fluid:""}},[e("b-row",{staticStyle:{height:"80%"},attrs:{"align-v":"center","align-h":"center"}},[e("div",{staticClass:"col-xs-12 ground-color text-center"},[e("div",{staticClass:"container-error-404"},[e("div",{staticClass:"clip"},[e("div",{staticClass:"shadow"},[e("span",{staticClass:"digit thirdDigit"})])]),e("div",{staticClass:"clip"},[e("div",{staticClass:"shadow"},[e("span",{staticClass:"digit secondDigit"})])]),e("div",{staticClass:"clip"},[e("div",{staticClass:"shadow"},[e("span",{staticClass:"digit firstDigit"})])]),e("div",{staticClass:"msg"},[t._v("OH!"),e("span",{staticClass:"triangle"})])]),e("h2",{staticClass:"h1"},[t._v("It's Broken, It's not your fault.")])])])],1)],1)},r=[],i={name:"InternalServerError",mounted:function(){function t(){return Math.floor(9*Math.random())+1}var a=30,e=0,s=document.querySelector(".thirdDigit"),r=document.querySelector(".secondDigit"),i=document.querySelector(".firstDigit"),n=setInterval((function(){e>40?(clearInterval(n),s.textContent=5):(s.textContent=t(),e++)}),a),o=setInterval((function(){e>80?(clearInterval(o),r.textContent=0):(r.textContent=t(),e++)}),a),l=setInterval((function(){e>100?(clearInterval(l),i.textContent=0):(i.textContent=t(),e++)}),a)},methods:{}},n=i,o=(e("1f27"),e("2877")),l=Object(o["a"])(n,s,r,!1,null,"3ffe84d0",null);a["default"]=l.exports},"466d":function(t,a,e){"use strict";var s=e("d784"),r=e("825a"),i=e("50c4"),n=e("1d80"),o=e("8aa5"),l=e("14c3");s("match",1,(function(t,a,e){return[function(a){var e=n(this),s=void 0==a?void 0:a[t];return void 0!==s?s.call(a,e):new RegExp(a)[t](String(e))},function(t){var s=e(a,t,this);if(s.done)return s.value;var n=r(t),c=String(this);if(!n.global)return l(n,c);var d=n.unicode;n.lastIndex=0;var u,f=[],p=0;while(null!==(u=l(n,c))){var m=String(u[0]);f[p]=m,""===m&&(n.lastIndex=o(c,i(n.lastIndex),d)),p++}return 0===p?null:f}]}))},"4e8d":function(t,a,e){},5052:function(t,a,e){"use strict";var s=e("6fa0"),r=e.n(s);r.a},5860:function(t,a,e){},"5c9c":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"signup"}},[e("b-container",{staticClass:"h-100 w-100 laysize",attrs:{fluid:""}},[e("b-row",{staticClass:"h-100 w-100",attrs:{"align-h":"center","align-v":"center"}},[e("b-card",{staticClass:"shadow",staticStyle:{width:"600px"}},[e("b-card-title",{attrs:{id:"card-heading"}},[t._v("Todo Online")]),e("b-card-sub-title",{attrs:{id:"card-sub-heading"}},[t._v("Sign Up")]),t.show?e("b-form",{on:{submit:t.onSubmit,reset:t.onReset}},[e("b-form-group",{attrs:{id:"input-group-1",label:"Email address","label-for":"input-1",description:"We'll never share your email with anyone else."}},[e("b-form-input",{attrs:{id:"input-1",type:"email",placeholder:"Enter email",required:""},model:{value:t.form.email,callback:function(a){t.$set(t.form,"email",a)},expression:"form.email"}})],1),e("b-form-group",{attrs:{id:"input-group-firstName",label:"First Name","label-for":"firstName-input"}},[e("b-form-input",{attrs:{id:"firstName-input",placeholder:"Enter First name",state:t.firstValidation,required:""},model:{value:t.form.firstName,callback:function(a){t.$set(t.form,"firstName",a)},expression:"form.firstName"}}),e("b-form-invalid-feedback",{attrs:{state:t.firstValidation}},[t._v(" Your First Name must be atleast 5 characters long. ")])],1),e("b-form-group",{attrs:{id:"input-group-lastName",label:"Last Name","label-for":"input-lastName"}},[e("b-form-input",{attrs:{id:"input-lastName",placeholder:"Enter Last name",state:t.lastValidation,required:""},model:{value:t.form.lastName,callback:function(a){t.$set(t.form,"lastName",a)},expression:"form.lastName"}}),e("b-form-invalid-feedback",{attrs:{state:t.lastValidation}},[t._v(" Your Last Name must be atleast 3 characters long. ")])],1),e("b-form-group",{attrs:{id:"input-group-3",label:"Password","label-for":"text-password"}},[e("b-form-input",{attrs:{type:"password",id:"text-password","aria-describedby":"password-help-block",required:"",state:t.passValidation},model:{value:t.form.password,callback:function(a){t.$set(t.form,"password",a)},expression:"form.password"}}),t.passSize?t._e():e("b-form-invalid-feedback",{attrs:{state:t.passSize}},[t._v(" Your password must be 8-20 characters long. ")]),t.passAlphaNumeric?t._e():e("b-form-invalid-feedback",{attrs:{state:t.passAlphaNumeric}},[t._v(" Your password must must not contain spaces, special characters, or emoji. ")]),e("b-form-text",{attrs:{id:"password-help-block"}},[t._v(" Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji. ")])],1),e("b-row",{staticStyle:{"padding-top":"30px"},attrs:{"align-h":"around"}},[e("b-button",{attrs:{type:"reset",variant:"danger"}},[t._v("Reset")]),e("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v(" Submit ")])],1)],1):t._e()],1)],1)],1)],1)},r=[],i=(e("ac1f"),e("466d"),e("2b0e")),n=i["default"].extend({name:"SignUp",data:function(){return{form:{email:"",firstName:"",lastName:"",password:""},show:!0}},methods:{onSubmit:function(t){var a=this;t.preventDefault(),this.$store.dispatch("auth/signup",this.form).then((function(){return a.$router.push("/dashboard")})).catch((function(t){return console.log(t)}))},onReset:function(t){var a=this;t.preventDefault(),this.form.email="",this.form.firstName="",this.form.lastName="",this.show=!1,this.$nextTick((function(){a.show=!0}))}},computed:{firstValidation:function(){return 0==this.form.firstName.length?null:this.form.firstName.length>4},lastValidation:function(){return 0==this.form.lastName.length?null:this.form.lastName.length>2},passValidation:function(){return 0==this.form.password.length?null:this.form.password.length>7&&this.form.password.length<21&&this.form.password==this.form.password.match(/^[a-zA-Z0-9]*$/)},passAlphaNumeric:function(){return 0==this.form.password.length?null:this.form.password==this.form.password.match(/^[a-zA-Z0-9]*$/)},passSize:function(){return 0==this.form.password.length?null:this.form.password.length>7&&this.form.password.length<21}}}),o=n,l=(e("8109"),e("2877")),c=Object(l["a"])(o,s,r,!1,null,"b830ff04",null);a["default"]=c.exports},6200:function(t,a,e){t.exports=e.p+"static/img/file-earmark.3777f0ed.svg"},"6fa0":function(t,a,e){},7277:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{attrs:{id:"dashboard"}},[s("b-breadcrumb",{attrs:{id:"dashBreadCrumb",items:t.items}}),s("div",{staticClass:"dashboard"},[s("b-row",{staticClass:"my-4",attrs:{"align-h":"between"}},[s("div",{staticStyle:{"font-size":"20px"}},[t._v("Notes")]),s("b-button",{staticClass:"shadow",staticStyle:{"padding-left":"6px"},attrs:{id:"addCard",pill:"",variant:"outline"},on:{click:t.addPage}},[s("b-row",{attrs:{"align-v":"center"}},[s("b-icon",{attrs:{icon:"plus",variant:"danger","font-scale":"2"}}),t._v(" New ")],1)],1)],1),s("div",[s("b-row",t._l(t.cards,(function(a){return s("b-card",{key:a._id,staticClass:"note-card",attrs:{"img-top":""},scopedSlots:t._u([{key:"footer",fn:function(){return[s("b-row",{attrs:{"align-h":"between"}},[s("b-row",{attrs:{"align-h":"start","align-v":"center"}},[s("b-icon",{staticClass:"mr-2",attrs:{icon:"file-earmark"}}),t._v(" "+t._s("fb658d57-4653-4876-89b3-80ff9f60e3d6"===a._id?"Getting Started":a.title)+" ")],1),s("b-col",["fb658d57-4653-4876-89b3-80ff9f60e3d6"!==a._id?s("b-dropdown",{attrs:{variant:"link","toggle-class":"text-decoration-none","no-caret":""},scopedSlots:t._u([{key:"button-content",fn:function(){return[s("b-icon",{attrs:{icon:"three-dots-vertical"}})]},proxy:!0}],null,!0)},[s("b-dropdown-item-button",{on:{click:function(e){return t.deletePage(a._id)}}},[s("div",[t._v(" Delete "),s("b-icon",{staticClass:"float-right",attrs:{icon:"trash-fill"}})],1)]),s("b-dropdown-item-button",{on:{click:function(e){return t.copyPage(a._id)}}},[s("div",[t._v(" Copy "),s("b-icon",{staticClass:"float-right",attrs:{icon:"clipboard"}})],1)])],1):t._e()],1)],1)]},proxy:!0}],null,!0)},[s("b-card-img",{attrs:{src:e("6200"),height:"64",width:"64"},on:{click:function(e){return t.toPage(a._id)}}})],1)})),1)],1)],1)],1)},r=[],i=e("5530"),n=e("afbc"),o=e("2b0e"),l=e("2f62"),c=o["default"].extend({name:"Dashboard",data:function(){return{items:[{text:"Dashboard",active:!0}]}},methods:Object(i["a"])({toDemoPage:function(){n["a"].push("getting-started")},toPage:function(t){"fb658d57-4653-4876-89b3-80ff9f60e3d6"===t?n["a"].push("getting-started"):n["a"].push("page/"+t)}},Object(l["b"])({addPage:"note/addPage",getPagesSrv:"note/getPages",deletePage:"note/deletePage",copyPage:"note/copyPage"})),mounted:function(){this.getPagesSrv()},computed:Object(i["a"])({},Object(l["c"])({cards:"note/getPages"}))}),d=c,u=(e("dcbe"),e("2877")),f=Object(u["a"])(d,s,r,!1,null,"590f0b6a",null);a["default"]=f.exports},8109:function(t,a,e){"use strict";var s=e("4e8d"),r=e.n(s);r.a},"8cdb":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"error"},[e("b-container",{staticClass:"h-100 w-100",attrs:{fluid:""}},[e("b-row",{staticStyle:{height:"80%"},attrs:{"align-v":"center","align-h":"center"}},[e("div",{staticClass:"col-xs-12 ground-color text-center"},[e("div",{staticClass:"container-error-404"},[e("div",{staticClass:"clip"},[e("div",{staticClass:"shadow"},[e("span",{staticClass:"digit thirdDigit"})])]),e("div",{staticClass:"clip"},[e("div",{staticClass:"shadow"},[e("span",{staticClass:"digit secondDigit"})])]),e("div",{staticClass:"clip"},[e("div",{staticClass:"shadow"},[e("span",{staticClass:"digit firstDigit"})])]),e("div",{staticClass:"msg"},[t._v("OH!"),e("span",{staticClass:"triangle"})])]),e("h2",{staticClass:"h1"},[t._v("Sorry! Page not found")])])])],1)],1)},r=[],i={name:"PageNotFound",mounted:function(){function t(){return Math.floor(9*Math.random())+1}var a=30,e=0,s=document.querySelector(".thirdDigit"),r=document.querySelector(".secondDigit"),i=document.querySelector(".firstDigit"),n=setInterval((function(){e>40?(clearInterval(n),s.textContent=4):(s.textContent=t(),e++)}),a),o=setInterval((function(){e>80?(clearInterval(o),r.textContent=0):(r.textContent=t(),e++)}),a),l=setInterval((function(){e>100?(clearInterval(l),i.textContent=4):(i.textContent=t(),e++)}),a)},methods:{}},n=i,o=(e("5052"),e("2877")),l=Object(o["a"])(n,s,r,!1,null,"4a5da439",null);a["default"]=l.exports},"8e5f":function(t,a,e){"use strict";var s=e("d58d"),r=e.n(s);r.a},a55b:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"login"}},[e("b-container",{staticClass:"h-100 w-100 laysize",attrs:{fluid:""}},[e("b-row",{staticClass:"h-100 w-100",attrs:{"align-h":"center","align-v":"center"}},[e("b-card",{staticClass:"shadow",staticStyle:{width:"600px"}},[e("b-card-title",{attrs:{id:"card-heading"}},[t._v("Todo Online")]),e("b-card-sub-title",{attrs:{id:"card-sub-heading"}},[t._v("Sign in")]),t.show?e("b-form",{on:{submit:t.onSubmit,reset:t.onReset}},[e("b-form-group",{attrs:{id:"input-group-1",label:"Email address","label-for":"input-1",description:"We'll never share your email with anyone else."}},[e("b-form-input",{attrs:{id:"input-1",type:"email",placeholder:"Enter email",required:""},model:{value:t.form.email,callback:function(a){t.$set(t.form,"email",a)},expression:"form.email"}})],1),e("b-form-group",{attrs:{id:"input-group-pass",label:"Password","label-for":"text-password"}},[e("b-form-input",{attrs:{type:"password",id:"text-password","aria-describedby":"password-help-block",required:"",state:t.passValidation},model:{value:t.form.password,callback:function(a){t.$set(t.form,"password",a)},expression:"form.password"}}),t.passSize?t._e():e("b-form-invalid-feedback",{attrs:{state:t.passSize}},[t._v(" Your password must be 8-20 characters long. ")]),t.passAlphaNumeric?t._e():e("b-form-invalid-feedback",{attrs:{state:t.passAlphaNumeric}},[t._v(" Your password must must not contain spaces, special characters, or emoji. ")]),e("b-form-text",{attrs:{id:"password-help-block"}},[t._v(" Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji. ")])],1),e("p",{staticClass:"text-center",staticStyle:{"padding-top":"30px"}},[t._v(" Or Sign in using One of these ")]),e("b-row",{staticClass:"w-50",attrs:{"align-h":"between"}},[e("b-button",{attrs:{variant:"outline-danger",href:"/api/auth/google"}},[e("b-icon",{attrs:{icon:"google"}})],1),e("b-button",{attrs:{variant:"outline-primary",href:"/api/auth/facebook"}},[e("b-icon",{attrs:{icon:"facebook"}})],1),e("b-button",{attrs:{variant:"outline-dark",href:"/api/auth/github"}},[e("b-icon",{attrs:{icon:"github"}})],1)],1),e("b-row",{staticStyle:{"padding-top":"30px"},attrs:{"align-h":"around"}},[e("b-button",{attrs:{type:"reset",variant:"danger"}},[t._v("Reset")]),e("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v(" Submit ")])],1)],1):t._e()],1)],1)],1)],1)},r=[],i=(e("ac1f"),e("466d"),e("5530")),n=e("2b0e"),o=e("2f62"),l=e("0613"),c=n["default"].extend({name:"Login",data:function(){return{form:{email:"",password:""},show:!0}},methods:{onSubmit:function(t){var a=this;t.preventDefault(),this.$store.dispatch("auth/login",this.form).then((function(){return a.$router.push("/")})).catch((function(t){return console.log(t)}))},onReset:function(t){var a=this;t.preventDefault(),this.form.email="",this.show=!1,this.$nextTick((function(){a.show=!0}))}},computed:Object(i["a"])({passValidation:function(){return 0==this.form.password.length?null:this.form.password.length>7&&this.form.password.length<21&&this.form.password==this.form.password.match(/^[a-zA-Z0-9]*$/)},passAlphaNumeric:function(){return 0==this.form.password.length?null:this.form.password==this.form.password.match(/^[a-zA-Z0-9]*$/)},passSize:function(){return 0==this.form.password.length?null:this.form.password.length>7&&this.form.password.length<21}},Object(o["c"])(["auth/isLoggedIn"])),beforeRouteEnter:function(t,a,e){l["a"].getters["auth/isLoggedIn"]?e("/dashboard"):e()}}),d=c,u=(e("e7c6"),e("2877")),f=Object(u["a"])(d,s,r,!1,null,"0f1f4a6c",null);a["default"]=f.exports},d58d:function(t,a,e){},dcbe:function(t,a,e){"use strict";var s=e("3416"),r=e.n(s);r.a},e7c6:function(t,a,e){"use strict";var s=e("5860"),r=e.n(s);r.a},ecf6:function(t,a,e){}}]);
//# sourceMappingURL=about.4115086a.js.map