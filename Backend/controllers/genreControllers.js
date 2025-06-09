const genres = [
    'All','House', 'Amapiano', 'Hiphop'
];

exports.getAllGenres = async (req, res, next) => {
    try{
        const results = genres;
        res.status(200).json({
            status: 'success',
            data: results
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: 'fail',
            data: null,
            message: error.message
        })
    }
}
