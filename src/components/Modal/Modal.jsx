import {  useEffect } from 'react';

import { Overlay, Popup } from './Modal.styled';

export const Modal = () => {
	useEffect(() => {
		window.addEventListener('keydown', closeModal);
		return () => window.removeEventListener('keydown', closeModal);
	}, [closeModal]);

	const { URL, alt, closeModal } = this.props;
	return (
		<Overlay id="overlay" onClick={closeModal}>
			<Popup>
				<img src={URL} alt={alt} />
			</Popup>
		</Overlay>
	);
};
export default Modal;
