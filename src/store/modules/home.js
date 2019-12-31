import { get } from '../../http/axios';
export default {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        async Refresh(context, data) {
            let response = await get('/FireDateDisplay/Refresh')
            return response.data;
        },
    }
}