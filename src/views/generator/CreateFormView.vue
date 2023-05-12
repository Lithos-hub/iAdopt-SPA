<template>
	<v-card class="backdrop-blur-md p-10 rounded-2xl">
		<v-form ref="form" v-model="valid" class="grid grid-cols-2 gap-5" @submit.prevent="onSubmit">
			<strong class="col-span-2 text-primary">Datos de contacto</strong>
			<v-text-field
				v-model="formModel.adopter_email"
				label="Email del adoptante"
				required
				type="email"
				append-icon="mdi-at"
				color="cyan"
				:rules="requiredRule" />
			<v-text-field
				v-model="formModel.adopter_phone"
				label="Teléfono del adoptante"
				required
				append-icon="mdi-phone"
				color="cyan"
				:rules="requiredRule" />
			<strong class="col-span-2 text-primary">Información básica del adoptante</strong>
			<v-divider class="col-span-2" />
			<v-text-field
				v-model="formModel.adopter_name"
				label="Nombre del adoptante"
				required
				color="cyan"
				:rules="requiredRule" />
			<v-text-field
				v-model="formModel.adopter_age"
				type="number"
				label="Edad del adoptante"
				required
				color="cyan"
				:rules="requiredRule" />
			<v-text-field
				v-model="formModel.adopter_region"
				label="Región/Localidad del adoptante"
				required
				color="cyan"
				:rules="requiredRule" />
			<v-text-field
				v-model="formModel.adopter_city"
				label="Ciudad del adoptante"
				required
				color="cyan"
				:rules="requiredRule" />
			<v-radio-group v-model="formModel.adopter_sex" inline color="cyan">
				<template #label>
					<div>Sexo</div>
				</template>
				<v-radio value="male">
					<template #label>
						<div>Hombre</div>
					</template>
				</v-radio>
				<v-radio value="female">
					<template #label>
						<div>Mujer</div>
					</template>
				</v-radio>
			</v-radio-group>
			<v-radio-group v-model="formModel.adopter_is_working" inline color="cyan">
				<template #label>
					<div>¿Tiene trabajo?</div>
				</template>
				<v-radio value="true">
					<template #label>
						<div>Sí</div>
					</template>
				</v-radio>
				<v-radio value="false">
					<template #label>
						<div>No</div>
					</template>
				</v-radio>
			</v-radio-group>
			<strong class="col-span-2 text-primary">Animal</strong>
			<v-divider class="col-span-2" />
			<v-text-field
				v-model="formModel.animal_specie"
				label="Especie del animal"
				required
				color="cyan"
				:rules="requiredRule" />
			<v-text-field
				v-model="formModel.animal_region"
				label="Región o ciudad del animal"
				required
				color="cyan"
				:rules="requiredRule" />
			<v-text-field
				v-model="formModel.animal_breed"
				label="Raza/mezclas del animal"
				required
				color="cyan"
				:rules="requiredRule" />
			<v-text-field
				v-model="formModel.animal_age"
				type="number"
				label="Edad del animal"
				required
				color="cyan"
				:rules="requiredRule" />
			<v-text-field
				v-model="formModel.animal_link"
				label="Enlace a la publicación del animal"
				append-icon="mdi-link-variant"
				color="cyan"
				:rules="requiredRule" />
			<v-file-input
				v-model="formModel.animal_image"
				label="Foto del animal"
				append-icon="mdi-image"
				:prepend-icon="null"
				accept="image/*"></v-file-input>
			<v-textarea
				v-model="formModel.animal_extra_info"
				label="Información adicional del animal"
				color="cyan"
				class="col-span-2" />

			<v-btn
				color="green"
				variant="tonal"
				type="submit"
				class="col-span-2"
				size="x-large"
				:loading="isLoading"
				>Generar</v-btn
			>
		</v-form>
	</v-card>
</template>

<script setup lang="ts">
import { Form } from '@/models';
import { chatGPTHandler, surveyHandler } from '@/services';
import { useSnackbarStore } from '@/store/snackbar';
import { useUserStore } from '@/store/user';
import { useI18n } from 'vue-i18n';

const { showSnackbar } = useSnackbarStore();
const { getUserData } = useUserStore();

const { t } = useI18n();

const requiredRule = [
	(v: string | number) => {
		return !!v || 'Campo obligatorio';
	},
];

const isLoading = ref(false);
const form = ref();
const valid = ref(false);
const formModel = ref<Form>({
	adopter_name: 'Juan',
	adopter_age: 18,
	adopter_email: 'test@test.com',
	adopter_phone: '123123123',
	adopter_region: 'Madrid',
	adopter_city: 'Madrid',
	adopter_sex: 'male',
	adopter_is_working: 'false',
	animal_specie: 'perro',
	animal_name: 'Dobby',
	animal_region: 'Zamora',
	animal_breed: 'Pastor Alemán',
	animal_age: 1,
	animal_extra_info:
		'Cachorro nervioso, tiene miedo de otros perros y le cuesta acercarse a personas',
	animal_image: null,
	animal_link: 'test',
});

const onSubmit = async () => {
	try {
		isLoading.value = true;
		await form.value.validate();
		const { data } = await chatGPTHandler(formModel.value);

		const processedData = data.split('* ').filter((el: string) => el !== '');
		await surveyHandler({
			data: processedData,
			url: `/surveys`,
			method: 'post',
		});
		await getUserData();
		showSnackbar('success', t('SUCCESS.SURVEY_GENERATED'));
	} catch (error) {
		console.log(error);
	} finally {
		isLoading.value = false;
	}
};
</script>
