const { JSDOM } = require('jsdom');
`Get into the DOM
 Get all the info inside the <a/> tags
 Loop through the list ( and while using the URL constructor for validation):
    if a url ( the href value) starts with a '/'( its a path), concat it to the given base url and append it to the url list
    otherwise just append it to the url list
    return the list

`
function getUrlsFromHTML (htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    
    
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0,1)==='/')
            try{
                //relative
                const objUrl = new URL(`${baseUrl}${linkElement.href}`) //NOTE: this is an object w/ multi info
                urls.push(`${baseUrl}${linkElement.href}`) // OR  just (objUrl.href)
            } catch (err) {
                console.log(`Error with relative url:${err.message}`)
          
        } else {
            
            try{
                //absolute
                const objUrl = new URL(linkElement.href)
                console.log(objUrl)
                urls.push(objUrl.href)
            } catch(err) {
                console.log(`Error with absolute url:${err.message}`) 
            }
        }
    }
    return urls
}


function normalizeUrl(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if( hostPath.length > 0 && hostPath.slice(-1)==='/'){
        return hostPath.slice(0,-1)// return this
    }
   return hostPath // otherwise return this  

}

module.exports = {
    normalizeUrl,
    getUrlsFromHTML
}