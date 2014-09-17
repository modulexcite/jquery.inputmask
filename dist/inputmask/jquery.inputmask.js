/*
* jquery.inputmask.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.24
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){function b(a){var b=document.createElement("input"),c="on"+a,d=c in b;return d||(b.setAttribute(c,"return;"),d="function"==typeof b[c]),b=null,d}function c(a){var b=document.createElement("input");b.setAttribute("type",a);var c="text"!==b.type;return b=null,c}function d(b,c,e){var f=e.aliases[b];return f?(f.alias&&d(f.alias,void 0,e),a.extend(!0,e,f),a.extend(!0,e,c),!0):!1}function e(b,c){function d(a){function c(a,b,c,d){this.matches=[],this.isGroup=a||!1,this.isOptional=b||!1,this.isQuantifier=c||!1,this.isAlternator=d||!1,this.quantifier={min:1,max:1}}function d(a,c,d){var e=b.definitions[c],f=0==a.matches.length;if(d=void 0!=d?d:a.matches.length,e&&!l){for(var g=e.prevalidator,h=g?g.length:0,i=1;i<e.cardinality;i++){var j=h>=i?g[i-1]:[],k=j.validator,m=j.cardinality;a.matches.splice(d++,0,{fn:k?"string"==typeof k?new RegExp(k):new function(){this.test=k}:new RegExp("."),cardinality:m?m:1,optionality:a.isOptional,newBlockMarker:f,casing:e.casing,def:e.definitionSymbol||c,placeholder:e.placeholder,mask:c})}a.matches.splice(d++,0,{fn:e.validator?"string"==typeof e.validator?new RegExp(e.validator):new function(){this.test=e.validator}:new RegExp("."),cardinality:e.cardinality,optionality:a.isOptional,newBlockMarker:f,casing:e.casing,def:e.definitionSymbol||c,placeholder:e.placeholder,mask:c})}else a.matches.splice(d++,0,{fn:null,cardinality:0,optionality:a.isOptional,newBlockMarker:f,casing:null,def:c,placeholder:void 0,mask:c}),l=!1}for(var e,f,g,h,i,j,k=/(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g,l=!1,m=new c,n=[],o=[];e=k.exec(a);)switch(f=e[0],f.charAt(0)){case b.optionalmarker.end:case b.groupmarker.end:if(g=n.pop(),n.length>0){if(h=n[n.length-1],h.matches.push(g),h.isAlternator){i=n.pop();for(var p=0;p<i.matches.length;p++)i.matches[p].isGroup=!1;n.length>0?(h=n[n.length-1],h.matches.push(i)):m.matches.push(i)}}else m.matches.push(g);break;case b.optionalmarker.start:n.push(new c(!1,!0));break;case b.groupmarker.start:n.push(new c(!0));break;case b.quantifiermarker.start:var q=new c(!1,!1,!0);f=f.replace(/[{}]/g,"");var r=f.split(","),s=isNaN(r[0])?r[0]:parseInt(r[0]),t=1==r.length?s:isNaN(r[1])?r[1]:parseInt(r[1]);if(("*"==t||"+"==t)&&(s="*"==t?0:1),q.quantifier={min:s,max:t},n.length>0){var u=n[n.length-1].matches;if(e=u.pop(),!e.isGroup){var v=new c(!0);v.matches.push(e),e=v}u.push(e),u.push(q)}else{if(e=m.matches.pop(),!e.isGroup){var v=new c(!0);v.matches.push(e),e=v}m.matches.push(e),m.matches.push(q)}break;case b.escapeChar:l=!0;break;case b.alternatormarker:n.length>0?(h=n[n.length-1],j=h.matches.pop()):j=m.matches.pop(),j.isAlternator?n.push(j):(i=new c(!1,!1,!1,!0),i.matches.push(j),n.push(i));break;default:if(n.length>0){if(h=n[n.length-1],h.matches.length>0&&(j=h.matches[h.matches.length-1],j.isGroup&&(j.isGroup=!1,d(j,b.groupmarker.start,0),d(j,b.groupmarker.end))),d(h,f),h.isAlternator){i=n.pop();for(var p=0;p<i.matches.length;p++)i.matches[p].isGroup=!1;n.length>0?(h=n[n.length-1],h.matches.push(i)):m.matches.push(i)}}else m.matches.length>0&&(j=m.matches[m.matches.length-1],j.isGroup&&(j.isGroup=!1,d(j,b.groupmarker.start,0),d(j,b.groupmarker.end))),d(m,f)}return m.matches.length>0&&(j=m.matches[m.matches.length-1],j.isGroup&&(j.isGroup=!1,d(j,b.groupmarker.start,0),d(j,b.groupmarker.end)),o.push(m)),o}function e(c,e){if(b.numericInput&&b.multi!==!0){c=c.split("").reverse();for(var f=0;f<c.length;f++)c[f]==b.optionalmarker.start?c[f]=b.optionalmarker.end:c[f]==b.optionalmarker.end?c[f]=b.optionalmarker.start:c[f]==b.groupmarker.start?c[f]=b.groupmarker.end:c[f]==b.groupmarker.end&&(c[f]=b.groupmarker.start);c=c.join("")}if(void 0==c||""==c)return void 0;if(1==c.length&&0==b.greedy&&0!=b.repeat&&(b.placeholder=""),b.repeat>0||"*"==b.repeat||"+"==b.repeat){var g="*"==b.repeat?0:"+"==b.repeat?1:b.repeat;c=b.groupmarker.start+c+b.groupmarker.end+b.quantifiermarker.start+g+","+b.repeat+b.quantifiermarker.end}return void 0==a.inputmask.masksCache[c]&&(a.inputmask.masksCache[c]={mask:c,maskToken:d(c),validPositions:{},_buffer:void 0,buffer:void 0,tests:{},metadata:e}),a.extend(!0,{},a.inputmask.masksCache[c])}var f=void 0;if(a.isFunction(b.mask)&&(b.mask=b.mask.call(this,b)),a.isArray(b.mask))if(c)f=[],a.each(b.mask,function(b,c){f.push(void 0==c.mask||a.isFunction(c.mask)?e(c.toString(),c):e(c.mask.toString(),c))});else{b.keepStatic=void 0==b.keepStatic?!0:b.keepStatic;var g="(";a.each(b.mask,function(b,c){g.length>1&&(g+=")|("),g+=void 0==c.mask||a.isFunction(c.mask)?c.toString():c.mask.toString()}),g+=")",f=e(g,b.mask)}else b.mask&&(f=void 0==b.mask.mask||a.isFunction(b.mask.mask)?e(b.mask.toString(),b.mask):e(b.mask.mask.toString(),b.mask));return f}function f(b,d,e){function f(a,b,c){b=b||0;var d,e,f,g=[],i=0;do{if(a===!0&&h().validPositions[i]){var j=h().validPositions[i];e=j.match,d=j.locator.slice(),g.push(c===!0?j.input:H(i,e))}else{if(b>i){var k=v(i,d,i-1);f=k[0]}else f=s(i,d,i-1);e=f.match,d=f.locator.slice(),g.push(H(i,e))}i++}while((void 0==eb||eb>i-1)&&null!=e.fn||null==e.fn&&""!=e.def||b>=i);return g.pop(),g}function h(){return d}function o(a){var b=h();b.buffer=void 0,b.tests={},a!==!0&&(b._buffer=void 0,b.validPositions={},b.p=0)}function p(a){var b=h(),c=-1,d=b.validPositions;void 0==a&&(a=-1);var e=c,f=c;for(var g in d){var i=parseInt(g);(-1==a||null!=d[i].match.fn)&&(a>i&&(e=i),i>=a&&(f=i))}return c=a-e>1||a>f?e:f}function q(b,c,d){if(e.insertMode&&void 0!=h().validPositions[b]&&void 0==d){var f,g=a.extend(!0,{},h().validPositions),i=p();for(f=b;i>=f;f++)delete h().validPositions[f];h().validPositions[b]=c;var j=!0;for(f=b;i>=f;f++){var k=g[f];if(void 0!=k){var l=null==k.match.fn?f+1:D(f);j=u(l,k.match.def)?j&&A(l,k.input,!0,!0)!==!1:!1}if(!j)break}if(!j)return h().validPositions=a.extend(!0,{},g),!1}else h().validPositions[b]=c;return!0}function r(a,b){var c,d=a;for(void 0!=h().validPositions[a]&&h().validPositions[a].input==e.radixPoint&&(b++,d++),c=d;b>c;c++)void 0==h().validPositions[c]||h().validPositions[c].input==e.radixPoint&&c!=p()||delete h().validPositions[c];for(c=b;c<=p();){var f=h().validPositions[c],g=h().validPositions[d];void 0!=f&&void 0==g?(u(d,f.match.def)&&A(d,f.input,!0)!==!1&&(delete h().validPositions[c],c++),d++):c++}var i=p();i>=a&&void 0!=h().validPositions[i]&&h().validPositions[i].input==e.radixPoint&&delete h().validPositions[i],o(!0)}function s(b,c,d){for(var f,g=v(b,c,d),i=p(),j=h().validPositions[i]||v(0)[0],k=void 0!=j.alternation?j.locator[j.alternation].split(","):[],l=0;l<g.length&&(f=g[l],!e.greedy&&(!f.match||f.match.optionality!==!1&&f.match.newBlockMarker!==!1||f.match.optionalQuantifier===!0||void 0!=j.alternation&&(void 0==f.locator[j.alternation]||-1!=a.inArray(f.locator[j.alternation].toString(),k))));l++);return f}function t(a){return h().validPositions[a]?h().validPositions[a].match:v(a)[0].match}function u(a,b){for(var c=!1,d=v(a),e=0;e<d.length;e++)if(d[e].match&&d[e].match.def==b){c=!0;break}return c}function v(b,c,d){function f(c,d,g,j){function m(g,j,o){if(i>1e4)return alert("jquery.inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. "+h().mask),!0;if(i==b&&void 0==g.matches)return k.push({match:g,locator:j.reverse()}),!0;if(void 0!=g.matches){if(g.isGroup&&o!==!0){if(g=m(c.matches[n+1],j))return!0}else if(g.isOptional){var p=g;if(g=f(g,d,j,o)){var q=k[k.length-1].match,r=0==a.inArray(q,p.matches);r&&(l=!0),i=b}}else if(g.isAlternator){var s,t=g,u=[],v=k.slice(),w=j.length,x=d.length>0?d.shift():-1;if(-1==x||"string"==typeof x){var y,z=i,A=d.slice();"string"==typeof x&&(y=x.split(","));for(var B=0;B<t.matches.length;B++){k=[],g=m(t.matches[B],[B].concat(j),o)||g,s=k.slice(),i=z,k=[];for(var C=0;C<A.length;C++)d[C]=A[C];for(var D=0;D<s.length;D++)for(var E=s[D],F=0;F<u.length;F++){var G=u[F];if(E.match.mask==G.match.mask&&("string"!=typeof x||-1!=a.inArray(E.locator[w].toString(),y))){s.splice(D,1),G.locator[w]=G.locator[w]+","+E.locator[w],G.alternation=w;break}}u=u.concat(s)}"string"==typeof x&&(u=a.map(u,function(b,c){if(isFinite(c)){var d,e=b.locator[w].toString().split(",");b.locator[w]=void 0,b.alternation=void 0;for(var f=0;f<e.length;f++)d=-1!=a.inArray(e[f],y),d&&(void 0!=b.locator[w]?(b.locator[w]+=",",b.alternation=w,b.locator[w]+=e[f]):b.locator[w]=parseInt(e[f]));if(void 0!=b.locator[w])return b}})),k=v.concat(u),l=!0}else g=m(t.matches[x],[x].concat(j),o);if(g)return!0}else if(g.isQuantifier&&o!==!0){var H=g;e.greedy=e.greedy&&isFinite(H.quantifier.max);for(var I=d.length>0&&o!==!0?d.shift():0;I<(isNaN(H.quantifier.max)?I+1:H.quantifier.max)&&b>=i;I++){var J=c.matches[a.inArray(H,c.matches)-1];if(g=m(J,[I].concat(j),!0)){var q=k[k.length-1].match;q.optionalQuantifier=I>H.quantifier.min-1;var r=0==a.inArray(q,J.matches);if(r){if(I>H.quantifier.min-1){l=!0,i=b;break}return!0}return!0}}}else if(g=f(g,d,j,o))return!0}else i++}for(var n=d.length>0?d.shift():0;n<c.matches.length;n++)if(c.matches[n].isQuantifier!==!0){var o=m(c.matches[n],[n].concat(g),j);if(o&&i==b)return o;if(i>b)break}}var g=h().maskToken,i=c?d:0,j=c||[0],k=[],l=!1;if(void 0==c){for(var m,n=b-1;void 0==(m=h().validPositions[n])&&n>-1;)n--;if(void 0!=m&&n>-1)i=n,j=m.locator.slice();else{for(n=b-1;void 0==(m=h().tests[n])&&n>-1;)n--;void 0!=m&&n>-1&&(i=n,j=m[0].locator.slice())}}for(var o=j.shift();o<g.length;o++){var p=f(g[o],j,[o]);if(p&&i==b||i>b)break}return(0==k.length||l)&&k.push({match:{fn:null,cardinality:0,optionality:!0,casing:null,def:""},locator:[]}),h().tests[b]=a.extend(!0,[],k),h().tests[b]}function w(){return void 0==h()._buffer&&(h()._buffer=f(!1,1)),h()._buffer}function x(){return void 0==h().buffer&&(h().buffer=f(!0,p(),!0)),h().buffer}function y(a,b){var c=x().slice();if(a===!0)o(),a=0,b=c.length;else for(var d=a;b>d;d++)delete h().validPositions[d],delete h().tests[d];for(var d=a;b>d;d++)c[d]!=e.skipOptionalPartCharacter&&A(d,c[d],!0,!0)}function z(a,b){switch(b.casing){case"upper":a=a.toUpperCase();break;case"lower":a=a.toLowerCase()}return a}function A(b,c,d,f){function g(b,c,d,f){var g=!1;return a.each(v(b),function(i,j){for(var k=j.match,l=c?1:0,m="",n=(x(),k.cardinality);n>l;n--)m+=F(b-(n-1));if(c&&(m+=c),g=null!=k.fn?k.fn.test(m,h(),b,d,e):c!=k.def&&c!=e.skipOptionalPartCharacter||""==k.def?!1:{c:k.def,pos:b},g!==!1){var s=void 0!=g.c?g.c:c;s=s==e.skipOptionalPartCharacter&&null===k.fn?k.def:s;var t=b;if(void 0!=g.remove&&r(g.remove,g.remove+1),g.refreshFromBuffer){var u=g.refreshFromBuffer;if(d=!0,y(u===!0?u:u.start,u.end),void 0==g.pos&&void 0==g.c)return g.pos=p(),!1;if(t=void 0!=g.pos?g.pos:b,t!=b)return g=a.extend(g,A(t,s,!0)),!1}else if(g!==!0&&void 0!=g.pos&&g.pos!=b&&(t=g.pos,y(b,t),t!=b))return g=a.extend(g,A(t,s,!0)),!1;return 1!=g&&void 0==g.pos&&void 0==g.c?!1:(i>0&&o(!0),q(t,a.extend({},j,{input:z(s,k)}),f)||(g=!1),!1)}}),g}function i(b,c,d,f){if(e.keepStatic){var g,i,j=a.extend(!0,{},h().validPositions);for(g=p();g>=0;g--)if(h().validPositions[g]&&void 0!=h().validPositions[g].alternation){i=h().validPositions[g].alternation;break}if(void 0!=i)for(var k in h().validPositions)if(parseInt(k)>parseInt(g)&&void 0===h().validPositions[k].alternation){for(var l=h().validPositions[k],m=l.locator[i],n=h().validPositions[g].locator[i].split(","),q=0;q<n.length;q++)if(m<n[q]){for(var r,s,t=k-1;t>=0;t--)if(r=h().validPositions[t],void 0!=r){s=r.locator[i],r.locator[i]=n[q];break}if(m!=r.locator[i]){for(var u=x().slice(),v=k;v<p()+1;v++)delete h().validPositions[v],delete h().tests[v];o(!0),e.keepStatic=!e.keepStatic;for(var v=k;v<u.length;v++)u[v]!=e.skipOptionalPartCharacter&&A(p()+1,u[v],!1,!0);r.locator[i]=s;var w=p()+1==b&&A(b,c,d,f);if(e.keepStatic=!e.keepStatic,w)return w;o(),h().validPositions=a.extend(!0,{},j)}}break}}return!1}d=d===!0;for(var j=x(),k=b-1;k>-1&&(!h().validPositions[k]||null!=h().validPositions[k].match.fn);k--)void 0==h().validPositions[k]&&(!B(k)||j[k]!=H(k))&&v(k).length>1&&g(k,j[k],!0);var l=b;if(l>=C()){if(!f)return i(b,c,d,f);if(o(!0),l>=C())return i(b,c,d,f)}var m=g(l,c,d,f);if(!d&&m===!1){var n=h().validPositions[l];if(!n||null!=n.match.fn||n.match.def!=c&&c!=e.skipOptionalPartCharacter){if((e.insertMode||void 0==h().validPositions[D(l)])&&!B(l))for(var s=l+1,t=D(l);t>=s;s++)if(m=g(s,c,d,f),m!==!1){l=s;break}}else m={caret:D(l)}}return m===!0&&(m={pos:l}),m}function B(a){var b=t(a);return null!=b.fn?b.fn:!1}function C(){var a;if(eb=db.prop("maxLength"),-1==eb&&(eb=void 0),0==e.greedy){var b,c=p(),d=h().validPositions[c],f=void 0!=d?d.locator.slice():void 0;for(b=c+1;void 0==d||null!=d.match.fn||null==d.match.fn&&""!=d.match.def;b++)d=s(b,f,b-1),f=d.locator.slice();a=b}else a=x().length;return void 0==eb||eb>a?a:eb}function D(a){var b=C();if(a>=b)return b;for(var c=a;++c<b&&!B(c)&&(e.nojumps!==!0||e.nojumpsThreshold>c););return c}function E(a){var b=a;if(0>=b)return 0;for(;--b>0&&!B(b););return b}function F(a){return void 0==h().validPositions[a]?H(a):h().validPositions[a].input}function G(a,b,c){a._valueSet(b.join("")),void 0!=c&&N(a,c)}function H(b,c){return c=c||t(b),(a.isFunction(c.placeholder)?c.placeholder.call(this,e):c.placeholder)||(null==c.fn?c.def:e.placeholder.charAt(b%e.placeholder.length))}function I(b,c,d,f,g){var i=void 0!=f?f.slice():K(b._valueGet()).split("");if(o(),c&&b._valueSet(""),a.each(i,function(c,e){if(g===!0){var f=p(),i=-1==f?c:D(f);-1==a.inArray(e,w().slice(f+1,i))&&X.call(b,void 0,!0,e.charCodeAt(0),!1,d,d?c:h().p)}else X.call(b,void 0,!0,e.charCodeAt(0),!1,d,d?c:h().p),d=d||c>0&&c>h().p}),c){var j=e.onKeyPress.call(this,void 0,x(),0,e);V(b,j),G(b,x(),a(b).is(":focus")?D(p(0)):void 0)}}function J(b){return a.inputmask.escapeRegex.call(this,b)}function K(a){return a.replace(new RegExp("("+J(w().join(""))+")*$"),"")}function L(b){if(b.data("_inputmask")&&!b.hasClass("hasDatepicker")){var c=[],d=h().validPositions;for(var f in d)d[f].match&&null!=d[f].match.fn&&c.push(d[f].input);var g=(fb?c.reverse():c).join(""),i=(fb?x().slice().reverse():x()).join("");return a.isFunction(e.onUnMask)&&(g=e.onUnMask.call(b,i,g,e)),g}return b[0]._valueGet()}function M(a){if(fb&&"number"==typeof a&&(!e.greedy||""!=e.placeholder)){var b=x().length;a=b-a}return a}function N(b,c,d){var f,g=b.jquery&&b.length>0?b[0]:b;if("number"!=typeof c){var h=a(g).data("_inputmask");return!a(g).is(":visible")&&h&&void 0!=h.caret?(c=h.caret.begin,d=h.caret.end):g.setSelectionRange?(c=g.selectionStart,d=g.selectionEnd):document.selection&&document.selection.createRange&&(f=document.selection.createRange(),c=0-f.duplicate().moveStart("character",-1e5),d=c+f.text.length),c=M(c),d=M(d),{begin:c,end:d}}c=M(c),d=M(d),d="number"==typeof d?d:c;var h=a(g).data("_inputmask")||{};h.caret={begin:c,end:d},a(g).data("_inputmask",h),a(g).is(":visible")&&(g.scrollLeft=g.scrollWidth,0==e.insertMode&&c==d&&d++,g.setSelectionRange?(g.selectionStart=c,g.selectionEnd=d):g.createTextRange&&(f=g.createTextRange(),f.collapse(!0),f.moveEnd("character",d),f.moveStart("character",c),f.select()))}function O(b){var c,d,e=x(),f=e.length,g=p(),i={},j=h().validPositions[g],k=void 0!=j?j.locator.slice():void 0;for(c=g+1;c<e.length;c++)d=s(c,k,c-1),k=d.locator.slice(),i[c]=a.extend(!0,{},d);var l=j&&void 0!=j.alternation?j.locator[j.alternation].split(","):[];for(c=f-1;c>g&&(d=i[c].match,(d.optionality||d.optionalQuantifier||j&&void 0!=j.alternation&&void 0!=i[c].locator[j.alternation]&&-1!=a.inArray(i[c].locator[j.alternation].toString(),l))&&e[c]==H(c,d));c--)f--;return b?{l:f,def:i[f]?i[f].match:void 0}:f}function P(a){for(var b=x(),c=b.slice(),d=O(),e=c.length-1;e>d&&!B(e);e--);c.splice(d,e+1-d),G(a,c)}function Q(b){if(a.isFunction(e.isComplete))return e.isComplete.call(db,b,e);if("*"==e.repeat)return void 0;var c=!1,d=O(!0),f=E(d.l),g=p();if(g==f&&(void 0==d.def||d.def.newBlockMarker||d.def.optionalQuantifier)){c=!0;for(var h=0;f>=h;h++){var i=B(h);if(i&&(void 0==b[h]||b[h]==H(h))||!i&&b[h]!=H(h)){c=!1;break}}}return c}function R(a,b){return fb?a-b>1||a-b==1&&e.insertMode:b-a>1||b-a==1&&e.insertMode}function S(b){var c=a._data(b).events;a.each(c,function(b,c){a.each(c,function(a,b){if("inputmask"==b.namespace&&"setvalue"!=b.type){var c=b.handler;b.handler=function(a){return this.readOnly||this.disabled?void a.preventDefault:c.apply(this,arguments)}}})})}function T(b){function c(b){if(void 0==a.valHooks[b]||1!=a.valHooks[b].inputmaskpatch){var c=a.valHooks[b]&&a.valHooks[b].get?a.valHooks[b].get:function(a){return a.value},d=a.valHooks[b]&&a.valHooks[b].set?a.valHooks[b].set:function(a,b){return a.value=b,a};a.valHooks[b]={get:function(b){var d=a(b);if(d.data("_inputmask")){if(d.data("_inputmask").opts.autoUnmask)return d.inputmask("unmaskedvalue");var e=c(b),f=d.data("_inputmask"),g=f.maskset,h=g._buffer;return h=h?h.join(""):"",e!=h?e:""}return c(b)},set:function(b,c){var e,f=a(b),g=f.data("_inputmask");return g?(e=d(b,a.isFunction(g.opts.onBeforeMask)?g.opts.onBeforeMask.call(nb,c,g.opts):c),f.triggerHandler("setvalue.inputmask")):e=d(b,c),e},inputmaskpatch:!0}}}function d(){var b=a(this),c=a(this).data("_inputmask");return c?c.opts.autoUnmask?b.inputmask("unmaskedvalue"):g.call(this)!=w().join("")?g.call(this):"":g.call(this)}function e(b){var c=a(this).data("_inputmask");c?(h.call(this,a.isFunction(c.opts.onBeforeMask)?c.opts.onBeforeMask.call(nb,b,c.opts):b),a(this).triggerHandler("setvalue.inputmask")):h.call(this,b)}function f(b){a(b).bind("mouseenter.inputmask",function(){var b=a(this),c=this,d=c._valueGet();""!=d&&d!=x().join("")&&b.trigger("setvalue")});var c=a._data(b).events,d=c.mouseover;if(d){for(var e=d[d.length-1],f=d.length-1;f>0;f--)d[f]=d[f-1];d[0]=e}}var g,h;if(!b._valueGet){if(Object.getOwnPropertyDescriptor){Object.getOwnPropertyDescriptor(b,"value")}document.__lookupGetter__&&b.__lookupGetter__("value")?(g=b.__lookupGetter__("value"),h=b.__lookupSetter__("value"),b.__defineGetter__("value",d),b.__defineSetter__("value",e)):(g=function(){return b.value},h=function(a){b.value=a},c(b.type),f(b)),b._valueGet=function(){return fb?g.call(this).split("").reverse().join(""):g.call(this)},b._valueSet=function(a){h.call(this,fb?a.split("").reverse().join(""):a)}}}function U(a,b,c){if((e.numericInput||fb)&&(b==e.keyCode.BACKSPACE?b=e.keyCode.DELETE:b==e.keyCode.DELETE&&(b=e.keyCode.BACKSPACE),fb)){var d=c.end;c.end=c.begin,c.begin=d}b==e.keyCode.BACKSPACE&&c.end-c.begin<=1?c.begin=E(c.begin):b==e.keyCode.DELETE&&c.begin==c.end&&c.end++,r(c.begin,c.end);var f=p(c.begin);h().p=f<c.begin?D(f):c.begin}function V(a,b,c){if(b&&b.refreshFromBuffer){var d=b.refreshFromBuffer;y(d===!0?d:d.start,d.end),o(!0),void 0!=c&&(G(a,x()),N(a,b.caret||c.begin,b.caret||c.end))}}function W(b){gb=!1;var c=this,d=a(c),f=b.keyCode,g=N(c);f==e.keyCode.BACKSPACE||f==e.keyCode.DELETE||i&&127==f||b.ctrlKey&&88==f?(b.preventDefault(),88==f&&(cb=x().join("")),U(c,f,g),G(c,x(),h().p),c._valueGet()==w().join("")&&d.trigger("cleared"),e.showTooltip&&d.prop("title",h().mask)):f==e.keyCode.END||f==e.keyCode.PAGE_DOWN?setTimeout(function(){var a=D(p());e.insertMode||a!=C()||b.shiftKey||a--,N(c,b.shiftKey?g.begin:a,a)},0):f==e.keyCode.HOME&&!b.shiftKey||f==e.keyCode.PAGE_UP?N(c,0,b.shiftKey?g.begin:0):f==e.keyCode.ESCAPE||90==f&&b.ctrlKey?(I(c,!0,!1,cb.split("")),d.click()):f!=e.keyCode.INSERT||b.shiftKey||b.ctrlKey?0!=e.insertMode||b.shiftKey||(f==e.keyCode.RIGHT?setTimeout(function(){var a=N(c);N(c,a.begin)},0):f==e.keyCode.LEFT&&setTimeout(function(){var a=N(c);N(c,fb?a.begin+1:a.begin-1)},0)):(e.insertMode=!e.insertMode,N(c,e.insertMode||g.begin!=C()?g.begin:g.begin-1));var j=N(c),k=e.onKeyDown.call(this,b,x(),j.begin,e);V(c,k,j),ib=-1!=a.inArray(f,e.ignorables)}function X(b,c,d,f,g,i){if(void 0==d&&gb)return!1;gb=!0;var j=this,k=a(j);b=b||window.event;var d=c?d:b.which||b.charCode||b.keyCode;if(!(c===!0||b.ctrlKey&&b.altKey)&&(b.ctrlKey||b.metaKey||ib))return!0;if(d){c!==!0&&46==d&&0==b.shiftKey&&","==e.radixPoint&&(d=44);var l,m=c?{begin:i,end:i}:N(j),n=String.fromCharCode(d),p=R(m.begin,m.end);p&&(h().undoPositions=a.extend(!0,{},h().validPositions),U(j,e.keyCode.DELETE,m),e.insertMode||(e.insertMode=!e.insertMode,q(m.begin,g),e.insertMode=!e.insertMode),p=!e.multi),h().writeOutBuffer=!0;var r=fb&&!p?m.end:m.begin,s=A(r,n,g);if(s!==!1){if(s!==!0&&(r=void 0!=s.pos?s.pos:r,n=void 0!=s.c?s.c:n),o(!0),void 0!=s.caret)l=s.caret;else{var t=h().validPositions;l=!e.keepStatic&&(void 0!=t[r+1]&&v(r+1,t[r].locator.slice(),r).length>1||void 0!=t[r].alternation)?r+1:D(r)}h().p=l}if(f!==!1){var u=this;if(setTimeout(function(){e.onKeyValidation.call(u,s,e)},0),h().writeOutBuffer&&s!==!1){var w=x();G(j,w,c?void 0:e.numericInput?E(l):l),c!==!0&&setTimeout(function(){Q(w)===!0&&k.trigger("complete"),hb=!0,k.trigger("input")},0)}else p&&(h().buffer=void 0,h().validPositions=h().undoPositions)}else p&&(h().buffer=void 0,h().validPositions=h().undoPositions);if(e.showTooltip&&k.prop("title",h().mask),b&&1!=c){b.preventDefault();var y=N(j),z=e.onKeyPress.call(this,b,x(),y.begin,e);V(j,z,y)}}}function Y(b){var c=a(this),d=this,f=b.keyCode,g=x(),h=N(d),i=e.onKeyUp.call(this,b,g,h.begin,e);V(d,i,h),f==e.keyCode.TAB&&e.showMaskOnFocus&&(c.hasClass("focus-inputmask")&&0==d._valueGet().length?(o(),g=x(),G(d,g),N(d,0),cb=x().join("")):(G(d,g),N(d,M(0),M(C()))))}function Z(b){if(hb===!0&&"input"==b.type)return hb=!1,!0;var c=this,d=a(c),f=c._valueGet();if("propertychange"==b.type&&c._valueGet().length<=C())return!0;"paste"==b.type&&(window.clipboardData&&window.clipboardData.getData?f=window.clipboardData.getData("Text"):b.originalEvent&&b.originalEvent.clipboardData&&b.originalEvent.clipboardData.getData&&(f=b.originalEvent.clipboardData.getData("text/plain")));var g=a.isFunction(e.onBeforePaste)?e.onBeforePaste.call(c,f,e):f;return I(c,!0,!1,fb?g.split("").reverse():g.split(""),!0),d.click(),Q(x())===!0&&d.trigger("complete"),!1}function $(a){if(hb===!0&&"input"==a.type)return hb=!1,!0;var b=this,c=N(b),d=b._valueGet();d=d.replace(new RegExp("("+J(w().join(""))+")*"),""),c.begin>d.length&&(N(b,d.length),c=N(b)),x().length-d.length!=1||d.charAt(c.begin)==x()[c.begin]||d.charAt(c.begin+1)==x()[c.begin]||B(c.begin)||(a.keyCode=e.keyCode.BACKSPACE,W.call(b,a)),a.preventDefault()}function _(b){if(hb===!0&&"input"==b.type)return hb=!1,!0;var c=this,d=N(c),f=c._valueGet();N(c,d.begin-1);var g=a.Event("keypress");g.which=f.charCodeAt(d.begin-1),gb=!1,ib=!1,X.call(c,g,void 0,void 0,!1);var i=h().p;G(c,x(),e.numericInput?E(i):i),b.preventDefault()}function ab(b){hb=!0;var c=this;return setTimeout(function(){N(c,N(c).begin-1);var d=a.Event("keypress");d.which=b.originalEvent.data.charCodeAt(0),gb=!1,ib=!1,X.call(c,d,void 0,void 0,!1);var f=h().p;G(c,x(),e.numericInput?E(f):f)},0),!1}function bb(b){if(db=a(b),db.is(":input")&&!c(db.attr("type"))){if(db.data("_inputmask",{maskset:d,opts:e,isRTL:!1}),e.showTooltip&&db.prop("title",h().mask),("rtl"==b.dir||e.rightAlign)&&db.css("text-align","right"),"rtl"==b.dir||e.numericInput){b.dir="ltr",db.removeAttr("dir");var f=db.data("_inputmask");f.isRTL=!0,db.data("_inputmask",f),fb=!0}db.unbind(".inputmask"),db.removeClass("focus-inputmask"),db.closest("form").bind("submit",function(){cb!=x().join("")&&db.change(),db[0]._valueGet&&db[0]._valueGet()==w().join("")&&db[0]._valueSet(""),e.autoUnmask&&e.removeMaskOnSubmit&&db.inputmask("remove")}).bind("reset",function(){setTimeout(function(){db.trigger("setvalue")},0)}),db.bind("mouseenter.inputmask",function(){var b=a(this),c=this;!b.hasClass("focus-inputmask")&&e.showMaskOnHover&&c._valueGet()!=x().join("")&&G(c,x())}).bind("blur.inputmask",function(){var b=a(this),c=this;if(b.data("_inputmask")){var d=c._valueGet(),f=x();b.removeClass("focus-inputmask"),cb!=x().join("")&&b.change(),e.clearMaskOnLostFocus&&""!=d&&(d==w().join("")?c._valueSet(""):P(c)),Q(f)===!1&&(b.trigger("incomplete"),e.clearIncomplete&&(o(),e.clearMaskOnLostFocus?c._valueSet(""):(f=w().slice(),G(c,f))))}}).bind("focus.inputmask",function(){var b=a(this),c=this,d=c._valueGet();e.showMaskOnFocus&&!b.hasClass("focus-inputmask")&&(!e.showMaskOnHover||e.showMaskOnHover&&""==d)&&c._valueGet()!=x().join("")&&G(c,x(),D(p())),b.addClass("focus-inputmask"),cb=x().join("")}).bind("mouseleave.inputmask",function(){var b=a(this),c=this;e.clearMaskOnLostFocus&&(b.hasClass("focus-inputmask")||c._valueGet()==b.attr("placeholder")||(c._valueGet()==w().join("")||""==c._valueGet()?c._valueSet(""):P(c)))}).bind("click.inputmask",function(){var b=this;a(b).is(":focus")&&setTimeout(function(){var c=N(b);if(c.begin==c.end){var d=fb?M(c.begin):c.begin,f=p(d),g=D(f);g>=d?B(d)?N(b,d):N(b,-1==f&&""!=e.radixPoint?a.inArray(e.radixPoint,x()):D(d)):N(b,g)}},0)}).bind("dblclick.inputmask",function(){var a=this;setTimeout(function(){N(a,0,D(p()))},0)}).bind(n+".inputmask dragdrop.inputmask drop.inputmask",Z).bind("setvalue.inputmask",function(){var a=this;I(a,!0,!1,void 0,!0),cb=x().join(""),(e.clearMaskOnLostFocus||e.clearIncomplete)&&a._valueGet()==w().join("")&&a._valueSet("")}).bind("complete.inputmask",e.oncomplete).bind("incomplete.inputmask",e.onincomplete).bind("cleared.inputmask",e.oncleared),db.bind("keydown.inputmask",W).bind("keypress.inputmask",X).bind("keyup.inputmask",Y).bind("compositionupdate.inputmask",ab),"paste"!==n||g||db.bind("input.inputmask",_),g&&db.bind("input.inputmask",Z),(j||l||k||m)&&("input"==n&&db.unbind(n+".inputmask"),db.bind("input.inputmask",$)),T(b);var i=a.isFunction(e.onBeforeMask)?e.onBeforeMask.call(b,b._valueGet(),e):b._valueGet();I(b,!0,!1,i.split(""),!0),cb=x().join("");var q;try{q=document.activeElement}catch(r){}Q(x())===!1&&e.clearIncomplete&&o(),e.clearMaskOnLostFocus?x().join("")==w().join("")?b._valueSet(""):P(b):G(b,x()),q===b&&(db.addClass("focus-inputmask"),N(b,D(p()))),S(b)}}var cb,db,eb,fb=!1,gb=!1,hb=!1,ib=!1;if(void 0!=b)switch(b.action){case"isComplete":return db=a(b.el),d=db.data("_inputmask").maskset,e=db.data("_inputmask").opts,Q(b.buffer);case"unmaskedvalue":return db=b.$input,d=db.data("_inputmask").maskset,e=db.data("_inputmask").opts,fb=b.$input.data("_inputmask").isRTL,L(b.$input);case"mask":cb=x().join(""),bb(b.el);break;case"format":db=a({}),db.data("_inputmask",{maskset:d,opts:e,isRTL:e.numericInput}),e.numericInput&&(fb=!0);var jb=(a.isFunction(e.onBeforeMask)?e.onBeforeMask.call(db,b.value,e):b.value).split("");return I(db,!1,!1,fb?jb.reverse():jb,!0),e.onKeyPress.call(this,void 0,x(),0,e),b.metadata?{value:fb?x().slice().reverse().join(""):x().join(""),metadata:db.inputmask("getmetadata")}:fb?x().slice().reverse().join(""):x().join("");case"isValid":db=a({}),db.data("_inputmask",{maskset:d,opts:e,isRTL:e.numericInput}),e.numericInput&&(fb=!0);var jb=b.value.split("");I(db,!1,!0,fb?jb.reverse():jb);for(var kb=x(),lb=O(),mb=kb.length-1;mb>lb&&!B(mb);mb--);return kb.splice(lb,mb+1-lb),Q(kb)&&b.value==kb.join("");case"getemptymask":return db=a(b.el),d=db.data("_inputmask").maskset,e=db.data("_inputmask").opts,w();case"remove":var nb=b.el;db=a(nb),d=db.data("_inputmask").maskset,e=db.data("_inputmask").opts,nb._valueSet(L(db)),db.unbind(".inputmask"),db.removeClass("focus-inputmask"),db.removeData("_inputmask");var ob;Object.getOwnPropertyDescriptor&&(ob=Object.getOwnPropertyDescriptor(nb,"value")),ob&&ob.get?nb._valueGet&&Object.defineProperty(nb,"value",{get:nb._valueGet,set:nb._valueSet}):document.__lookupGetter__&&nb.__lookupGetter__("value")&&nb._valueGet&&(nb.__defineGetter__("value",nb._valueGet),nb.__defineSetter__("value",nb._valueSet));try{delete nb._valueGet,delete nb._valueSet}catch(pb){nb._valueGet=void 0,nb._valueSet=void 0}break;case"getmetadata":if(db=a(b.el),d=db.data("_inputmask").maskset,e=db.data("_inputmask").opts,a.isArray(d.metadata)){for(var qb,rb=p(),sb=rb;sb>=0;sb--)if(h().validPositions[sb]&&void 0!=h().validPositions[sb].alternation){qb=h().validPositions[sb].alternation;break}return void 0!=qb?d.metadata[h().validPositions[rb].locator[qb]]:d.metadata[0]}return d.metadata}}if(void 0===a.fn.inputmask){var g="function"==typeof ScriptEngineMajorVersion?ScriptEngineMajorVersion():new Function("/*@cc_on return @_jscript_version; @*/")()>=10,h=navigator.userAgent,i=null!==h.match(new RegExp("iphone","i")),j=null!==h.match(new RegExp("android.*safari.*","i")),k=null!==h.match(new RegExp("android.*chrome.*","i")),l=null!==h.match(new RegExp("android.*firefox.*","i")),m=/Kindle/i.test(h)||/Silk/i.test(h)||/KFTT/i.test(h)||/KFOT/i.test(h)||/KFJWA/i.test(h)||/KFJWI/i.test(h)||/KFSOWI/i.test(h)||/KFTHWA/i.test(h)||/KFTHWI/i.test(h)||/KFAPWA/i.test(h)||/KFAPWI/i.test(h),n=b("paste")?"paste":b("input")?"input":"propertychange";a.inputmask={defaults:{placeholder:"_",optionalmarker:{start:"[",end:"]"},quantifiermarker:{start:"{",end:"}"},groupmarker:{start:"(",end:")"},alternatormarker:"|",escapeChar:"\\",mask:null,oncomplete:a.noop,onincomplete:a.noop,oncleared:a.noop,repeat:0,greedy:!0,autoUnmask:!1,removeMaskOnSubmit:!0,clearMaskOnLostFocus:!0,insertMode:!0,clearIncomplete:!1,aliases:{},alias:null,onKeyUp:a.noop,onKeyPress:a.noop,onKeyDown:a.noop,onBeforeMask:void 0,onBeforePaste:void 0,onUnMask:void 0,showMaskOnFocus:!0,showMaskOnHover:!0,onKeyValidation:a.noop,skipOptionalPartCharacter:" ",showTooltip:!1,numericInput:!1,rightAlign:!1,radixPoint:"",nojumps:!1,nojumpsThreshold:0,keepStatic:void 0,definitions:{9:{validator:"[0-9]",cardinality:1,definitionSymbol:"*"},a:{validator:"[A-Za-zА-яЁёÀ-ÿµ]",cardinality:1,definitionSymbol:"*"},"*":{validator:"[0-9A-Za-zА-яЁёÀ-ÿµ]",cardinality:1}},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123],isComplete:void 0},masksCache:{},escapeRegex:function(a){var b=["/",".","*","+","?","|","(",")","[","]","{","}","\\"];return a.replace(new RegExp("(\\"+b.join("|\\")+")","gim"),"\\$1")},format:function(b,c,g){var h=a.extend(!0,{},a.inputmask.defaults,c);return d(h.alias,c,h),f({action:"format",value:b,metadata:g},e(h),h)},isValid:function(b,c){var g=a.extend(!0,{},a.inputmask.defaults,c);return d(g.alias,c,g),f({action:"isValid",value:b},e(g),g)}},a.fn.inputmask=function(b,c,g,h,i){function j(b,c,e){var f=a(b);f.data("inputmask-alias")&&d(f.data("inputmask-alias"),{},c);for(var g in c){var h=f.data("inputmask-"+g.toLowerCase());void 0!=h&&("mask"==g&&0==h.indexOf("[")?(c[g]=h.replace(/[\s[\]]/g,"").split("','"),c[g][0]=c[g][0].replace("'",""),c[g][c[g].length-1]=c[g][c[g].length-1].replace("'","")):c[g]="boolean"==typeof h?h:h.toString(),e&&(e[g]=c[g]))}return c}g=g||f,h=h||"_inputmask";var k,l=a.extend(!0,{},a.inputmask.defaults,c);if("string"==typeof b)switch(b){case"mask":return d(l.alias,c,l),k=e(l,g!==f),void 0==k?this:this.each(function(){g({action:"mask",el:this},a.extend(!0,{},k),j(this,l))});case"unmaskedvalue":var m=a(this);return m.data(h)?g({action:"unmaskedvalue",$input:m}):m.val();case"remove":return this.each(function(){var b=a(this);b.data(h)&&g({action:"remove",el:this})});case"getemptymask":return this.data(h)?g({action:"getemptymask",el:this}):"";case"hasMaskedValue":return this.data(h)?!this.data(h).opts.autoUnmask:!1;case"isComplete":return this.data(h)?g({action:"isComplete",buffer:this[0]._valueGet().split(""),el:this}):!0;case"getmetadata":return this.data(h)?g({action:"getmetadata",el:this}):void 0;case"_detectScope":return d(l.alias,c,l),void 0==i||d(i,c,l)||-1!=a.inArray(i,["mask","unmaskedvalue","remove","getemptymask","hasMaskedValue","isComplete","getmetadata","_detectScope"])||(l.mask=i),a.isFunction(l.mask)&&(l.mask=l.mask.call(this,l)),a.isArray(l.mask);default:return d(l.alias,c,l),d(b,c,l)||(l.mask=b),k=e(l,g!==f),void 0==k?this:this.each(function(){g({action:"mask",el:this},a.extend(!0,{},k),j(this,l))
})}else{if("object"==typeof b)return l=a.extend(!0,{},a.inputmask.defaults,b),d(l.alias,b,l),k=e(l,g!==f),void 0==k?this:this.each(function(){g({action:"mask",el:this},a.extend(!0,{},k),j(this,l))});if(void 0==b)return this.each(function(){var b=a(this).attr("data-inputmask");if(b&&""!=b)try{b=b.replace(new RegExp("'","g"),'"');var e=a.parseJSON("{"+b+"}");a.extend(!0,e,c),l=a.extend(!0,{},a.inputmask.defaults,e),l=j(this,l),d(l.alias,e,l),l.alias=void 0,a(this).inputmask("mask",l,g)}catch(f){}if(a(this).attr("data-inputmask-mask")||a(this).attr("data-inputmask-alias")){l=a.extend(!0,{},a.inputmask.defaults,{});var h={};l=j(this,l,h),d(l.alias,h,l),l.alias=void 0,a(this).inputmask("mask",l,g)}})}}}return a.fn.inputmask});