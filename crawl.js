const { JSDOM } = require('jsdom');

`getUrlsFromHTML()
Get into the DOM
 Get all the info inside the <a/> tags
 Loop through the list ( and while using the URL constructor for validation):
    if a url ( the href value) starts with a '/'( its a path), concat it to the given base url and append it to the url list
    otherwise just append it to the url list
    return the list

crawlPage()
This is first crawl a single page. Next will be crawling a whole website.
Dont do "If error code less than 300 try it", instead stop program if error code is high.
Check if valid html ( content type is html/text)
Make sure baseUrl is same as domain for currentUrl. Pages helps us keep track of 
`

async function crawlPage( baseUrl,currentUrl, pages) {
    const baseUrlObj = new URL(baseUrl)
    const currentUrlObj = new URL(currentUrl)
   
    if ( baseUrlObj.hostname !== currentUrlObj.hostname) {
        return pages // an object the maps the url to a number "my.website": 2
    }
    console.log("1. Completed hostname check!")
    const normalizedCurrentUrl  = normalizeUrl(currentUrl) // get regular non object url 
    
    if(pages[normalizedCurrentUrl] > 0 ){ //check if the pages object of that url is mapped to a number > 0 (its been visited)
        pages[normalizedCurrentUrl]++ //if so, then increment "counter"
        return pages //return the object for continued use
    }
    //console.log("PAGES:",JSON.stringify(pages,null,2))
    for (const [key, value] of Object.entries(pages)) {
        console.log(`2. Page: ${key}, Visits: ${value}`);
      }
    
        
       
    pages[normalizedCurrentUrl] = 1

    console.log(`3. Actively Crawling: ${currentUrl}`) 

    try {
        
        const resp = await fetch(currentUrl)

        const contentType = resp.headers.get("content-type")
      
        console.log("4. Checking status response code...")
        if(resp.status > 399){
           console.log(`Error ${resp.status} fetching sit:${currentUrl}`)
           return pages
        }
        
        console.log("5. Checking content type...")
        if( !contentType.includes("text/html")){ //NOTE: remember in js !== , and !object
            console.log(`Error, non html response w/ content type: ${contentType} for site:${currentUrl}`)
            return pages
        }
       
        console.log("6. Getting text...")
        const htmlBody = await resp.text()// NOTE: without await it was pending 
        
        const nextUrls  = getUrlsFromHTML(htmlBody, baseUrl)
        console.log("7. Getting recursive urls...")
        for ( nextUrl of nextUrls ) {    
            console.log(`Recursive url: ${nextUrl}`)                   // Now, crawl the pages of the pages until we cover all territory
            pages = await crawlPage(baseUrl, nextUrl, pages) // updating pages object????????????????
            
        }
        
        return pages

       
    } catch(err){
        console.log(`Error during fetch for site:${currentUrl}. ${err.message}`)
    }
   
        
 
        
   
    

    
}


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
                //console.log(objUrl)
                urls.push(objUrl.href)
            } catch(err) {
                console.log(`Error with absolute url:${err.message}`) 
            }
        }
    }
    return urls
}


function normalizeUrl(urlString) { //removing trailing slash at end of path
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if( hostPath.length > 0 && hostPath.slice(-1)==='/'){
        return hostPath.slice(0,-1)// return this
    }
   return hostPath // otherwise return this  

}

module.exports = {
    normalizeUrl,
    getUrlsFromHTML,
    crawlPage
}