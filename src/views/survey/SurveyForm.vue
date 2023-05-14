<template>
	<div class="relative h-screen w-screen flex flex-col justify-center items-center overflow-hidden">
		<div class="bg-secondary-2 shadow-xl h-full w-full relative">
			<div class="sticky top-0 bg-primary-1 px-5 py-2 w-full z-20 text-center">
				<h1 class="text-2xl">Formulario de adopción</h1>
			</div>

			<p class="text-cyan-500 col-span-2 flex items-center justify-center gap-5 p-5">
				<v-icon icon="mdi-alert-circle-outline" color="cyan" />
				Contesta las siguientes preguntas. Recuerda que mientras más información nos des, más fácil
				será para nosotros encontrar un hogar para el animal. Cuando termines, pulsa en el botón de
				ENVIAR.
			</p>
			<v-form @submit.prevent="onSubmit">
				<div
					class="bg-[#202020] p-5 pb-20 flex flex-col md:grid md:grid-cols-2 gap-5 overflow-y-auto max-h-[calc(100vh-200px)]">
					<div
						v-for="(question, i) in questionsList"
						:key="i"
						class="flex flex-col gap-5 justify-start">
						<strong class="min-h-[50px]">{{ question }}</strong>
						<v-textarea v-model="formData[question]" label="Escribe aquí tu respuesta" required />
					</div>
				</div>

				<div
					class="sticky bottom-0 flex flex-col items-center justify-center bg-secondary-2 w-full h-[75px]">
					<v-btn type="submit" color="green" size="large" class="min-w-[200px]">Enviar</v-btn>
				</div>
			</v-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { handleGetAdopterSurvey } from '@/services';

const route = useRoute();

const formData = ref({});
const questionsList = ref([]);

const getQuestionsList = async () => {
	const id = route.params.id;
	const { questions } = await handleGetAdopterSurvey(id as string);

	questionsList.value = questions;

	formData.value = questions.reduce((acc: Record<string, string>, question: string) => {
		acc[question] = '';
		return acc;
	}, {});
};
const onSubmit = () => {
	const questionAnswerData = Object.entries(formData.value).map(([key, value]) => ({
		question: key,
		answer: value,
	}));

	// TODO:
};

onMounted(() => getQuestionsList());
</script>
