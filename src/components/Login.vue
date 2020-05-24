<template>
    <vContainer>
        <vRow justify="center">
            <vCol
                cols="12"
                md="6"
            >
                <vCard>
                    <vCardTitle>Connexion</vCardTitle>
                    <vCardText>
                        <vForm
                            v-model="valid"
                        >
                            <vTextField
                                v-model="email"
                                type="email"
                                label="Email"
                                :rules="emailRules"
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
                                type="button"
                                class="mr-4"
                                :disabled="!valid"
                                :loading="loading"
                                @click="login"
                            >
                                Connexion
                            </vBtn>
                        </vForm>
                    </vCardText>
                    <vCardText>
                        <router-link :to="'register'">
                            Créer un compte
                        </router-link>
                    </vCardText>
                    <vCardText>
                        <router-link :to="'recover'">
                            Mot de passe oublié?
                        </router-link>
                    </vCardText>
                </vCard>
            </vCol>
        </vRow>
    </vContainer>
</template>

<script>
import utils from '@/assets/js/utils';
import service from '@/assets/js/service';

export default {


    data: () => ({
        utils,
        valid: false,
        email: '',
        emailRules: [
            (v) => !!v || 'Le champ email est nécessaire',
            (v) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'l\'email doit être valide',
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
        async login() {
            this.loading = true;
            try {
                await service.auth.login({
                    email: this.email,
                    password: this.password,
                });
                this.$emit('login');
                this.$router.push({ name: 'bookings' });
            } catch (err) {
                this.$emit('showMessage', 'Erreur de connexion', 'error');
            }
            this.loading = false;
        },
    },
};
</script>
