<template>
	<div
		class="flex rounded-full bg-secondary-2 gap-5 justify-between hover:bg-secondary-3 cursor-pointer w-[75px] h-[35px] overflow-hidden"
		@click="toggleLanguage">
		<div v-if="currentLanguage === 'es'" class="relative h-auto w-full">
			<div
				v-motion
				:initial="{
					opacity: 0,
					left: '-100%',
				}"
				:enter="{
					opacity: 1,
					left: '50%',
				}"
				:transition="{
					type: 'spring',
					stiffness: 100,
					damping: 10,
				}"
				class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2.5">
				<div>ES</div>
				<v-img src="/img/spain-flag.svg" width="20" contain />
			</div>
		</div>
		<div v-else class="relative h-auto w-full">
			<div
				v-motion
				:initial="{
					opacity: 0,
					left: '100%',
				}"
				:enter="{
					opacity: 1,
					left: '50%',
				}"
				:transition="{
					type: 'spring',
					stiffness: 100,
					damping: 10,
				}"
				class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2.5">
				<div>EN</div>
				<v-img src="/img/uk-flag.svg" width="20" contain />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const currentLanguage = computed(() => locale.value);

const toggleLanguage = () => {
	locale.value = currentLanguage.value === 'es' ? 'en' : 'es';
	localStorage.setItem('locale', locale.value);
};
</script>
