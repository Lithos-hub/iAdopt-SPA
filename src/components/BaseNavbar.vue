<template>
	<v-app-bar density="compact" color="primary" flat class="text-white px-[2.5rem] fixed">
		<router-link to="/" class="relative rounded-full hover:scale-105 duration-200">
			<!-- <v-img src="/logo-v2.png" height="30" width="30" cover aspect-ratio="1/1" /> -->
			<div class="flex flex-col">
				<h1 class="text-white font-bold text-xl">iAdopt</h1>
			</div>
		</router-link>

		<v-spacer></v-spacer>

		<language-selector />
		<router-link to="/app/generator">
			<v-btn> {{ $t('COMMON.GENERATOR') }} </v-btn>
		</router-link>
		<router-link to="/app/evaluator">
			<v-btn> {{ $t('COMMON.EVALUATOR') }} </v-btn>
		</router-link>
	</v-app-bar>
</template>
