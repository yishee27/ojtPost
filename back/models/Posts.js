
const mongoose = require('mongoose');

module.exports = function(){
    const post = new mongoose.Schema({
      Title:{type:String, default:null},
      Contents:{type:String},
      Files:{type:String},
      UserId:{
          type: String,
          ref: 'User'
      },
      Counter:{
          type:String,
          default:0
      },
      ParentPost:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post',
          default:null
      },
      CreatedDate:{type:Date, default:Date.now},
      ModifiedDate:{type:Date, default:Date.now}
  
    });

    return post.model;
  };
