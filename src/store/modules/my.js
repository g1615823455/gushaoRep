import { get } from '../../http/axios'

export default {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        async gnews(context, data) {
            let response = await get('/News/byPage?pageNum=1&pageSize=5')
            console.log(response.data.list,'+++')
            return response.data;
        },
    }
}