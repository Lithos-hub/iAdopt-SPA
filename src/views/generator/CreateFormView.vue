<template>
	<v-card class="backdrop-blur-md p-10 rounded-2xl">
		<v-form ref="form" v-model="valid" class="grid grid-cols-2 gap-5" @submit.prevent="onSubmit">
			<strong class="col-span-2 text-primary">Adoptante</strong>
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
			<v-radio-group v-model="formModel.isWorking" inline color="cyan">
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
				type="number"
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
			<v-textarea
				v-model="formModel.animal_extra_info"
				label="Información adicional del animal"
				color="cyan"
				class="col-span-2" />

			<v-btn color="green" variant="tonal" type="submit" class="col-span-2" size="x-large"
				>Generar</v-btn
			>
		</v-form>
	</v-card>
</template>

<script setup lang="ts">
const formModel = ref({
	adopter_name: null,
	adopter_age: null,
	adopter_sex: 'male',
	isWorking: 'false',
	adopter_region: null,
	animal_specie: null,
	animal_region: null,
	animal_breed: null,
	adopter_city: null,
	animal_age: null,
	animal_extra_info: null,
});

const requiredRule = [
	(v: string | number) => {
		return !!v || 'Campo obligatorio';
	},
];

const form = ref();

const valid = ref(false);
const onSubmit = async () => await form.value.validate();
</script>
