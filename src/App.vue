<template>
    <vApp>
        <vAppBar
            app
        >
            <vToolbarTitle>Réservations Arc Club Fribourg</vToolbarTitle>
            <vSpacer />
            <vBtn
                v-show="isLoggedIn"
                icon
                to="/profile"
            >
                <vIcon>mdi-account</vIcon>
            </vBtn>
            <vBtn
                v-show="isLoggedIn"
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
            :timeout="0"
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
import utils from '@/assets/js/utils';


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
    }),

    async created() {
        this.isLoggedIn = service.auth.isLoggedIn();
    },

    methods: {

        showSnackbar(text, color) {
            this.snackbar.visible = true;
            this.snackbar.text = text;
            this.snackbar.color = color;
        },

        updateIsLoggedIn() {
            this.isLoggedIn = service.auth.isLoggedIn();
        },

        logout() {
            service.auth.logout();
            this.$router.push({ name: 'login' });
            this.updateIsLoggedIn();
        },

    },

};
</script>
