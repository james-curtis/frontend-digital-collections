import Vue from 'vue'
import Vuex from 'vuex'
import config from './modules/config.js'
Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		config
	}
})
