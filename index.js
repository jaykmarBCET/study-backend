const express = require('express');
const search = require('./searchOnYoutube');  
const cors = require('cors');
const dotEnv  =  require('dotenv')
const JWT = require("jsonwebtoken")

dotEnv.config()

const server = express();


server.use(cors({
  origin: '*' 
}));


server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.get('/',(req,res)=>res.json({message:"Ok server is running"}))
server.get("/api/search", async (req, res) => {
    const query = req.query.query;

    const originalQuery = JWT.verify(query,process.env.SECRET_KEY)
    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const response = await search(originalQuery);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error in search operation:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Configure the port
const PORT = process.env.PORT || 4000;  
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
