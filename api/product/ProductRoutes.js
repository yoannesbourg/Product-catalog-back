
// Required modules
const express = require("express");
const app = express();

const productModel = require("../../models/productSchema")

//Create a product
app.post("/create", async (req, res) => {
    try {
        const { name, description, price, photo, active } = req.body.newProduct;
        if (!name || !description || !price || !photo) {
            return res.json({
                status: 400,
                message: 'Missing information in the body request'
            });
        }

        const newProduct = new productModel({
            name, description, price, photo, active
        });

        const result = await newProduct.save();
        return res.json(result);
    } catch (error) {
        console.error('error', error.message)
        return res.json({
            status: 500,
            error: 'Error while creating a product'
        });
    }
})

//get all products paginated + filter
app.get("/:page/:filter/:limit/:search", async (req, res) => {
    try {
        const { page, filter, limit, search } = req.params;
        if (!page || !filter || !limit) {
            return res.json({
                status: 400,
                message: 'mising params'
            });
        };

        const toSkip = limit * page;
        const list = await productModel.find();
        let listLength = list.length;
        let product;
        if (filter !== 'all') {
            let active;
            if (filter === 'active') {
                active = true;
            } else if (filter === 'notActive') {
                active = false;
            }

            const filteredList = await productModel.find({active: {$eq: active}});
            product = await productModel.find({active: {$eq: active}}).skip(toSkip).limit(parseInt(limit));
            listLength = filteredList.length;
            return res.json({
                product,
                listLength
            });
        }
        if (search !== 'none') {
            const regex = new RegExp(search, 'gi');
            const filteredList = await productModel.find({name: regex});
            listLength = filteredList.length;
            product = await productModel.find({name: regex}).skip(toSkip).limit(parseInt(limit));
        } else {
            product = await productModel.find().skip(toSkip).limit(parseInt(limit));
        }
        return res.json({
            product,
            listLength
        });
    } catch (error) {
        console.error('error', error.message)
        return res.json({
            status: 500,
            error: 'Error while getting product list'
        })
    }
})

//get a single product
app.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.json({
                status: 400,
                error: 'Missing params'
            });
        }
        const product = await productModel.findOne({ _id: id });

        res.json(product);
    } catch (error) {
        console.error('error',error.message)
        return res.json({
            status: 500,
            error: 'Error while getting this product'
        })
    }
})

//update a product
app.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, photo, active } = req.body.newValues;

        if (!id) {
            return res.json({
                status: 400,
                error: 'Missing params'
            });
        }

        if (!name || !description || !price || !photo || !active) {
            return res.json({
                status: 400,
                message: 'Missing information in the body request'
            });
        }

        const updateProduct = await productModel.updateOne({ _id: id }, {
            $set: {
                name, description, price, photo, active
            }
        });

        const { modifiedCount, matchedCount } = updateProduct;

        if (modifiedCount !== 1 && matchedCount !== 1) {
            return res.json({
                status: 400,
                message: "Error. Product coudn't be updated"
            });
        }

        const product = await productModel.findOne({ _id: id });

        return res.json(product);
    } catch (error) {
        console.error('error',error.message)
        return res.json({
            status: 500,
            error: 'Error while updating this product'
        })
    }
})

//delete a product
app.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await productModel.deleteOne({ _id: id });
        res.json(deleteProduct);
    } catch (error) {
        console.error('error',error.message)
        return res.json({
            status: 500,
            error: 'Error while deleting this product'
        })
    }
})

module.exports = app