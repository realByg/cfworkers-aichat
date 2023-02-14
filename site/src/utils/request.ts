import axios from 'axios'
import useStore from './useStore'
import useDiscreteApi from './useDiscreteApi'

const request = axios.create({
	baseURL: '/ai',
	timeout: 60 * 1000,
	// validateStatus: status =>
})

const notifyError = (error: any) => {
	useDiscreteApi().notification.error({
		content: error.message || String(error),
		duration: 10000,
	})
}

request.interceptors.request.use(
	(request) => {
		const { apiKey, orgId } = useStore()
		if (apiKey) {
			request.headers['Authorization'] = `Bearer ${apiKey}`
		}
		if (orgId) {
			request.headers['OpenAI-Organization'] = orgId
		}
		// if (request.data) {
		// 	Object.entries({ ...request.data }).forEach(([key, value]) => {
		// 		const newKey = key.replace(/[A-Z]/g, (i) => `_${i.toLowerCase()}`)
		// 		request.data[newKey] = value
		// 		delete request.data[key]
		// 	})
		// }
		return request
	},
	(error) => {
		notifyError(error)
		return Promise.reject(error)
	},
)

request.interceptors.response.use(
	(response) => response,
	(error) => {
		notifyError(error)
		return Promise.reject(error)
	},
)

export default request
