import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';
const API_KEY = '40870479-78b31d6ebe4b8efc40d0da54d';

export const getImages = async (values, currentPage = 1) => {
	const params = new URLSearchParams({
		q: values,
		page: currentPage,
		key: API_KEY,
		image_type: 'photo',
		orientation: 'horizontal',
		per_page: 12,
	});

   const response = await axios.get('/api/', {params})
   return response.data;
};
