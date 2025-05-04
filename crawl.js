const { JSDOM } = require('jsdom');

function getUrlsFromHTML (htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0,1)==='/'){
            //relative
            urls.push(`${baseUrl}${linkElement.href}`)

        } else {
            //absolute
            urls.push(linkElement.href)
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