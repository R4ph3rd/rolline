module.exports =  {
    typeFinder : (path) => {
        let audioExt = ['mp3', 'wav'];
        let imageExt = ['png', 'jpg', 'gif', 'jpeg'];
        audioExt = audioExt.map (audio => new RegExp(audio + '$', 'i'))
        imageExt = imageExt.map (img => new RegExp(img + '$', 'i'))
    
        if (audioExt.some( audio => audio.test(path))){
            return 'audio';
        } else if (imageExt.some( img => img.test(path))){
            return 'image';
        } else {
            return null;
        }
    }
}