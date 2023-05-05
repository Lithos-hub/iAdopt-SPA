<template>
	<!-- <div
		class="absolute right-0 top-0 h-screen w-full bg-left bg-contain bg-no-repeat mix-blend-multiply"
		style="
			background-image: radial-gradient(0% 50%, #0d1b2a90, transparent),
				url(/img/access-background.jpg);
		" /> -->
	<h1 class="absolute top-5 left-5 text-4xl text-white z-50">iAdopt</h1>
	<div class="flex relative overflow-hidden">
		<div class="relative w-full">
			<div
				class="absolute top-0 w-full h-screen bg-gradient-to-tr from-primary-1 to-transparent mix-blend-multiply bg-opacity-50 z-10" />
			<v-img src="/img/access-background.jpg" cover class="absolute top-0 h-full w-full" />
		</div>
		<div class="h-screen min-w-[30vw]">
			<div class="bg-secondary-1 rounded-xl shadow-xl">
				<div class="p-5 bg-primary-1">
					{{ isShownRegister ? t('ACCESS.SIGNUP_TITLE') : t('ACCESS.LOGIN_TITLE') }}
				</div>
				<div class="p-5 bg-secondary-2 h-screen flex flex-col justify-center">
					<v-form
						v-model="valid"
						class="flex flex-col gap-5"
						@submit="isShownRegister ? submitRegister : submitLogin">
						<v-text-field
							v-model="email"
							:label="$t('ACCESS.EMAIL')"
							variant="filled"
							color="cyan"
							:rules="emailRules"
							required />
						<v-text-field
							v-model="password"
							:label="$t('ACCESS.PASSWORD')"
							variant="filled"
							color="cyan"
							:rules="passRules"
							append-inner-icon="mdi-eye"
							:type="isShownPassword ? 'text' : 'password'"
							required
							@click:append-inner="isShownPassword = !isShownPassword" />
						<v-text-field
							v-if="isShownRegister"
							v-model="repassword"
							:label="$t('ACCESS.REPASSWORD')"
							variant="filled"
							color="cyan"
							:rules="repassRules"
							append-inner-icon="mdi-eye"
							:type="isShownPassword ? 'text' : 'password'"
							required
							@click:append-inner="isShownPassword = !isShownPassword" />

						<v-btn variant="text" color="green" type="submit">
							{{ isShownRegister ? t('ACCESS.SIGNUP') : t('ACCESS.LOGIN') }}
						</v-btn>
					</v-form>

					<small
						class="underline cursor-pointer hover:text-primary-2 mt-5"
						@click="toggleRegister"
						>{{ isShownRegister ? t('ACCESS.WANT_LOGIN') : t('ACCESS.WANT_SIGNUP') }}</small
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const valid = ref(false);

const { t } = useI18n();

const isShownRegister = ref(false);
const isShownPassword = ref(false);

const email = ref('');
const password = ref('');
const repassword = ref('');

const emailRules = [
	(v: string) => {
		if (v) return true;

		return t('ERRORS.EMAIL_REQUIRED');
	},
	(v: string) => {
		if (/.+@.+\..+/.test(v)) return true;

		return t('ERRORS.EMAIL_FORMAT');
	},
];

const passRules = [
	(v: string) => {
		if (v) return true;

		return t('ERRORS.PASS_REQUIRED');
	},
	(v: string) => {
		if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v)) return true;

		return t('ERRORS.PASS_CONTAIN');
	},
];

const repassRules = [
	(v: string) => {
		if (v) return true;

		return t('ERRORS.PASS_REQUIRED');
	},
	(v: string) => {
		if (v === password.value) return true;

		return t('ERRORS.PASS_MATCH');
	},
];

const toggleRegister = () => (isShownRegister.value = !isShownRegister.value);

const submitRegister = () => {
	console.log('Register');
};

const submitLogin = () => {
	console.log('Register');
};
</script>

<style scoped></style>
