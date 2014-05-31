"use strict";angular.module("clashApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngTouch","ngAnimate"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("clashApp").factory("Squad",["Tank","Spear","Healer","Archer","Dead","$timeout",function(a,b,c,d,e){function f(a,b){this.w=a,this.h=b,this.list=[],this.init()}var g=[a,b,c,d];return f.prototype.init=function(){var a=this.w,b=this.h;if(this.w&&this.h)for(var c=0;a>c;c++){for(var d=[],e=0;b>e;e++){var f=this.getANewSoldier();f.x=c,f.y=e,d[e]=f}this.list[c]=d}},f.prototype.getANewSoldier=function(){g.length<=0&&(g=[a,b,c,d]);var e=g.splice(Math.floor(Math.random()*g.length),1),f=new e[0];return f},f.prototype.getSoldierByPos=function(a,b){return this.list[a]&&this.list[a][b]?this.list[a][b]:!1},f.prototype.getMatrix=function(){return this.list},f.prototype.swap=function(a,b){function c(a,b){var c=Math.abs(a.x-b.x),d=Math.abs(a.y-b.y);return 1!==c&&1!==d||c+d!==1?!1:b instanceof e&&b.x>a.x||a instanceof e&&a.x>b.x?!1:!0}if(c(a,b)){var d=this.list;d[a.x][a.y]=b,d[b.x][b.y]=a;var f=a.x,g=a.y;return a.x=b.x,a.y=b.y,b.x=f,b.y=g,!0}return!1},f}]),angular.module("clashApp").controller("MainCtrl",["$scope","Squad","Dead","Spear","Healer","Tank","Archer","$timeout",function(a,b,c,d,e,f,g,h){var i=new Audio("sounds/clash.mp3"),j=new Audio("sounds/clash2.mp3"),k=new Audio("sounds/clash3.mp3"),l=new Audio("sounds/clash4.mp3"),m=[i,j,k,l],n=new Audio("sounds/click.mp3"),o=null,p=null,q=[],r=7,s=4,t=0,u=new b(s,r),v=new b(s,r),w="clashHightScore4",x=r*s;a.gameOver=!1,a.turn=0,a.movesLeft=10,a.MAXMOVESLEFT=a.movesLeft;var y=0,z=[],A=parseInt(localStorage[w]||0);a.enemyMatrix=[],a.matrix=[],h(function(){a.enemyMatrix=u.getMatrix(),a.matrix=v.getMatrix()},500);var B=0;a.resetGame=function(){n.play(),o=null,p=null,q=[],u=new b(s,r),v=new b(s,r),x=r*s,a.gameOver=!1,a.turn=0,a.movesLeft=10,a.MAXMOVESLEFT=a.movesLeft,t=0,y=0,z=[],a.enemyMatrix=u.getMatrix(),a.matrix=v.getMatrix(),B=0},a.range=function(a){return new Array(a)},a.displayClass={selected:function(a){return a===o?"selected":""},highlighted:function(a){return-1!==q.indexOf(a)?"highlighted":""},clashAnimation:function(b){return a.clashAnimationOn?"up"===b?"bendup":"left"===b?"hideleft":"benddown":""},deathAnimation:function(a){return a.health<=0&&a instanceof c!=!0?"killed":""},getGemClass:function(b){return b>=a.movesLeft?"gem-empty":"gem-full"}},a.clearRangesHighlight=function(){q=[]},a.showInRanges=function(b,c){var d,f,g=c.x,h=c.y;b?(d=a.matrix,f=a.enemyMatrix):(d=a.enemyMatrix,f=a.matrix),c instanceof e?(d[g-1]&&d[g-1][h]&&q.push(d[g-1][h]),d[g+1]&&d[g+1][h]&&q.push(d[g+1][h]),d[g]&&d[g][h-1]&&q.push(d[g][h-1]),d[g]&&d[g][h+1]&&q.push(d[g][h+1])):f[c.attackRange-1-g]&&f[c.attackRange-1-g][h]&&q.push(f[c.attackRange-1-g][h])},a.getAbsPos=function(a,b){var c={},d=100;return a?c.bottom=60*b.x+"px":c.top=60*b.x+"px",c.left=60*b.y+d+"px",c},a.awesomeThings=[v.w,"AngularJS","Karma"],a.runClashAnimation=function(){a.clashAnimationOn=!0,h(function(){a.clashAnimationOn=!1},1500)},a.getScore=function(){return t},a.getKilled=function(){return B},a.getCombos=function(){return a.gameOver?z:[]},a.getHighScore=function(){return A},a.playSound=function(){0===m.length&&(m=[i,j,k,l]);var a=m.splice(Math.floor(Math.random()*m.length),1)[0];a.play()},a.clash=function(){function b(){function b(a,b){if(a&&"dead"!==a.className){var d=a.x,e=a.y;b[d-1]&&b[d-1][e]&&c(b[d-1][e]),b[d+1]&&b[d+1][e]&&c(b[d+1][e]),b[d]&&b[d][e-1]&&c(b[d][e-1]),b[d]&&b[d][e+1]&&c(b[d][e+1])}}function c(a){var b=(a.health,a.health+1);a.health=Math.min(b,a.MAXHEALTH)}for(var d=a.matrix,e=a.enemyMatrix,f=0;s>f;f++)for(var g=0;r>g;g++){var h=d[f][g],i=e[f][g];h&&"healer"===h.className&&b(h,d),i&&"healer"===i.className&&b(i,e)}}function d(){function b(a,b){if(a&&!(a instanceof c)){var f;f=b?e:d;var g=a.attackRange-1-a.x;if(f[g]){var h=f[g][a.y];h&&h instanceof c!=!0&&(h.health-=a.attack)}}}for(var d=a.matrix,e=a.enemyMatrix,f=0;2>f;f++)for(var g=0;r>g;g++){var h=d[f][g],i=e[f][g];b(h,1),b(i,0)}}function e(){function b(a,b,d){var e=a[b][d];e&&e.health<1&&e instanceof c!=!0&&(a[b][d]=void 0),e instanceof c==!0&&a[b+1]&&a[b+1][d]&&a[b+1][d]instanceof c!=!0&&(a[b][d]=void 0)}function d(b,d,e,f,g){var i=b[d][e];if(!i){for(;b[d+1]&&b[d+1][e]&&b[d+1][e]instanceof c!=!0;)b[d][e]=b[d+1][e],b[d][e].x=d,b[d][e].y=e,d+=1;if(g){t++,y++,B++;var j=u.getANewSoldier();j.x=d,j.y=e,b[d][e]=j,h(function(){t>A&&(A=t,localStorage[w]=t)})}else b[d][e]=new c,b[d][e].x=d,b[d][e].y=e,x--,0>=x&&(a.gameOver=!0)}}for(var e=a.matrix,f=a.enemyMatrix,g=0;2>g;g++)for(var i=0;r>i;i++)b(e,g,i,v),b(f,g,i,u);for(var g=0;2>g;g++)for(var i=0;r>i;i++)d(e,g,i,v,!1),d(f,g,i,u,!0)}n.play(),o=null,p=null,a.runClashAnimation(),h(function(){b(),d(),a.playSound()},900),h(function(){e(),e(),y&&(void 0===z[y]?z[y]=1:z[y]++),t+=parseInt(Math.pow(3.3,y)-1),y=0},1500),a.turn++,a.movesLeft=10},a.reportPos=function(a){n.play()},a.go=function(b){n.play(),a.movesLeft>0&&(o?o===b?o=null:p=b:o=b,p&&(v.swap(o,p)?(o=null,p=null,a.movesLeft--):(o=p,p=null)))}}]),angular.module("clashApp").factory("Soldier",function(){function a(){this.moved=!1,this.x,this.y,this.id="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)})}return a.prototype.attack=function(){this.moved=!0},a.prototype.swap=function(){this.moved=!0},a}),angular.module("clashApp").factory("Tank",["Soldier",function(a){function b(){a.call(this),this.className="tank",this.health=8,this.MAXHEALTH=this.health,this.attackRange=1,this.attack=2}return b.prototype=new a,b}]),angular.module("clashApp").factory("Archer",["Soldier",function(a){function b(){a.call(this),this.className="archer",this.health=2,this.MAXHEALTH=this.health,this.attackRange=2,this.attack=4}return b.prototype=new a,b}]),angular.module("clashApp").factory("Healer",["Soldier",function(a){function b(){a.call(this),this.className="healer",this.health=3,this.MAXHEALTH=this.health,this.attackRange=1,this.attack=2}return b.prototype=new a,b}]),angular.module("clashApp").factory("Spear",["Soldier",function(a){function b(){a.call(this),this.className="spear",this.health=4,this.MAXHEALTH=this.health,this.attackRange=1,this.attack=3}return b.prototype=new a,b}]),angular.module("clashApp").factory("Game",["Squad",function(){function a(){this.state="idel",this.moves=10,this.turn=0,this.selected=null,this.targeted=null}return a.prototype.clash=function(){this.nextTurn()},a.prototype.nextTurn=function(){this.turn++,this.moves=10},a}]),angular.module("clashApp").factory("Dead",["Soldier",function(a){function b(){a.call(this),this.className="dead",this.health=0,this.MAXHEALTH=this.health,this.attackRange=0,this.attack=0}return b.prototype=new a,b}]);