export const marker = (client) => async (params) => {
    try{

        const {data} = await client.post('/market/', params)
        console.info('> login data', data);

        return data;

    } catch (error) {

        console.info ('> login error', error.message);
        return { success: false};

    };
}

export const editMarker = (client) => async (params) => {
    try{

        const {data} = await client.patch('/market/update', params)
        console.info('> login data', data);

        return data;

    } catch (error) {

        console.info ('> login error', error.message);
        return { success: false};

    };
}

export const deleteMarker = (client) => async (params) => {
    try{
        console.log("esto son los params de services", params)
        const {data} = await client.delete(`/market/delete/${params.id}`)
        console.info('> delete', data);

        return data;

    } catch (error) {

        console.info ('> delete catch', error.message);
        return { success: false};

    };
}