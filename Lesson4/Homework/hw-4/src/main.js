import { createApp } from 'vue'
import App from './App.vue'

// https://stackoverflow.com/questions/66389974/using-font-awesome-in-vue-3
import { library } from "@fortawesome/fontawesome-svg-core";
import { faExclamationCircle, faCheckCircle, faExclamation } from "@fortawesome/free-solid-svg-icons";
library.add(faExclamationCircle, faCheckCircle,faExclamation);
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')

import 'bootstrap/dist/css/bootstrap.min.css';