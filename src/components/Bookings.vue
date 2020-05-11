<template>
    <vContainer>
        <Day
            v-for="(bookings, date) in dates"
            :key="date"
            :date="date"
            :bookings="bookings"
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
    }),

    async created() {
        let res;

        res = await service.users.get(service.auth.getUserId());
        this.user = res.data;

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
        res = await service.bookings.list(utils.getYMD(today), utils.getYMD(max));

        const bookings = res.data;
        bookings.sort((a, b) => a.time < b.time);
        for (let i = 0; i < bookings.length; i += 1) {
            const time = new Date(bookings[i].time);
            this.dates[utils.getYMD(time)][bookings[i].location].push(bookings[i]);
        }
    },

    methods: {

    },
};
</script>
