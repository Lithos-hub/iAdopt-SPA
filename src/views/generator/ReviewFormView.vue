<template>
	<v-card class="backdrop-blur-md p-10 rounded-2xl flex flex-col">
		<div class="flex justify-between items-center">
			<h1 class="text-4xl">Form title</h1>
			<v-btn color="blue" variant="tonal" @click="copyLink">Copiar enlace</v-btn>
		</div>
		<v-divider class="my-2" />
		<ul class="py-10 flex flex-col gap-1">
			<li
				v-for="{ question, _id } of data.questions"
				:key="question"
				class="p-5 bg-secondary-2/50 shadow-xl">
				<FormQuestion :question="question" @delete="onDelete(_id)" />
			</li>
		</ul>
		<v-btn color="green" variant="tonal" class="ml-auto" @click="onSave">Guardar cambios</v-btn>
	</v-card>
</template>

<script lang="ts" setup>
import FormQuestion from './components/FormQuestion.vue';

interface Question {
	_id: string;
	question: string;
}

interface FormData {
	_id: string;
	link: string;
	questions: Question[];
}

const route = useRoute();
const { id } = route.params;

console.log('Get questions from id', id);

const data = ref<FormData>({
	_id: '1',
	link: '',
	questions: [
		{
			_id: '2223452',
			question: 'lorem ipsum 1',
		},
		{
			_id: '2223451',
			question: 'lorem ipsum 2',
		},
		{
			_id: '2223450',
			question: 'lorem ipsum 3',
		},
	],
});

const copyLink = () => {
	console.log('copy link');
};

const onDelete = (_id: string) => console.log('delete', _id);

const onSave = () => {
	console.log('save');
};
</script>
