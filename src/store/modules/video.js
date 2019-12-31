import { get } from '../../http/axios';
import { deletes } from '../../http/axios';
import { post } from '../../http/axios';
export default {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        async gsec(context, data) {
            let response = await get('/video/byPage?pageNum=1&pageSize=200')
            return response.data;
        },
        async dsec(context, data) {
            console.log(data);
            await deletes('/video/'+data);
            let response = await get('/video/byPage?pageNum=1&pageSize=200')
            return response.data;
        },
        async psec(context, data) {
            console.log(data);
            await post('/video/update?'+data);
            let response = await get('/video/byPage?pageNum=1&pageSize=200')
            return response.data;
        },
        async dsomesec(context, data) {
            console.log(data);
            await deletes('/video/byVideoIds?videoIds='+data);
            let response = await get('/video/byPage?pageNum=1&pageSize=500')
            return response.data;
        },
        async gsecByDate(context, data) {
            let sti=data[0].getFullYear()+'-'+(data[0].getMonth()+1)+'-'+data[0].getDate();
            let eti=data[1].getFullYear()+'-'+(data[1].getMonth()+1)+'-'+data[1].getDate();
            let response = await get('/video/byDate?videoDateEnd='+eti+'&videoDateStart='+sti+'&pageNum=1&pageSize=500')
            return response.data;
        },
        
    }
}