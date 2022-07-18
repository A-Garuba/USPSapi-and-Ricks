import axios from 'axios';

const api = axios.create({ baseURL: 'https://secure.shippingapis.com' });
const USER_ID = '190MACYS2145';

export const verifyPlace = async (place: Place) => {
	const xmlRequest = `<AddressValidateRequest USERID="${USER_ID}"><Address><Address1>${place.suiteOrApt}</Address1><Address2>${place.address}</Address2><City>${place.city}</City><State>${place.state}</State><Zip5>${place.zip}</Zip5><Zip4></Zip4></Address></AddressValidateRequest>`;

	return await api.get(`/ShippingAPI.dll?API=Verify&XML=${xmlRequest}`).then(
		(res) => {
			return res.data;
		},
		(error) => {
			return error.response.data.message;
		}
	);
};
