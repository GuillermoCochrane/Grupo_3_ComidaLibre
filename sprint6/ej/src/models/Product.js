const fs = require('fs')
const path = require('path')

module.exports = {
    fileName: path.join(__dirname, '../data/products.json'),

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },

    genId: function () {
        let allProducts = this.getData();
        
        let lastProduct = allProducts.pop();
        
        if(lastProduct){
            return lastProduct.id + 1;
        }else return 1;
    },

    findById: function (id) {
        let allProducts = this.getData();
        return productFound = allProducts.find(product => product.id == id)   
    },
    findByName: function (productName) {
        let allProducts = this.getData();
        return productFound = allProducts.find(product => product.name == productName)   
    },

    create: function (productData, productFile) {
        let allProducts = this.getData();
        let newProduct
        
        if( productFile ) {
            newProduct = {
                id: this.genId(),
                ...productData,
                img: productFile.filename
            }
        } else {
            newProduct = {
                id: this.genId(),
                ...productData,
                img: 'default.png'
            }
        }

        allProducts.push(newProduct)
        fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null, ' '));
        
        return true;
    },
    edit: function (id, productData, productFile) {
        let allProducts = this.getData();
        let productFound = this.findById( id )
        let updatedProduct

        if( productFile ) {
            updatedProduct = {
                ...productFound,
                ...productData,
                img: productFile.filename
            }
        } else {
            updatedProduct = {
                ...productFound,
                ...productData
            }
        }

        allProducts.splice(id-1, 1, updatedProduct)

        fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null, ' '));
        
        return true;
    },
    delete: function (id) {
        let allProducts = this.getData(); 
        
        let finalProducts = allProducts.filter(product => product.id != id)
        
        fs.writeFileSync(this.fileName, JSON.stringify(finalProducts, null, ' '));
        return true;
    }
}
