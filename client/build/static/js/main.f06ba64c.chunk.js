(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){e.exports=a(29)},17:function(e,t,a){},21:function(e,t,a){},23:function(e,t,a){},25:function(e,t,a){},27:function(e,t,a){},29:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(5),l=a.n(r),c=(a(17),a(2)),u=a.n(c),o=a(3),i=a(6),k=a(7),d=a(10),p=a(8),h=a(11),m=a(1),T=a(9);a(21);var v=function(e){var t=Object(T.a)(e.task,7),a=t[0],n=t[2],r=t[3],l=t[4],c=t[5],u=t[6],o=c.value?c.value.substring(0,10):"",i="High"===u.value?"task__priority--high":"task__priority";return s.a.createElement("div",{className:"task"},s.a.createElement("form",{id:a.value},s.a.createElement("input",{className:"task__title",type:"text",name:"task_title",value:n.value,onChange:e.handleTaskUpdate,onBlur:e.putTaskUpdate}),s.a.createElement("input",{className:"task__completed",type:"checkbox",name:"task_completed",checked:l.value,onChange:e.handleTaskUpdate,onBlur:e.putTaskUpdate}),s.a.createElement("input",{className:"task__desc",type:"text",name:"task_desc",placeholder:"...",value:r.value,onChange:e.handleTaskUpdate,onBlur:e.putTaskUpdate}),s.a.createElement("input",{className:"task__scheduledDt",type:"date",name:"task_scheduled_dt",value:o,onChange:e.handleTaskUpdate,onBlur:e.putTaskUpdate}),s.a.createElement("select",{className:i,name:"priority_desc",value:u.value,onChange:e.handleTaskUpdate,onBlur:e.putTaskUpdate},s.a.createElement("option",null,"High"),s.a.createElement("option",null,"Medium"),s.a.createElement("option",null,"Low"))))},f=(a(23),function(e){return s.a.createElement("button",{className:"newTaskButton",type:"button",onClick:e.postNewTask},"Add Task")}),g=(a(25),function(e){return s.a.createElement("div",{className:"newTaskForm"},s.a.createElement("form",null,s.a.createElement("input",{className:"newTaskForm__titleInput",type:"text",placeholder:"Task Title",value:e.newTaskTitle,onChange:e.handleNewTaskChange}),s.a.createElement(f,{postNewTask:e.postNewTask})))}),w=(a(27),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).getAllTasks=Object(o.a)(u.a.mark(function e(){var t;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/allTasks");case 2:return t=e.sent,e.next=5,t.json().then(function(e){a.setState({isFetched:!0,tasks:e})},function(e){a.setState({error:e,isFetched:!0})});case 5:case"end":return e.stop()}},e,this)})),a.postNewTask=Object(o.a)(u.a.mark(function e(){var t;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==(t=a.state.newTaskTitle)){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,fetch("/addTask/".concat(t),{method:"POST"}).then(function(){return a.setState({newTaskTitle:""})}).then(function(){return a.getAllTasks()});case 5:case"end":return e.stop()}},e,this)})),a.state={error:null,isFetched:!1,tasks:[],newTaskTitle:""},a.getAllTasks=a.getAllTasks.bind(Object(m.a)(Object(m.a)(a))),a.putTaskUpdate=a.putTaskUpdate.bind(Object(m.a)(Object(m.a)(a))),a.handleTaskUpdate=a.handleTaskUpdate.bind(Object(m.a)(Object(m.a)(a))),a.handleNewTaskChange=a.handleNewTaskChange.bind(Object(m.a)(Object(m.a)(a))),a.postNewTask=a.postNewTask.bind(Object(m.a)(Object(m.a)(a))),a}return Object(h.a)(t,e),Object(k.a)(t,[{key:"putTaskUpdate",value:function(e){var t,a=Number(e.target.parentNode.id),n=e.target.name;"task_title"===n&&""===t||(t="task_completed"===n?e.target.checked?1:0:e.target.value,fetch("/amendTask/".concat(a,"/field/").concat(n,"/value/").concat(t),{method:"PUT"}))}},{key:"handleTaskUpdate",value:function(e){var t,a=Number(e.target.parentNode.id),n=e.target.name;t="task_completed"===n?e.target.checked?1:0:e.target.value;var s=this.state.tasks.map(function(e){return e[0].value===a?e.map(function(e){if(e.metadata.colName===n){var a=JSON.parse(JSON.stringify(e));return a.value=t,a}return e}):e});this.setState({tasks:s})}},{key:"handleNewTaskChange",value:function(e){var t=e.target.value;this.setState({newTaskTitle:t})}},{key:"componentDidMount",value:function(){this.getAllTasks()}},{key:"render",value:function(){var e=this,t=this.state,a=t.error,n=t.isFetched;if(a)return console.log(a.message),s.a.createElement("section",null,s.a.createElement("p",null,"Sorry, something went wrong. Please try again."));if(n){var r=this.state.tasks.map(function(t){return s.a.createElement(v,{key:t[0].value,task:t,handleTaskUpdate:e.handleTaskUpdate,putTaskUpdate:e.putTaskUpdate})});return s.a.createElement("section",{className:"tasksContainer"},r,s.a.createElement(g,{newTaskTitle:this.state.newTaskTitle,handleNewTaskChange:this.handleNewTaskChange,postNewTask:this.postNewTask}))}return s.a.createElement("section",null,s.a.createElement("p",null,"Your tasks are loading..."))}}]),t}(n.Component));l.a.render(s.a.createElement(w,null),document.getElementById("root"))}},[[12,2,1]]]);
//# sourceMappingURL=main.f06ba64c.chunk.js.map