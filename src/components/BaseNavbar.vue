<template>
	<v-app-bar
		density="compact"
		color="primary"
		theme="light"
		flat
		class="fixed text-white px-[2.5rem]">
		<nav class="flex justify-between w-full items-center">
			<router-link to="/" class="relative rounded-full hover:scale-105 duration-200">
				<!-- <v-img src="/logo-v2.png" height="30" width="30" cover aspect-ratio="1/1" /> -->
				<div class="flex flex-col">
					<h1 class="text-white font-bold text-xl">iAdopt</h1>
				</div>
			</router-link>

			<!-- <light-dark-selector /> -->
			<div class="flex gap-5">
				<router-link
					to="/app/generator"
					active-class="border-b-2 border-cyan-500"
					class="min-w-[120px]">
					<v-btn> {{ $t('COMMON.GENERATOR') }} </v-btn>
				</router-link>
				<router-link
					to="/app/evaluator"
					active-class="border-b-2 border-cyan-500"
					class="min-w-[120px]">
					<v-btn> {{ $t('COMMON.MY_REPORTS') }} </v-btn>
				</router-link>
				<language-selector />
			</div>
		</nav>
	</v-app-bar>
</template>
