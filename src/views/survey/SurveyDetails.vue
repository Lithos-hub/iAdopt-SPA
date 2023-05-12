<template>
	<v-card class="backdrop-blur-md p-10 rounded-2xl flex flex-col">
		<div class="flex justify-between items-center">
			<h1 class="text-4xl">Form title</h1>
			<v-btn color="blue" variant="tonal" @click="copyLink">Copiar enlace</v-btn>
		</div>
		<v-divider class="my-2" />
		<div class="relative min-h-[50vh]">
			<!-- <v-progress-circular
				indeterminate
				color="primary"
				size="75"
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> -->
			<ul class="py-10 flex flex-col gap-1">
				<li v-for="(item, i) of surveyQuestions" :key="i" class="p-5 bg-secondary-2/50 shadow-xl">
					<FormQuestion :question="item" @delete="onDelete(i)" />
				</li>
				<v-btn color="green" variant="tonal" class="ml-auto" @click="onSave">Guardar cambios</v-btn>
			</ul>
		</div>
	</v-card>
</template>

<script lang="ts" setup>
import FormQuestion from './components/FormQuestion.vue';
import { useUserStore } from '@/store/user';

const { user } = useUserStore();
const route = useRoute();

const surveyQuestions = computed(
	() => user.surveys.find(({ id }) => id === Number(route.params.id))?.questions ?? []
);

const copyLink = () => {
	console.log('copy link');
};
const onDelete = (index: number) => console.log('delete', index);

const onSave = () => {
	console.log('save');
};
</script>
