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