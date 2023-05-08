<template>
	<div class="relative w-full z-0">
		<div
			class="fixed top-0 w-full h-screen bg-gradient-to-tr from-primary-1 to-transparent mix-blend-multiply bg-opacity-50 z-20" />
		<v-img src="/img/access-background.jpg" cover class="fixed top-0 h-full w-full z-10" />
	</div>
	<!-- <v-img src="/img/access-background.jpg" cover class="absolute top-0 h-screen w-full z-0" /> -->
	<div class="flex w-full justify-between z-50 p-5">
		<h1 class="text-white z-50 text-4xl">iAdopt</h1>

		<language-selector />
	</div>

	<!-- CARD -->
	<div
		class="flex flex-col justify-center items-center md:items-end md:px-[10rem] md:pb-[10rem] h-screen w-screen">
		<div
			class="bg-gradient-to-tl from-white/20 to-white backdrop-blur rounded-xl shadow-xl w-[30rem] max-w-[90vw]">
			<div class="p-5 bg-primary-1 text-white rounded-t-xl text-xl">
				{{ modeTitle }}
			</div>
			<div class="p-5 flex h-[60vh] flex-col justify-between">
				<v-form
					v-model="valid"
					class="flex flex-col gap-5"
					@submit="
						accessMode === 'register'
							? submitRegister
							: accessMode === 'recover'
							? submitRecover
							: submitLogin
					">
					<v-text-field
						v-model="email"
						:label="$t('ACCESS.EMAIL')"
						variant="solo"
						theme="light"
						color="primary"
						class="text-primary"
						:rules="emailRules"
						required />
					<div v-if="accessMode !== 'recover'" :class="!isRegistering && 'mb-10'">
						<v-text-field
							v-model="password"
							:label="$t('ACCESS.PASSWORD')"
							variant="solo"
							theme="light"
							color="primary"
							class="text-primary"
							:rules="passRules"
							append-inner-icon="mdi-eye"
							:type="isShownPassword ? 'text' : 'password'"
							required
							@click:append-inner="isShownPassword = !isShownPassword" />
						<small
							v-if="!isRegistering"
							class="underline cursor-pointer text-secondary-2 hover:text-white mt-5 self-start"
							@click="changeMode('recover')"
							>{{ t('ACCESS.RECOVER') }}</small
						>
					</div>
					<v-text-field
						v-if="isRegistering"
						v-model="repassword"
						:label="$t('ACCESS.REPASSWORD')"
						variant="solo"
						theme="light"
						color="primary"
						class="text-primary"
						:rules="repassRules"
						append-inner-icon="mdi-eye"
						:type="isShownPassword ? 'text' : 'password'"
						required
						@click:append-inner="isShownPassword = !isShownPassword" />

					<v-btn color="primary" type="submit">
						{{ buttonTitle }}
					</v-btn>
				</v-form>
				<small
					class="underline cursor-pointer text-secondary-2 hover:text-white mt-5 self-start"
					@click="changeMode(isRegistering ? 'login' : 'register')"
					>{{ toggleText }}</small
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const valid = ref(false);

const { t } = useI18n();

type Mode = 'login' | 'register' | 'recover';

const accessMode = ref<Mode>('login');

const email = ref('');
const password = ref('');
const repassword = ref('');
const isShownPassword = ref(false);

const modeTitle = computed(() => {
	switch (accessMode.value) {
		case 'login':
			return t('ACCESS.LOGIN_TITLE');
		case 'register':
			return t('ACCESS.SIGNUP_TITLE');
		case 'recover':
			return t('ACCESS.RECOVER_TITLE');
	}
});
const buttonTitle = computed(() => {
	switch (accessMode.value) {
		case 'login':
			return t('ACCESS.SUBMIT_LOGIN');
		case 'register':
			return t('ACCESS.SUBMIT_SIGNUP');
		case 'recover':
			return t('ACCESS.SUBMIT_RECOVER');
	}
});
const toggleText = computed(() => {
	switch (accessMode.value) {
		case 'login':
			return t('ACCESS.WANT_SIGNUP');
		case 'register':
			return t('ACCESS.WANT_LOGIN');
		case 'recover':
			return t('ACCESS.WANT_LOGIN');
	}
});

const isRegistering = computed(() => accessMode.value === 'register');

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

const changeMode = (mode: Mode) => (accessMode.value = mode);

const submitRegister = () => {
	console.log('Register');
};

const submitLogin = () => {
	console.log('Login');
};

const submitRecover = () => {
	console.log('Recover');
};
</script>

<style scoped></style>
