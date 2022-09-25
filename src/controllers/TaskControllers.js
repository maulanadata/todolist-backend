const koneksi = require("../models/database");

class TaskControllers {

  static async getAllTask(req, res, next) {
    const queryReadAll = `SELECT * FROM tb_task`;

    koneksi.query(queryReadAll, (err, rows, fields) => {
      if (err) {
        res.status(404).json({ message: "Data Not Found", Error: err });
      }
      res.status(200).json({ message: "Success Fetch Data", data: rows });
    });
  }

  static async getTaskById(req, res, next) {
    const id = req.params.idTask;
    const querySearch = `SELECT * FROM tb_task`;
    const queryReadById = `SELECT * FROM tb_task WHERE id_task = ?`;

    koneksi.query(querySearch, (err, rows, fields) => {
      // mengumpulkan list id dari database
      let idDatabase = [];
      for (let i = 0; i < rows.length; i++) {
        idDatabase.push(rows[i].id_task);
      }
// console.log(id in idDatabase)

      // mencocokkan id content dengan id di database
      if (parseInt(id)-1 in idDatabase) {
        koneksi.query(queryReadById, id, (err, rows, fields) => {
          res.status(200).json({ message: "Success Fetch Data", Data: rows });
        });
      } else {
        res.status(404).json({ message: "Data Not Found" });
      }
    });
  }


  static async createTask(req, res, next) {
    const queryInsert = `INSERT INTO tb_task SET ?`;
    const { title, content } = req.body;
    const result = {
      title_task: title,
      content_task: content,
      status_task: "false",
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    koneksi.query(queryInsert, result, (err, rows, fields) => {
      if (err) {
        res.status(500).json({ message: "Failed Insert Data", Error: err });
      }
      res.status(201).json({ message: "Success Insert Data", data: result });
    });
  }


  static async updateTask(req, res, next) {
    const id = req.params.idTask;
    const querySearch = `SELECT * FROM tb_task WHERE id_task = ?`;
    const queryUpdate = `UPDATE tb_task SET ? WHERE id_task = ?`;
    
    koneksi.query(querySearch, id, (err, rows, fields) => {
      const { title, content, status } = req.body;
      const result = {
        title_task: title || rows[0].title_task,
        content_task: content || rows[0].content_task,
        status_task: status || rows[0].status_task,
        updated_at: Date.now()
      };

      // jika ada id di dalam database
      if (rows.length) {
        koneksi.query(queryUpdate, [result, id], (err, rows, fields) => {
          if(err){
            res.status(500).json({message: "Failed Update Data", Error: err})
          }
          res.status(200).json({ message: "Success Update Data", Data: result });
        });
      } else {
        res.status(404).json({ message: "Data Not Found" });
      }
    });
  }


  static async deleteTask (req, res, next) {
    const id = req.params.idTask;
    const queryDelete = `DELETE FROM tb_task WHERE id_task = ?`;

    koneksi.query(queryDelete, id, (err, rows, fields) => {
      if(err){
        res.status(500).json({message: "Failed Delete Task", Error: err});
      }
      res.status(200).json({message: "Success Delete Task"});
    })
  }


  static async searchTask (req, res, next) {

    const querySearch = `SELECT * FROM tb_task WHERE title_task OR content_task LIKE ?`;
    const search = '%' + req.query.search + '%';
    
    koneksi.query(querySearch, search, (err, rows, fields) => {
      if(err){
        res.status(404).json({message: "Data Not Found", Error: err});
      }
      res.status(200).json({message: "Success Search Data", data: rows});
    })
  }

}


module.exports = TaskControllers;
