<template>
    <vRow>
        <vCol>
            <vCard>
                <vCardTitle>
                    {{ title }}
                </vCardTitle>
                <vCardText>
                    <vCard
                        v-for="(location, name) in bookings"
                        :key="name"
                        class="ma-2"
                    >
                        <vCardTitle>
                            {{ name }}
                        </vCardTitle>
                        <vList
                            two-line
                        >
                            <template
                                v-for="(booking, i) in location"
                                :booking="booking"
                            >
                                <vListItem :key="booking.id">
                                    <vListItemContent>
                                        <vListItemTitle>
                                            {{ getBookingTitle(booking) }}
                                        </vListItemTitle>
                                        <vListItemSubtitle>
                                            {{ booking.target ? `cible: ${booking.target}m` : '' }}
                                        </vListItemSubtitle>
                                    </vListItemContent>
                                </vListItem>
                                <v-divider
                                    v-if="i + 1 < location.length"
                                    :key="i"
                                />
                            </template>
                        </vList>
                    </vCard>
                </vCardText>
            </vCard>
        </vCol>
    </vRow>
</template>

<script>
import utils from '@/assets/js/utils';

export default {

    props: {
        date: { type: String, default: () => '' },
        bookings: { type: Object, default: () => [] },
    },

    data: () => ({
        title: '',
    }),

    async created() {
        const entries = Object.entries(this.bookings);
        entries
            .filter((key, value) => value.length === 0)
            .forEach((key) => { delete this.bookings[key]; });
        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        };
        const d = new Date(this.date);
        this.title = d.toLocaleDateString('fr-CH', options);
    },

    methods: {
        getBookingTitle(booking) {
            const time = new Date(booking.time);
            const end = new Date(booking.time);
            end.setMinutes(end.getMinutes() + booking.duration);
            return `${utils.getHM(time)} - ${utils.getHM(end)} ${booking.user.username}`;
        },
    },
};
</script>
