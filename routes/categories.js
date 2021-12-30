const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

// GET CATEGORIES ROUTE
router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    } 
    res.send(categoryList);
})

// GET CATEGORIES BY ID
router.get(`/:id`, async (req, res) => {
    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: 'The category was not found'})
    } 
    res.status(200).send(category);
})

// UPDATE A CATEGORY
router.put('/:id', async(req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        {new: true} // To return the updated data and not the old data
    )
    if(!category)
    return res.status(404).send('The category could not be updated');
    res.send(category);
})

// POST A NEW CATEGORY
router.post(`/`, async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();
    if(!category)
    return res.status(404).send('The category could not be created');
    res.send(category);
})

// DELETE A CATEGORY
router.delete('/:id', (req,res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if(category) {
            return res.status(200).json({
                success: true,
                message: 'Category deleted'
            })
        }else{
            return res.status(404).json({
                success: false,
                message: 'Category does not exist'
            })
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})

router.get('/get/count', async (req, res) => {
    const productCount = await Category.countDocuments()
    // const productCount = await Product.find();
    console.log('Count result', productCount);
    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})

module.exports = router;