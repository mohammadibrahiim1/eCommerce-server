// // const takeOrder = (customer, callback) => {
// //   console.log(`take order for ${customer}`);
// //   callback(customer);
// // };

// // const processOrder = (customer, callback) => {
// //   console.log(`process order for ${customer}`);
// //   setTimeout(() => {
// //     console.log("cooking completed");
// //     console.log(`order processed for ${customer}`);
// //     callback(customer);
// //   }, 3000);
// // };
// // const completeOrder = (customer) => {
// //   console.log(`completed order for ${customer}`);
// // };

// // takeOrder("customer 1", (customer) => {
// //   processOrder(customer, (customer) => {
// //     completeOrder(customer);
// //   });
// // });

// // console.log("hello javascript");

// // const promiseOne = Promise.resolve("promise one resolve");

// // const promiseTwo = new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     resolve("Promise two resolved");
// //   }, 2000);
// // });

// // // promiseOne.then((res) => console.log(res));
// // // promiseTwo.then((res) => console.log(res));

// // Promise.race([promiseOne, promiseTwo]).then((res) => console.log(res));

// const hasMeeting = true;
// const meeting = new Promise((resolve, reject) => {
//   if (!hasMeeting) {
//     const meetingDetails = {
//       name: "Technical Meeting",
//       location: "Google Meet",
//       time: "10:00 PM",
//     };
//     resolve(meetingDetails);
//   } else {
//     reject(new Error("meeting already scheduled!"));
//   }
// });

// const addToCalender = (meetingDetails) => {
//   const calender = ` ${meetingDetails.name} has been scheduled on ${meetingDetails.location} at ${meetingDetails.time} `;
//   return Promise.resolve(calender);
// };

// // meeting
// //   .then(addToCalender)
// //   .then((res) => {
// //     // resolve data
// //     console.log(res);
// //   })
// //   .catch((err) => {
// //     // rejected data
// //     console.log(err.message);
// //   });

// async function friendlyFunction() {
//   try {
//     const meetingDetails = await meeting;
//     const calender = await addToCalender(meetingDetails);
//     console.log(calender);
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// friendlyFunction();
