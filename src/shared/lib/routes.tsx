import { AddressWorkPlacePage } from '../../pages/AdressWorkPlacePage'
import { LoanParamsPage } from '../../pages/LoanParamsPage'
import { PersonalDataPage } from '../../pages/PersonalDataPage'

export const routes: { route: string; component: JSX.Element }[] = [
	{ route: '/', component: <PersonalDataPage /> },
	{ route: '/address', component: <AddressWorkPlacePage /> },
	{ route: '/loan', component: <LoanParamsPage /> }
]
