import { ref, effect, reactive } from "./reactivity/index.js";
import { createApp } from "./runtime-core/index.js";
import App from "./app.js";

// const a = ref(18);

// let b;
// effect(() => {
//   b = a.value + 1;
//   console.log("b :", b);
// });

// a.value = 20;

// const user = reactive({ age: 18 });

// let double;
// effect(() => {
//   double = user.age;
//   console.log("double :>> ", double);
// });

// user.age = 19;

// setup render
createApp(App).mount(document.querySelector("#app"));
