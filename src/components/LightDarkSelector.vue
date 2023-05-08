<template>
	<div
		class="flex rounded-full bg-secondary-2 gap-5 justify-between hover:bg-secondary-3 cursor-pointer w-[70px] h-[35px] overflow-hidden"
		@click="toggle">
		<div v-if="theme.global.name.value === 'light'" class="relative h-auto w-full">
			<div
				v-motion
				:initial="{
					left: '70%',
				}"
				:enter="{
					left: '25%',
					transition: {
						duration: 300,
						type: 'keyframes',
						ease: 'easeIn',
					},
				}"
				class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2.5 bg-white rounded-full">
				<v-img src="/img/sun.png" width="30" contain />
			</div>
		</div>
		<div v-else class="relative h-auto w-full">
			<div
				v-motion
				:initial="{
					left: '25%',
				}"
				:enter="{
					left: '70%',
					transition: {
						duration: 300,
						type: 'keyframes',
						ease: 'easeIn',
					},
				}"
				class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2.5 bg-white rounded-full">
				<v-img src="/img/moon.png" width="30" contain />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';

const theme = useTheme();

const toggle = () => {
	theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};
</script>
