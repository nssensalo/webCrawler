const { crawlPage } = require('./crawl.js');

//access command line argument 
//check that it has three parts
async function main() {
    if (process.argv.length < 3) {

        console.log('No website provided')
        //console.log(process.argv.length)
        //console.log(process.argv)
        process.exit(1)
        
    } else {
        if (process.argv.length > 3) {
            console.log('too many command line arguments')
            //console.log(process.argv.length)
            process.exit(1)
        }
    }
    const baseUrl = process.argv[2]
   
    console.log(`Starting web crawl for: ${baseUrl}`) 
    const pages = await crawlPage(baseUrl, baseUrl, {}) // the empty object is the pages object, the 2nd baseUrl is the currentUrl
    
    for ( const page of Object.entries(pages)) {     //NOTE: cant do for page of pages because pages not an array, its an object. Entries allows iteration within
    console.log(page) // AND dont forget const of const page of pages
   }
}
main()