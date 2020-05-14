<template>
    <vContainer
        v-if="loaded"
    >
        <vDialog
            v-model="dialog"
        >
            <vCard>
                <vCardTitle>
                    Supprimer la réservation?
                </vCardTitle>
                <vCardActions>
                    <vBtn
                        text
                        @click="confirmDeleteBooking"
                    >
                        Confirmer
                    </vBtn>
                    <vBtn
                        text
                        color="red"
                        @click="deleteBookingId = null; dialog=false;"
                    >
                        Annuler
                    </vBtn>
                </vCardActions>
            </vCard>
        </vDialog>
        <Day
            v-for="(bookings, date) in dates"
            :key="date"
            :date="date"
            :bookings="bookings"
            :user="user"
            @deleteBooking="deleteBooking"
        />
    </vContainer>
</template>

<script>
import service from '@/assets/js/service';
import utils from '@/assets/js/utils';

import Day from '@/components/Day';

export default {

    components: {
        Day,
    },

    props: {
    },

    data: () => ({
        dates: {},
        user: null,
        loaded: false,
        dialog: false,
        deleteBookingId: null,
    }),

    async created() {
        const res = await service.users.get(service.auth.getUserId());
        this.user = res.data;
        await this.getBookings();
    },

    methods: {
        async getBookings() {
            this.loaded = false;
            this.dates = {};
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const limit = this.user.role === 'user' ? 8 : 15;
            const max = new Date(today);
            max.setDate(today.getDate() + limit - 1);
            for (let i = 0; i < limit; i += 1) {
                const day = new Date(today);
                day.setDate(today.getDate() + i);
                this.$set(this.dates, utils.getYMD(day), { Guintzet: [], Jura: [], Lossy: [] });
            }
            const res = await service.bookings.list(utils.getYMD(today), utils.getYMD(max));

            const bookings = res.data;
            bookings.sort((a, b) => (a.time > b.time ? 1 : -1));
            for (let i = 0; i < bookings.length; i += 1) {
                const time = new Date(bookings[i].time);
                this.dates[utils.getYMD(time)][bookings[i].location].push(bookings[i]);
            }
            this.loaded = true;
        },

        deleteBooking(bookingId) {
            this.dialog = true;
            this.deleteBookingId = bookingId;
        },

        async confirmDeleteBooking() {
            this.dialog = false;
            try {
                await service.bookings.delete(this.deleteBookingId);
                this.$emit('showMessage', 'Réservation supprimée', 'success');
                await this.getBookings();
            } catch (err) {
                if (service.auth.isLoggedIn()) {
                    this.$emit('showMessage', 'Une erreur est survenue.', 'error');
                    await this.getBookings();
                } else {
                    this.$emit('showMessage', 'Votre connexion a expiré.', 'error');
                    this.$router.push({ name: 'login' });
                }
            }
            this.deleteBookingId = null;
        },
    },
};
</script>
