import axios from 'axios'
import useStore from './useStore'
import useDiscreteApi from './useDiscreteApi'

const request = axios.create({
	baseURL: '/openai',
	timeout: 60 * 1000,
	// validateStatus: status =>
})

const notifyError = (error: any) => {
	if (error?.response?.data) return
	useDiscreteApi().notification.error({
		content: error.message || String(error),
		duration: 10000,
	})
}

const objectKeyToSnakeCase: any = (data: any) => {
	if (Object.prototype.toString.call(data) === '[object Object]') {
		const newData: Record<string, any> = {}
		Object.entries(data).forEach(([key, value]) => {
			const newKey = key.replace(/[A-Z]/g, (i) => `_${i.toLowerCase()}`)
			newData[newKey] = objectKeyToSnakeCase(value)
		})
		return newData
	} else if (Array.isArray(data)) {
		return data.map((i: any) => objectKeyToSnakeCase(i))
	} else {
		return data
	}
}

const objectKeyToCamelCase: any = (data: any) => {
	if (Object.prototype.toString.call(data) === '[object Object]') {
		const newData: Record<string, any> = {}
		Object.entries(data).forEach(([key, value]) => {
			const newKey = key.replace(/_[a-z0-9]/g, (i) => i.replace('_', '').toUpperCase())
			newData[newKey] = objectKeyToCamelCase(value)
		})
		return newData
	} else if (Array.isArray(data)) {
		return data.map((i: any) => objectKeyToCamelCase(i))
	} else {
		return data
	}
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
		if (request.data) {
			request.data = objectKeyToSnakeCase(request.data)
		}
		return request
	},
	(error) => {
		notifyError(error)
		return Promise.reject(error)
	},
)

request.interceptors.response.use(
	(response) => {
		if (response.data) {
			response.data = objectKeyToCamelCase(response.data)
		}
		return response
	},
	(error) => {
		notifyError(error)
		return Promise.reject(error)
	},
)

export default request
