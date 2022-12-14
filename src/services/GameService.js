const GameModel = require("../models/Game");
 
exports.getAllGames = async (page,_limit) => {
    const currentPage = page || 1;
    const limit = _limit || 6;
    try{
        return await GameModel.find({},{review:0})
                              .where('isDelete').equals(false)
                              .populate('writer', 'name')
                              .sort({ createdAt: -1 })                        
                              .skip((currentPage - 1) * limit)
                              .limit(limit);
    }catch(error){
        return error;
    }
};
 
exports.createGame = async (game) => {
    return await GameModel.create(game);
};
exports.getGameById = async (id) => {
     return await GameModel.findById(id).populate("review").populate("writer", "name grade");
};
 
exports.updateGame = async (id, game) => {
     return await GameModel.findByIdAndUpdate(id, game);
};

exports.deleteGame = async (id) => {
    const deleted = {"isDelete" : true};
    return await GameModel.findByIdAndUpdate(id, deleted);
};