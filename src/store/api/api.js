import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getSearchId, getTickets } from "../../services/services";
import { useQuery } from "react-query";

export const ticketsApi = createApi({
    reducerPath: 'ticketsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://aviasales-test-api.kata.academy'
    }),
    endpoints: build =>({

        getSearchId: build.query({

            query: ()=>({
             url: '/search'
            })  

        }),

        getTickets: build.query({

            query: id=>({
            url: `/tickets?searchId=${id}`
            })

        })
       
    })
})


export const {useGetSearchIdQuery} = ticketsApi

// import { ticketsApi } from "./ticketsApi";

// const fetchSearchId = async () => {
//     const response = await fetchBaseQuery({
//         baseUrl: 'https://aviasales-test-api.kata.academy',
//     })({ url: '/search' });
//     return response.data;
// };

// const fetchTickets = async (id) => {
//     const response = await fetchBaseQuery({
//         baseUrl: 'https://aviasales-test-api.kata.academy',
//     })({ url: `/tickets?searchId=${id}` });

//     return response.data;
// };


// export const useGetSearchId = () => {
//     return fetchSearchId();
// };

// export const useGetTickets = (id) => {
//     return fetchTickets(id);
// };

// console.log(useGetSearchId, useGetTickets );

// const fetchSearchId = async () => {
//     return ticketsApi.endpoints.getSearchId.initiate().then(response => response.data);
// };

// const fetchTickets = async (id) => {
//     const response = await ticketsApi.endpoints.getTickets.initiate(id);
//     return response.data;
// };

// export const useGetSearchId = () => {
    
//     return  fetchSearchId();
// };

// export const useGetTickets = (id) => {
//     return fetchTickets(id);
// };

