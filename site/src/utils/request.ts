import axios from 'axios'
import useStore from './useStore'
import useDiscreteApi from './useDiscreteApi'

const request = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL,
	timeout: 60 * 1000,
})

request.interceptors.request.use(
	(request) => {
		const { apiKey, orgId } = useStore()
		if (apiKey) {
			request.headers['Authorization'] = `Bearer ${apiKey}`
		}
		if (orgId) {
			request.headers['OpenAI-Organization'] = orgId
		}

		return request
	},
	(error) => {
		useDiscreteApi().notification.error({ content: error.message || String(error) })
		return Promise.reject(error)
	},
)

request.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		useDiscreteApi().notification.error({ content: error.message || String(error) })
		return Promise.reject(error)
	},
)

export default request
