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
            let response = await get('/News/byPage?pageNum=1&pageSize=500')
            return response.data;
        },
        async dFireData(context, data) {
            console.log(data);
            await deletes('/News/'+data);
            let response = await get('/News/byPage?pageNum=1&pageSize=500')
            return response.data;
        },
        async dAllFireDatas(context, data) {
            console.log(data);
            await deletes('/News/byHandled/'+data);
            let response = await get('/News/byPage?pageNum=1&pageSize=500')
            return response.data;
        },
        async dSomeFireDatas(context, data) {
            console.log(data);
            await deletes('/News/byNewsIds?newsIds='+data);
            let response = await get('/News/byPage?pageNum=1&pageSize=500')
            return response.data;
        },
        async gFireDataByDate(context, data) {
            let sti=data[0].getFullYear()+'-'+(data[0].getMonth()+1)+'-'+data[0].getDate();
            let eti=data[1].getFullYear()+'-'+(data[1].getMonth()+1)+'-'+data[1].getDate();
            let response = await get('/News/byDateToDateAndByPage?newsDateEnd='+eti+'&newsDateStart='+sti+'&pageNum=1&pageSize=500')
            return response.data;
        },
    }
}