import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import manifestJSON from '__STATIC_CONTENT_MANIFEST'

const assetManifest = JSON.parse(manifestJSON)
const openaiAPI = 'https://api.openai.com/v1'

export default {
	async fetch(request, env, ctx) {
		let path = new URL(request.url).pathname
		if (path === '/') path = 'index.html'

		if (assetManifest[path]) {
			return await getAssetFromKV(
				{
					request,
					waitUntil: ctx.waitUntil.bind(ctx),
				},
				{
					ASSET_NAMESPACE: env.__STATIC_CONTENT,
					ASSET_MANIFEST: assetManifest,
				},
			)
		}

		if (path.startsWith('/ai/')) {
			return await fetch(`${openaiAPI}/${path.replace('/ai/', '')}`, {
				method: request.method,
				headers: new Headers({
					'Content-Type': request.headers.get('Content-Type') || 'application/json',
					'Authorization':
						request.headers.get('Authorization') || `Bearer ${env.API_KEY}`,
					'OpenAI-Organization':
						request.headers.get('OpenAI-Organization') || env.ORG_ID || '',
				}),
				body: request.body,
			})
		}

		return new Response('')
	},
}
