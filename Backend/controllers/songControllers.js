const songs = [
    {
        id: 0,
        title: 'Abekho',
        artists: ['Musa Keys', 'Babalwa M'],
        src: 'http://127.0.0.1:5000/assets/Abekho.mp3',
        img: 'http://127.0.0.1:5000/assets/img.jpg',
        genre: 'Amapiano'
    },
    {
        id: 1,
        title: 'Kude',
        artists: ['Kabza De Small', 'Mashudu'],
        src: 'http://127.0.0.1:5000/assets/Kude.mp3',
        img: 'http://127.0.0.1:5000/assets/img.jpg',
        genre: 'Amapiano'
    },
    {
        id: 2,
        title: 'Amalobolo',
        artists: ['Kelvin Momo', 'Babalwa M', 'Nia Pearl', 'M Stixx'],
        src: 'http://127.0.0.1:5000/assets/Amalobolo.mp3',
        img: 'http://127.0.0.1:5000/assets/img.jpg',
        genre: 'Amapiano'
    },
    {
        id: 3,
        title: 'JZ56WB',
        artists: ['Kelvin Momo'],
        src: 'http://127.0.0.1:5000/assets/JZ56WB.mp3',
        img: 'http://127.0.0.1:5000/assets/img.jpg',
        genre: 'Amapiano'
    },
    {
        id: 4,
        title: 'Amaxeba',
        artists: ['Kelvin Momo', 'Cnethemba Gonelo'],
        src: 'http://127.0.0.1:5000/assets/Amaxeba.mp3',
        img: 'http://127.0.0.1:5000/assets/img.jpg',
        genre: 'Amapiano'
    },
    {
        id: 5,
        title: 'Good Summer Lovin',
        artists: ['Gabanna'],
        src: 'http://127.0.0.1:5000/assets/Good_Summer_Lovin.mp3',
        img: 'http://127.0.0.1:5000/assets/img.jpg',
        genre: 'House'
    },
    {
        id: 6,
        title: 'Empty Paradise',
        artists: ['Jullian Gomez'],
        src: 'http://127.0.0.1:5000/assets/Empty_Paradise.mp3',
        img: 'http://127.0.0.1:5000/assets/img.jpg',
        genre: 'House'
    },
    {
        id: 7,
        title: 'Temple Of Snakes',
        artists: ['Jullian Gomez', 'Martin Iveson'],
        src: 'http://127.0.0.1:5000/assets/Temple_Of_Snakes.mp3',
        img: 'http://127.0.0.1:5000/assets/img.jpg',
        genre: 'House'
    },
    {
        id: 8,
        title: 'Unusual',
        artists: ['Jullian Gomez', 'Marton Iveson'],
        src: 'http://127.0.0.1:5000/assets/Unusual.mp3',
        img: 'http://127.0.0.1:5000/assets/img.jpg',
        genre: 'House'
    },
    
    
];

exports.getAllSongs = async (req, res, next) => {
    try{
        const results = songs;
        res.status(200).json({
            status: 'success',
            data: results
        })
    }catch(error){
        console.error("Error fetching songs:", error);
        res.status(500).json({
            status: 'fail',
            data : null,
            message: 'Internal server error'
        });
    }
}

exports.getDeepHouseSongs = async (req, res, next) => {
    try{
        const results = songs.filter(song => song.genre === 'House');
        res.status(200).json({
            status: 'success',
            data : results
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: 'fail',
            data: null,
            message: 'Internal server error'
        })
    }
}

exports.getAmapianoSongs = async (req, res, next) => {
    try{
        const results = songs.filter(song => song.genre === 'Amapiano');
        res.status(200).json({
            status: 'success',
            data: results
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: 'fail',
            data: null,
            message: 'Internal server error'
        })
    }
}

exports.getHipHopSongs = async (req, res, next) => {
    try{
        const results = songs.filter(song => song.genre === 'hiphop');
        res.status(200).json({
            status: 'success',
            data: results
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: 'fail',
            data: null,
            message: 'Internal server error'
        })
    }
}