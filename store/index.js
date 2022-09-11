import Vue from 'vue'
import Vuex from 'vuex'
import config from './modules/config.js'
import good from './modules/good.js'
import indexData from './modules/index-data.js'
import user from './modules/user.js'
Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		config,
		good,
		indexData,
		user
	}
})
