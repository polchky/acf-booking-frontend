<template>
    <vContainer>
        <vRow justify="center">
            <vCol cols="6">
                <vCard>
                    <vCardTitle>Veuillez entrer un nouveau mot de passe</vCardTitle>
                    <vCardText>
                        <vForm
                            v-model="valid"
                            @submit="reset"
                        >
                            <vTextField
                                v-model="password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                :rules="passwordRules"
                                label="Mot de passe"
                                hint="Au moins 8 charactères"
                                counter
                                @click:append="showPassword = !showPassword"
                            />
                            <vTextField
                                v-model="confirmationPassword"
                                :append-icon="showConfirmationPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showConfirmationPassword ? 'text' : 'password'"
                                :rules="[confirmationPasswordRule]"
                                label="Confirmer le mot de passe"
                                counter
                                @click:append="showConfirmationPassword = !showConfirmationPassword"
                            />
                            <vBtn
                                type="submit"
                                class="mr-4"
                                :disabled="!valid"
                                :loading="loading"
                            >
                                Envoyer
                            </vBtn>
                        </vForm>
                    </vCardText>
                    <vCardText>
                        <router-link :to="'login'">
                            Retour
                        </router-link>
                    </vCardText>
                </vCard>
            </vCol>
        </vRow>
    </vContainer>
</template>

<script>
import service from '@/assets/js/service';

export default {


    data: () => ({
        valid: false,
        password: '',
        showPassword: false,
        passwordRules: [
            (v) => v.length >= 8 || 'Au moins 8 charactères',
            (v) => !!v || 'Obligatoire.',
        ],
        confirmationPassword: '',
        showConfirmationPassword: false,
        loading: false,
    }),

    computed: {
        confirmationPasswordRule() {
            return this.confirmationPassword === this.password || 'Ne correspond pas au mot de passe.';
        },
    },

    created() {
    },

    methods: {
        async reset() {
            this.loading = true;
            try {
                await service.auth.reset({
                    password: this.password,
                },
                this.$route.query.token);
                this.$emit('showMessage', 'Votre mot de passe a été changé avec succès.', 'success');
                this.$router.push({ name: 'login' });
            } catch (err) {
                this.$emit('showMessage', 'Un problème inconnu est survenu.', 'error');
            }
            this.loading = false;
        },
    },
};
</script>
