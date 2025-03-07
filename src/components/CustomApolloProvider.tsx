import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useNhostClient } from "@nhost/react";
import React from "react";

interface CustomApolloProviderProps {
    children: React.ReactNode
}

const CustomApolloProvider = ({ children }: CustomApolloProviderProps) => {
    const nhost = useNhostClient();
    const client = new ApolloClient({
        uri: nhost.graphql.httpUrl,
        cache: new InMemoryCache(),
        headers:{
            "x-hasura-admin-secret":import.meta.env.VITE_hasura_admin_secret
        }

    });
    return <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
};

export default CustomApolloProvider;