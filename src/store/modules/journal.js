import { get } from '../../http/axios';
import { deletes } from '../../http/axios';
export default {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        async gFireData(context, data) {
            let response = await get('/FireDataDisplay?pageNum=1&pageSize=1000')
            return response.data;
        },
        async dFireData(context, data) {
            await deletes('/FireDateDisplay/'+data);
            let response = await get('/FireDataDisplay?pageNum=1&pageSize=1000')
            return response.data;
        },
        async dAllFireDatas(context, data) {
            await deletes('/FireDateDisplay');
            let response = await get('/FireDataDisplay?pageNum=1&pageSize=1000')
            return response.data;
        },
        async dSomeFireDatas(context, data) {
            await deletes('/FireDateDisplays/'+data);
            let response = await get('/FireDataDisplay?pageNum=1&pageSize=1000')
            return response.data;
        },
        async gFireDataByDate(context, data) {
            let sti=data[0].getFullYear()+'-'+(data[0].getMonth()+1)+'-'+data[0].getDate();
            let eti=data[1].getFullYear()+'-'+(data[1].getMonth()+1)+'-'+data[1].getDate();
            let response = await get('/FireDateDisplay/ByTime?f_etime='+eti+'&f_stime='+sti+'&pageNum=1&pageSize=1000')
            return response.data;
        },
    }
}