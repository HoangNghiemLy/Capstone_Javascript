class ProductServices{
    getListProductApi() {
        /**
     * Promise(loi hua)
     *  - Pending: Thoi gian cho thuc hien loi hua
     *  - Resolve: Thanh cong
     *  - Reject: That bai
     */
        const promise = axios({
        //request api
            url: "https://683dace0199a0039e9e66efb.mockapi.io/api/Product",
        //giao thuc: get, delete, post, put
            method: "GET"
        })
    //then(): resolve
    //catch(): reject
        return promise;
    }
    deleteProductApi(id) {
        const promise = axios({
            url: `https://683dace0199a0039e9e66efb.mockapi.io/api/Product/${id}`,
            method: "DELETE",
        })
        return promise;
    }
    addProductApi(product) {
        const promise = axios({
            url: "https://683dace0199a0039e9e66efb.mockapi.io/api/Product",
            method: "POST",
            data: product
        })
        return promise;
    }
    getProductById(id) {
        const promise = axios({
            url: `https://683dace0199a0039e9e66efb.mockapi.io/api/Product/${id}`,
            method: "GET"
        })
        return promise;
    }
    updateProductApi(product) {
        const promise = axios({
            url: `https://683dace0199a0039e9e66efb.mockapi.io/api/Product/${product.id}`,
            method: "PUT",
            data: product,
        })
        return promise;
    }
}
export default ProductServices