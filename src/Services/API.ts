
class API {
    
    async  getAllMovies() {
        try {
            let response = await fetch("reactjs-cdp.herokuapp.com/movies");
            let result = await response.json();
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async  getMovie(id: number) {
        try {
            let response = await fetch(
                `reactjs-cdp.herokuapp.com/movies/${id}`
            );
            let result = await response.json();
            return result;
        } catch (err) {
            console.log(err);
        }
    }
}
export default API
