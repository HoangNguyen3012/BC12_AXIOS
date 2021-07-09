// Synchronous means code runs line by line, first come first serve
/**
var a = 1;
var b = 2;

setTimeout(function() {
    console.log('Asynchronous');
}, 1000); // Asynchronous action, make the line run after some time, breaking synchronous

console.log(a);
console.log(b); */


/**
function readFile() {
    return new Promise (function(resolve, reject){
        setTimeout(function() {
            console.log('Reading...');
            resolve('File');
        }, 3000);
    })
}

function downloadFile(file) {
    console.log('Download' + file);
}

function quangCao() {
    console.log('Quang Cao');
}

readFile().then(function(file) {
    console.log(file)
    downloadFile(file) // .then execute resolve outcome
}).catch(function(error) {
    console.log(error); // .catch execute reject outcome
});
quangCao(); */

var sanPhamService = new SanPhamService();

function getEle(id) {
    return document.getElementById(id);
};

function renderTable(arrSP) {
    var content = '';
    arrSP.map(function(sp, index){
        content += // Get content from BackEnd url
        `
        <tr>
            <td>${index + 1}</td>
            <td>${sp.tenSP}</td>
            <td>${sp.gia}</td>
            <td>
                <img style="width: 80px; height: 80px;" src="${sp.hinhAnh}"/>
            </td>
            <td>${sp.moTa}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaSanPham('${sp.id}')">Xóa</button>
                <button class="btn btn-success" onclick="xemSanPham('${sp.id}')">Xem</button>
            </td>
        </tr>
        `
    })
    getEle('tblDanhSachSP').innerHTML = content;
};

var layDanhSachSP = function() {
    sanPhamService.layDDSP().then(function(result) {
        // If fulfilled
        // console.log(result.data);
        renderTable(result.data);
        setLocalStorage(result.data);
    }).catch(function(error) {
        // If rejected
        console.log(error)
    })
};
layDanhSachSP();

var themSanPham = function() {
    // Get input from form
    var tenSP = getEle('TenSP').value;
    var gia = getEle('GiaSP').value;
    var hinhAnh = getEle('HinhSP').value;
    var moTa = getEle('moTa').value;

    // Create object SP from object class SanPham
    var sp = new SanPham(tenSP, gia, hinhAnh, moTa);
    
    // Call out API to save data to database
    sanPhamService.themSP(sp)
    .then(function(result){
        // console.log(result);
        layDanhSachSP();
    }).catch(function(error){
        console.log(error);
    });
};

var xoaSanPham = function(id) {
    sanPhamService.xoaSP(id)
    .then(function(result){
        layDanhSachSP(); // Reload danhSachSP after deletion
        alert('Delete an item')
    })
    .catch(function(error){
        console.log(error);
    })
};

var capNhatSP = function(id) {
    // Get input from form
    var tenSP = getEle('TenSP').value;
    var gia = getEle('GiaSP').value;
    var hinhAnh = getEle('HinhSP').value;
    var moTa = getEle('moTa').value;

    // Create object SP from object class SanPham
    var sp = new SanPham(tenSP, gia, hinhAnh, moTa);

    sanPhamService.capNhatSP(id,sp)
    .then(function(result){
        layDanhSachSP();
        document.querySelector('#myModal .close').click(); // Close the modal
    })
    .catch(function(error){
        console.log(error);
    })
}

var xemSanPham = function(id) {
    sanPhamService.xemSP(id)
    .then(function(result) {
        // Open the modal
        getEle('btnThemSP').click();
        // $('#myModal').modal('show'); // BS4 JQuery Syntax
        var sp = result.data; // call out the current item to view
        // Insert data from database to form
        getEle('TenSP').value = sp.tenSP;
        getEle('GiaSP').value = sp.gia;
        getEle('HinhSP').value = sp.hinhAnh;
        getEle('moTa').value = sp.moTa;

        // Add btnCapNhat to form
        var modalFooter = document.querySelector('.modal-footer');
        modalFooter.innerHTML = 
        ` <button class="btn btn-success" onclick="capNhatSP(${sp.id})">Cap nhat</button>`
    })
    .catch(function(error){
        console.log(error);
    });
};

getEle('btnThemSP').addEventListener('click',function() {
    getEle('formSP').reset(); // Clear data from form
    var modalFooter = document.querySelector('.modal-footer');
    modalFooter.innerHTML = `<button class = "btn btn-success" onclick = "themSanPham()">Them san pham</button>`
});

getEle('ipTimKiem').addEventListener('keyup', function() {
    var arrSP = getLocalStorage();
    var keyword = getEle('ipTimKiem').value;
    var arrTimKiem =  sanPhamService.timKiemSP(arrSP,keyword);
    renderTable(arrTimKiem);
})

function setLocalStorage(dssp) {
    localStorage.setItem('DSSP', JSON.stringify(dssp));
};

function getLocalStorage() {
    if(localStorage.getItem('DSSP')){
        return JSON.parse(localStorage.getItem('DSSP'));
    };
};
