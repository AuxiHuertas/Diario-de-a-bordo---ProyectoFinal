import { QueryClientProvider, QueryClient } from "react-query" ;
const queryClient = new QueryClient ();

const provider = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
    );
};

export default provider;

