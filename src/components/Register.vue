<template>
    <vContainer>
        <vRow justify="center">
            <vCol
                cols="12"
                md="6"
            >
                <vCard>
                    <vCardTitle>Création d'un compte</vCardTitle>
                    <vCardText>
                        <vForm
                            v-model="valid"
                            @submit="register"
                        >
                            <vTextField
                                v-model="email"
                                type="email"
                                label="Email"
                                :rules="emailRules"
                            />
                            <vTextField
                                v-model="username"
                                label="Prénom et nom"
                                :rules="usernameRules"
                            />
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
                            <vBtn
                                type="submit"
                                class="mr-4"
                                :disabled="!valid"
                                :loading="loading"
                            >
                                S'enregistrer
                            </vBtn>
                        </vForm>
                    </vCardText>
                    <vCardText>
                        <router-link :to="'login'">
                            Déjà un compte?
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
        email: '',
        emailRules: [
            (v) => !!v || 'Le champ email est nécessaire',
            (v) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'l\'email doit être valide',
        ],
        username: '',
        usernameRules: [
            (v) => !!v || 'Le nom est nécessaire',
        ],
        password: '',
        showPassword: false,
        passwordRules: [
            (v) => v.length >= 8 || 'Au moins 8 charactères',
            (v) => !!v || 'Obligatoire.',
        ],
        loading: false,
    }),

    created() {
    },

    methods: {
        async register() {
            this.loading = true;
            try {
                await service.auth.register({
                    email: this.email,
                    password: this.password,
                    username: this.username,
                });
                this.$emit('showMessage', 'Votre compte a été créé, veuillez cliquer sur le lien de confirmation qui vous a été envoyé par email', 'success');
                this.$router.push({ name: 'login' });
            } catch (err) {
                if (err.response.status === 409) {
                    this.$emit('showMessage', 'Cet email est déjà associé à un compte existant', 'error');
                } else {
                    this.$emit('showMessage', 'Problème lors de l\'inscription', 'error');
                }
            }
            this.loading = false;
        },
    },
};
</script>
