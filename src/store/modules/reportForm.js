import { get } from '../../http/axios';
export default {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        async gFireData(context, data) {
            let sti=data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();
            let response = await get('/FireDateDisplay/ByDate/'+sti)
            return response.data;
        },
    }
}