<template>
	<div class="relative w-full z-0">
		<div
			class="fixed top-0 w-full h-screen bg-gradient-to-tr from-primary-1 to-transparent mix-blend-multiply bg-opacity-50 z-20" />
		<v-img src="/img/access-background.jpg" cover class="fixed top-0 h-full w-full z-10" />
	</div>
	<div class="flex w-full justify-between z-50 p-5">
		<h1 class="text-white z-50 text-4xl">iAdopt</h1>
		<language-selector class="text-secondary-1" />
	</div>

	<!-- CARD -->
	<div
		class="flex flex-col justify-center items-center md:items-end md:px-[10rem] md:pb-[10rem] w-screen max-h-[calc(100vh-80px)] overflow-hidden">
		<div
			class="bg-white/40 backdrop-blur rounded-xl shadow-xl w-full max-w-[90vw] md:w-[30rem] mt-[80px]">
			<div class="p-5 bg-primary-1 text-white rounded-t-xl text-xl">
				{{ modeTitle }}
			</div>
			<div class="p-5 flex h-[60vh] flex-col justify-between">
				<v-form v-model="valid" class="flex flex-col gap-5" @submit.prevent="onSubmit">
					<v-text-field
						v-model="email"
						:label="$t('ACCESS.EMAIL')"
						variant="solo"
						theme="light"
						color="primary"
						class="text-primary"
						:rules="emailRules"
						required />
					<div v-if="accessType !== 'RECOVER'" :class="!isRegistering && 'mb-10'">
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
							@click="changeMode('RECOVER')"
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

					<v-btn color="primary" type="submit" :loading="loading" :disabled="loading">
						{{ buttonTitle }}
					</v-btn>
				</v-form>
				<small
					class="underline cursor-pointer text-secondary-2 hover:text-white mt-5 self-start"
					@click="changeMode(isRegistering ? 'LOGIN' : 'JOIN')"
					>{{ toggleText }}</small
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { authHanlder } from '@/services';
import { useSnackbarStore } from '@/store/snackbar';
import { useUserStore } from '@/store/user';

type Mode = 'LOGIN' | 'JOIN' | 'RECOVER';

const { t } = useI18n();

const accessType = ref<Mode>('LOGIN');
const email = ref('');
const password = ref('');
const repassword = ref('');
const isShownPassword = ref(false);
const valid = ref(false);
const loading = ref(false);

const { showSnackbar } = useSnackbarStore();
const { getUserData } = useUserStore();

const router = useRouter();

const modeTitle = computed(() => {
	switch (accessType.value) {
		case 'LOGIN':
			return t('ACCESS.LOGIN_TITLE');
		case 'JOIN':
			return t('ACCESS.SIGNUP_TITLE');
		case 'RECOVER':
			return t('ACCESS.RECOVER_TITLE');
	}
});
const buttonTitle = computed(() => {
	switch (accessType.value) {
		case 'LOGIN':
			return t('ACCESS.SUBMIT_LOGIN');
		case 'JOIN':
			return t('ACCESS.SUBMIT_SIGNUP');
		case 'RECOVER':
			return t('ACCESS.SUBMIT_RECOVER');
	}
});
const toggleText = computed(() => {
	switch (accessType.value) {
		case 'LOGIN':
			return t('ACCESS.WANT_SIGNUP');
		case 'JOIN':
			return t('ACCESS.WANT_LOGIN');
		case 'RECOVER':
			return t('ACCESS.WANT_LOGIN');
	}
});

const isRegistering = computed(() => accessType.value === 'JOIN');

const emailRules = [
	(v: string) => !!v || t('FORM_ERROR.EMAIL_REQUIRED'),
	(v: string) => /.+@.+\..+/.test(v) || t('FORM_ERROR.EMAIL_FORMAT'),
];

const passRules = [
	(v: string) => !!v || t('FORM_ERROR.PASS_REQUIRED'),
	(v: string) =>
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v) ||
		t('FORM_ERROR.PASS_CONTAIN'),
];

const repassRules = [
	(v: string) => !!v || t('FORM_ERROR.PASS_REQUIRED'),
	(v: string) => v === password.value || t('FORM_ERROR.PASS_MATCH'),
];

const changeMode = (mode: Mode) => (accessType.value = mode);

const onSubmit = async () => {
	if (!valid.value) return;

	try {
		loading.value = true;
		const data = {
			email: email.value,
			password: password.value,
		};
		await authHanlder(data, `/auth/${accessType.value}`, 'post');
		await getUserData();
		showSnackbar('success', t(`SUCCESS.${accessType.value.toUpperCase()}`));
		router.push('/app');
	} catch (error) {
		loading.value = false;
	}
};
</script>
