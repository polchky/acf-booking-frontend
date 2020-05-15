<template>
    <vContainer>
        <vRow justify="center">
            <vCol
                cols="12"
                sm="6"
            >
                <vCard>
                    <vCardTitle>Profil</vCardTitle>
                    <vCardText>
                        <vForm v-model="valid">
                            <vTextField
                                v-model="username"
                                label="Nom à afficher"
                                :rules="usernameRules"
                            />
                            <vBtn
                                class="mr-4"
                                :disabled="!valid"
                                :loading="loading"
                                @click="update"
                            >
                                Mettre à jour
                            </vBtn>
                            <vBtn
                                class="mr-4"
                                to="/bookings"
                            >
                                Retour
                            </vBtn>
                        </vForm>
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
        valid: true,
        username: '',
        usernameRules: [
            (v) => !!v || 'Le nom est nécessaire',
        ],
        loading: false,
    }),

    async created() {
        if (!service.auth.isLoggedIn()) this.$router.push({ name: 'login' });
        const res = await service.users.get(service.auth.getUserId());
        this.username = res.data.username;
    },

    methods: {
        async update() {
            this.loading = true;
            try {
                const userId = service.auth.getUserId();
                await service.users.update(userId, { username: this.username });
                this.$emit('showMessage', 'Profil mis à jour.', 'success');
                this.$router.push({ name: 'bookings' });
            } catch (err) {
                if (service.auth.isLoggedIn()) {
                    this.$emit('showMessage', 'Une erreur inconnue est survenue.', 'error');
                } else {
                    this.$emit('showMessage', 'Votre session a expiré, veuillez vous reconnecter.', 'error');
                    this.$router.push({ name: 'login' });
                }
            }
            this.loading = false;
        },
    },

};
</script>
