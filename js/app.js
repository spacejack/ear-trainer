!function e(t,n,i){function a(o,l){if(!n[o]){if(!t[o]){var u="function"==typeof require&&require;if(!l&&u)return u(o,!0);if(r)return r(o,!0);var s=new Error("Cannot find module '"+o+"'");throw s.code="MODULE_NOT_FOUND",s}var d=n[o]={exports:{}};t[o][0].call(d.exports,(function(e){return a(t[o][1][e]||e)}),d,d.exports,e,t,n,i)}return n[o].exports}for(var r="function"==typeof require&&require,o=0;o<i.length;o++)a(i[o]);return a}({1:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.EXSEQ=n.EXSEQ_ARP=n.ExChord=n.ExTriad=n.ExInterval=n.NOTE_OFFSET=void 0;const a=i(e("mithril/stream")),r=e("./lib/chord"),o=e("./lib/pitch"),l=e("./lib/timer"),u=e("./lib/Input/AppInput"),s=i(e("./lib/Input"));n.NOTE_OFFSET=48,n.ExInterval={is:e=>null!=e&&"interval"===e.type&&"string"==typeof e.name&&Array.isArray(e.i)&&1===e.i.length,notes:e=>[n.NOTE_OFFSET+e.root,n.NOTE_OFFSET+e.root+e.i[0]],random:e=>{const t=e&&e.length>0?e[Math.floor(Math.random()*e.length)]:Math.floor(Math.random()*r.INTERVALS.length);return{...r.INTERVALS[t],root:Math.floor(12*Math.random())}}},n.ExTriad={is:e=>null!=e&&"triad"===e.type&&"string"==typeof e.name&&Array.isArray(e.i)&&2===e.i.length,notes:e=>[n.NOTE_OFFSET+e.root,n.NOTE_OFFSET+e.root+e.i[0],n.NOTE_OFFSET+e.root+e.i[1]],random:e=>{console.log("ExTriad.random from:",e);const t=e&&e.length>0?e[Math.floor(Math.random()*e.length)]:Math.floor(Math.random()*r.TRIADS.length);return{...r.TRIADS[t],root:Math.floor(12*Math.random())}}},n.ExChord={notes:e=>n.ExTriad.is(e)?n.ExTriad.notes(e):n.ExInterval.notes(e)},n.EXSEQ_ARP=[{time:0,action:"play"},{time:2,action:"arp"},{time:7,action:"reveal"}],n.EXSEQ=[{time:0,action:"play"},{time:5,action:"reveal"}],n.default=function({synth:e}){const t=2;let i=!1;const r=(0,a.default)();let d;async function c(a,c){const f=n.ExChord.notes(c);if("play"===a.action)e.triggerAttackRelease(f.map(o.pitchToHz),t,void 0,1);else if("arp"===a.action)for(const n of f){if(!i)return;e.triggerAttackRelease((0,o.pitchToHz)(n),t,void 0,1),d=(0,l.wait)(1e3),await d}else"reveal"===a.action&&(r(c),f.forEach((e=>(0,u.$noteEvent)(s.default.noteOn(e)))),await(0,l.wait)(6e3),f.forEach((e=>(0,u.$noteEvent)(s.default.noteOff(e)))))}return{synth:e,play:async function(e,t){if(i)return console.warn("Player already playing"),!1;i=!0;let n=0;for(const a of t){if(!i)break;if(d=(0,l.wait)(Math.floor(1e3*(a.time-n))),await d,!i)break;if(n=a.time,console.log("ExEvent:",a),c(a,e),!i)break}return i=!1,d=void 0,!0},stop:function(){i=!1,d&&(d.cancel(),d=void 0)},$reveal:r,isPlaying:()=>i}}},{"./lib/Input":14,"./lib/Input/AppInput":9,"./lib/chord":18,"./lib/pitch":21,"./lib/timer":22,"mithril/stream":void 0}],2:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const a=i(e("mithril")),r=e("../../lib/dom"),o=e("../../lib/timer"),l=e("../../lib/pitch"),u=e("../../lib/chord"),s=e("../../ExPlayer");n.default=function({attrs:{player:e}}){let t=[];speechSynthesis.addEventListener("voiceschanged",(e=>{t=speechSynthesis.getVoices(),console.log("voices:",t),a.default.redraw()}));const n=Array.from({length:u.INTERVALS.length},((e,t)=>t)).slice(1,u.INTERVALS.length-1),i=n.slice(),d=Array.from({length:u.TRIADS.length},((e,t)=>t));let c,f,p,m,v,h="interval",y=10,b=0,_=0,E=String(y),g=!0,O=!1,S=!1,I=!1,T=!1;const x=e.$reveal.map((e=>{S&&(I=!0,a.default.redraw(),O&&setTimeout((()=>{const t=`${l.NOTES_SPEECH[l.UNIQUE_NOTES[e.root%12]]} ${e.name.replace("Sus ","suss ")}`,n=new SpeechSynthesisUtterance(t);null!=v&&(n.voice=v),n.volume=.5,speechSynthesis.speak(n)}),1500))}));return{onremove:()=>{x.end(!0)},view:()=>(0,a.default)(".explayer",(0,a.default)(".player-controls.mb1",(0,a.default)(".grid-container",(0,a.default)(".grid-border",(0,a.default)("table.options-grid",(0,a.default)("thead",(0,a.default)("tr",(0,a.default)("th.pr1",(0,a.default)("label.clickable",(0,a.default)("input",{type:"radio",checked:"interval"===h,disabled:S,onclick:()=>{h="interval"}}),(0,a.default)("strong","Intervals"))),(0,a.default)("th.pr1",(0,a.default)("label.clickable",(0,a.default)("input",{type:"radio",checked:"triad"===h,disabled:S,onclick:()=>{h="triad"}}),(0,a.default)("strong","Triads"))),(0,a.default)("th.pr1",(0,a.default)("label",(0,a.default)("span","Number of exercises: "),(0,a.default)("input",{type:"number",min:1,max:999,step:1,value:E,disabled:S,oninput:(0,r.onValue)((e=>{E=e.trim();const t=Number(E);Number.isSafeInteger(t)&&t>0&&t<1e3&&(y=t)}))}))))),(0,a.default)("tbody",T&&n.map(((e,n)=>(0,a.default)("tr",(0,a.default)("td",(0,a.default)("label",(0,a.default)("input",{type:"checkbox",checked:i.includes(n),disabled:S||"interval"!==h,onclick:()=>{const e=i.indexOf(n);e>=0?i.splice(e,1):i.push(n),console.log("intervals:",i)}}),u.INTERVALS[n].name)),(0,a.default)("td",n<u.TRIADS.length&&(0,a.default)("label",(0,a.default)("input",{type:"checkbox",checked:d.includes(n),disabled:S||"triad"!==h,onclick:()=>{const e=d.indexOf(n);e>=0?d.splice(e,1):d.push(n)}}),u.TRIADS[n].name)),(0,a.default)("td",2===n?{rowspan:2}:{},0===n?(0,a.default)("label",(0,a.default)("input",{type:"checkbox",checked:g,disabled:S,onclick:()=>{g=!g}}),(0,a.default)("span","Play Arpeggiated")):1===n?(0,a.default)("label",(0,a.default)("input",{type:"checkbox",checked:O,disabled:S,onclick:()=>{O=!O}}),(0,a.default)("span","Speak Answers")):2===n&&t.length>0?(0,a.default)("label","Voice: ",(0,a.default)("select",{style:{maxWidth:"12em"},value:v?v.name:"",disabled:S,onchange:(0,r.onValue)((e=>{v=t.find((t=>t.name===e))}))},t.map((e=>(0,a.default)("option",{value:e.name},e.name))))):"")))),(0,a.default)("tr",(0,a.default)("td.center",{colspan:3},(0,a.default)("a",{href:"",onclick:e=>{e.preventDefault(),T=!T}},"Options "+(T?"▲":"▼")))))))),(0,a.default)(".score",b<1?a.default.trust("&nbsp;"):`Score ${_}/${b}`),"interval"===h?i.map((t=>(0,a.default)("button",{type:"button",class:t===p&&c?.name===u.INTERVALS[t].name?"correct":t===p&&c?.name!==u.INTERVALS[t].name?"incorrect":I&&c?.name===u.INTERVALS[t].name?"reveal":void 0,disabled:I||null!=p||!e.isPlaying(),onclick:()=>{p=t,c?.name===u.INTERVALS[t].name&&(_+=1)}},u.INTERVALS[t].name))):d.map((t=>(0,a.default)("button",{type:"button",class:t===m&&f?.name===u.TRIADS[t].name?"correct":t===m&&f?.name!==u.TRIADS[t].name?"incorrect":I&&f?.name===u.TRIADS[t].name?"reveal":void 0,disabled:I||null!=m||!e.isPlaying(),onclick:()=>{m=t,f?.name===u.TRIADS[t].name&&(_+=1)}},u.TRIADS[t].name))),(0,a.default)("div.mt1",(0,a.default)("button.start",{type:"button",onclick:()=>{S?(e.stop(),S=!1,b=0,_=0,c=f=void 0,p=m=void 0):async function(){if(S)return void console.warn("Panel: Already playing");b=0,_=0,S=!0,I=!1;const t=g?s.EXSEQ_ARP:s.EXSEQ;c=f=void 0,p=m=void 0;for(let n=0;n<y;++n){if(I=!1,b=n+1,p=m=void 0,a.default.redraw(),"interval"===h?(c=s.ExInterval.random(i),await e.play(c,t)):(f=s.ExTriad.random(d),await e.play(f,t)),!S)return;if(n<y-1&&(await(0,o.wait)(7e3),!S))return}S=!1,c=f=void 0,p=m=void 0,a.default.redraw()}()}},S?"Stop":"Start"))))}}},{"../../ExPlayer":1,"../../lib/chord":18,"../../lib/dom":19,"../../lib/pitch":21,"../../lib/timer":22,mithril:void 0}],3:[function(e,t,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,a)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return a(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.FieldSetInput=n.SelectInput=n.FloatArrayInput=n.StrInput=n.IntInput=n.FloatInput=n.FieldUI=void 0;const l=o(e("mithril")),u=r(e("../../lib/O")),s=e("../../lib/dom"),d=e("../../models/SynthField");function c(){let e=!1,t="";return{oninit:({attrs:{min:n,max:i,value:a}})=>{d.Float.inRange(a,n,i)&&(t=String(a),e=!0)},view:({attrs:{min:n,max:i,required:a,onChange:r,onError:o}})=>(0,l.default)("input.num",{class:e||!t?void 0:"invalid",type:"text",value:t,oninput:(0,s.onValue)((l=>{if(t=l.trim(),t.length<1)return void(a||r?.(void 0));const u=Number(l);d.Float.inRange(u,n,i)?(e=!0,r?.(u)):(e=!1,o?.(t))}))})}}function f(){let e=!1,t="";return{oninit:({attrs:{min:n,max:i,value:a}})=>{d.Int.inRange(a,n,i)&&(t=String(a),e=!0)},view:({attrs:{min:n,max:i,required:a,onChange:r,onError:o}})=>(0,l.default)("input.num",{class:e||!t?void 0:"invalid",type:"text",value:t,oninput:(0,s.onValue)((l=>{if(t=l.trim(),t.length<1)return void(a||r?.(void 0));const u=Number(l);d.Int.inRange(u,n,i)?(e=!0,r?.(u)):(e=!1,o?.(t))}))})}}function p(){let e=!0,t="";return{oninit:({attrs:{value:n}})=>{"string"==typeof n&&(t=n,e=!0)},view:({attrs:{onChange:n,onError:i}})=>(0,l.default)("input.str",{class:e||!t?"":"invalid",type:"text",value:t,oninput:(0,s.onValue)((e=>{t=e,n?.(e)}))})}}function m(){let e=!0,t="";return{oninit:({attrs:{value:n}})=>{Array.isArray(n)&&(t=n.join(", "),e=!0)},view:({attrs:{min:n,max:i,onChange:a,onError:r}})=>(0,l.default)("input.arr",{class:e||!t?"":"invalid",type:"text",value:t,oninput:(0,s.onValue)((o=>{t=o;const l=d.FloatArray.parse(o);null!=l&&l.every((e=>d.Float.inRange(e,n,i)))?(e=!0,a?.(l)):(e=!1,r?.(o))}))})}}function v(){let e="";return{oninit:({attrs:{options:t,value:n}})=>{"string"==typeof n&&t.some((e=>e.value===n))&&(e=n)},onbeforeupdate:({attrs:{options:t,value:n}})=>{"string"==typeof n&&t.some((e=>e.value===n))&&(e=n)},view:({attrs:{options:t,onChange:n}})=>(0,l.default)("select",{value:e,oninput:(0,s.onValue)((t=>{e=t,n?.(e)}))},t.map((e=>(0,l.default)("option",{value:e.value},e.text))))}}n.FieldUI={view:({attrs:e,children:t})=>(0,l.default)("tr",{class:e.class},(0,l.default)("td",(0,l.default)("label",!!e.label&&(0,l.default)("span",`${e.label}: `))),(0,l.default)("td",t))},n.FloatInput=c,n.IntInput=f,n.StrInput=p,n.FloatArrayInput=m,n.SelectInput=v,n.FieldSetInput=function e(){let t=u.create();return{oninit:function({attrs:{value:e}}){null!=e&&"object"==typeof e&&(t={...e})},view:({attrs:{fields:i,onChange:a}})=>(0,l.default)("table.fieldset",i.map((i=>(0,l.default)(n.FieldUI,{label:i.label},"float"===i.type?(0,l.default)(c,{min:i.min,max:i.max,required:i.required,value:t[i.name],onChange:e=>{t[i.name]=e,a?.(t)}}):"int"===i.type?(0,l.default)(f,{min:i.min,max:i.max,required:i.required,value:t[i.name],onChange:e=>{t[i.name]=e,a?.(t)}}):"string"===i.type?(0,l.default)(p,{required:i.required,value:t[i.name],onChange:e=>{t[i.name]=e,a?.(t)}}):"floatarray"===i.type?(0,l.default)(m,{required:i.required,value:t[i.name],onChange:e=>{t[i.name]=e,a?.(t)}}):"select"===i.type?(0,l.default)(v,{options:i.options,required:i.required,value:t[i.name],onChange:e=>{t[i.name]=e,a?.(t)}}):(0,l.default)(e,{fields:i.fields,value:t[i.name],onChange:e=>{t[i.name]=e,a?.(t)}})))))}}},{"../../lib/O":16,"../../lib/dom":19,"../../models/SynthField":24,mithril:void 0}],4:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const a=i(e("mithril"));n.default=function(){let e=!1;return{view:()=>(0,a.default)(".app-info",{class:e?"":"closed"},(0,a.default)(".w100.fx-jh",e&&(0,a.default)("h3","About"),(0,a.default)("button.circle",{type:"button",onclick:()=>{e=!e}},e?"x":"?")),e&&[(0,a.default)("p","Test your interval and chord recognition skills."),(0,a.default)("p","Select intervals or triads, set the number of repetitions,\nthen press start. Additional settings to fine-tune variety and difficulty can be\naccessed by expanding 'options'."),(0,a.default)("p.small","© 2023 by Mike Linkovich. See my other projects on ",(0,a.default)("a",{href:"https://spacejack.github.io"},"Github"),".")])}}},{mithril:void 0}],5:[function(e,t,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,a)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return a(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const l=o(e("mithril")),u=o(e("mithril/stream")),s=r(e("tone")),d=e("../../lib/math"),c=e("../../lib/timer"),f=e("../../lib/pitch"),p=e("../../lib/MIDI"),m=o(e("../../ExPlayer")),v=o(e("../PianoKeyboard")),h=o(e("../Panel")),y=o(e("./Info"));n.default=function(){let e,t,n,i=.5,a=[];(0,p.listMidiInputs)().then((e=>{a=e,l.default.redraw()}));let r="",o=(0,u.default)();function b(){return e||t?(console.warn("Synth already created"),Promise.resolve()):s.start().then((()=>{e=new s.Gain(i*i),t=new s.PolySynth(s.FMSynth,{envelope:{attack:.0125,decay:12,decayCurve:"exponential",sustain:0,release:.125},oscillator:{type:"triangle"},harmonicity:0}),t.chain(e,s.Destination),console.log("Synth props:",t.get()),n=(0,m.default)({synth:t}),o=n.$reveal.map((e=>(r=`${f.UNIQUE_NOTES[e.root%12].replace("s","♯").replace("b","♭")} ${e.name}`,l.default.redraw(),(0,c.wait)(6e3).then((()=>{r="",l.default.redraw()})),e))),console.log("created Player")})).catch((e=>{console.error("Tone.start() error:",e)})).finally((()=>{l.default.redraw()}))}function _(e){t?.triggerAttack((0,f.pitchToHz)(e.pitch),void 0,e.velocity/127)}function E(e){t?.triggerRelease((0,f.pitchToHz)(e.pitch))}function g(t){i=(0,d.clamp)(Number(t.currentTarget.value),0,1),e&&(e.gain.value=i*i)}return{onremove:()=>{o.end(!0),n?.stop(),n=void 0,t?.disconnect().dispose(),e?.disconnect().dispose(),e=t=void 0},view:()=>(0,l.default)(".page.home",(0,l.default)(".bg-piano",(0,l.default)(".header",(0,l.default)("h1.nosel","Ear Trainer"),t&&(0,l.default)(".controls.mb1","🔈 ",(0,l.default)("input",{type:"range",min:0,max:1,step:.01,value:i,disabled:!t,oninput:g,onchange:g})),(0,l.default)(".right",(0,l.default)("div",{style:{width:"9em",height:"0.5em"}}))),(0,l.default)("div",t&&n?[(0,l.default)(h.default,{player:n},(0,l.default)(".chord-text.nosel",r||(n.isPlaying()?"Listen...":l.default.trust("&nbsp;"))))]:[(0,l.default)(".small",(0,l.default)("strong","MIDI input devices found:"),(0,l.default)(".mt05.mb1",(0,l.default)(".item-list",a.length<1?"none":a.map((e=>(0,l.default)(".item",`[${e.id}] ${e.manufacturer} ${e.name} (${e.version})`)))))),(0,l.default)("button",{type:"button",onclick:t?void 0:b},"Enable sound to continue...")])),t&&n&&(0,l.default)(v.default,{onNoteOn:_,onNoteOff:E}),(0,l.default)(y.default))}}},{"../../ExPlayer":1,"../../lib/MIDI":15,"../../lib/math":20,"../../lib/pitch":21,"../../lib/timer":22,"../Panel":6,"../PianoKeyboard":7,"./Info":4,mithril:void 0,"mithril/stream":void 0,tone:void 0}],6:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const a=i(e("mithril")),r=i(e("../SynthUI")),o=i(e("../ExPlayerUI"));n.default=function({attrs:{player:e}}){let t="explayer";function n(e){192===e.keyCode&&(t="explayer"!==t?"explayer":"synth",a.default.redraw())}return{oninit:()=>{window.addEventListener("keyup",n)},onremove:()=>{window.removeEventListener("keyup",n)},view:n=>(0,a.default)(".panel","explayer"===t?(0,a.default)(o.default,{player:e}):(0,a.default)(r.default,{synth:e.synth}),n.children)}}},{"../ExPlayerUI":2,"../SynthUI":8,mithril:void 0}],7:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const a=i(e("mithril")),r=i(e("../../lib/Input/MidiInput")),o=i(e("../../lib/Input/KeyboardInput")),l=i(e("../../lib/Input/PointerInput")),u=i(e("../../lib/Input/AppInput")),s=i(e("../../lib/Input/MultiInput")),d=i(e("../../lib/PianoSVG"));n.default=function(){let e;const t=(0,d.default)(),n={keys:Array.from({length:128},(()=>d.default.KEYSTATE_OFF)),bkWidth:25,bkHeight:124,wkWidth:40,wkHeight:200};let i,c;return{oncreate:a=>{t.element.style.width=(d.default.wkCountToId(127)+1)*n.wkWidth+"px",t.element.style.height=`${n.wkHeight}px`,t.render(n),a.dom.appendChild(t.element),i=a.attrs.onNoteOn,c=a.attrs.onNoteOff,e=(0,s.default)((0,u.default)(),(0,o.default)(65,90),(0,r.default)(),(0,l.default)(a.dom)),e.$noteOn.map((e=>{n.keys[e.pitch]=d.default.KEYSTATE_ON,t.render(n),i?.(e)})),e.$noteOff.map((e=>{n.keys[e.pitch]=d.default.KEYSTATE_OFF,t.render(n),c?.(e)}));const f=a.dom,p=f.getBoundingClientRect().width;f.scrollLeft=.425*(f.scrollWidth-p)},onbeforeupdate:e=>{i=e.attrs.onNoteOn,c=e.attrs.onNoteOff},onremove:()=>{e?.disposeAll(),e=void 0},view:()=>(0,a.default)(".piano-keyboard",{tabindex:0})}}},{"../../lib/Input/AppInput":9,"../../lib/Input/KeyboardInput":10,"../../lib/Input/MidiInput":11,"../../lib/Input/MultiInput":12,"../../lib/Input/PointerInput":13,"../../lib/PianoSVG":17,mithril:void 0}],8:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const a=i(e("mithril")),r=e("../../models/schema"),o=e("../FieldUI");n.default=function({attrs:{synth:e}}){return{view:()=>{const t=e.get();return(0,a.default)(".input-block.synth-ui",(0,a.default)(o.FieldSetInput,{fields:r.fmSynthSchema,value:t,onChange:t=>{e.set(t)},onError:e=>{}}))}}}},{"../../models/schema":25,"../FieldUI":3,mithril:void 0}],9:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.$noteEvent=void 0;const a=i(e("mithril/stream")),r=i(e("."));n.$noteEvent=(0,a.default)(),n.default=function(){const e=(0,r.default)(),t=n.$noteEvent.map((t=>{"on"===t.type?e.$noteOn(t):"off"===t.type&&e.$noteOff(t)}));return{...e,dispose:()=>{e.dispose(),t.end(!0)}}}},{".":14,"mithril/stream":void 0}],10:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const a=i(e("./index"));function r(e,t){const n=(0,a.default)();function i(i){const o=i.keyCode;if(null!=e&&o<e||null!=t&&o>t)return;const l=r.keyCodeToPitch(o);n.state[l]||n.$noteOn(a.default.noteOn(l))}function o(i){const o=i.keyCode;if(null!=e&&o<e||null!=t&&o>t)return;const l=r.keyCodeToPitch(o);n.$noteOff(a.default.noteOff(l))}return window.addEventListener("keydown",i),window.addEventListener("keyup",o),{...n,dispose:()=>{n.dispose(),window.removeEventListener("keydown",i),window.removeEventListener("keyup",o)}}}!function(e){e.keyCodeToPitch=function(e){return e},e.pitchToKeyCode=function(e){return e}}(r||(r={})),n.default=r},{"./index":14}],11:[function(e,t,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var a=Object.getOwnPropertyDescriptor(t,n);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,a)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return a(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const l=r(e("../MIDI")),u=o(e("."));n.default=function(){const e=(0,u.default)();function t(t){t.type===l.MIDI_NOTE_ON?e.$noteOn(u.default.noteOn(t.pitch,t.velocity)):t.type===l.MIDI_NOTE_OFF&&e.$noteOff(u.default.noteOff(t.pitch,t.velocity))}return l.addMidiMessageListener(t),{...e,dispose:()=>{e.dispose(),l.removeMidiMessageListener(t)}}}},{".":14,"../MIDI":15}],12:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const a=i(e("./index"));n.default=function(...e){const t=(0,a.default)();for(const n of e)n.$noteOn.map((e=>{t.state[e.pitch]||t.$noteOn(e)})),n.$noteOff.map((n=>{e.every((e=>!e.state[n.pitch]))&&t.$noteOff(n)}));return{...t,disposeAll:()=>{e.forEach((e=>e.dispose())),t.dispose()}}}},{"./index":14}],13:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const a=i(e("./index"));n.default=function(e){const t=(0,a.default)();let n;function i(e){if(null!=n)return!1;const i=function(e){const t=e.target;if(!t||!t.dataset||!t.dataset.noteid)return;const n=Number(t.dataset.noteid);return Number.isSafeInteger(n)&&n>=0?n:void 0}(e);return null!=i&&(n=i,t.$noteOn(a.default.noteOn(n)),!0)}function r(e){return null!=n&&(t.$noteOff(a.default.noteOff(n)),n=void 0,!0)}function o(e){e.preventDefault(),i(e)&&window.addEventListener("mouseup",(function e(t){t.preventDefault(),window.removeEventListener("mouseup",e),r()}))}function l(e){e.preventDefault(),i(e)&&window.addEventListener("touchend",(function e(t){t.preventDefault(),window.removeEventListener("touchend",e),r()}))}return e.addEventListener("mousedown",o),e.addEventListener("touchstart",l),{...t,dispose:()=>{t.dispose(),e.removeEventListener("touchstart",l),e.removeEventListener("mousedown",o)}}}},{"./index":14}],14:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const a=i(e("mithril/stream"));function r(){const e={$noteOn:(0,a.default)(),$noteOff:(0,a.default)(),state:Array.from({length:r.TOTAL_NOTES},(()=>!1)),dispose:()=>{e.$noteOn.end(!0),e.$noteOff.end(!0)}};return e.$noteOn.map((t=>{e.state[t.pitch]=!0})),e.$noteOff.map((t=>{e.state[t.pitch]=!1})),e}!function(e){function t(t,n,i=("on"===t?e.MAX_VELOCITY:e.OFF_VELOCITY)){return{type:t,pitch:n,velocity:i}}e.TOTAL_NOTES=128,e.MAX_VELOCITY=127,e.OFF_VELOCITY=64,e.NoteEvent=t,e.noteOn=function(n,i=e.MAX_VELOCITY){return t("on",n,i)},e.noteOff=function(n,i=e.OFF_VELOCITY){return t("off",n,i)}}(r||(r={})),n.default=r},{"mithril/stream":void 0}],15:[function(e,t,n){"use strict";let i;Object.defineProperty(n,"__esModule",{value:!0}),n.removeMidiMessageListener=n.addMidiMessageListener=n.listMidiInputs=n.MidiMessage=n.MIDI_NOTE_OFF=n.MIDI_NOTE_ON=void 0,n.MIDI_NOTE_ON=144,n.MIDI_NOTE_OFF=128,n.MidiMessage={fromData:e=>({cmd:e[0]>>4,channel:15&e[0],type:240&e[0],pitch:e[1],velocity:e[2]})};const a=[];function r(e){if(a.length<1)return;if(!function(e){return null!=e.data}(e))return void console.warn("ignoring non-MIDI message event:",e);let t;i&&(t=i.findIndex((t=>t===e.currentTarget)),t<0&&(t=void 0));const r=n.MidiMessage.fromData(e.data);for(const e of a)null!=t&&null!=e.index&&e.index!==t||e.f(r)}n.listMidiInputs=async function(e=!1){if(!e&&null!=i)return i;if(i=[],navigator.requestMIDIAccess){console.log("navigator.requestMIDIAccess found");try{(await navigator.requestMIDIAccess()).inputs.forEach((e=>{console.log("Found MIDI input:",e),i.push(e)}))}catch(e){console.warn("requestMIDIAccessFailure:",e)}}else console.log("navigator.requestMIDIAccess found");return i},n.addMidiMessageListener=function(e,t){if(a.length<1){if(null!=i)for(const e of i)e.onmidimessage=r}else if(a.some((t=>t.f===e)))return!1;return a.push({f:e,index:t}),!0},n.removeMidiMessageListener=function(e,t){const n=a.findIndex((t=>t.f===e));if(n<0)return!1;if(a.splice(n,1),a.length<1&&null!=i)for(const e of i)e.onmidimessage=null;return!0}},{}],16:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.findMapValue=n.findMapKey=n.findKey=n.has=n.size=n.keys=n.map=n.is=n.create=void 0,n.create=function(){return Object.create(null)},n.is=function(e){return null!=e&&"object"==typeof e},n.map=function(e,t){return(0,n.keys)(e).map((n=>t(e[n],n)))},n.keys=Object.keys.bind(Object),n.size=function(e){return(0,n.keys)(e).length},n.has=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.findKey=function(e,t){const i=(0,n.keys)(e);for(let n=0;n<i.length;++n){const a=i[n];if(t(e[a],a))return!0}return!1},n.findMapKey=function(e,t){for(const[n,i]of e.entries())if(t(i,n))return n},n.findMapValue=function(e,t){for(const[n,i]of e.entries())if(t(i,n))return i}},{}],17:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});const i={wkWidth:16,wkHeight:80,bkWidth:11.2,bkHeight:48,x:0,y:0};function a(e){const t={...e},n=r("svg");n.classList.add(t.classRoot||"pianosvg");const o=r("g");o.classList.add(t.classWGroup||"key-white");const l=r("g");l.classList.add(t.classBGroup||"key-black"),n.appendChild(o),n.appendChild(l);const u=Array.from({length:a.NUM_NOTES},(()=>null)),s={...i,keys:Array.from({length:a.NUM_NOTES},(()=>a.KEYSTATE_NOKEY))};function d(e,n){if(!n)throw new Error("Cannot create svg for non-renderable KeyState");const i=a.NOTE_COLORS[e%12],o=r("rect"),l="b"===i?t.classBKey:t.classWKey;return l&&o.classList.add(l),n===a.KEYSTATE_ON&&t.classActive&&o.classList.add(t.classActive),o.setAttribute("x",String(s.x+function(e){const t=a.wkCountToId(e);return"w"===a.NOTE_COLORS[e%12]?t*s.wkWidth:t*s.wkWidth-s.bkWidth/2}(e))),o.setAttribute("y",String(s.y)),o.setAttribute("width",String("b"===i?s.bkWidth:s.wkWidth)),o.setAttribute("height",String("b"===i?s.bkHeight:s.wkHeight)),o.dataset.noteid=String(e),o}function c(e,t){if(u[e])throw new Error("Already existing DOM Element for id: "+e);u[e]=t;const n="b"===a.NOTE_COLORS[e%12]?l:o,i=function(e,t){const n=a.NOTE_COLORS[e%12];for(let i=e+1;i<a.NUM_NOTES;++i)if(t[i]&&a.NOTE_COLORS[i%12]===n)return i;return}(e,s.keys);if(null!=i){const e=u[i];if(!e)throw new Error("Element expected at "+i);n.insertBefore(t,e)}else n.appendChild(t)}return{element:n,render:function(e){!function(e){null!=e.wkWidth&&(s.wkWidth=e.wkWidth),null!=e.wkHeight&&(s.wkHeight=e.wkHeight),null!=e.bkWidth&&(s.bkWidth=e.bkWidth),null!=e.bkHeight&&(s.bkHeight=e.bkHeight),null!=e.x&&(s.x=e.x),null!=e.y&&(s.y=e.y)}(e);const n=e.keys;if(!n)return;const i=s.keys;for(let e=0;e<a.NUM_NOTES;++e)if(n[e]!=i[e]){const r=n[e],o=i[e],l=u[e];l?(r||(l.remove(),u[e]=null),r!==a.KEYSTATE_ON&&o!==a.KEYSTATE_ON||l.classList.toggle(t.classActive||"key-active")):r&&c(e,d(e,r)),i[e]=n[e]||0}}}}function r(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}!function(e){e.KEYSTATE_NOKEY=0,e.KEYSTATE_OFF=1,e.KEYSTATE_ON=2,e.NOTE_COLORS=["w","b","w","b","w","w","b","w","b","w","b","w"],e.NUM_NOTES=128,e.DEFAULTS=i,e.wkCountToId=function(t){if(!Number.isSafeInteger(t)||t<0||t>=e.NUM_NOTES)throw new Error("Invalid id for count: "+t);let n=0;for(let i=0;i<t;++i)"w"===e.NOTE_COLORS[i%12]&&++n;return n}}(a||(a={})),n.default=a},{}],18:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.TRIADS=n.INTERVALS=void 0,n.INTERVALS=[{type:"interval",name:"Perfect Unison",i:[0]},{type:"interval",name:"Minor Second",i:[1]},{type:"interval",name:"Major Second",i:[2]},{type:"interval",name:"Minor Third",i:[3]},{type:"interval",name:"Major Third",i:[4]},{type:"interval",name:"Perfect Fourth",i:[5]},{type:"interval",name:"Perfect Fifth",i:[7]},{type:"interval",name:"Minor Sixth",i:[8]},{type:"interval",name:"Major Sixth",i:[9]},{type:"interval",name:"Minor Seventh",i:[10]},{type:"interval",name:"Major Seventh",i:[11]},{type:"interval",name:"Perfect Ocatave",i:[12]}],n.TRIADS=[{type:"triad",name:"Major",i:[4,7]},{type:"triad",name:"Minor",i:[3,7]},{type:"triad",name:"Sus 2",i:[2,7]},{type:"triad",name:"Sus 4",i:[5,7]},{type:"triad",name:"Diminished",i:[3,6]},{type:"triad",name:"Augmented",i:[4,8]}]},{}],19:[function(e,t,n){"use strict";function i(e){e.getBoundingClientRect()}function a(e){const t=window.document.styleSheets[0].cssRules||window.document.styleSheets[0].rules;for(let n=0,i=t.length;n<i;++n)if(t[n].selectorText===e)return t[n]}Object.defineProperty(n,"__esModule",{value:!0}),n.onValue=n.setCssStyle=n.getCssRule=n.fbind=n.dbind=n.unlockKeyNav=n.formToObject=n.lockKeyNav=n.classy=n.transitionPromise=n.triggerTransition=n.smoothScrollTo=n.readyDom=n.$qa=n.$q=void 0,n.$q=function(e,t=document){return t.querySelector(e)||void 0},n.$qa=function(e,t=document){return Array.from(t.querySelectorAll(e))},n.readyDom=i,n.smoothScrollTo=function(e=0,t=window){setTimeout((()=>{t.scrollTo({top:e,behavior:"smooth"})}),1)},n.triggerTransition=function(e,t){i(e),"string"==typeof t?e.classList.toggle(t):Object.assign(e.style,t)},n.transitionPromise=function(e,t){return"string"==typeof t?e.classList.toggle(t):null!=t&&Object.assign(e.style,t),new Promise((t=>{e.addEventListener("transitionend",t)}))},n.classy=function(e){let t="";if(Array.isArray(e))for(const n of e)n&&(t.length>0&&(t+=" "),t+=n.trim());else for(const n of Object.keys(e))e[n]&&(t.length>0&&(t+=" "),t+=n);return t},n.lockKeyNav=function(e){return Array.from(document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter((t=>null!=t.tabIndex&&t.tabIndex>=0&&!e.contains(t))).reduce(((e,t)=>(e.elements.push(t),e.tabIndices.push(t.tabIndex),t.tabIndex=-1,e)),{elements:[],tabIndices:[]})},n.formToObject=function(e,t){return Array.from(e.querySelectorAll("input,select")).reduce(((e,n)=>(n.name&&(e[n.name]=t?n.value.trim():n.value),e)),{})},n.unlockKeyNav=function(e){for(let t=0;t<e.elements.length;++t)e.elements[t].tabIndex=e.tabIndices[t];e.elements=[],e.tabIndices=[]},n.dbind=function(e,t,n="oninput"){return{name:t,value:e[t],[n]:n=>{e[t]=n.currentTarget.value}}},n.fbind=function(e,t={},n){function i(i){const a=i.target,r=a.name;if(!r)return;const o="function"==typeof t?t:t[r]??n,l=a.value,u=o?o(l,r):l;if(e[r]=u,u!==l&&"input"===i.type){const e=a.selectionStart,t=a.selectionEnd;a.value=u,a.selectionStart=e,a.selectionEnd=t}}return{oninput:i,onchange:i}},n.getCssRule=a,n.setCssStyle=function(e,t,n){const i=a(e);i&&(i.style[t]=n)},n.onValue=function(e){return t=>{e(t.currentTarget.value)}}},{}],20:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.pmod=n.clamp=void 0,n.clamp=function(e,t,n){return Math.min(Math.max(e,t),n)},n.pmod=function(e,t){return(e%t+t)%t}},{}],21:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.pitchToHz=n.PITCHES=n.NOTES=n.NOTES_IDS=n.NOTES_SPEECH=n.UNIQUE_NOTES=n.LOW_C_HZ=void 0,n.LOW_C_HZ=16.35,n.UNIQUE_NOTES=["C","Db","D","Eb","E","F","Fs","G","Ab","A","Bb","B"],n.NOTES_SPEECH={C:"See",Db:"Dee flat",D:"Dee",Eb:"E flat",E:"E",F:"Eph",Fs:"Eph sharp",G:"Gee",Ab:"Hey flat",A:"Hey",Bb:"Bee flat",B:"Bee"};const i={Cs:"Db",Ds:"Eb",Fs:"Gb",Gs:"Ab",As:"Bb"};n.NOTES_IDS=["C","Cs","Db","D","Ds","Eb","E","F","Fs","Gb","G","Gs","Ab","A","As","Bb","B"],n.NOTES=Array.from({length:9},((e,t)=>t)).reduce(((e,t)=>{const a=String(t);for(let r=0;r<n.UNIQUE_NOTES.length;++r){const o=n.UNIQUE_NOTES[r],l=o+a,u=Math.pow(2,t)*n.LOW_C_HZ*Math.pow(2,r/n.UNIQUE_NOTES.length);e[l]=u;const s=i[o];null!=s&&(e[s+a]=u)}return e}),Object.create(null)),console.log(n.NOTES),n.PITCHES=Array.from({length:9},((e,t)=>t)).reduce(((e,t)=>{for(let i=0;i<n.UNIQUE_NOTES.length;++i){const a=Math.pow(2,t)*n.LOW_C_HZ*Math.pow(2,i/n.UNIQUE_NOTES.length);e.push(a)}return e}),[]),n.pitchToHz=function(e){let t;if(t="number"==typeof e?n.PITCHES[e]:n.NOTES[e],null==t)throw null==e?new Error("Pitch parameter required"):new Error("Unrecognized pitch: "+e);return t}},{}],22:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.debounce=n.wait=void 0,n.wait=function(e){let t;const n=new Promise((n=>{t=setTimeout((()=>{t=void 0,n(e)}),e)}));return n.cancel=()=>{null!=t&&(clearTimeout(t),t=void 0)},n},n.debounce=function(e,t=0){let n;return function(...i){null!=n&&clearTimeout(n),n=setTimeout((()=>e.apply(void 0,i)),t)}}},{}],23:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const a=i(e("mithril")),r=i(e("./components/Home"));a.default.route(document.body,"/",{"/":r.default}),void 0!==t&&t.hot&&t.hot.accept()},{"./components/Home":5,mithril:void 0}],24:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.Field=n.FIELD_TYPES=n.FloatArray=n.Int=n.Float=void 0,n.Float={is:e=>"number"==typeof e&&Number.isFinite(e),inRange:(e,t,i)=>n.Float.is(e)&&(null==t||e>=t)&&(null==i||e<=i)},n.Int={is:e=>"number"==typeof e&&Number.isSafeInteger(e),inRange:(e,t,i)=>n.Int.is(e)&&(null==t||e>=t)&&(null==i||e<=i)},n.FloatArray={is:e=>Array.isArray(e)&&e.every((e=>n.Float.is(e))),parse:e=>{const t=e.split(",").map((e=>Number(e.trim())));return t.every((e=>n.Float.is(e)))?t:void 0}},n.FIELD_TYPES=["string","int","float","floatarray","select","object"],n.Field={is:e=>"object"==typeof e&&n.FIELD_TYPES.includes(e.type)}},{}],25:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.fmSynthSchema=void 0,n.fmSynthSchema=[{type:"object",name:"oscillator",label:"Oscillator",fields:[{type:"select",name:"type",label:"Type",required:!0,options:[{value:"sine",text:"Sine"},{value:"triangle",text:"Triangle"},{value:"sawtooth",text:"Sawtooth"},{value:"square",text:"Square"}]},{type:"float",name:"phase",label:"Phase",required:!0},{type:"floatarray",name:"partials",label:"Partials",required:!1,min:0}],required:!1},{type:"float",name:"harmonicity",label:"Harmonicity",min:0,required:!0},{type:"int",name:"portamento",label:"Portamento",required:!0},{type:"object",name:"envelope",label:"Envelope",fields:[{type:"float",name:"attack",label:"Attack",required:!0},{type:"select",name:"attackCurve",label:"Attack Curve",required:!0,options:[{value:"linear",text:"Linear"},{value:"exponential",text:"Exponential"},{value:"sine",text:"Sine"},{value:"cosine",text:"Cosine"},{value:"bounce",text:"Bounce"},{value:"ripple",text:"Ripple"},{value:"step",text:"Step"}]},{type:"float",name:"sustain",label:"Sustain",required:!0},{type:"float",name:"decay",label:"Decay",required:!0},{type:"select",name:"decayCurve",label:"Decay Curve",required:!0,options:[{value:"linear",text:"Linear"},{value:"exponential",text:"Exponential"},{value:"sine",text:"Sine"},{value:"cosine",text:"Cosine"},{value:"bounce",text:"Bounce"},{value:"ripple",text:"Ripple"},{value:"step",text:"Step"}]},{type:"float",name:"release",label:"Release",required:!0},{type:"select",name:"releaseCurve",label:"Release Curve",required:!0,options:[{value:"linear",text:"Linear"},{value:"exponential",text:"Exponential"},{value:"sine",text:"Sine"},{value:"cosine",text:"Cosine"},{value:"bounce",text:"Bounce"},{value:"ripple",text:"Ripple"},{value:"step",text:"Step"}]}],required:!1},{type:"object",name:"modulation",label:"Modulation",fields:[{type:"select",name:"type",label:"Type",required:!0,options:[{value:"sine",text:"Sine"},{value:"triangle",text:"Triangle"},{value:"sawtooth",text:"Sawtooth"},{value:"square",text:"Square"}]},{type:"float",name:"phase",label:"Phase",required:!0},{type:"floatarray",name:"partials",label:"Partials",required:!1,min:0}],required:!1},{type:"object",name:"modulationEnvelope",label:"Modulation Envelope",required:!1,fields:[{type:"int",name:"modulationIndex",label:"Modulation Index",required:!0},{type:"float",name:"attack",label:"Attack",required:!0},{type:"select",name:"attackCurve",label:"Attack Curve",required:!0,options:[{value:"linear",text:"Linear"},{value:"exponential",text:"Exponential"},{value:"sine",text:"Sine"},{value:"cosine",text:"Cosine"},{value:"bounce",text:"Bounce"},{value:"ripple",text:"Ripple"},{value:"step",text:"Step"}]},{type:"float",name:"sustain",label:"Sustain",required:!0},{type:"float",name:"decay",label:"Decay",required:!0},{type:"select",name:"decayCurve",label:"Decay Curve",required:!0,options:[{value:"linear",text:"Linear"},{value:"exponential",text:"Exponential"},{value:"sine",text:"Sine"},{value:"cosine",text:"Cosine"},{value:"bounce",text:"Bounce"},{value:"ripple",text:"Ripple"},{value:"step",text:"Step"}]},{type:"float",name:"release",label:"Release",required:!0},{type:"select",name:"releaseCurve",label:"Release Curve",required:!0,options:[{value:"linear",text:"Linear"},{value:"exponential",text:"Exponential"},{value:"sine",text:"Sine"},{value:"cosine",text:"Cosine"},{value:"bounce",text:"Bounce"},{value:"ripple",text:"Ripple"},{value:"step",text:"Step"}]}]}]},{}]},{},[23]);