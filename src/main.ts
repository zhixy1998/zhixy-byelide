import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from './router'
import { createBlocks } from "./block";
const app = createApp(App);
//注册物料
app.use(createBlocks);
app.use(router)
app.mount("#app");
