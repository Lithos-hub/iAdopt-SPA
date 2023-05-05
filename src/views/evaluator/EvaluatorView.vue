<template>
	<BaseDialog :open="showReportIsOpened" @close="showReportIsOpened = false" />
	<div class="grid grid-cols-3 gap-10 mx-auto max-w-[90rem]">
		<div
			v-for="({ title, specie, full_name, age, image, evaluation }, i) in reportsItem"
			:key="i"
			class="relative hover:scale-105 duration-500 cursor-pointer">
			<v-img
				v-if="evaluation >= 7"
				src="/3d/check-3d.png"
				class="absolute -top-2.5 -right-2.5 z-10"
				cover
				width="50" />
			<v-card class="mx-auto rounded-xl shadow-xl text-primary-1" width="100%" variant="tonal">
				<v-img
					class="absolute top-0 right-0 border h-40 w-40 rounded-tr-xl rounded-bl-xl"
					:src="image"
					cover />

				<v-card-item class="m-5 text-primary-3">
					<div class="flex flex-col gap-2">
						<div class="text-overline mb-1 flex gap-2.5 items-center">
							{{ $t('EVALUATOR.SPECIE') }}: <SpecieChip :specie="specie" />
						</div>
						<div class="text-h6 mb-1 text-white">
							{{ title }}
						</div>
						<div class="text-caption flex flex-col">
							<strong>{{ $t('EVALUATOR.ADOPTER_NAME') }}: {{ full_name }}</strong>
							<strong>{{ $t('EVALUATOR.ADOPTER_AGE') }}: {{ age }}</strong>
						</div>
					</div>
				</v-card-item>
				<v-card-actions
					class="mx-5 flex justify-between relative"
					:class="getEvaluationColor(evaluation)">
					<div>
						<v-icon v-for="(_, j) in evaluation" :key="j" icon="mdi-paw" />
					</div>
					<span>{{ evaluation }} / 10</span>
				</v-card-actions>
				<v-card-actions class="flex justify-end mb-5">
					<v-btn variant="text" color="blue" @click="showReportIsOpened = true">
						{{ $t('EVALUATOR.SHOW') }}
					</v-btn>
					<v-btn variant="text" color="red"> {{ $t('EVALUATOR.DELETE') }} </v-btn>
				</v-card-actions>
			</v-card>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Report } from '@/models/report';

const showReportIsOpened = ref(false);

const reportsItem: Report[] = [
	{
		title: 'informe 1',
		evaluation: 3,
		specie: 'dog',
		image:
			'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
		full_name: 'John Doe',
		age: 30,
	},
	{
		title: 'informe 2',
		evaluation: 8,
		specie: 'dog',
		image:
			'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
		full_name: 'James Dean',
		age: 23,
	},
	{
		title: 'informe 3',
		evaluation: 4,
		specie: 'cat',
		image:
			'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
		full_name: 'Jane Doe',
		age: 24,
	},
	{
		title: 'informe 4',
		evaluation: 4,
		specie: 'dog',
		image:
			'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
		full_name: 'Jane Doe',
		age: 24,
	},
];

const getEvaluationColor = (result: number) => {
	if (result < 0 || result > 10) return '';
	if (result <= 3) return 'text-red-500';
	if (result <= 6) return 'text-amber-500';
	return 'text-green-500';
};
</script>
