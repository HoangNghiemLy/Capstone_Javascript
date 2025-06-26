class ProductList{
    constructor() {
        this.arr = [];
    }
    searchProduct(keyword) {
        const lowerKeyword = keyword.toLowerCase();
        return this.arr.filter(product =>
            product.name.toLowerCase().includes(lowerKeyword)
        );
    }
}
export default ProductList;