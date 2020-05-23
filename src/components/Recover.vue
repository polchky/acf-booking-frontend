<template>
    <vContainer>
        <vRow justify="center">
            <vCol
                cols="12"
                md="6"
            >
                <vCard>
                    <vCardTitle>Récupération du compte</vCardTitle>
                    <vCardText>
                        <vForm
                            v-model="valid"
                            @submit="recover"
                        >
                            <vTextField
                                v-model="email"
                                type="email"
                                label="Email"
                                :rules="emailRules"
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
        loading: false,
    }),

    created() {
    },

    methods: {
        async recover() {
            this.loading = true;
            try {
                await service.auth.recover({
                    email: this.email,
                });
                this.$emit('showMessage', 'Un email vous a été envoyé, veuillez suivre les instructions y figurant.', 'success');
                this.$router.push({ name: 'login' });
            } catch (err) {
                this.$emit('showMessage', 'Un problème inconnu est survenu.', 'error');
            }
            this.loading = false;
        },
    },
};
</script>
