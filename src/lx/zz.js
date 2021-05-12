/***********************/
/* 第一题：弹窗疲劳度控制 */
/***********************/

/*****************/
/* 题目要求 start */
// 已知你的项目中有一个封装的公共方法，向用户展示一个弹窗（无法更改，只能调用）：
const showModal = () => {
  // 模拟展示弹窗
  console.log('modal shown!');
};

// 你接到了一个需求，需要对该弹窗展示做疲劳度控制（每一段时间内最多展示 N 次）
// 要求是实现一个 wrapShowModal 方法（函数闭包），用来进行弹窗疲劳度控制
/* 题目要求 end */
/*****************/



/**************************/
/* 需要完成并提交的代码 start */
function wrapShowModal (time, n) {
  const currtime=new Date().getTime();
  var rrr=0;
  console.log(currtime,'currtime');
  // 你需要实现的代码逻辑如下：
  return function () {
    // 实际在业务代码中会调用这个 function
    // 满足特定条件调用 showModal();
    var ttt=new Date().getTime();
     console.log(time/n*1000);
     
    if((ttt-currtime-rrr)%((time/n).toFixed(2)*1000)>=3000){
      showModal()
    }
    rrr=ttt-currtime;
    console.log(ttt,currtime,ttt-currtime,'111111');
  }
}
/* 需要完成并提交的代码 end */
/**************************/



/**************************/
/* 代码调用和测试用例 start */
// 代码调用示例：
const wrapped = wrapShowModal(10, 3); // 每 10 秒最多展示 3 次 弹窗

wrapped(); // 会打印
setTimeout(() => {
  wrapped(); // 会打印
}, 3e3);
setTimeout(() => {
  wrapped(); // 会打印
}, 6e3);
setTimeout(() => {
  wrapped(); // 会打印
}, 11e3);
setTimeout(() => {
  wrapped(); // 不会打印
}, 12e3);
setTimeout(() => {
  wrapped(); // 会打印
}, 13e3);
setTimeout(() => {
  wrapped(); // 不会打印
}, 15e3);
/* 代码调用和测试用例 end */
/**************************/


// /*************************/
// /* 第二题：复用数据请求结果 */
// /*************************/

// /*****************/
// /* 题目要求 start */
// // 已知你的项目中有一个封装的公共方法，用来向服务端请求数据（无法更改，只能调用）：
// const request = () => {
//   return new Promise (resolve => {
//     // 用 setTimeout 来模拟向服务端请求数据的过程，假设无异常情况
//     setTimeout(() => {
//       resolve(++request.n);
//     }, 1e3);
//   });
// };
// request.n = 0;

// // 你在项目中需要频繁使用这个方法来请求数据
// // 为了优化性能，希望通过避免重复请求来减少请求的频率
// // 要求是实现一个 wrapRequest 方法（函数闭包）来做到同时发起 request 请求时，复用一次请求的结果
// /* 题目要求 end */
// /*****************/



// /**************************/
// /* 需要完成并提交的代码 start */
// function wrapRequest () {
//   // 你需要实现的代码逻辑如下：
//   // 如果当前没有在发起请求（或上次请求已发起并返回），（重新）发起一次请求
//   // 如果有请求正在发起并且未返回，使用这一次请求的返回结果
//   return function () {
//     // 实际在业务代码中会调用这个 function
//     // 代码逻辑，最终返回 Promise 实例，拿到结果
//   }
// }
// /* 需要完成并提交的代码 end */
// /**************************/



// /**************************/
// /* 代码调用和测试用例 start */
// const wrapped = wrapRequest();

// // 只会发起一次 request 请求，都复用第一次 request 服务端返回的结果
// wrapped().then(n => { console.log(n); });
// wrapped().then(n => { console.log(n); });
// wrapped().then(n => { console.log(n); });

// // 第一次 request 结果已经返回，重新发第二次 request 请求
// // 只会发起一次 request 请求，都复用第二次 request 服务端返回的结果
// setTimeout(() => {
//   wrapped().then(n => { console.log(n); });
//   wrapped().then(n => { console.log(n); });
//   wrapped().then(n => { console.log(n); });
// }, 2e3);

// /*
//  预期输出的结果：
//  1
//  1
//  1
//  2
//  2
//  2
// */
// /* 代码调用和测试用例 end */
// /**************************/

