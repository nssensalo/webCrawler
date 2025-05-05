const { crawlPage } = require('./crawl.js');

//access command line argument 
//check that it has three parts
function main() {
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
   crawlPage(baseUrl)
   
}
main()