import { Button, Modal as RbModal } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { closeModal } from '../../store/modal.slice'

export const Modal = () => {
	const dispatch = useAppDispatch()
	const { isOpen, data } = useAppSelector(state => state.modal)

	return (
		<RbModal show={isOpen} onHide={() => dispatch(closeModal())}>
			<RbModal.Header closeButton>
				<RbModal.Title>Модальное окно</RbModal.Title>
			</RbModal.Header>
			<RbModal.Body>
				<p>Данные: {data}</p>
			</RbModal.Body>
			<RbModal.Footer>
				<Button variant='secondary' onClick={() => dispatch(closeModal())}>
					Закрыть
				</Button>
			</RbModal.Footer>
		</RbModal>
	)
}
