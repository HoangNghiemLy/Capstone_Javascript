class Service {
    getPhones = async () => {
      try {
        const res = await axios({
          url: "https://683dace0199a0039e9e66efb.mockapi.io/api/Product",
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
          url: `https://683dace0199a0039e9e66efb.mockapi.io/api/Product/${id}`,
          method: 'GET',
        });
  
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
}
export default Service;
  