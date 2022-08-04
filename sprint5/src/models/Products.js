const fs = require('fs')
const path = require('path')

const Products = {
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

    create: function (productData, productFile) {
        let allProducts = this.getData();
        //agregar if para imagen default
        let newProduct = {
            id: this.genId(),
            ...productData,
            img: productFile.filename
        }
        
        allProducts.push(newProduct)
        fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null, ' '));
        
        return true;
    },
    edit: function (id, productData, productFile) {
        //cambiar por el nuevo metodo
        let allProducts = this.getData();

        for(product of allProducts){
            if(product.id == id){
                product.idCat = productData.idCat
                product.name = productData.name
                product.description = productData.description
                product.price = productData.price
                product.img = productFile.filename
                product.status = productData.status
                product.discountAmount = productData.discountAmount
            }
        }
        
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
module.exports = Products