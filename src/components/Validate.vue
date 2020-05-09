<template>
    <vContainer>
        <vRow justify="center">
            <vCol cols="6">
                <vCard>
                    <vCardTitle>Validation du compte</vCardTitle>
                    <vCardText>
                        <vProgressCircular
                            indeterminate
                            color="blue"
                        />
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
    }),

    async created() {
        try {
            const res = await service.auth.validate(this.$route.query.token);
            this.$emit('showMessage', 'Votre compte a bien été validé! Vous pouvez maintenant vous connecter.', 'success');
        } catch (err) {
            this.$emit('showMessage', 'La validation a échoué. Peut-être avez-vous déjà validé votre compte?', 'error');
        }
        this.$router.push({ name: 'login' });
    },

    methods: {

    },
};
</script>
