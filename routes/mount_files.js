const express = require('express')
const jwt = require('../jwt')
const router = express.Router()
var MountFile = require('../models').mount_files
var view = require('../views')

router.get('/:id', async (req, res, next) => {
  const mount_files = await MountFile.findAll({
    where: { mount_id: req.params.id }
  })

  if (mount_files.length !== 0) {
    res.json(view(mount_files))
  } else {
    res.json(view('mount_files empty'))
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {mount_id,file} = req.body;
    const mount_files = await MountFile.create({
      mount_id,file
    });
  if (mount_files) {
    res.json(view(mount_files))
  }
 } catch (err) {
   res.json(view(err.errors[0].message))
 }
})

router.delete('/:id', async function (req, res, next) {
  try {
    const getId = req.params.id;
    const mount_files = await MountFile.destroy({ where: {
      id: getId
    }})
    if (mount_files) {
      res.json(view(mount_files))
    }
  } catch (err) {
    res.json(view(err.errors[0].message))
  }
});

module.exports = router