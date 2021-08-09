import { createApp } from 'vue'
import App from './App.vue'

// https://stackoverflow.com/questions/66389974/using-font-awesome-in-vue-3
import { library } from "@fortawesome/fontawesome-svg-core";
import { faExclamationCircle, faCheckCircle, faExclamation } from "@fortawesome/free-solid-svg-icons";
library.add(faExclamationCircle, faCheckCircle,faExclamation);
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//import 'element-plus/packages/theme-chalk/src/base.scss';

import { ElButton, ElSelect, ElDialog, ElTable, ElTableColumn} from 'element-plus';
//import 'element-plus/packages/theme-chalk/src/base.scss';

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .component(ElButton.name, ElButton)
    .component(ElSelect.name, ElSelect)
    .component(ElDialog.name, ElDialog)
    .component(ElTable.name, ElTable)
    .component(ElTableColumn.name, ElTableColumn)
    .mount('#app')

import 'bootstrap/dist/css/bootstrap.min.css';