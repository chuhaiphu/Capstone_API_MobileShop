export class Service {
    getPhones = async () => {
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
  }
  
  