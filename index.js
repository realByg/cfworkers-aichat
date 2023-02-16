import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import manifestJSON from '__STATIC_CONTENT_MANIFEST'
import { getType } from 'mime'

const assetManifest = JSON.parse(manifestJSON)
const openaiAPI = 'https://api.openai.com'

export default {
	async fetch(request, env, ctx) {
		let path = new URL(request.url).pathname

		if (path.startsWith('/openai/')) {
			return await fetch(`${openaiAPI}/${path.replace('/openai/', '')}`, {
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

		let fileName = path.slice(1)
		if (!fileName) fileName = 'index.html'
		if (assetManifest[fileName]) {
			const response = await getAssetFromKV(
				{
					request,
					waitUntil: ctx.waitUntil.bind(ctx),
				},
				{
					ASSET_NAMESPACE: env.__STATIC_CONTENT,
					ASSET_MANIFEST: assetManifest,
				},
			)
			response.headers.set('Content-Type', getType(path))
			return response
		}

		return new Response('')
	},
}
