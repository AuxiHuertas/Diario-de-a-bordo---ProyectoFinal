export const pictures = (client) => async (params) => {
    try{

        const {data} = await client.post('/imgs/', params)
        console.info('> login data', data);

        return data;

    } catch (error) {

        console.info ('> login error', error.message);
        return { success: false};

    };
}