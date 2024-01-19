import { useState, useEffect } from 'react';
import * as API from '../Services/pixabay-api';
import { Container } from './App.styled';
import { Searchbar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notify } from 'notiflix';

const STATUS = {
	IDLE: 'idle',
	PENDING: 'pending',
	REJECTED: 'rejected',
	RESOLVED: 'resolved',
};

export const App = () => {
	const [images, setImages] = useState([]);
	const [value, setValue] = useState('');
	const [page, setPage] = useState(1);
	const [status, setStatus] = useState(STATUS.IDLE);
	useEffect(() => {
		const fetchImages = async () => {
			const { hits, totalHits } = await API.getImages(value, page);
			try {
				setImages(prevImages => [...prevImages, ...hits]);
				setStatus(
					Math.ceil(totalHits / 12) <= page ? STATUS.IDLE : STATUS.RESOLVED
				);
			} catch {
				Notify.failure('Oops something went wrong! Try reloading page');
				setStatus({ status: STATUS.REJECTED });
			}
		};
		if (value) {
			fetchImages();
		}
	}, [value, page]);

	const updateValues = newValue => {
		if (newValue === value) {
			Notify.info('You have to write new keyword... Try again!');
			return;
		}
		setImages([]);
		setValue(newValue);
		setPage(1);
		setStatus(STATUS.PENDING);
	};
	const updatePage = () => {
		setPage(prevPage => prevPage + 1);
		setStatus(STATUS.PENDING);
	};
	return (
		<Container>
			<Searchbar onSubmit={updateValues} />
			<ImageGallery images={images} />
			{status === STATUS.RESOLVED && <Button handleClick={updatePage} />}
			{status === STATUS.PENDING && <Loader />}
		</Container>
	);
};

export default App;
