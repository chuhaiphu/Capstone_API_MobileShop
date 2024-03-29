
const getEle = (id) => document.getElementById(id);
const resetForm = (formId) => getEle(formId).reset();

import { CustomModal, Helper } from './utils.js';
import { Services } from '../service/phoneService.js';
import { Validate } from './validate.js';
import { Phone } from '../model/phone.js';

const helper = new Helper();
const service = new Services();
const validate = new Validate();

const renderList = async (phoneList) => {
    let content = '';
    phoneList.forEach((ele, index) => {
            content += ` <tr>
            
        <td>${index+1}</td>
        <td><strong>${ele.name}</strong></td>
        <td>$${ele.price}</td>
        <td style="text-align: center"><img src=${ele.img} alt="phone-img" width="150" height="150"></td>
        <td>${ele.desc}</td>
        <td class = ''style="text-align: center"><button class="btn my-3 me-1" data-bs-toggle="modal"
        data-bs-target="#exampleModal" onclick ="btnEdit('${ele.id}')"  id='btnEdit'>
        Edit<i class="fa fa-pencil-square ms-2"></i>
        </button><button class="btn " onclick ="btnDelete('${ele.id}')" id='btnDelete'>
        Delete <i class="fa fa-trash ms-2"></i>
        </button></td>
        </tr>`;
    });
    getEle('tablePhone').innerHTML = content;
};

window.onload = async () => {
    const phoneList = await service.getAllPhones();
    renderList(phoneList);
};

async function handleSearchInput() {
    let term = getEle('searchPhoneName').value;
    const phoneList = await service.getAllPhones();
    let result = await service.searchPhones(term, phoneList);
    renderList(result);
}
async function handleSortChange() {
    const phoneList = await service.getAllPhones();
    const sortOption = getEle('sortPrice').value;
    const sortedList = await service.sortPhones(sortOption, phoneList);
    renderList(sortedList);
}
getEle('searchPhoneName').addEventListener('input', handleSearchInput);
getEle('sortPrice').addEventListener('change', handleSortChange);

getEle('addPhoneForm').onclick = () => {
    helper.clearTB();
    getEle('btnUpdate').style.display = 'none';
    getEle('btnAddPhone').style.display = 'inline-block';
};

getEle('btnAddPhone').onclick = async () => {
    let phoneList = await service.getAllPhones();
    if (!validate.isValid(phoneList)) return;

    const inputs = helper.getInputValue();
    let phone = new Phone('', ...inputs);
    await service.addPhone(phone);
    phoneList = await service.getAllPhones();
    renderList(phoneList);
    resetForm('formPhone');
    CustomModal.alertSuccess('Add phone successfully');
};

window.btnDelete = async (id) => {
    let res = await CustomModal.alertDelete(
        `This phone will be deleted, you can't undo this action`
    );
    if (res.isConfirmed) {
        await service.deletePhone(id);
        let phoneList = await service.getAllPhones();
        renderList(phoneList);
        CustomModal.alertSuccess(`Delete phone successfully`);
    }
};

window.btnEdit = async (id) => {
    helper.clearTB();
    getEle('btnUpdate').style.display = 'inline-block';
    getEle('btnAddPhone').style.display = 'none';

    let data = await service.getPhoneById(id);
    let arrObjValue = Object.values(data); // get values instead
    let idIndex = arrObjValue.indexOf(id); // find index of id
    if (idIndex > -1) {
        arrObjValue.splice(idIndex, 1); // remove id from the list
    }
    helper.fill(arrObjValue); // fill the form with values

    getEle('btnUpdate').onclick = async () => {
        let phoneList = await service.getAllPhones();
        if (!validate.isValid(phoneList, true)) return;

        const inputs = helper.getInputValue();
        let phone = new Phone(id, ...inputs);
        await service.updatePhone(phone);
        phoneList = await service.getAllPhones();
        renderList(phoneList);
        CustomModal.alertSuccess('Update phone successfully');
    };
};
