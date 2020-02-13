import axios from 'axios';
const Spotify = require('spotify-web-api-js');
const s = new Spotify();
const apiKey = 'BQBB17GbpC_o4q44xuW5flfUlWQ8__ioMNdWIDZBmabDlNNs81uG0z_n6FzH-_TqtG-zIpGpw5cfQKK4wD4';
s.setAccessToken(apiKey);

export default {
	getPictures: async function(){
		const { data: pictures } = await axios.get(
	      'https://us-central1-concordia-soen341.cloudfunctions.net/get-random-images-1'
	    )
	    console.log('Pictures IN', pictures)
	    return pictures
	},
	getGenres: async function(image_ids){
		const { data: genres } = await axios.get(
	      'https://us-central1-concordia-soen341.cloudfunctions.net/get-genre-by-selection',
	      {
		    params: {selected: `[${image_ids}]`}
		  }
	    )
	    console.log('Genres IN', genres)
	    return genres
	},
	getTracks: async function(query, k) {
		const data = await s.searchTracks(query, {limit: k})
		console.log('Tracks IN', data)
		return data
	}
}