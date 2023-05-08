<template>
	<div
		class="px-5 rounded-full"
		:class="
			specie === 'dog'
				? 'border border-red-500 bg-red-500/20 text-red-400'
				: 'border border-cyan-500 bg-cyan-700/20 text-cyan-400'
		">
		{{ translatedSpecie }}
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
	specie: 'dog' | 'cat' | string;
}>();

const translatedSpecie = computed(() =>
	props.specie === 'dog' ? t('COMMON.DOG') : t('COMMON.CAT')
);
</script>
