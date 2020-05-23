<template>
    <vRow justify="center">
        <vCol
            cols="12"
            md="8"
        >
            <vCard color="blue-grey darken-4">
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
                        <vList>
                            <template
                                v-for="(booking, i) in location"
                                :booking="booking"
                            >
                                <vListItem
                                    :key="booking.id"
                                >
                                    <vListItemContent>
                                        <vListItemTitle>
                                            {{ getBookingTitle(booking) }}
                                        </vListItemTitle>
                                        <vListItemSubtitle>
                                            {{ booking.target ? `cible: ${booking.target}m` : '' }}
                                        </vListItemSubtitle>
                                    </vListItemContent>
                                    <vListItemAction
                                        v-if="user.id === booking.user.id || user.role === 'admin'"
                                    >
                                        <vBtn
                                            fab
                                            small
                                            @click="$emit('deleteBooking', booking.id)"
                                        >
                                            <vIcon color="red">
                                                mdi-trash-can
                                            </vIcon>
                                        </vBtn>
                                    </vListItemAction>
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
        user: { type: Object, default: () => {} },
        date: { type: String, default: () => '' },
        bookings: { type: Object, default: () => {} },
    },

    data: () => ({
        title: '',
    }),

    async created() {
        const entries = Object.entries(this.bookings);

        const filter = entries.filter((el) => el[1].length === 0);
        filter.forEach((key) => { this.$delete(this.bookings, key[0]); });
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
