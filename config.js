let API_BASE_URL;
if (process.env.NODE_ENV === 'production') {
    API_BASE_URL = 'https://btb-api.herokuapp.com/';
} 

else {
    API_BASE_URL = 'http://localhost:3000';
}

module.exports = {
    PORT: process.env.PORT || 3000,
    // other stuff
    API_BASE_URL: API_BASE_URL
};

