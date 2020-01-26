import axios from 'axios';

export default {
	getPictures: async function(){
		const { data: pictures } = await axios.get(
	      'https://us-central1-concordia-soen341.cloudfunctions.net/get-random-images-1'
	    )
	    console.log('Pictures IN', pictures)
	    return pictures
	},
	getGenres: async function(){
		const { data: genres } = await axios.get(
	      'https://us-central1-concordia-soen341.cloudfunctions.net/get-genre-by-selection'
	    )
	    console.log('Genres IN', genres)
	    return genres
	}
}