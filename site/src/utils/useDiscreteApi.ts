import { createDiscreteApi } from 'naive-ui'
import useConfigProviderProps from './useConfigProviderProps'
import { readonly } from 'vue'

const useDiscreteApi = () =>
	createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar'], {
		configProviderProps: readonly(useConfigProviderProps())
	})

export default useDiscreteApi
