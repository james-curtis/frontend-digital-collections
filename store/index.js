import Vue from 'vue'
import Vuex from 'vuex'
import config from './modules/config.js'
import good from './modules/good.js'
Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		config,
		good
	}
})
