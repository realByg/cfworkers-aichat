<template>
	<NConfigProvider :locale="locale" :dateLocale="dateLocale" :theme="theme">
		<NGlobalStyle />

		<div class="fixed w-full h-full flex justify-center items-center text-base bg-zinc-900 overflow-hidden">
			<div
				class="bg-zinc-600 flex-1 flex flex-col max-w-[1200px] h-full lg:h-[80vh] rounded-md border-2 border-zinc-600 overflow-hidden"
			>
				<Header />
				<Chat />
			</div>
		</div>
	</NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NGlobalStyle } from 'naive-ui'
import Header from './components/Header.vue'
import Chat from './components/Chat.vue'
import useConfigProviderProps from './utils/useConfigProviderProps'

const { locale, dateLocale, theme } = useConfigProviderProps()
</script>

<style>
body {
	@apply select-none;
}

div {
	@apply box-border;
}
</style>
