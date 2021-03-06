const Task = require('../models/task')


exports.getAll = async (req,res) => {
  const list = await Task.find({})
  return res.json({ status: 'ok', data: list})
}

exports.getOne = async (req, res) => {
  const task = await Task.findOne({id: req.params.id})
  return res.json({ status: "ok", data: task })
}

exports.update = async (req, res) => {
  let task = await Task.findOneAndUpdate(
    { id: req.params.id },
    { $set: req.body },
    { upsert: false, useFindAndModify: false }
  )
  task = await Task.findOne(
    { id: req.params.id })
  return res.json({ status: "ok", data: task })
}

exports.create = async (req, res) => {
   const task = new Task(req.body)
   await task.save()
   return res.json({ status: "ok", data: task })
}


exports.delete = async (req, res) => {
  await Task.delete({ id: req.params.id})
  return res.json({ status: "ok", id: req.params.id })

}
