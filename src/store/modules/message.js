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
        async gnews(context, data) {
            let response = await get('/News/byPage?pageNum=1&pageSize=500')
            return response.data;
        },
        async dnews(context, data) {
            console.log(data);
            await deletes('/News/'+data);
            let response = await get('/News/byPage?pageNum=1&pageSize=500')
            return response.data;
        },
        async pnews(context, data) {
            console.log(data);
            await post('/News/update?'+data);
            let response = await get('/News/byPage?pageNum=1&pageSize=500')
            return response.data;
        },
        async psomenews(context, data) {
            console.log(data);
            await post('/News/updateByNewsIds?'+data);
            let response = await get('/News/byPage?pageNum=1&pageSize=500')
            return response.data;
        },
        async dAllnews(context, data) {
            console.log(data);
            await deletes('/News/byHandled/'+data);
            let response = await get('/News/byPage?pageNum=1&pageSize=500')
            return response.data;
        },
        async dsomenews(context, data) {
            console.log(data);
            await deletes('/News/byNewsIds?newsIds='+data);
            let response = await get('/News/byPage?pageNum=1&pageSize=500')
            return response.data;
        },
        ///News/byDateToDateAndByPage?newsDateEnd=2019-12-28&newsDateStart=2019-11-20&pageNum=1&pageSize=10
        async gnewsByDate(context, data) {
            let sti=data[0].getFullYear()+'-'+(data[0].getMonth()+1)+'-'+data[0].getDate();
            let eti=data[1].getFullYear()+'-'+(data[1].getMonth()+1)+'-'+data[1].getDate();
            let response = await get('/News/byDateToDateAndByPage?newsDateEnd='+eti+'&newsDateStart='+sti+'&pageNum=1&pageSize=500')
            return response.data;
        },
    }
}