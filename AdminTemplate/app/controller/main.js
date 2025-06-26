import ProductServices from "./../services/product-services.js";
import Product from "./../model/product.js";
import ProductList from "./../model/product-list.js";
import Validation from "./../model/validation.js";
const validation = new Validation();
const productList = new ProductList();
const services = new ProductServices();

export const getEle = (id) => {
    return document.getElementById(id);
}
const getListProduct = () => {
    getEle("loader").style.display = "block";
    services.getListProductApi()
        .then((result) => {
            getEle("loader").style.display = "none";
            productList.arr = result.data; 
            renderListProduct(productList.arr);
        })
        .catch((error) => {
            getEle("loader").style.display = "none";
            console.log(error);
        });
}

const renderListProduct = (data) => {
    let contentHTML = "";

    if (data.length === 0) {
        contentHTML = `
            <tr>
                <td colspan="11" class="text-center text-danger">
                    Không tìm thấy sản phẩm nào!
                </td>
            </tr>
        `;
        getEle("tableDanhSach").innerHTML = contentHTML;
        return;
    }

    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        contentHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.screen}</td>
                <td>${product.backCamera}</td>
                <td>${product.frontCamera}</td>
                <td>
                    <img src="./../../assets/img/${product.img}" width="200px"/>
                </td>
                <td>${product.desc}</td>
                <td>${product.type}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal"
                    data-target="#myModal" onclick="onEditProduct('${product.id}')">Edit</button>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="onDeleteProduct('${product.id}')">Delete</button>
                </td>
            </tr>
        `;
    }

    getEle("tableDanhSach").innerHTML = contentHTML;
}

getListProduct();
/**
 * reset form
 */
const resetForm = () => {
    getEle("employeeForm").reset();
}
/**
 * open modal: xu ly title va button
 */
getEle("btnThem").onclick = function () {
    //update title
    getEle("title-header").innerHTML = "Thêm sản phẩm";
    //create button add => footer modal
    const btnAdd = `
        <button class="btn btn-success" onclick="onAddProduct()">Thêm</button>
    `
    getEle("modal-footer").innerHTML = btnAdd
    getEle("id").disabled = false;
    resetForm();
}
/**
 * get value: lay gia tri ng dung nhap vao
 */
const getValue = (isEdit = false) => {
    //dom toi cac input lay value
    const id = getEle("id").value;
    const name = getEle("tenSP").value;
    const price = getEle("price").value;
    const screen = getEle("screen").value;
    const backCamera = getEle("backCamera").value;
    const frontCamera = getEle("frontCamera").value;
    const img = getEle("HinhSP").value;
    const desc = getEle("mota").value;
    const type = getEle("type").value;

    //tao flag
    let isValid = true;
    /**
     * validation
     */
    //check empty id
    const isIDNotEmpty = validation.checkEmpty(id, "tbID", "(*) Vui long nhap ID");
    
    if (!isEdit && isIDNotEmpty) {
        isValid &= validation.checkIdExist(id, "tbID", "(*) ID da ton tai", productList.arr)
    }
    //name
    isValid &= validation.checkEmpty(name, "tbTenSP", "(*) Vui long nhap ten san pham");
    //price
    isValid &= validation.checkEmpty(price, "tbGia", "(*) Vui long nhap gia tien") && validation.checkPrice(price, "tbGia", "(*) Gia tien phai >=0");
    //screen
    isValid &= validation.checkEmpty(screen, "tbScreen", "(*) Vui long nhap kich thuoc man hinh");
    //back camera
    isValid &= validation.checkEmpty(backCamera, "tbBackCamera", "(*) Vui long nhap kich thuoc camera sau");
    //front camera
    isValid &= validation.checkEmpty(frontCamera, "tbFrontCamera", "(*) Vui long nhap kich thuoc camera truoc");
    //img
    isValid &= validation.checkEmpty(img, "tbHinhSP", "(*) Vui long nhap hinh anh");
    //desc
    isValid &= validation.checkEmpty(desc, "tbDesc", "(*) Vui long nhap mo ta");
    //type
    isValid &= validation.checkSelectOption("type", "tbType", "(*) Vui long chon loai san pham");




    if (!isValid) return;
    //tao object class product
    const product = new Product(id, name, price, screen, backCamera, frontCamera, img, desc, type);
    return product;
}
/**
 * Add product
 */
const onAddProduct = () => {
    //dom input lay thong tin => lay value
    const product = getValue();
    if (!product) return;
    const promise = services.addProductApi(product);
    promise
        .then((result) => {
            alert("Thêm sản phẩm thành công");
            document.getElementsByClassName("close")[0].click();
            //render ds moi
            getListProduct();
        })
        .catch((error) => {
            console.log(error);
        })
}
window.onAddProduct = onAddProduct;
/**
 * Delete product
 */
const onDeleteProduct = (id) => {
    const isConfirm = confirm("Ban co chac chan muon xoa san pham nay khong?");
    if (!isConfirm) return;
    const promise = services.deleteProductApi(id);
    promise
        .then((result) => {
            alert(`Xoa san pham ${result.data.name} thanh cong`);
            getListProduct();
        })
        .catch((error) => {
            console.log(error);
        })
}
window.onDeleteProduct = onDeleteProduct;
/**
 * Edit product
 */
const onEditProduct = (id) => {
    const promise = services.getProductById(id);
    if (promise) {
        promise
        .then((result) => {
            const product = result.data;
            //dom the input show value ra ben ngoai
            getEle("id").value = product.id;
            //khong duoc sua id
            getEle("id").disabled = true;
            getEle("tenSP").value = product.name;
            getEle("price").value = product.price;
            getEle("screen").value = product.screen
            getEle("backCamera").value = product.backCamera;
            getEle("frontCamera").value = product.frontCamera
            getEle("HinhSP").value = product.img
            getEle("mota").value = product.desc
            getEle("type").value = product.type
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    //update title
    getEle("title-header").innerHTML = "Cập nhật sản phẩm"
    const btnUpdate = `
        <button class="btn btn-info" onclick="onUpdateProduct('${id}')">Cập nhật</button>
    `
    getEle("modal-footer").innerHTML = btnUpdate;
}
window.onEditProduct = onEditProduct;
/**
 * onUpdate product
 */
const onUpdateProduct = (id) => {
    //lay thong tin moi tu user
    const product = getValue(true);
    if (!product) return;
    product.id = id;
    const promise = services.updateProductApi(product);
    promise
        .then((result) => {
            alert(`Cap nhat san pham ${result.data.name} thanh cong`);
            document.getElementsByClassName("close")[0].click();
            getListProduct();
        })
        .catch((error) => {
            console.log(error);
        })
}
window.onUpdateProduct = onUpdateProduct;
/**
 * Tim kiem theo ten sp
 */
getEle("searchName").addEventListener("keyup", () => {
    const keyword = getEle("searchName").value.trim();

    if (keyword === "") {
        renderListProduct(productList.arr);
        return;
    }

    const filtered = productList.searchProduct(keyword);
    renderListProduct(filtered);
});
/**
 * Sap xep tang/ giam theo giá
 */
// Sắp xếp tăng
// Sắp xếp tăng
document.getElementById("btnSortAsc").addEventListener("click", () => {
    const sortedAsc = [...productList.arr].sort((a, b) => Number(a.price) - Number(b.price));
    renderListProduct(sortedAsc);
});

document.getElementById("btnSortDesc").addEventListener("click", () => {
    const sortedDesc = [...productList.arr].sort((a, b) => Number(b.price) - Number(a.price));
    renderListProduct(sortedDesc);
});


  

