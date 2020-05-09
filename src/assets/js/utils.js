export default {

    getTimeDiff(date) {
        const now = new Date();

        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (seconds < 60) return `${years} ${seconds > 1 ? 'secondes' : 'seconde'}`;

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} ${hours > 1 ? 'heures' : 'heure'}`;

        const days = Math.floor(hours / 24);
        if (days < 7) return `${days} ${days > 1 ? 'jours' : 'jour'}`;

        const weeks = Math.floor(days / 7);
        if (weeks < 5) return `${weeks} ${weeks > 1 ? 'semaines' : 'semaine'}`;

        const months = Math.floor(days / 30);
        if (months < 12) return 'mois';

        const years = Math.floor(days / 365);
        return `${years} ${years > 1 ? 'ans' : 'an'}`;
    },

    searchZizis(text) {
        return text.replace(/zizi/gi, '<span class="lime darken-3">zizi</span>');
    },

    getTime(timestamp) {
        const date = new Date(timestamp);
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        return new Intl.DateTimeFormat('fr-FR', options).format(date);
    },

    formatNumber(number) {
        if (number === undefined) return '';
        const str = number.toString();
        return `${str.slice(0, str.length - 3)}'${str.slice(-3)}`;
    },

};
