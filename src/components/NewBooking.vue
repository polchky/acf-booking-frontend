<template>
    <vContainer>
        <vRow>
            <vCol cols="12">
                <vForm
                    v-model="valid"
                >
                    <vDatePicker
                        v-model="selDate"
                        :allowed-dates="allowedDates"
                        first-day-of-week="1"
                        locale="fr-CH"
                    />
                    <vSpacer class="mb-5" />
                    <vSelect
                        v-model="selLocation"
                        :items="locations"
                        label="Choisir le lieu"
                        required
                    />
                    <vSelect
                        v-if="selLocation === 'Guintzet'"
                        v-model="selTarget"
                        :items="targets"
                        label="Choisir la cible"
                    />
                    <vSelect
                        v-if="selLocation !== null"
                        v-model="selTime"
                        :items="times"
                        label="Choisir l'heure"
                        :rules="[(v) => !!v || 'Veuillez indiquer l\'heure']"
                        required
                    />
                    <vSelect
                        v-if="selTime !== null"
                        v-model="selDuration"
                        :items="durations"
                        label="Choisir la durée"
                        :rules="[(v) => !!v || 'Veuillez indiquer la durée']"
                        required
                    />
                    <vBtn
                        class="mt-4"
                        :disabled="!valid"
                        :loading="loading"
                        @click="submit"
                    >
                        Placer une réservation
                    </vBtn>
                    <vBtn
                        class="mt-4 ml-4"
                        to="/bookings"
                    >
                        Annuler
                    </vBtn>
                </vForm>
            </vCol>
        </vRow>
    </vContainer>
</template>

<script>
import service from '@/assets/js/service';
import utils from '@/assets/js/utils';

export default {

    props: {
    },

    data: () => ({
        dates: [],
        selDate: utils.getYMD(new Date()),
        locations: [],
        selLocation: 'Guintzet',
        user: null,
        targets: [],
        selTarget: 'default',
        selTime: null,
        selDuration: null,
        availabilities: {},
        valid: false,
        loading: false,
    }),

    computed: {
        times() {
            if (this.availabilities[this.selTarget] === undefined) return [];
            return Object.keys(this.availabilities[this.selTarget]);
        },

        durations() {
            const durations = this.availabilities[this.selTarget][this.selTime];
            return Object.keys(durations).filter((d) => durations[d] > 0);
        },
    },

    watch: {
        selDate() {
            this.updateAvailabilities();
        },

        selLocation() {
            this.updateAvailabilities();
        },

        selTarget() {
            this.selTime = null;
        },

        selTime() {
            this.selDuration = null;
        },
    },

    async created() {
        let res;

        res = await service.users.get(service.auth.getUserId());
        this.user = res.data;

        res = await service.config.get();
        const config = res.data;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const limit = this.user.role === 'user' ? 8 : 15;
        const max = new Date(today);
        max.setDate(today.getDate() + limit - 1);
        for (let i = 0; i < limit; i += 1) {
            const day = new Date(today);
            day.setDate(today.getDate() + i);
            this.dates.push(utils.getYMD(day));
        }

        this.locations = config.locations.map((l) => l.name);

        await this.updateAvailabilities();
    },

    methods: {
        allowedDates(date) { return this.dates.includes(date); },

        async updateAvailabilities() {
            const res = await service.bookings.getAvailabilities(
                this.selDate,
                this.selLocation,
            );
            this.availabilities = res.data;
            this.targets = Object.keys(this.availabilities).map((t) => {
                if (t === 'default') return { value: 'default', text: 'Sans Préférence' };
                return { value: t, text: `${t}m` };
            });

            this.selTarget = 'default';
            this.selTime = null;
            this.selDuration = null;
        },

        async submit() {
            this.loading = true;
            const time = new Date(this.selDate);
            time.setHours(this.selTime.split('h')[0], this.selTime.split('h')[1], 0, 0);
            const parts = this.selDuration.split('h');
            const duration = Number(parts[0]) * 60 + Number(parts[1]);
            const body = {
                userId: this.user.id,
                location: this.selLocation,
                time: time.toISOString(),
                duration,
            };
            if (this.selTarget !== 'default') body.target = this.selTarget;
            try {
                await service.bookings.create(body);
                this.$emit('showMessage', 'Réservation enregistrée!', 'success');
                this.$router.push({ name: 'bookings' });
            } catch (err) {
                if (service.auth.isLoggedIn()) {
                    this.$emit('showMessage', 'Un problème est survenu', 'error');
                    await this.updateAvailabilities();
                } else {
                    this.$emit('showMessage', 'Votre connexion a expiré.', 'error');
                    this.$router.push({ name: 'login' });
                }
            }
            this.loading = false;
        },
    },
};
</script>
