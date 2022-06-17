import { createApp} from 'vue'
import Toaster from "@meforma/vue-toaster";
import moment from 'moment';
import App from './App.vue'
const app = createApp(App)
/**
* @params {date} date to be converted to timeago
* @returns returns timeAgo
*/
app.config.globalProperties.$filters = {
    timeAgo(date) {
    return moment(date).fromNow()
    },
    }
app.use(Toaster);
app.mount('#app')
