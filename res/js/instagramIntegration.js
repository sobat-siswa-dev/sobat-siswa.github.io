var token = "IGQVJVcVVJcldaUlZALZAlRqZAEZAaWG1ETTN2TlktN05RRjJ3TEI4R0F5eU9KOUh2dzYzSnhiTVBzTndtejBmam9rNjhyem1FeEZArNjYxeGdmYXVjT3lnOVNoVlZAoU3VvYWVzR210cXhB";
window.instagramMedia = [];
async function getRecentInstagramPost() {
    var result = await fetch("https://graph.instagram.com/me/media?fields=id,caption&access_token=" + token);
    result = await result.json();
    await result.data.forEach(element => {
        getInstagramMedia(element).then(jsonMedia => {
            window.instagramMedia.push(jsonMedia);
        })
    });
}
async function getInstagramMedia(element) {
    var result = await fetch("https://graph.instagram.com/" + element.id + "?fields=id,media_type,permalink,media_url,username,timestamp&access_token=" + token);
    result = await result.json();
    return result;
}
// getRecentInstagramPost();