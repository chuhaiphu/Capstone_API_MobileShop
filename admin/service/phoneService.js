export class Services {
    getAllPhones = async () => {
        try {
            const res = await axios({
                url: 'https://65dd94b2dccfcd562f54cfb6.mockapi.io/api/v1/Product',
                method: 'GET',
            });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    addPhone = async (phone) => {
        try {
            await axios({
                url: 'https://65dd94b2dccfcd562f54cfb6.mockapi.io/api/v1/Product',
                method: 'POST',
                data: phone,
            });
        } catch (err) {
            console.log(err);
        }
    };

    deletePhone = async (id) => {
        try {
            await axios({
                url: `https://65dd94b2dccfcd562f54cfb6.mockapi.io/api/v1/Product/${id}`,
                method: 'DELETE',
            });
        } catch (err) {
            console.log(err);
        }
    };

    getPhoneById = async (id) => {
        try {
            const res = await axios({
                url: `https://65dd94b2dccfcd562f54cfb6.mockapi.io/api/v1/Product/${id}`,
                method: 'GET',
            });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    updatePhone = async (phone) => {
        try {
            await axios({
                url: `https://65dd94b2dccfcd562f54cfb6.mockapi.io/api/v1/Product/${phone.id}`,
                method: 'PUT',
                data: phone,
            });
        } catch (err) {
            console.log(err);
        }
    };

    searchPhones = async (term, phoneList) => {
        term = term.toLowerCase();
        return phoneList.filter(phone => phone.name.toLowerCase().includes(term));
    };

    sortPhones = async (order, phoneList) => {
        let sortedList   = [...phoneList];
        sortedList.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
        console.log(sortedList);
        return sortedList;
    };
}
