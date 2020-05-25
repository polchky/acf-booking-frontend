<template>
    <vContainer>
        <template v-for="(user, index) in users">
            <vRow
                :key="user.id"
            >
                <vCol
                    cols="6"
                    md="3"
                >
                    {{ user.username }}
                </vCol>
                <vCol
                    cols="6"
                    md="3"
                >
                    {{ user.email }}
                </vCol>
                <vCol
                    cols="6"
                    md="3"
                >
                    <vSelect
                        v-model="user.role"
                        :items="roles"
                    />
                </vCol>
                <vCol
                    cols="6"
                    md="3"
                >
                    <vBtn
                        class="mt-4"
                        :loading="user.loading"
                        @click="updateUserRole(user)"
                    >
                        Mettre à jour
                    </vBtn>
                </vCol>
            </vRow>
            <vDivider
                v-if="index + 1 < users.length"
                :key="index"
            />
        </template>
    </vContainer>
</template>

<script>
import service from '@/assets/js/service';

export default {


    data: () => ({
        users: [],
        roles: ['user', 'moderator', 'admin'],
    }),

    async created() {
        let res;
        if (!service.auth.isLoggedIn()) this.$router.push({ name: 'login' });
        res = await service.users.get(service.auth.getUserId());
        const user = res.data;
        if (user.role !== 'admin') {
            this.$router.push({ name: 'bookings' });
        }
        res = await service.users.list();
        this.users = res.data.sort((a, b) => (a.username < b.username ? 1 : -1));
    },

    methods: {
        async updateUserRole(user) {
            this.$set(user, 'loading', true);
            try {
                await service.users.update(user.id, { role: user.role });
                this.$emit('showMessage', 'Modification enregistrée', 'success');
            } catch (err) {
                this.$emit('showMessage', 'Erreur', 'error');
            }
            user.loading = false;
        },
    },

};
</script>
