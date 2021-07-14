import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const opts = {
    theme: {
        themes: {
            light: {
                primary: colors.blueGrey.darken1,
                secondary: colors.teal.lighten3
            }
        }
    }
};

export default new Vuetify(opts);
