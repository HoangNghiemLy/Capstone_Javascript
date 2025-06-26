import { getEle } from "./../controller/main.js";
class Validation{
    checkEmpty(value, idNoti, mess) {
        if (value === "") {
            getEle(idNoti).innerHTML = mess;
            getEle(idNoti).style.display = "block";
            return false;
        }
        getEle(idNoti).innerHTML = "";
        getEle(idNoti).style.display = "none";
        return true;
    }
    checkIdExist(value, idNoti, mess, arr) {
        let isExist = false;
        for (let i = 0; i < arr.length; i++){
            const product = arr[i];
            if (product.id === value) {
                isExist = true;
                break;
            }
        }
        if (isExist) {
            getEle(idNoti).innerHTML = mess;
            getEle(idNoti).style.display = "block";
            return false;
        }
        getEle(idNoti).innerHTML = "";
        getEle(idNoti).style.display = "none";
        return true;
    }
    checkSelectOption(idSelect, idNoti, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }
    checkPrice(value, idNoti, mess) {
        if (Number(value) < 0) {
            getEle(idNoti).innerHTML = mess;
            return false;
        }
        getEle(idNoti).innerHTML = "";
        return true;
    }
}
export default Validation;