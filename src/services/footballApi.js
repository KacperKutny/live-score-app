export const fetchTodaysMatches = async () => {
    try{
        const response = await fetch('https://localhost:7013/api/fixtures/today')
        
        if(!response.ok){
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        return data.map(fixture => ({
            fixture: fixture.fixture,
            league: fixture.league,
            teams: fixture.teams,
            goals: fixture.goals,
            score: fixture.score
          }));


     } catch(error){
        console.error('Error fetching data from API: ', error)
     }
   

}