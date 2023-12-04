const { Data } = require('../model/data');

exports.addData = async (req, res) => {
  try {
    const newData = req.body;

    const addedData = await Data.create(newData);

    res.json(addedData);
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 20;

    const totalItems = await Data.countDocuments();

    const data = await Data.find().limit(perPage).skip((page - 1) * perPage);

    const totalPages = Math.ceil(totalItems / perPage);

    res.json({
      data,
      totalItems,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteData = async (req, res) => {
  try {
    console.log("YEY", req.params.id); 
    const dataId = req.params.id;
    const deletedData = await Data.findByIdAndDelete(dataId);

    res.json(deletedData);
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.editData = async (req, res) => {
  try {
    const dataId = req.params.id;
    const updatedData = await Data.findByIdAndUpdate(dataId, req.body, { new: true });

    res.json(updatedData);
  } catch (error) {
    console.error('Error editing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

