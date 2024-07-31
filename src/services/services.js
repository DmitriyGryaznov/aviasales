export const getSearchId = async()=>{
    const searchResult = await fetch ('https://aviasales-test-api.kata.academy/search');
    const dataResult = await searchResult.json();
    console.log(dataResult, dataResult.searchId);
    return dataResult.searchId;
};

export const getTickets = async (id) =>{
    try{
    const ticketResult = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`);
    const dataTickets = await ticketResult.json()
    
    console.log (dataTickets);
        return dataTickets;
    }catch(error){
        return null
   }
   
}