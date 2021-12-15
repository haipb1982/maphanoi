import axios from 'axios';

const state = {
    mapData: []
};

const getters = {
    GETTER_MAPDATA: (state) => state.mapData,
};

const mutations = {

};

const actions = {
    async ACTIONS_GET_DATA(context, playload) {
        try {
            let response = await axios.get(playload);
            return response.data.data;
        } catch (error) {
            console.log("error:", error);
        }
    },
};

export default {
    state,
    actions,
    mutations,
    getters,
};