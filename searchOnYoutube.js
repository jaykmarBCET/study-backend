const  yts  =  require("yt-search")

async function search(query) {
    try {
        const response = await yts(query);
    
        const videos = response.videos || [];
        const playlists = response.playlists || [];
    
        return { videos, playlists };
    } catch (error) {
        return error.message;
    }
}

module.exports= search;
