function SanPhamService() {
    this.layDDSP = function() {
        var promise = axios({
            url: 'https://60d5dbfb943aa60017768c62.mockapi.io/products',
            method: 'GET' // GET: retrieve data from BackEnd server
        });
        return promise;
    };
    this.themSP = function(sp) {
        return axios({
            url: 'https://60d5dbfb943aa60017768c62.mockapi.io/products',
            // Add new data with POST method
            method: 'POST', //comma
            // Add this data to database
            data: sp,
        });
    };
    this.xoaSP = function(id) {
        return axios( {
            // Delete data via id, unique for each item
            url: `https://60d5dbfb943aa60017768c62.mockapi.io/products/${id}`, // comma
            method: 'DELETE',
        })
    };
    this.xemSP = function(id) {
        return axios( {
            // Receive data via id, unique for each item
            url: `https://60d5dbfb943aa60017768c62.mockapi.io/products/${id}`, // comma
            method: 'GET',
        })
    };
    this.capNhatSP = function(id, sp) {
        return axios( {
            url: `https://60d5dbfb943aa60017768c62.mockapi.io/products/${id}`,
            method: 'PUT',
            data: sp,
        })
    };
    this.timKiemSP = function(dssp, keyword) {
        return dssp.filter(function(sp) {
            return sp.tenSP.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        })
    }
};