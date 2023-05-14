<template>
	<BaseDialog :open="showReportIsOpened" @close="showReportIsOpened = false" />
	<div class="mx-auto max-w-[90rem] mb-10">
		<v-text-field
			v-model="searchQuery"
			density="compact"
			variant="filled"
			label="Buscar informe"
			color="cyan"
			append-icon="mdi-magnify"
			hide-details
			@click:append="onSearch">
			<template #label>
				<span> Buscar <strong>informe</strong> <v-icon icon="mdi-file-find"></v-icon> </span>
			</template>
		</v-text-field>
	</div>
	<div class="grid grid-cols-4 gap-10 mx-auto max-w-[90rem]">
		<div
			v-for="(
				{
					animal_specie,
					adopter_name,
					adopter_age,
					adopter_region,
					animal_name,
					animal_image,
					evaluation_score,
				},
				i
			) in reportsItem"
			:key="i"
			class="relative hover:scale-105 duration-500 cursor-pointer">
			<v-img
				v-if="evaluation_score >= 7"
				src="/3d/check-3d.png"
				class="absolute -top-2.5 -right-2.5 z-10"
				cover
				width="50" />
			<v-card class="mx-auto rounded-xl shadow-xl text-primary-1" width="100%" variant="tonal">
				<v-img class="h-[200px] w-full rounded-t-xl" :src="animal_image" cover>
					<h2
						class="text-xl p-2 w-full font-bold text-center text-white absolute bottom-0 bg-primary-1/50 backdrop-blur">
						{{ animal_name }}
					</h2>
					<div class="text-overline mb-1 flex gap-2.5 items-center absolute left-3 top-3">
						<SpecieChip :specie="animal_specie" />
					</div>
				</v-img>
				<div class="flex flex-col mt-5 text-center">
					<p class="text-white text-base">
						{{ adopter_name }}, {{ adopter_age }} {{ $t('MY_REPORTS.YEARS') }} ({{
							adopter_region
						}})
					</p>
				</div>

				<v-card-actions
					class="mx-5 flex flex-col justify-between relative"
					:class="getevaluation_scoreColor(evaluation_score)">
					<div>
						<v-icon v-for="(_, j) in evaluation_score" :key="j" icon="mdi-paw" />
					</div>
					<span>{{ evaluation_score }} / 10</span>
					<div class="flex justify-between w-full pt-2">
						<v-btn variant="text" color="cyan" size="small" @click="showReportIsOpened = true">
							{{ $t('MY_REPORTS.SHOW') }}
						</v-btn>
						<v-btn variant="text" color="red" size="small"> {{ $t('MY_REPORTS.DELETE') }} </v-btn>
					</div>
				</v-card-actions>
			</v-card>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Report } from '@/models/report';
import SpecieChip from './components/SpecieChip.vue';

const showReportIsOpened = ref(false);
const searchQuery = ref('');

const reportsItem: Report[] = [
	{
		evaluation_score: 3,
		animal_name: 'Bollo',
		animal_specie: 'dog',
		animal_image:
			'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
		adopter_name: 'John Doe',
		adopter_age: 30,
		adopter_region: 'Madrid',
		evaluation_results: '',
	},
	{
		evaluation_score: 8,
		animal_name: 'Mantecado',
		animal_specie: 'dog',
		animal_image:
			'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
		adopter_name: 'James Dean',
		adopter_age: 23,
		adopter_region: 'Barcelona',
		evaluation_results: '',
	},
	{
		evaluation_score: 4,
		animal_name: 'Donut',
		animal_specie: 'cat',
		animal_image:
			'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
		adopter_name: 'Jane Doe',
		adopter_age: 24,
		adopter_region: 'Málaga',
		evaluation_results: '',
	},
	{
		evaluation_score: 4,
		animal_name: 'Oreo',
		animal_specie: 'dog',
		animal_image:
			'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
		adopter_name: 'Jane Doe',
		adopter_age: 24,
		adopter_region: 'Bilbao',
		evaluation_results: '',
	},
];

const getevaluation_scoreColor = (result: number) => {
	if (result < 0 || result > 10) return '';
	if (result <= 3) return 'text-red-500';
	if (result <= 6) return 'text-amber-500';
	return 'text-green-500';
};

const timeout = ref<ReturnType<typeof setTimeout>>(setTimeout(() => null, 0));

watch(searchQuery, () => {
	if (timeout.value) clearTimeout(timeout.value);
	timeout.value = setTimeout(() => onSearch(), 1000);
});

const onSearch = () => {
	console.log('filter results');
};
</script>
