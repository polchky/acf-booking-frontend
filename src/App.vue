<template>
    <vApp>
        <vAppBar
            app
        >
            <vToolbarTitle>Réservations ACF</vToolbarTitle>
            <vSpacer />
            <vBtn
                v-show="isLoggedIn"
                :to="{ name: 'newBooking' }"
                color="indigo accent-2"
            >
                Ajouter une réservation
            </vBtn>
            <vBtn
                v-show="isLoggedIn"
                title="Mon profil"
                icon
                :to="{ name: 'profile' }"
            >
                <vIcon>mdi-account</vIcon>
            </vBtn>
            <vBtn
                v-show="isLoggedIn && user.role === 'admin'"
                title="Utilisateurs"
                icon
                :to="{ name: 'users' }"
            >
                <vIcon>mdi-account-group</vIcon>
            </vBtn>
            <vBtn
                v-show="isLoggedIn"
                title="Déconnexion"
                icon
                @click="logout()"
            >
                <vIcon>mdi-logout</vIcon>
            </vBtn>
        </vAppBar>
        <vContent>
            <router-view
                @showMessage="showSnackbar"
                @login="updateIsLoggedIn"
            />
        </vContent>
        <vSnackbar
            v-model="snackbar.visible"
            :top="true"
            :color="snackbar.color"
        >
            {{ snackbar.text }}
            <vSpacer />
            <vBtn
                text
                @click="snackbar.visible = false"
            >
                Fermer
            </vBtn>
        </vSnackbar>
    </vApp>
</template>

<script>
import service from '@/assets/js/service';

export default {
    name: 'App',

    components: {

    },

    data: () => ({
        isLoggedIn: false,
        snackbar: {
            visible: false,
            text: '',
            color: '',
        },
        user: null,
    }),

    created() {
    },

    methods: {

        showSnackbar(text, color) {
            this.snackbar.visible = true;
            this.snackbar.text = text;
            this.snackbar.color = color;
        },

        async updateIsLoggedIn() {
            if (service.auth.isLoggedIn()) {
                const res = await service.users.get(service.auth.getUserId());
                this.user = res.data;
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
                this.user = null;
            }
        },

        logout() {
            service.auth.logout();
            this.$router.push({ name: 'login' });
            this.updateIsLoggedIn();
        },

    },

};
</script>
