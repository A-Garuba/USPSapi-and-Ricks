import axios from 'axios';

const api = axios.create({ baseURL: 'https://rickandmortyapi.com' });

export const getRicks = async (page = 1) => {
	return await api
		.post('/graphql', {
			query: `
        query {
            characters(page: ${page}, filter: { name: "rick" }) {
              info {
                count
              }
              results {
                name,
                image,
                episode {name, episode},
                location {name},
                status
              }
            }
          }`
		})
		.then(
			(res) => {
				return res.data.data.characters.results;
			},
			(error) => {
				return error.response.data.message;
			}
		);
};
