<template>
	<v-card class="backdrop-blur-md p-10 rounded-2xl flex flex-col">
		<div class="flex justify-between items-center mb-10">
			<div class="flex gap-5 items-center">
				<div class="min-w-[250px]">
					<h1 v-if="!isEditingTitle" class="text-4xl">{{ surveyData?.title }}</h1>
					<v-text-field
						v-else
						v-model="surveyTitle"
						hide-details
						@keyup.enter="onEditTitle"
						@blur="onEditTitle" />
				</div>
				<v-btn icon color="primary" @click="toggleTitleEdition">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</div>
			<v-btn
				:color="isCopied ? 'green' : 'blue'"
				variant="tonal"
				:append-icon="isCopied ? 'mdi-clipboard-check' : ''"
				@click="copyLink">
				{{ isCopied ? $t('SURVEYS.COPIED') : $t('SURVEYS.COPY_LINK') }}
			</v-btn>
		</div>
		<v-divider />
		<div class="relative min-h-[50vh] flex flex-col">
			<ul class="py-10 flex flex-col gap-1">
				<li v-for="(item, i) of surveyQuestions" :key="i" class="p-5 bg-secondary-2/50 shadow-xl">
					<FormQuestion :question="item" :index="i" @delete="onDelete(i)" @edit="onEditQuestion" />
				</li>
			</ul>
			<v-btn color="green" variant="tonal" class="ml-auto" @click="onSave">Guardar cambios</v-btn>
		</div>
	</v-card>
</template>

<script lang="ts" setup>
import FormQuestion from './components/FormQuestion.vue';
import { useUserStore } from '@/store/user';
import { Survey } from '../../models/survey';
import { surveyHandler } from '@/services';
import { useSnackbarStore } from '@/store/snackbar';
import { useI18n } from 'vue-i18n';

// Store refs
const { user } = storeToRefs(useUserStore());

// Store methods
const { getUserData } = useUserStore();
const { showSnackbar } = useSnackbarStore();

const route = useRoute();

const { t } = useI18n();

const surveyTitle = ref('');
const isCopied = ref(false);
const isEditingTitle = ref(false);

const surveyData = computed(() =>
	user.value.surveys.find(({ id }) => id === Number(route.params.id))
) as ComputedRef<Survey>;

const surveyQuestions = computed(
	() => user.value.surveys.find(({ id }) => id === Number(route.params.id))?.questions ?? []
) as ComputedRef<string[]>;

watch(
	() => surveyData.value,
	() => {
		surveyTitle.value = surveyData.value?.title as string;
	}
);

const toggleTitleEdition = () => (isEditingTitle.value = !isEditingTitle.value);

const copyLink = () => {
	isCopied.value = true;
	const fullLink = `${window.location.origin}/survey/${surveyData.value?.link}`;
	navigator.clipboard.writeText(fullLink);
	setTimeout(() => (isCopied.value = false), 5000);
};

const onEditTitle = () => {
	if (surveyTitle.value === surveyData.value?.title || surveyTitle.value === '') {
		toggleTitleEdition();
		return;
	}
	surveyHandler({
		data: {
			...surveyData.value,
			title: surveyTitle.value,
		},
		url: `/surveys/${surveyData.value.id}`,
		method: 'patch',
	});
	toggleTitleEdition();
	getUserData();
	showSnackbar('success', t('SUCCESS.SURVEY_EDITED'));
};

const onEditQuestion = async (question: string, index: number) => {
	await surveyHandler({
		data: {
			...surveyData.value,
			questions: surveyQuestions.value.map((item, i) => (i === index ? question : item)),
		},
		url: `/surveys/${surveyData.value.id}`,
		method: 'patch',
	});
	await getUserData();
	showSnackbar('success', t('SUCCESS.SURVEY_EDITED'));
};

const onDelete = (index: number) => console.log('delete', index);

const onSave = () => {
	console.log('save');
};
</script>
