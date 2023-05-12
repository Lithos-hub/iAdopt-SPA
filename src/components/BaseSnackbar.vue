<template>
	<div
		v-if="display"
		v-motion
		:initial="{
			opacity: 0,
		}"
		:enter="{
			opacity: 1,
		}"
		data-testid="base-snackbar"
		class="snackbar p-4"
		:class="snackbarColor">
		<div class="flex gap-10">
			<v-icon :icon="getMessageIcon" />
			<div>{{ t(message) }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSnackbarStore } from '@/store/snackbar';
import { useI18n } from 'vue-i18n';

const { display, type, message } = storeToRefs(useSnackbarStore());
const { t } = useI18n();

const getMessageIcon = computed(() => {
	return {
		error: 'mdi-alert-circle',
		success: 'mdi-check-circle',
		info: 'mdi-information',
		warning: 'mdi-alert',
	}[type.value];
});

const snackbarColor = computed(() => {
	return {
		error: 'bg-red-500',
		success: 'bg-green-500',
		info: 'bg-blue-500',
		warning: 'bg-yellow-500',
	}[type.value];
});
</script>

<style scoped>
.snackbar {
	position: fixed;
	z-index: 999;
	bottom: 0;
	left: 0;
	width: 100vw;
}
</style>
