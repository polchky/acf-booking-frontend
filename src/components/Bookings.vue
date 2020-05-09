<template>
    <vCard>
    </vCard>
</template>

<script>
import service from '@/assets/js/service';
import utils from '@/assets/js/utils';

import Booking from '@/components/Booking';

export default {

    components: {
        Booking,
    },

    data: () => ({

    }),

    created() {
        console.log(service.auth.isLoggedIn());
    },

    methods: {

    },
};
</script>
